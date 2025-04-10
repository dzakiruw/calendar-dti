<template>
  <div class="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
    <h1 class="text-3xl font-bold flex items-center mb-8 text-center">
      <img src="/input-dosen.png" alt="Dosen Icon" class="w-14 h-14 mr-2" />
      Input Dosen
    </h1>

    <!-- Form + List -->
    <div class="flex flex-col sm:flex-row flex-wrap w-full max-w-6xl gap-6 justify-center">
      <!-- Dosen Input Form -->
      <form @submit.prevent="submitDosen" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kode Dosen</label>
          <div v-if="editIndex !== null">
            <!-- Display as text when in edit mode -->
            <p class="text-gray-700"><strong>{{ kodeDosen }}</strong></p>
          </div>
          <div v-else>
            <!-- Input field for new dosen -->
            <input v-model="kodeDosen" type="text" class="w-full mt-2 p-2 border rounded-lg" placeholder="D123" required />
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Nama Dosen</label>
          <input v-model="namaDosen" type="text" class="w-full mt-2 p-2 border rounded-lg" placeholder="Dr. John Doe" required />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Level Dosen</label>
          <!-- Input for level with restriction to only 1 digit -->
          <input v-model="levelDosen" type="number" class="w-full mt-2 p-2 border rounded-lg" placeholder="Level Dosen (Angka)" required 
                 :max="9" :min="0" maxlength="1" @input="limitLevelInput" />
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

        <div class="flex gap-4">
          <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
            {{ editIndex !== null ? 'Update' : 'Submit' }}
          </button>
          <button 
            type="button" 
            @click="cancelEdit" 
            v-if="editIndex !== null" 
            class="bg-gray-600 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-700">
            Cancel Edit
          </button>
        </div>
      </form>

      <!-- Dosen List -->
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
          <li
            v-for="(dosen, index) in dosenList"
            :key="index"
            class="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p class="font-bold text-base">{{ dosen.dosen_nama }}<br /><span class="text-sm font-normal">{{ dosen.dosen_kode }}</span></p>
              <p class="text-sm text-gray-600 mt-1">
                <span class="font-bold">Level:</span> {{ dosen.dosen_level }}<br />
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

            <div class="flex flex-col space-y-2 ml-4">
              <button @click="editDosen(index)" class="text-gray-600 hover:text-gray-900" title="Edit">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteDosen(index)" class="text-red-600 hover:text-red-900" title="Hapus">
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

const hariList = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT']; // Hari sesuai dengan API
const sesiList = ['SATU', 'DUA', 'TIGA']; // Sesi sesuai dengan API

const kodeDosen = ref('');
const namaDosen = ref('');
const levelDosen = ref('');
const ketersediaan = ref([...Array(3)].map(() => Array(5).fill(false))); // Menyimpan ketersediaan dosen

const dosenList = ref([]);
const editIndex = ref(null);

// Fungsi untuk mendapatkan sesi yang difilter dan mengelompokkan hari berdasarkan sesi
const getGroupedSessions = (jadwalDosen) => {
  // Check if jadwal_dosen exists and is an array
  if (!Array.isArray(jadwalDosen)) {
    console.warn('Invalid jadwal_dosen format:', jadwalDosen);
    return [];
  }

  // Grouping hari per sesi
  const grouped = sesiList.map((sesi) => {
    const hariListForSesi = jadwalDosen
      .filter((item) => item.dosen_sedia_sesi === sesi)
      .map((item) => item.dosen_sedia_hari);

    return {
      sesi,
      hari: hariListForSesi,
    };
  });

  // Remove sessions that have no available days
  return grouped.filter((group) => group.hari.length > 0);
};

// Batasi input level dosen hanya satu digit
const limitLevelInput = () => {
  if (levelDosen.value.length > 1) {
    levelDosen.value = levelDosen.value.slice(0, 1);  // Hanya ambil satu digit
  }
};

onMounted(async () => {
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
    dosenList.value = response.data; // Make sure dosenList is properly initialized
  } catch (error) {
    console.error('Gagal mengambil data dosen', error);
  }
});

const formatKetersediaan = (ketersediaan) => {
   return ketersediaan.flatMap((sesi, sesiIndex) => {
     return sesi
       .map((available, hariIndex) => {
         if (available) {
           return {
             hari: hariList[hariIndex],
             sesi: sesiList[sesiIndex],
           };
         }
         return null;
       })
       .filter(Boolean);
   });
 };

const submitDosen = async () => {
  const newDosen = {
    dosen_kode: kodeDosen.value,
    dosen_nama: namaDosen.value,
    dosen_level: levelDosen.value,
    kesediaan: formatKetersediaan(ketersediaan.value),
  };

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    if (editIndex.value !== null) {
      // Update existing dosen
      const dosenKode = dosenList.value[editIndex.value].dosen_kode;
      await axios.patch(`http://10.15.41.68:3000/dosen/${dosenKode}`, newDosen, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Re-fetch the dosen list to get updated data
      await fetchDosenList(); // This will refresh the dosen list
      resetForm(); // After update, reset the form
      editIndex.value = null; // Clear editIndex to reset the button to "Add Dosen"
    } else {
      // Add new dosen
      const response = await axios.post('http://10.15.41.68:3000/dosen', newDosen, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Re-fetch the dosen list to get updated data
      await fetchDosenList(); // This will refresh the dosen list
      resetForm();
    }
  } catch (error) {
    console.error('Gagal menambahkan data dosen', error);
  }
};

const fetchDosenList = async () => {
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

    // Update dosenList with fresh data from server
    dosenList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data dosen', error);
  }
};

const resetForm = () => {
  kodeDosen.value = '';
  namaDosen.value = '';
  levelDosen.value = '';
  ketersediaan.value = [...Array(3)].map(() => Array(5).fill(false));
};

const editDosen = (index) => {
  const dosen = dosenList.value[index];
  kodeDosen.value = dosen.dosen_kode;
  namaDosen.value = dosen.dosen_nama;
  levelDosen.value = dosen.dosen_level;
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

const cancelEdit = () => {
  resetForm();
  editIndex.value = null; // Reset editIndex to null when canceling
};

const deleteDosen = async (index) => {
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
    
    // Update dosenList reactivity after deletion
    dosenList.value.splice(index, 1);
  } catch (error) {
    console.error('Gagal menghapus data dosen', error);
  }
};
</script>
