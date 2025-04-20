<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Title -->
    <div class="mb-8 w-full flex justify-center">
      <div class="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300">
        <img src="/input-dosen.png" alt="Dosen Icon" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Input Dosen
        </h1>
      </div>
    </div>

    <!-- Dosen Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Dosen Form -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
        <form @submit.prevent="submitDosen" class="space-y-6">
          <div class="space-y-6">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Kode Dosen</label>
              <div v-if="editIndex !== null">
                <p class="text-lg font-bold text-blue-600">{{ kode }}</p>
              </div>
              <div v-else>
                <input 
                  type="text" 
                  v-model="kode" 
                  class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                  placeholder="AI" 
                  required 
                />
              </div>
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-2">Nama Dosen</label>
              <input 
                type="text" 
                v-model="nama" 
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                placeholder="Annisaa Sri Indrawanti, S.T., M.T." 
                required 
              />
            </div>

            <!-- Prioritas Selection -->
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Prioritas</label>
              <select 
                v-model="prioritas" 
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer" 
                required
              >
                <option disabled value="">Pilih Prioritas</option>
                <option value="PRIORITAS">Prioritas</option>
                <option value="NON_PRIORITAS">Non Prioritas</option>
              </select>
            </div>

            <!-- Ketersediaan Dosen -->
            <div>
              <label class="block text-gray-700 font-semibold mb-4">Ketersediaan Dosen (Sesi)</label>
              <div class="overflow-hidden rounded-xl border border-gray-200">
                <table class="w-full text-sm">
                  <thead class="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <tr>
                      <th class="border-b border-r border-gray-200 px-4 py-3">Sesi / Hari</th>
                      <th v-for="hari in hariList" :key="hari" class="border-b border-r last:border-r-0 border-gray-200 px-4 py-3">
                        {{ hari }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, sesiIndex) in sesiList" :key="sesiIndex">
                      <td class="border-b border-r border-gray-200 px-4 py-3 font-semibold bg-gradient-to-r from-blue-50 to-indigo-50">
                        Sesi {{ sesiIndex + 1 }}
                      </td>
                      <td v-for="(col, hariIndex) in hariList" :key="hariIndex" 
                          class="border-b border-r last:border-r-0 last-row:border-b-0 border-gray-200 px-4 py-3 text-center">
                        <input 
                          type="checkbox" 
                          v-model="ketersediaan[sesiIndex][hariIndex]" 
                          class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-300 cursor-pointer"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Submit and Cancel Buttons -->
          <div class="flex gap-4 pt-4">
            <button 
              type="submit" 
              class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl
                     hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {{ editIndex !== null ? 'Update' : 'Submit' }}
            </button>

            <button 
              v-if="editIndex !== null"
              type="button" 
              @click="cancelEdit" 
              class="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl
                     hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Daftar Dosen -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
        <div class="h-[calc(100vh-200px)] flex flex-col">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <i class="fas fa-list-ul mr-2"></i> Daftar Dosen
            </h2>
            
            <!-- Search Input -->
            <div class="relative flex-1 max-w-xs ml-4">
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Cari dosen..."
                class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <!-- Empty State -->
          <div 
            v-if="filteredDosenList.length === 0" 
            class="flex-1 flex flex-col items-center justify-center text-gray-500"
          >
            <i class="fas fa-user-slash text-4xl mb-4"></i>
            <p class="text-center">
              {{ searchQuery ? 'Tidak ditemukan dosen yang sesuai.' : 'Belum ada dosen yang diinputkan.' }}
            </p>
          </div>

          <!-- Dosen List -->
          <div v-else class="flex-1 overflow-y-auto pr-2">
            <ul class="space-y-4">
              <li 
                v-for="(dosen, index) in filteredDosenList" 
                :key="index" 
                class="group bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-bold text-lg text-gray-800 mb-1">{{ dosen.dosen_nama }}</h3>
                    <p class="text-blue-600 font-medium mb-2">{{ dosen.dosen_kode }}</p>
                    <span 
                      :class="{
                        'px-3 py-1 rounded-lg text-sm font-medium inline-flex items-center gap-2': true,
                        'bg-green-100 text-green-600': dosen.dosen_prioritas === 'PRIORITAS',
                        'bg-red-100 text-red-600': dosen.dosen_prioritas === 'NON_PRIORITAS'
                      }"
                    >
                      <i :class="{
                        'fas': true,
                        'fa-star': dosen.dosen_prioritas === 'PRIORITAS',
                        'fa-exclamation-circle': dosen.dosen_prioritas === 'NON_PRIORITAS'
                      }"></i>
                      {{ dosen.dosen_prioritas === 'PRIORITAS' ? 'Prioritas' : 'Non Prioritas' }}
                    </span>
                    <div class="mt-4 space-y-2">
                      <p class="text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <i class="fas fa-calendar-alt text-blue-500"></i>
                        Ketersediaan:
                      </p>
                      <ul class="space-y-2">
                        <li
                          v-for="(result, sesiIndex) in getGroupedSessions(dosen.jadwal_dosen)"
                          :key="sesiIndex"
                          class="text-sm text-gray-600"
                        >
                          <div class="flex items-center gap-2">
                            <span class="inline-flex items-center justify-center w-20 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg font-medium">
                              Sesi {{ result.sesi }}
                            </span>
                            <div class="flex flex-wrap gap-2">
                              <span 
                                v-for="hari in result.hari" 
                                :key="hari"
                                class="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
                              >
                                {{ hari }}
                              </span>
                            </div>
                          </div>
                        </li>
                        <li
                          v-if="getGroupedSessions(dosen.jadwal_dosen).length === 0"
                          class="text-sm italic text-gray-400 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar-times text-gray-400"></i>
                          Tidak tersedia
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="flex space-x-3">
                    <button 
                      @click="editDosen(index)" 
                      class="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                      title="Edit"
                    >
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button 
                      @click="deleteDosen(index)" 
                      class="p-2 text-gray-400 hover:text-red-600 transition-colors duration-300"
                      title="Hapus"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const hariList = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'];
const sesiList = ['SATU', 'DUA', 'TIGA'];

const kode = ref("");
const nama = ref("");
const prioritas = ref("");
const ketersediaan = ref([...Array(3)].map(() => Array(5).fill(false)));
const dosenList = ref([]);
const editIndex = ref(null);
const searchQuery = ref("");

// Computed property for filtered dosen list
const filteredDosenList = computed(() => {
  if (!searchQuery.value) return dosenList.value;
  
  const query = searchQuery.value.toLowerCase();
  return dosenList.value.filter(dosen => 
    dosen.dosen_nama.toLowerCase().includes(query) ||
    dosen.dosen_kode.toLowerCase().includes(query) ||
    dosen.dosen_prioritas.toLowerCase().includes(query)
  );
});

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

<style>
.last-row:last-child td {
  border-bottom: 0;
}
</style>