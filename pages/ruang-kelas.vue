<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Alert Popup -->
    <div v-if="showAlert" class="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md" @click="showAlert = false">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center transform transition-all duration-300 border border-white/70" @click.stop>
        <div class="mb-4 text-red-600 text-2xl"><i class="fas fa-exclamation-circle"></i></div>
        <div class="mb-4 text-gray-800 font-semibold">{{ alertMessage }}</div>
        <button @click="showAlert = false" class="px-6 py-2 bg-blue-600/70 hover:bg-blue-700/90 backdrop-blur-xl text-white rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
          Tutup
        </button>
      </div>
    </div>

    <!-- Success Alert -->
    <div v-if="showSuccess" class="fixed top-4 right-4 bg-white/60 backdrop-blur-xl border border-green-200/70 text-green-700 p-4 rounded-lg shadow-xl transform transition-all duration-300 z-50">
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
      <div class="bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex items-center space-x-4 transition-all duration-300 border border-white/70 hover:shadow-blue-100/30">
        <img src="/input-kelas.png" alt="Classroom Icon" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Input Ruang Kelas
        </h1>
      </div>
    </div>

    <!-- Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Input Form -->
      <div class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500 flex flex-col max-h-[450px]">
        <form @submit.prevent="submitForm" class="flex-1 flex flex-col">
          <div class="space-y-4 flex-1">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Kode Ruangan</label>
            <div v-if="editIndex !== null">
              <p class="text-lg font-bold text-blue-600">{{ form.kodeRuangan }}</p>
            </div>
            <div v-else>
              <input
                v-model="form.kodeRuangan"
                type="text"
                  class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
                placeholder="Masukkan kode ruangan"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Kapasitas Ruangan</label>
            <input
              v-model="form.kapasitasRuangan"
              type="number"
                class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
              placeholder="Masukkan kapasitas ruangan"
              required
            />
            </div>
          </div>

          <!-- Submit and Cancel Buttons -->
          <div class="flex gap-4 pt-2">
            <button 
              type="submit" 
              class="flex-1 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl
                     hover:from-blue-700/90 hover:to-indigo-700/90 transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              {{ editIndex !== null ? 'Update' : 'Submit' }}
            </button>

            <button 
              v-if="editIndex !== null"
              type="button" 
              @click="cancelEdit" 
              class="flex-1 bg-gradient-to-r from-gray-600/70 to-gray-700/70 backdrop-blur-xl text-white py-3 px-6 rounded-xl
                     hover:from-gray-700/90 hover:to-gray-800/90 transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Daftar Ruang Kelas -->
      <div class="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/70 hover:shadow-blue-100/30 transition-all duration-500 flex flex-col max-h-[450px]">
        <!-- Title with Icon and Counter -->
        <div class="flex items-center justify-between mb-5 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-list-ul text-blue-600 text-xl mr-3"></i>
            <h2 class="text-xl font-bold text-blue-600">Daftar Ruang Kelas</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-door-open mr-2"></i>
              {{ sortedRuangKelasList.length }} Ruangan
            </div>
            <button 
              @click="toggleFullscreen" 
              class="p-1.5 bg-gray-100/50 backdrop-blur-xl hover:bg-gray-200/50 rounded-md text-gray-700 transition-colors shadow-sm"
              title="Lihat semua ruangan"
            >
              <i class="fas fa-expand"></i>
            </button>
          </div>
        </div>
        
        <!-- Search Bar -->
        <div class="w-full mb-4">
          <div class="relative">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari ruang kelas..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>

        <!-- Content Area -->
        <div class="flex-1 overflow-hidden h-[300px]">
          <!-- Empty State -->
          <div 
          v-if="sortedRuangKelasList.length === 0" 
            class="flex flex-col items-center justify-center py-12 text-gray-500 h-full"
          >
            <i class="fas fa-filter text-4xl mb-4 text-blue-300"></i>
            <p class="text-center font-medium mb-4">
              {{
                searchQuery
                  ? "Tidak ada ruangan yang sesuai dengan pencarian."
                  : "Belum ada ruangan yang diinputkan."
              }}
            </p>
            <button 
              v-if="searchQuery"
              @click="resetFilters" 
              class="px-4 py-2 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
            >
              <i class="fas fa-undo mr-2"></i> Reset filter
            </button>
          </div>

          <!-- Ruang Kelas List -->
          <div v-else class="overflow-y-auto h-[300px] pr-2">
            <ul class="grid grid-cols-1 gap-4 pb-3">
              <li 
              v-for="(ruang, index) in sortedRuangKelasList" 
                :key="index" 
                class="bg-blue-50/40 backdrop-blur-xl p-3 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div class="flex flex-col h-full">
                  <!-- Top section with title and buttons -->
                  <div>
              <div class="flex justify-between items-start">
                      <div class="w-4/5">
                        <h3 class="font-bold text-gray-800 text-lg">
                          {{ ruang.ruangan_kode }}
                        </h3>
                  </div>
                      
                      <!-- Action Buttons -->
                      <div class="flex space-x-1">
                    <button 
                    @click="editRuangKelas(sortedRuangKelasList.indexOf(ruang))" 
                          class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                          title="Edit ruangan"
                    >
                          <i class="fas fa-edit"></i>
                    </button>
                    <button 
                    @click="deleteRuangKelas(sortedRuangKelasList.indexOf(ruang))" 
                          class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                          title="Hapus ruangan"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Spacer to push content to bottom -->
                  <div class="flex-grow"></div>
                  
                  <!-- Bottom section with capacity -->
                  <div class="mt-2 pt-2">
                    <div class="flex items-center border-t pt-2">
                      <span class="px-3 py-1 bg-blue-100/50 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-md flex items-center shadow-sm">
                        <i class="fas fa-users mr-2"></i>
                        Kapasitas: {{ ruang.ruangan_kapasitas }}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Konfirmasi Delete -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[60]" @click="showDeleteConfirm = false">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 border border-white/70" @click.stop>
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100/70 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus data ruang kelas ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="confirmDelete" 
              class="px-4 py-2 bg-red-600/70 hover:bg-red-700/90 backdrop-blur-xl text-white rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Ya, Hapus
            </button>
            <button 
              @click="showDeleteConfirm = false" 
              class="px-4 py-2 bg-gray-200/70 hover:bg-gray-300/90 backdrop-blur-xl text-gray-700 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Konfirmasi Edit -->
    <div v-if="showEditConfirm" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[60]" @click="showEditConfirm = false">
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 border border-white/70" @click.stop>
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-pencil-alt text-2xl text-blue-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Edit</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengedit data ruang kelas ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="confirmEdit" 
              class="px-4 py-2 bg-blue-600/70 hover:bg-blue-700/90 backdrop-blur-xl text-white rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Ya, Edit
            </button>
            <button 
              @click="showEditConfirm = false" 
              class="px-4 py-2 bg-gray-200/70 hover:bg-gray-300/90 backdrop-blur-xl text-gray-700 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen Popup -->
    <div v-if="isFullscreen" class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-8" @click="toggleFullscreen">
      <div class="bg-white rounded-2xl shadow-2xl border border-white/70 w-full max-w-6xl h-[85vh] flex flex-col p-6 relative" @click.stop>
        <div class="flex items-center justify-between mb-4 border-b pb-3">
          <div class="flex items-center">
            <i class="fas fa-th-list text-blue-600 text-2xl mr-3"></i>
            <h2 class="text-2xl font-bold text-blue-600">Daftar Ruang Kelas</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-blue-100/50 backdrop-blur-xl text-blue-700 px-4 py-1.5 rounded-md text-base font-medium flex items-center h-8">
              <i class="fas fa-door-open mr-2"></i>
              {{ sortedRuangKelasList.length }} Ruangan
            </div>
            <button
              @click="toggleFullscreen"
              class="w-8 h-8 flex items-center justify-center bg-gray-200/50 hover:bg-gray-300/70 backdrop-blur-xl rounded-full text-gray-700 transition-colors shadow-md hover:shadow-lg"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Search Bar for Fullscreen -->
        <div class="w-full mb-4">
          <div class="relative">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari ruang kelas..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-inner"
            />
          </div>
        </div>

                  <!-- Multi-column List -->
          <div class="flex-1 overflow-y-auto h-[500px] pr-2">
          <div v-if="sortedRuangKelasList.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
            <i class="fas fa-filter text-6xl mb-4 text-blue-300"></i>
            <p class="text-center text-xl font-medium mb-4">
              {{
                searchQuery
                  ? "Tidak ada ruangan yang sesuai dengan pencarian."
                  : "Belum ada ruangan yang diinputkan."
              }}
            </p>
            <button 
              v-if="searchQuery"
              @click="resetFilters" 
              class="px-4 py-2 bg-blue-100/50 backdrop-blur-xl text-blue-700 rounded-lg hover:bg-blue-200/50 flex items-center whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
            >
              <i class="fas fa-undo mr-2"></i> Reset filter
            </button>
          </div>
          <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            <li 
              v-for="(ruang, index) in sortedRuangKelasList" 
              :key="index" 
              class="bg-blue-50/40 backdrop-blur-xl p-4 rounded-xl border border-blue-100/50 hover:bg-indigo-50/40 hover:border-indigo-200/50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div class="flex flex-col h-full">
                <!-- Top section with title and buttons -->
                <div>
                  <div class="flex justify-between items-start">
                    <div class="w-4/5">
                      <h3 class="font-bold text-gray-800 text-lg">
                        {{ ruang.ruangan_kode }}
                      </h3>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex space-x-1">
                      <button
                        @click="editRuangKelas(sortedRuangKelasList.indexOf(ruang)); toggleFullscreen()"
                        class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                        title="Edit ruangan"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        @click="deleteRuangKelas(sortedRuangKelasList.indexOf(ruang))"
                        class="p-1.5 text-red-600 hover:text-white hover:bg-red-500/70 backdrop-blur-xl rounded-md transition-colors duration-300 shadow-sm"
                        title="Hapus ruangan"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Bottom section with capacity -->
                <div class="mt-auto pt-2">
                  <div class="flex items-center border-t pt-2">
                    <span class="px-3 py-1 bg-blue-100/50 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-md flex items-center shadow-sm">
                      <i class="fas fa-users mr-2"></i>
                      Kapasitas: {{ ruang.ruangan_kapasitas }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, onUnmounted } from 'vue';
import axios from 'axios';

// Get runtime config for API base URL
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

// Reactive Variables
const form = ref({
  kodeRuangan: '',
  kapasitasRuangan: '',
});

const ruangKelasList = ref([]);
const editIndex = ref(null);
const searchQuery = ref("");
const kapasitasFilter = ref("all");
const isFullscreen = ref(false);

// Add new refs for confirmation popups
const showDeleteConfirm = ref(false);
const showEditConfirm = ref(false);
const selectedIndex = ref(null);

// Add alert state
const showAlert = ref(false);
const alertMessage = ref('');
const showSuccess = ref(false);
const successMessage = ref('');

// Computed property for filtered ruang kelas list
const filteredRuangKelasList = computed(() => {
  let filtered = ruangKelasList.value;
  
  // Apply search filter
  if (searchQuery.value) {
  const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(ruang => 
    ruang.ruangan_kode.toLowerCase().includes(query) ||
    ruang.ruangan_kapasitas.toString().includes(query)
  );
  }
  
  // Apply kapasitas filter
  if (kapasitasFilter.value !== 'all') {
    filtered = filtered.filter(ruang => {
      const kapasitas = ruang.ruangan_kapasitas;
      switch(kapasitasFilter.value) {
        case 'small':
          return kapasitas < 30;
        case 'medium':
          return kapasitas >= 30 && kapasitas <= 60;
        case 'large':
          return kapasitas > 60;
        default:
          return true;
      }
    });
  }
  
  return filtered;
});

// Computed property for sorted ruang kelas list (newest first)
const sortedRuangKelasList = computed(() => {
  // Create a copy of the filtered list to avoid modifying the original
  const sorted = [...filteredRuangKelasList.value];
  
  // Sort by newest first (assuming there's a createdAt field)
  // If there's no createdAt field, we'll reverse the array to show "newest" first
  return sorted.reverse();
});

// Function to show success message
const showSuccessAlert = (message) => {
  successMessage.value = message;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000); // Hide after 3 seconds
};

// Fetch Ruang Kelas Data from API
const fetchRuangKelas = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${apiBaseUrl}/ruangan`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    ruangKelasList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data ruang kelas', error);
  }
};

// Submit Form (Add or Update)
const submitForm = async () => {
  form.value.kodeRuangan = form.value.kodeRuangan.trim();
  if (!form.value.kodeRuangan) {
    alertMessage.value = 'Kode ruangan tidak boleh kosong atau hanya spasi.';
    showAlert.value = true;
    return;
  }
  
  // For update, show confirmation first
  if (editIndex.value !== null) {
    showEditConfirm.value = true;
    return;
  }
  
  await submitData();
};

// Submit data after confirmation
const submitData = async () => {
  const newRuangKelas = {
    ruangan_kode: form.value.kodeRuangan,
    ruangan_kapasitas: form.value.kapasitasRuangan,
  };

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    if (editIndex.value !== null) {
      // Update Ruang Kelas
      const ruangKelasKode = ruangKelasList.value[editIndex.value].ruangan_kode;
      const response = await axios.put(`${apiBaseUrl}/ruangan/${ruangKelasKode}`, newRuangKelas, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update the local list without needing to refetch
      ruangKelasList.value[editIndex.value] = response.data.data;

      resetForm();
      editIndex.value = null;
      showSuccessAlert('Data ruang kelas berhasil diperbarui!');
    } else {
      // Add New Ruang Kelas
      const response = await axios.post(`${apiBaseUrl}/ruangan`, newRuangKelas, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Add the newly created room directly to the list
      ruangKelasList.value.push(response.data.data);

      resetForm();
      showSuccessAlert('Data ruang kelas berhasil ditambahkan!');
    }
  } catch (error) {
    console.error('Gagal mengirim data ruang kelas', error);
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
const editRuangKelas = (index) => {
  const ruang = sortedRuangKelasList.value[index];
  selectedIndex.value = ruangKelasList.value.findIndex(r => r.ruangan_kode === ruang.ruangan_kode);
  
  // Directly edit without confirmation
  const index2 = selectedIndex.value;
  const ruangKelas = ruangKelasList.value[index2];
  form.value.kodeRuangan = ruangKelas.ruangan_kode;
  form.value.kapasitasRuangan = ruangKelas.ruangan_kapasitas;
  editIndex.value = index2;
};

// Confirm edit function
const confirmEdit = () => {
  showEditConfirm.value = false;
  submitData();
};

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
};

// Update delete function to show confirmation
const deleteRuangKelas = (index) => {
  const ruang = sortedRuangKelasList.value[index];
  selectedIndex.value = ruangKelasList.value.findIndex(r => r.ruangan_kode === ruang.ruangan_kode);
  showDeleteConfirm.value = true;
};

// Confirm delete function
const confirmDelete = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const ruangKelas = ruangKelasList.value[selectedIndex.value];
    await axios.delete(`${apiBaseUrl}/ruangan/${ruangKelas.ruangan_kode}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    ruangKelasList.value.splice(selectedIndex.value, 1);
    showDeleteConfirm.value = false;
    showSuccessAlert('Data ruang kelas berhasil dihapus!');
  } catch (error) {
    console.error('Error deleting ruang kelas:', error);
    let msg = 'Gagal menghapus data ruang kelas: ';
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

// Reset Form after submit
const resetForm = () => {
  form.value = {
    kodeRuangan: '',
    kapasitasRuangan: '',
  };
};

// Function to reset filters
const resetFilters = () => {
  searchQuery.value = "";
  kapasitasFilter.value = "all";
};

// Toggle fullscreen
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

let pollingInterval = null;

onMounted(() => {
  fetchRuangKelas();
  pollingInterval = setInterval(fetchRuangKelas, 10000); // 10 detik
});

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval);
});
</script>
