<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Title -->
    <div class="mb-8 w-full flex justify-center">
      <div class="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300">
        <img src="/input-jadwalhindari.png" alt="Icon Jadwal" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Input Jadwal Dihindari
        </h1>
      </div>
    </div>

    <!-- Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Input Form -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Agenda -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Agenda Hindari</label>
            <input 
              v-model="form.hindari_agenda" 
              type="text" 
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
              placeholder="Masukkan agenda" 
              required 
            />
          </div>

          <!-- Hari Hindari -->
          <div>
            <label class="block text-gray-700 font-semibold mb-3">Hari Hindari</label>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <label v-for="hari in hariListRow1" :key="hari" class="relative">
                  <input 
                    type="radio" 
                    v-model="form.hindari_hari" 
                    :value="hari" 
                    class="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <div class="p-3 text-center rounded-xl border border-gray-200 cursor-pointer transition-all duration-300"
                       :class="{'bg-green-50 border-green-500 text-green-600': form.hindari_hari === hari,
                               'hover:bg-gray-50': form.hindari_hari !== hari}">
                    {{ hari }}
                  </div>
                </label>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <label v-for="hari in hariListRow2" :key="hari" class="relative">
                  <input 
                    type="radio" 
                    v-model="form.hindari_hari" 
                    :value="hari" 
                    class="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <div class="p-3 text-center rounded-xl border border-gray-200 cursor-pointer transition-all duration-300"
                       :class="{'bg-green-50 border-green-500 text-green-600': form.hindari_hari === hari,
                               'hover:bg-gray-50': form.hindari_hari !== hari}">
                    {{ hari }}
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Sesi Hindari -->
          <div>
            <label class="block text-gray-700 font-semibold mb-3">Sesi Hindari</label>
            <div class="flex gap-4">
              <label v-for="sesi in sesiList" :key="sesi" class="relative flex-1">
                <input 
                  type="radio" 
                  v-model="form.hindari_sesi" 
                  :value="sesi" 
                  class="absolute opacity-0 w-full h-full cursor-pointer"
                />
                <div class="p-3 text-center rounded-xl border border-gray-200 cursor-pointer transition-all duration-300"
                     :class="{'bg-green-50 border-green-500 text-green-600': form.hindari_sesi === sesi,
                             'hover:bg-gray-50': form.hindari_sesi !== sesi}">
                  {{ sesi }}
                </div>
              </label>
            </div>
          </div>

          <!-- Semester Grid -->
          <div>
            <label class="block text-gray-700 font-semibold mb-3">Berlaku untuk Semester</label>
            <div class="space-y-4">
              <label class="inline-flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="selectAllSemesters" 
                  @change="toggleSelectAll" 
                  class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-gray-700">Pilih Semua Semester</span>
              </label>
              <div class="grid grid-cols-2 gap-3">
                <label v-for="n in 8" :key="n" class="inline-flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="selectedSemesters" 
                    :value="n" 
                    class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-gray-700">Semester {{ n }}</span>
                </label>
              </div>
            </div>
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

      <!-- Daftar Jadwal Hindari -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <i class="fas fa-list-ul mr-2"></i> Daftar Jadwal Hindari
          </h2>
          
          <!-- Search Input -->
          <div class="relative flex-1 max-w-xs ml-4">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari jadwal hindari..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div 
          v-if="filteredJadwalHindariList.length === 0" 
          class="flex-1 flex flex-col items-center justify-center text-gray-500"
        >
          <i class="fas fa-calendar-times text-4xl mb-4"></i>
          <p class="text-center">
            {{ searchQuery ? 'Tidak ditemukan jadwal hindari yang sesuai.' : 'Belum ada jadwal hindari yang diinputkan.' }}
          </p>
        </div>

        <!-- Jadwal Hindari List -->
        <div v-else class="flex-1 overflow-y-auto pr-2">
          <ul class="space-y-4">
            <li 
              v-for="(jadwal, index) in filteredJadwalHindariList" 
              :key="index" 
              class="group bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-bold text-lg text-gray-800 mb-2">{{ jadwal.hindari_agenda }}</h3>
                  <div class="space-y-2">
                    <div class="flex items-center gap-3">
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
                        <i class="fas fa-calendar-day"></i>
                        {{ jadwal.hindari_hari }}
                      </span>
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium">
                        <i class="fas fa-clock"></i>
                        {{ jadwal.hindari_sesi }}
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="semester in jadwal.hindari_smt" 
                        :key="semester"
                        class="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium"
                      >
                        Semester {{ semester }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex space-x-3">
                  <button 
                    @click="editJadwalHindari(index)" 
                    class="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                    title="Edit"
                  >
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button 
                    @click="deleteJadwalHindari(index)" 
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

    <!-- Popup Konfirmasi Delete -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus data jadwal hindari ini?
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
            Apakah Anda yakin ingin mengedit data jadwal hindari ini?
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
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

// Form data
const form = ref({
  hindari_agenda: '',
  hindari_hari: '',
  hindari_sesi: '',
  hindari_smt: []
})

const hariListRow1 = ['SENIN', 'SELASA', 'RABU']
const hariListRow2 = ['KAMIS', 'JUMAT']
const sesiList = ['SESI 1', 'SESI 2', 'SESI 3'];

// Mapping for submission (SESI to SATU, DUA, TIGA)
const sesiMap = {
  'SESI 1': 'SATU',
  'SESI 2': 'DUA',
  'SESI 3': 'TIGA'
}

// Reverse mapping for form display (SATU to SESI 1)
const reverseSesiMap = {
  'SATU': 'SESI 1',
  'DUA': 'SESI 2',
  'TIGA': 'SESI 3'
}

const jadwalList = ref([])
const editIndex = ref(null)

const selectedSemesters = ref([])
const selectAllSemesters = ref(false)

const searchQuery = ref("");

// Add new refs for confirmation popups
const showDeleteConfirm = ref(false);
const showEditConfirm = ref(false);
const selectedIndex = ref(null);

// Computed property for filtered jadwal hindari list
const filteredJadwalHindariList = computed(() => {
  if (!searchQuery.value) return jadwalList.value;
  
  const query = searchQuery.value.toLowerCase();
  return jadwalList.value.filter(jadwal => 
    jadwal.hindari_agenda.toLowerCase().includes(query) ||
    jadwal.hindari_hari.toLowerCase().includes(query) ||
    jadwal.hindari_sesi.toLowerCase().includes(query) ||
    jadwal.hindari_smt.some(semester => semester.toString().includes(query))
  );
});

const toggleSelectAll = () => {
  if (selectAllSemesters.value) {
    selectedSemesters.value = Array.from({ length: 8 }, (_, i) => i + 1)
  } else {
    selectedSemesters.value = []
  }
}

const formatHari = (hari) => {
  return hari || '';
}

const formatSesi = (sesi) => {
  // Menampilkan nilai sesi langsung tanpa perubahan
  return sesi || '';
}


const fetchJadwal = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/jadwal_hindari', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    // Log the response to verify the data structure
    console.log('Jadwal Hindari Response:', response.data);
    
    // Update the jadwalList with the response data
    jadwalList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data jadwal hindari', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
};

const submitForm = async () => {
  const newJadwal = {
    hindari_agenda: form.value.hindari_agenda,
    hindari_hari: form.value.hindari_hari,
    hindari_sesi: sesiMap[form.value.hindari_sesi] || form.value.hindari_sesi,
    hindari_smt: [...selectedSemesters.value],
  };

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    let response;
    if (editIndex.value !== null) {
      const jadwalId = jadwalList.value[editIndex.value].id_hindari;
      response = await axios.patch(`http://10.15.41.68:3000/jadwal_hindari/${jadwalId}`, newJadwal, { headers });
      
      // Update the local list with the new data
      jadwalList.value[editIndex.value] = response.data.data;
    } else {
      response = await axios.post('http://10.15.41.68:3000/jadwal_hindari', newJadwal, { headers });
      
      // Add the new jadwal to the list
      jadwalList.value.push(response.data.data);
    }

    resetForm();
    editIndex.value = null;
  } catch (error) {
    console.error('Error in submitForm:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
};


const fetchJadwalList = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/jadwal_hindari', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log(response.data); // Log response to verify data
    jadwalList.value = response.data; // Ensure jadwalList is updated correctly
  } catch (error) {
    console.error('Gagal mengambil data jadwal hindari', error);
  }
};



const editJadwal = (index) => {
  const jadwal = jadwalList.value[index]
  form.value = {
    hindari_agenda: jadwal.hindari_agenda,
    hindari_hari: jadwal.hindari_hari,
    hindari_sesi: reverseSesiMap[jadwal.hindari_sesi] || jadwal.hindari_sesi,
    hindari_smt: [...jadwal.hindari_smt],
  }
  selectedSemesters.value = [...jadwal.hindari_smt]
  selectAllSemesters.value = jadwal.hindari_smt.length === 8
  editIndex.value = index
}

const cancelEdit = () => {
  resetForm()
  editIndex.value = null
}

const deleteJadwal = async (index) => {
  if (!confirm('Yakin ingin menghapus jadwal ini?')) return;
  
  const jadwalId = jadwalList.value[index].id_hindari;
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    await axios.delete(`http://10.15.41.68:3000/jadwal_hindari/${jadwalId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    // Remove the deleted jadwal from the list
    jadwalList.value.splice(index, 1);
  } catch (error) {
    console.error('Gagal menghapus data jadwal hindari', error);
  }
}

const resetForm = () => {
  form.value = { hindari_agenda: '', hindari_hari: '', hindari_sesi: '', hindari_smt: [] }
  selectedSemesters.value = []
  selectAllSemesters.value = false
}

// Update edit function to show confirmation
const editJadwalHindari = (index) => {
  selectedIndex.value = index;
  showEditConfirm.value = true;
};

// Confirm edit function
const confirmEdit = () => {
  const index = selectedIndex.value;
  const jadwalHindari = jadwalList.value[index];
  
  // Set form values
  form.value.hindari_agenda = jadwalHindari.hindari_agenda;
  form.value.hindari_hari = jadwalHindari.hindari_hari;
  
  // Convert sesi format (SATU -> SESI 1)
  form.value.hindari_sesi = reverseSesiMap[jadwalHindari.hindari_sesi] || jadwalHindari.hindari_sesi;
  
  // Set semester values
  form.value.hindari_smt = [...jadwalHindari.hindari_smt];
  selectedSemesters.value = [...jadwalHindari.hindari_smt];
  selectAllSemesters.value = jadwalHindari.hindari_smt.length === 8;
  
  // Set edit mode
  editIndex.value = index;
  showEditConfirm.value = false;
};

// Update delete function to show confirmation
const deleteJadwalHindari = (index) => {
  selectedIndex.value = index;
  showDeleteConfirm.value = true;
};

// Confirm delete function
const confirmDelete = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const jadwalHindari = jadwalList.value[selectedIndex.value];
    await axios.delete(`http://10.15.41.68:3000/jadwal_hindari/${jadwalHindari.id_hindari}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    jadwalList.value.splice(selectedIndex.value, 1);
    showDeleteConfirm.value = false;
  } catch (error) {
    console.error('Error deleting jadwal hindari:', error);
    alert('Gagal menghapus data jadwal hindari');
  }
};

onMounted(() => {
  fetchJadwal()
})
</script>
