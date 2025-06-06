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
        <img src="/input-kelas.png" alt="Classroom Icon" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Input Ruang Kelas
        </h1>
      </div>
    </div>

    <!-- Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Input Form -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Kode Ruangan</label>
            <div v-if="editIndex !== null">
              <p class="text-lg font-bold text-blue-600">{{ form.kodeRuangan }}</p>
            </div>
            <div v-else>
              <input
                v-model="form.kodeRuangan"
                type="text"
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Masukkan kapasitas ruangan"
              required
            />
          </div>

          <!-- Submit and Cancel Buttons -->
          <div class="flex gap-4">
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

      <!-- Daftar Ruang Kelas -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <i class="fas fa-list-ul mr-2"></i> Daftar Ruang Kelas
            </h2>
            
            <!-- Search Input -->
            <div class="relative flex-1 max-w-xs ml-4">
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Cari ruang kelas..."
                class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <!-- Empty State -->
          <div 
            v-if="filteredRuangKelasList.length === 0" 
            class="flex-1 flex flex-col items-center justify-center text-gray-500"
          >
            <i class="fas fa-door-closed text-4xl mb-4"></i>
            <p class="text-center">
              {{ searchQuery ? 'Tidak ditemukan ruang kelas yang sesuai.' : 'Belum ada ruang kelas yang diinputkan.' }}
            </p>
          </div>

          <!-- Ruang Kelas List -->
          <div v-else class="overflow-y-auto pr-2" style="height: 250px;">
            <ul class="space-y-4">
              <li 
                v-for="(ruang, index) in filteredRuangKelasList" 
                :key="index" 
                class="group bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-bold text-lg text-gray-800 mb-2">{{ ruang.ruangan_kode }}</h3>
                    <div class="flex items-center gap-3">
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
                        <i class="fas fa-users"></i>
                        Kapasitas: {{ ruang.ruangan_kapasitas }}
                      </span>
                    </div>
                  </div>
                  <div class="flex space-x-3">
                    <button 
                      @click="editRuangKelas(index)" 
                      class="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                      title="Edit"
                    >
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button 
                      @click="deleteRuangKelas(index)" 
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
            Apakah Anda yakin ingin menghapus data ruang kelas ini?
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
            Apakah Anda yakin ingin mengedit data ruang kelas ini?
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
import { ref, onMounted, nextTick, computed, onUnmounted } from 'vue';
import axios from 'axios';

// Reactive Variables
const form = ref({
  kodeRuangan: '',
  kapasitasRuangan: '',
});

const ruangKelasList = ref([]);
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

// Computed property for filtered ruang kelas list
const filteredRuangKelasList = computed(() => {
  if (!searchQuery.value) return ruangKelasList.value;
  
  const query = searchQuery.value.toLowerCase();
  return ruangKelasList.value.filter(ruang => 
    ruang.ruangan_kode.toLowerCase().includes(query) ||
    ruang.ruangan_kapasitas.toString().includes(query)
  );
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

    const response = await axios.get('http://10.4.90.25:3000/ruangan', {
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
      const response = await axios.put(`http://10.4.90.25:3000/ruangan/${ruangKelasKode}`, newRuangKelas, {
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
      const response = await axios.post('http://10.4.90.25:3000/ruangan', newRuangKelas, {
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
  const ruang = filteredRuangKelasList.value[index];
  selectedIndex.value = ruangKelasList.value.findIndex(r => r.ruangan_kode === ruang.ruangan_kode);
  showEditConfirm.value = true;
};

// Confirm edit function
const confirmEdit = () => {
  const index = selectedIndex.value;
  const ruangKelas = ruangKelasList.value[index];
  form.value.kodeRuangan = ruangKelas.ruangan_kode;
  form.value.kapasitasRuangan = ruangKelas.ruangan_kapasitas;
  editIndex.value = index;
  showEditConfirm.value = false;
};

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
};

// Update delete function to show confirmation
const deleteRuangKelas = (index) => {
  const ruang = filteredRuangKelasList.value[index];
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
    await axios.delete(`http://10.4.90.25:3000/ruangan/${ruangKelas.ruangan_kode}`, {
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

let pollingInterval = null;

onMounted(() => {
  fetchRuangKelas();
  pollingInterval = setInterval(fetchRuangKelas, 10000); // 10 detik
});

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval);
});
</script>
