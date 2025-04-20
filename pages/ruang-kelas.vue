<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
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
          <div v-else class="overflow-y-auto pr-2" style="height: 400px;">
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
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import axios from 'axios';

// Reactive Variables
const form = ref({
  kodeRuangan: '',
  kapasitasRuangan: '',
});

const ruangKelasList = ref([]);
const editIndex = ref(null);
const searchQuery = ref("");

// Computed property for filtered ruang kelas list
const filteredRuangKelasList = computed(() => {
  if (!searchQuery.value) return ruangKelasList.value;
  
  const query = searchQuery.value.toLowerCase();
  return ruangKelasList.value.filter(ruang => 
    ruang.ruangan_kode.toLowerCase().includes(query) ||
    ruang.ruangan_kapasitas.toString().includes(query)
  );
});

// Fetch Ruang Kelas Data from API
const fetchRuangKelas = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/ruangan', {
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
      const response = await axios.put(`http://10.15.41.68:3000/ruangan/${ruangKelasKode}`, newRuangKelas, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update the local list without needing to refetch
      ruangKelasList.value[editIndex.value] = response.data.data;

      resetForm();
      editIndex.value = null;
    } else {
      // Add New Ruang Kelas
      const response = await axios.post('http://10.15.41.68:3000/ruangan', newRuangKelas, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Add the newly created room directly to the list
      ruangKelasList.value.push(response.data.data);

      resetForm();
    }
  } catch (error) {
    console.error('Gagal mengirim data ruang kelas', error);
  }
};

// Edit Ruang Kelas
const editRuangKelas = async (index) => {
  const ruangKelas = ruangKelasList.value[index];

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`http://10.15.41.68:3000/ruangan/${ruangKelas.ruangan_kode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Wait for the DOM to update
    nextTick(() => {
      // Explicitly set the values to ensure the form is reactive
      form.value.kodeRuangan = response.data.ruangan_kode;
      form.value.kapasitasRuangan = response.data.ruangan_kapasitas;
      
      // Ensure form is updated and check the value
      console.log('Updated Form Value:', form.value);
      editIndex.value = index;
    });
  } catch (error) {
    console.error('Gagal mengambil data ruang kelas untuk edit', error);
  }
};

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
};

// Delete Ruang Kelas
const deleteRuangKelas = async (index) => {
  const ruangKelasKode = ruangKelasList.value[index].ruangan_kode;
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await axios.delete(`http://10.15.41.68:3000/ruangan/${ruangKelasKode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Remove the deleted room directly from the local list
    ruangKelasList.value.splice(index, 1);
  } catch (error) {
    console.error('Gagal menghapus data ruang kelas', error);
  }
};

// Reset Form after submit
const resetForm = () => {
  form.value = {
    kodeRuangan: '',
    kapasitasRuangan: '',
  };
};

// Fetch ruang kelas data when component is mounted
onMounted(() => {
  fetchRuangKelas();
});
</script>
