<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Alert Popup -->
    <div v-if="showAlert" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div class="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center transform transition-all duration-300">
        <div class="mb-4 text-red-600 text-2xl"><i class="fas fa-exclamation-circle"></i></div>
        <div class="mb-4 text-gray-800 font-semibold">{{ alertMessage }}</div>
        <button @click="showAlert = false" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Tutup
        </button>
      </div>
    </div>

    <!-- Success Alert -->
    <div v-if="showSuccess" class="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50">
      <div class="flex items-center">
        <div class="py-1">
          <i class="fas fa-check-circle text-xl mr-3"></i>
        </div>
        <div>
          <p class="font-semibold">{{ successMessage }}</p>
        </div>
        <button @click="showSuccess = false" class="ml-4 text-green-700 hover:text-green-900">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
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
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <div class="relative">
                <select 
                  v-model="prioritas" 
                  class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer shadow-sm bg-white appearance-none hover:border-blue-400 focus:shadow-lg"
                  required
                >
                  <option disabled value="">Pilih Prioritas</option>
                  <option value="PRIORITAS">Prioritas</option>
                  <option value="NON_PRIORITAS">Non Prioritas</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <i class="fas fa-chevron-down text-gray-400"></i>
                </div>
              </div>
            </div>

            <!-- Ketersediaan Dosen -->
            <div>
              <label class="block text-gray-700 font-semibold mb-4">Ketersediaan Dosen (Sesi)</label>
              <div class="flex gap-2 mb-2">
                <button type="button" @click="selectAllKetersediaan" class="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow hover:bg-blue-700 transition">Select All</button>
                <button type="button" @click="removeAllKetersediaan" class="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-xs font-semibold shadow hover:bg-gray-400 transition">Remove All</button>
              </div>
              <div class="w-full rounded-xl border border-gray-200 overflow-x-auto md:overflow-x-visible">
                <table class="min-w-[600px] md:min-w-0 w-full text-xs md:text-sm">
                  <thead class="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <tr>
                      <th class="sticky left-0 z-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-r border-gray-200 px-2 py-2 md:px-3 md:py-3 text-xs md:text-sm">Sesi / Hari</th>
                      <th v-for="hari in hariList" :key="hari" class="border-b border-r last:border-r-0 border-gray-200 px-2 py-2 md:px-3 md:py-3 text-xs md:text-sm">
                        {{ hari }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, sesiIndex) in sesiList" :key="sesiIndex">
                      <td class="sticky left-0 z-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-r border-gray-200 px-2 py-2 md:px-3 md:py-3 font-semibold text-xs md:text-sm">
                        Sesi {{ sesiIndex + 1 }}
                      </td>
                      <td v-for="(col, hariIndex) in hariList" :key="hariIndex" 
                          class="border-b border-r last:border-r-0 last-row:border-b-0 border-gray-200 px-2 py-2 md:px-3 md:py-3 text-center">
                        <input 
                          type="checkbox" 
                          v-model="ketersediaan[sesiIndex][hariIndex]" 
                          class="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-300 cursor-pointer"
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
        <div>
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
            class="flex flex-col items-center justify-center py-12 text-gray-500"
          >
            <i class="fas fa-user-slash text-4xl mb-4"></i>
            <p class="text-center">
              {{ searchQuery ? 'Tidak ditemukan dosen yang sesuai.' : 'Belum ada dosen yang diinputkan.' }}
            </p>
          </div>

          <!-- Dosen List -->
          <div v-else class="overflow-y-auto pr-2" style="height: 550px;">
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

    <!-- Popup Konfirmasi Delete -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus data dosen ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="confirmDelete" 
              class="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300"
            >
              Ya, Hapus
            </button>
            <button 
              @click="showDeleteConfirm = false" 
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Konfirmasi Edit -->
    <div v-if="showEditConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300">
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-pencil-alt text-2xl text-blue-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Edit</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengedit data dosen ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="confirmEdit" 
              class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
            >
              Ya, Edit
            </button>
            <button 
              @click="showEditConfirm = false" 
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
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

// Add new refs for confirmation popups
const showDeleteConfirm = ref(false);
const showEditConfirm = ref(false);
const selectedIndex = ref(null);

// Add alert state
const showAlert = ref(false);
const alertMessage = ref('');
const showSuccess = ref(false);
const successMessage = ref('');

let pollingInterval = null;

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
            dosen_sedia_hari: hariList[hariIndex],
            dosen_sedia_sesi: sesiList[sesiIndex]
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

    const response = await axios.get('http://10.4.90.25:3000/dosen', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dosenList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data dosen', error);
  }
};

// Function to show success message
const showSuccessAlert = (message) => {
  successMessage.value = message;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000); // Hide after 3 seconds
};

// Submit Dosen (Add or Update)
const submitDosen = async () => {
  try {
    // Trim kode
    kode.value = kode.value.trim();
    if (!kode.value) {
      alertMessage.value = 'Kode dosen tidak boleh kosong atau hanya spasi.';
      showAlert.value = true;
      return;
    }
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    // Format kesediaan
    const kesediaan = [];
    ketersediaan.value.forEach((sesi, sesiIndex) => {
      sesi.forEach((available, hariIndex) => {
        if (available) {
          kesediaan.push({
            hari: hariList[hariIndex],
            sesi: sesiList[sesiIndex]
          });
        }
      });
    });

    if (editIndex.value !== null) {
      // Update Dosen
      const updateData = {
        dosen_kode: kode.value,
        dosen_nama: nama.value,
        dosen_prioritas: prioritas.value,
        kesediaan: kesediaan
      };

      const dosenKode = dosenList.value[editIndex.value].dosen_kode;
      await axios.patch(`http://10.4.90.25:3000/dosen/${dosenKode}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      // After update, fetch the list again to ensure consistency
      await fetchDosen();
      resetForm();
      editIndex.value = null;
      showEditConfirm.value = false;
      showSuccessAlert('Data dosen berhasil diperbarui!');
    } else {
      // Add New Dosen
      const newDosen = {
        dosen_kode: kode.value,
        dosen_nama: nama.value,
        dosen_prioritas: prioritas.value,
        kesediaan: kesediaan
      };

      await axios.post('http://10.4.90.25:3000/dosen', newDosen, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      // Fetch updated dosen list
      await fetchDosen();
      resetForm();
      showSuccessAlert('Data dosen berhasil ditambahkan!');
    }
  } catch (error) {
    console.error('Gagal mengirim data dosen', error);
    let msg = 'Gagal mengupdate data: ';
    if (error.response && error.response.data && error.response.data.error) {
      msg += error.response.data.error;
    } else if (error.message) {
      msg += error.message;
    } else {
      msg += 'Terjadi kesalahan.';
    }
    alertMessage.value = msg;
    showAlert.value = true;
  }
};

// Update edit function to show confirmation
const editDosen = (index) => {
  const dosen = filteredDosenList.value[index];
  selectedIndex.value = dosenList.value.findIndex(d => d.dosen_kode === dosen.dosen_kode);
  showEditConfirm.value = true;
};

// Confirm edit function
const confirmEdit = () => {
  const index = selectedIndex.value;
  const dosen = dosenList.value[index];
  kode.value = dosen.dosen_kode;
  nama.value = dosen.dosen_nama;
  prioritas.value = dosen.dosen_prioritas;
  
  // Reset ketersediaan array
  ketersediaan.value = Array(sesiList.length).fill().map(() => Array(hariList.length).fill(false));
  
  // Set ketersediaan based on jadwal_dosen
  if (dosen.jadwal_dosen && Array.isArray(dosen.jadwal_dosen)) {
    dosen.jadwal_dosen.forEach(jadwal => {
      const sesiIndex = sesiList.indexOf(jadwal.dosen_sedia_sesi);
      const hariIndex = hariList.indexOf(jadwal.dosen_sedia_hari);
      if (sesiIndex >= 0 && hariIndex >= 0) {
        ketersediaan.value[sesiIndex][hariIndex] = true;
      }
    });
  }
  
  editIndex.value = index;
  showEditConfirm.value = false;
};

// Update delete function to show confirmation
const deleteDosen = (index) => {
  const dosen = filteredDosenList.value[index];
  selectedIndex.value = dosenList.value.findIndex(d => d.dosen_kode === dosen.dosen_kode);
  showDeleteConfirm.value = true;
};

// Confirm delete function
const confirmDelete = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const dosen = dosenList.value[selectedIndex.value];
    await axios.delete(`http://10.4.90.25:3000/dosen/${dosen.dosen_kode}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dosenList.value.splice(selectedIndex.value, 1);
    showDeleteConfirm.value = false;
    showSuccessAlert('Data dosen berhasil dihapus!');
  } catch (error) {
    console.error('Error deleting dosen:', error);
    let msg = 'Gagal menghapus data dosen: ';
    if (error.response && error.response.data && error.response.data.error) {
      msg += error.response.data.error;
    } else if (error.message) {
      msg += error.message;
    } else {
      msg += 'Terjadi kesalahan.';
    }
    alertMessage.value = msg;
    showAlert.value = true;
  }
};

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
  showEditConfirm.value = false;
};

// Reset Form after submit
const resetForm = () => {
  kode.value = "";
  nama.value = "";
  prioritas.value = "";
  ketersediaan.value = Array(sesiList.length).fill().map(() => Array(hariList.length).fill(false));
};

// Select All & Remove All for ketersediaan
const selectAllKetersediaan = () => {
  for (let i = 0; i < ketersediaan.value.length; i++) {
    for (let j = 0; j < ketersediaan.value[i].length; j++) {
      ketersediaan.value[i][j] = true;
    }
  }
};
const removeAllKetersediaan = () => {
  for (let i = 0; i < ketersediaan.value.length; i++) {
    for (let j = 0; j < ketersediaan.value[i].length; j++) {
      ketersediaan.value[i][j] = false;
    }
  }
};

// Fetch dosen data when component is mounted
onMounted(() => {
  fetchDosen();
  pollingInterval = setInterval(fetchDosen, 10000); // 10 detik
});

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval);
});
</script>

<style>
.last-row:last-child td {
  border-bottom: 0;
}
</style>