<template>
  <div class="h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
    <!-- Title -->
    <div class="mb-6 w-full sm:w-auto flex justify-center sm:justify-start">
      <h1 class="text-3xl font-bold flex items-center">
        <img src="/input-dosen.png" alt="Dosen Icon" class="inline-block w-14 h-14 mr-2" />
        Input Dosen
      </h1>
    </div>

    <!-- Dosen Form and Dosen List -->
    <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-6">
      <!-- Dosen Form -->
      <form @submit.prevent="submitDosen" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96 mb-6 sm:mb-0">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kode Dosen</label>
          <div v-if="editIndex !== null">
            <!-- Display as text when in edit mode -->
            <p class="text-gray-700"><strong>{{ kode }}</strong></p>
          </div>
          <div v-else>
            <!-- Input field for new dosen -->
            <input type="text" v-model="kode" class="w-full mt-2 p-2 border rounded-lg" placeholder="AI" required />
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Nama Dosen</label>
          <input type="text" v-model="nama" class="w-full mt-2 p-2 border rounded-lg" placeholder="Annisaa Sri Indrawanti, S.T., M.T." required />
        </div>

        <!-- Prioritas Selection -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Prioritas</label>
          <select v-model="prioritas" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Prioritas</option>
            <option value="PRIORITAS">PRIORITAS</option>
            <option value="NON_PRIORITAS">NON PRIORITAS</option>
          </select>
        </div>

        <!-- Ketersediaan Dosen -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Ketersediaan Dosen (Sesi)</label>
          <div class="overflow-auto">
            <table class="w-full text-sm text-center border border-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border px-2 py-1">Sesi / Hari</th>
                  <th v-for="hari in hariList" :key="hari" class="border px-2 py-1">{{ hari }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, sesiIndex) in sesiList" :key="sesiIndex">
                  <td class="border font-semibold">Sesi {{ sesiIndex + 1 }}</td>
                  <td v-for="(col, hariIndex) in hariList" :key="hariIndex" class="border px-2 py-1">
                    <input type="checkbox" v-model="ketersediaan[sesiIndex][hariIndex]" class="w-4 h-4" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="flex gap-4">
          <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
            {{ editIndex !== null ? 'Update' : 'Submit' }}
          </button>

          <!-- Cancel Edit Button -->
          <button 
            type="button" 
            @click="cancelEdit" 
            v-if="editIndex !== null" 
            class="bg-gray-600 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-700">
            Cancel Edit
          </button>
        </div>
      </form>

      <!-- Daftar Dosen -->
      <div class="flex-1 w-full sm:w-96 bg-white p-6 shadow-md rounded-lg mt-6 sm:mt-0">
        <h2 class="text-xl font-bold mb-4">
          <i class="fas fa-list-ul mr-2"></i> Daftar Dosen
        </h2>

        <!-- Empty State -->
        <div v-if="dosenList.length === 0" class="text-gray-500">
          Belum ada dosen yang diinputkan.
        </div>

        <!-- Dosen List -->
        <ul v-else class="space-y-4">
          <li v-for="(dosen, index) in dosenList" :key="index" class="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p><strong>{{ dosen.dosen_nama }}</strong><br>{{ dosen.dosen_kode }}</p>
              <p class="text-sm text-gray-600">
                <span class="font-bold">Prioritas:</span> {{ dosen.dosen_prioritas }}
              </p>
              <p class="text-sm text-gray-600">
                <span class="font-bold">Ketersediaan:</span>
              </p>
              <ul class="text-sm text-gray-600 list-disc ml-5 mt-1 space-y-0.5">
                <li
                  v-for="(result, sesiIndex) in getGroupedSessions(dosen.jadwal_dosen)"
                  :key="sesiIndex"
                >
                  Sesi {{ result.sesi }}: {{ result.hari.join(', ') }}
                </li>
                <li
                  v-if="getGroupedSessions(dosen.jadwal_dosen).length === 0"
                  class="italic text-gray-400 list-none"
                >
                  Tidak tersedia
                </li>
              </ul>
            </div>
            <div class="flex space-x-4">
              <button @click="editDosen(index)" class="text-gray-600 hover:text-gray-900">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteDosen(index)" class="text-red-600 hover:text-red-900">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const hariList = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'];
const sesiList = ['SATU', 'DUA', 'TIGA'];

const kode = ref("");
const nama = ref("");
const prioritas = ref("");
const ketersediaan = ref([...Array(3)].map(() => Array(5).fill(false)));
const dosenList = ref([]);
const editIndex = ref(null);

// Fungsi untuk mendapatkan sesi yang difilter dan mengelompokkan hari berdasarkan sesi
const getGroupedSessions = (jadwalDosen) => {
  if (!Array.isArray(jadwalDosen)) {
    console.warn('Invalid jadwal_dosen format:', jadwalDosen);
    return [];
  }

  const grouped = sesiList.map((sesi) => {
    const hariListForSesi = jadwalDosen
      .filter((item) => item.dosen_sedia_sesi === sesi)
      .map((item) => item.dosen_sedia_hari);

    return {
      sesi,
      hari: hariListForSesi,
    };
  });

  return grouped.filter((group) => group.hari.length > 0);
};

const formatKetersediaan = (ketersediaan) => {
  return ketersediaan.flatMap((sesi, sesiIndex) => {
    return sesi
      .map((available, hariIndex) => {
        if (available) {
          return {
            hari: hariList[hariIndex],
            sesi: sesiList[sesiIndex]
          };
        }
        return null;
      })
      .filter(Boolean);
  });
};

// Fetch Dosen Data from API
const fetchDosen = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/dosen', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dosenList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data dosen', error);
  }
};

// Submit Dosen (Add or Update)
const submitDosen = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    if (editIndex.value !== null) {
      // Update Dosen
      const updateData = {
        dosen_kode: kode.value,
        dosen_nama: nama.value,
        dosen_prioritas: prioritas.value,
        kesediaan: formatKetersediaan(ketersediaan.value)
      };

      const dosenKode = dosenList.value[editIndex.value].dosen_kode;
      await axios.patch(`http://10.15.41.68:3000/dosen/${dosenKode}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      // After update, fetch the list again to ensure consistency
      await fetchDosen();
      resetForm();
      editIndex.value = null;
    } else {
      // Add New Dosen
      const newDosen = {
        dosen_kode: kode.value,
        dosen_nama: nama.value,
        dosen_prioritas: prioritas.value,
        kesediaan: formatKetersediaan(ketersediaan.value)
      };

      await axios.post('http://10.15.41.68:3000/dosen', newDosen, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      // Fetch updated dosen list
      await fetchDosen();
      resetForm();
    }
  } catch (error) {
    console.error('Gagal mengirim data dosen', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      alert('Gagal mengupdate data: ' + (error.response.data.error || error.message));
    }
  }
};

// Edit Dosen
const editDosen = (index) => {
  const dosen = dosenList.value[index];
  kode.value = dosen.dosen_kode;
  nama.value = dosen.dosen_nama;
  prioritas.value = dosen.dosen_prioritas;
  
  // Reset ketersediaan
  ketersediaan.value = [...Array(3)].map(() => Array(5).fill(false));
  
  // Load kesediaan into checkboxes
  if (dosen.jadwal_dosen && Array.isArray(dosen.jadwal_dosen)) {
    dosen.jadwal_dosen.forEach(item => {
      const sesiIndex = sesiList.indexOf(item.dosen_sedia_sesi);
      const hariIndex = hariList.indexOf(item.dosen_sedia_hari);
      if (sesiIndex !== -1 && hariIndex !== -1) {
        ketersediaan.value[sesiIndex][hariIndex] = true;
      }
    });
  }
  
  editIndex.value = index;
};

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
};

// Delete Dosen
const deleteDosen = async (index) => {
  if (!confirm('Yakin ingin menghapus dosen ini?')) return;
  const dosenKode = dosenList.value[index].dosen_kode;
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await axios.delete(`http://10.15.41.68:3000/dosen/${dosenKode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dosenList.value.splice(index, 1);
  } catch (error) {
    console.error('Gagal menghapus data dosen', error);
  }
};

// Reset Form after submit
const resetForm = () => {
  kode.value = "";
  nama.value = "";
  prioritas.value = "";
  ketersediaan.value = [...Array(3)].map(() => Array(5).fill(false));
};

// Fetch dosen data when component is mounted
onMounted(() => {
  fetchDosen();
});
</script>