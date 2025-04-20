<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
    <!-- Title -->
    <div class="mb-8 w-full flex justify-center">
      <div class="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300">
        <img src="/matching-dosenmatkul.png" alt="Icon Matching" class="w-16 h-16 object-contain" />
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Matching Dosen & Mata Kuliah
        </h1>
      </div>
    </div>

    <!-- Layout Form + List -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Form -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
        <form @submit.prevent="submitMatching" class="space-y-6">
          <!-- Mata Kuliah -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Pilih Mata Kuliah</label>
            <select 
              v-model="selectedMataKuliah" 
              @change="updateKelas" 
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            >
              <option disabled value="">Pilih Mata Kuliah</option>
              <option v-for="mk in mataKuliahList" :key="mk.matkul_kode" :value="mk">
                {{ mk.matkul_kode }} - {{ mk.matkul_nama }}
              </option>
            </select>
          </div>

          <!-- Mata Kuliah Type -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Jenis Mata Kuliah</label>
            <select 
              v-model="selectedMataKuliahType" 
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            >
              <option disabled value="">Pilih Jenis Mata Kuliah</option>
              <option value="DEPARTEMEN">Departemen</option>
              <option value="PENGAYAAN">Pengayaan</option>
            </select>
          </div>

          <!-- Mata Kuliah Kelas -->
          <div v-if="selectedMataKuliah">
            <label class="block text-gray-700 font-semibold mb-2">Pilih Kelas</label>
            <select 
              v-model="selectedKelas" 
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            >
              <option disabled value="">Pilih Kelas</option>
              <option v-for="kelas in selectedMataKuliah.mata_kuliah_kelas" :key="kelas.id_mk_kelas" :value="kelas">
                {{ kelas.nama_kelas }}
              </option>
            </select>
          </div>

          <!-- Dosen Dropdown -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Pilih Dosen</label>
            <select 
              v-model="selectedDosen" 
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            >
              <option disabled value="">Pilih Dosen</option>
              <option v-for="dosen in dosenList" :key="dosen.dosen_kode" :value="dosen">
                {{ dosen.dosen_kode }} - {{ dosen.dosen_nama }}
              </option>
            </select>
          </div>

          <!-- Semester Checkbox -->
          <div>
            <label class="block text-gray-700 font-semibold mb-3">Pilih Semester</label>
            <div class="grid grid-cols-2 gap-3">
              <label v-for="semester in 8" :key="semester" class="inline-flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  :value="semester" 
                  v-model="selectedSemesters" 
                  class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-gray-700">Semester {{ semester }}</span>
              </label>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-4">
            <button 
              type="submit" 
              class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl
                     hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Submitting...' : 'Submit' }}
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

      <!-- Daftar Matching -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <i class="fas fa-list-ul mr-2"></i> Daftar Matching
          </h2>
          
          <!-- Search Input -->
          <div class="relative flex-1 max-w-xs ml-4">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari matching..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div 
          v-if="filteredMatchingList.length === 0" 
          class="h-[460px] flex flex-col items-center justify-center text-gray-500"
        >
          <i class="fas fa-calendar-times text-4xl mb-4"></i>
          <p class="text-center">
            {{ searchQuery ? 'Tidak ditemukan matching yang sesuai.' : 'Belum ada matching yang diinputkan.' }}
          </p>
        </div>

        <!-- Matching List -->
        <div v-else class="h-[460px] overflow-y-auto">
          <div class="space-y-4 pr-2">
            <div v-for="(classes, dosenName) in groupedMatchingList" :key="dosenName" class="mb-4 last:mb-0">
              <h3 class="text-lg font-semibold mb-2 text-gray-700 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10">
                {{ dosenName }}:
              </h3>
              <ul class="space-y-3">
                <li 
                  v-for="(matching, index) in classes" 
                  :key="index" 
                  class="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                >
                  <div class="flex justify-between items-start">
                    <div class="space-y-2">
                      <p class="text-sm">
                        <span class="font-semibold text-gray-700">Kelas:</span>
                        <span class="text-gray-600">{{ matching.mata_kuliah_kelas.nama_kelas }}</span>
                      </p>
                      <p class="text-sm">
                        <span class="font-semibold text-gray-700">Kode MK:</span>
                        <span class="text-gray-600">{{ matching.mata_kuliah_kelas.matkul_kode }}</span>
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <span 
                          v-for="semester in matching.mk_kelas_sem" 
                          :key="semester"
                          class="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium"
                        >
                          Semester {{ semester }}
                        </span>
                      </div>
                      <span class="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium">
                        {{ matching.matkul_tipe }}
                      </span>
                    </div>
                    <div class="flex space-x-3">
                      <button 
                        @click="editMatching(matchingList.value.indexOf(matching))" 
                        class="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                        title="Edit"
                      >
                        <i class="fas fa-pencil-alt"></i>
                      </button>
                      <button 
                        @click="deleteMatching(matchingList.value.indexOf(matching))" 
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const mataKuliahList = ref([])  
const dosenList = ref([])  
const matchingList = ref([])  
const selectedMataKuliah = ref(null)
const selectedMataKuliahType = ref("")
const selectedKelas = ref(null)
const selectedSemesters = ref([])
const selectedDosen = ref(null)
const editIndex = ref(null)
const isSubmitting = ref(false)
const searchQuery = ref("")

// Fetch Data Mata Kuliah
const fetchMataKuliah = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/mata_kuliah', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    mataKuliahList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data mata kuliah', error);
  }
}

// Fetch Data Dosen
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
    dosenList.value = response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data dosen', error);
    dosenList.value = [];
  }
}

// Fetch Matching Data
const fetchMatchingData = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('http://10.15.41.68:3000/mk_dosen', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    // Log the response to verify the data structure
    console.log('Matching Data Response:', response.data);
    
    // Update the matchingList with the response data
    matchingList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data matching', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
}

// Helper to get dosen name from dosen_kode
const getDosenName = (dosenKode) => {
  if (!Array.isArray(dosenList.value)) return 'Unknown';
  const dosen = dosenList.value.find(d => d.dosen_kode === dosenKode);
  return dosen ? dosen.dosen_nama : 'Unknown';
}

// Format semesters for display
const formatSemesters = (semesters) => {
  if (!semesters || !Array.isArray(semesters)) return '';
  return semesters.sort((a, b) => a - b).join(', ');
}

onMounted(() => {
  fetchMataKuliah();
  fetchDosen();
  fetchMatchingData();
})

const resetForm = () => {
  selectedMataKuliah.value = null
  selectedMataKuliahType.value = ""
  selectedKelas.value = null
  selectedDosen.value = null
  selectedSemesters.value = []
}

// Update Kelas when Mata Kuliah changes
const updateKelas = () => {
  selectedKelas.value = null;
}

// Edit matching data
const editMatching = (index) => {
  const match = matchingList.value[index];
  
  // Find the mata kuliah based on kelas name
  const matkul = mataKuliahList.value.find(mk => 
    mk.mata_kuliah_kelas && mk.mata_kuliah_kelas.some(kelas => kelas.nama_kelas === match.nama_kelas)
  );
  
  if (matkul) {
    selectedMataKuliah.value = matkul;
    // Find the specific kelas within this matkul
    selectedKelas.value = matkul.mata_kuliah_kelas.find(kelas => kelas.nama_kelas === match.nama_kelas);
  }
  
  // Find the dosen
  selectedDosen.value = dosenList.value.find(dosen => dosen.dosen_kode === match.dosen_kode);
  
  // Set selected semesters
  selectedSemesters.value = [...match.mk_kelas_sem];
  
  // Set mata kuliah type
  selectedMataKuliahType.value = match.matkul_tipe;
  
  editIndex.value = index;
};

// Submit Matching or Update if Edit Mode is Active
const submitMatching = async () => {
  if (!selectedMataKuliah.value || !selectedDosen.value || !selectedKelas.value) {
    console.error("Form is incomplete, cannot submit.");
    return;
  }

  const postData = {
    nama_kelas: selectedKelas.value.nama_kelas,
    dosen_kode: selectedDosen.value.dosen_kode,
    mk_kelas_sem: selectedSemesters.value,
    matkul_tipe: selectedMataKuliahType.value
  };

  try {
    isSubmitting.value = true;

    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    if (editIndex.value !== null) {
      // Update the existing data
      const match = matchingList.value[editIndex.value];
      
      const response = await axios.patch(`http://10.15.41.68:3000/mk_dosen/${match.id}`, postData, { headers });

      if (response.status === 200) {
        // Update the local list with the new data
        matchingList.value[editIndex.value] = response.data.data;
      } else {
        console.error("Update failed:", response);
      }
    } else {
      // Create new data
      const response = await axios.post('http://10.15.41.68:3000/mk_dosen', postData, { headers });

      if (response.status === 200 || response.status === 201) {
        // Add the new matching to the list
        matchingList.value.push(response.data.data);
      } else {
        console.error("Create failed:", response);
      }
    }

    resetForm();
    editIndex.value = null;
  } catch (error) {
    console.error('Error submitting matching:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  } finally {
    isSubmitting.value = false;
  }
};

// Delete matching data
const deleteMatching = async (index) => {
  if (!confirm('Yakin ingin menghapus matching ini?')) return;
  
  const match = matchingList.value[index];

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) throw new Error('User is not authenticated');

    await axios.delete(`http://10.15.41.68:3000/mk_dosen/${match.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    // Remove the deleted matching from the list
    matchingList.value.splice(index, 1);
  } catch (error) {
    console.error('Error deleting matching:', error);
  }
}

const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
}

// Computed property for filtered matching list
const filteredMatchingList = computed(() => {
  if (!searchQuery.value) return matchingList.value;
  
  const query = searchQuery.value.toLowerCase();
  return matchingList.value.filter(matching => 
    matching.mata_kuliah_kelas.nama_kelas.toLowerCase().includes(query) ||
    matching.mata_kuliah_kelas.matkul_kode.toLowerCase().includes(query) ||
    matching.dosen.dosen_nama.toLowerCase().includes(query) ||
    matching.mk_kelas_sem.join(', ').toLowerCase().includes(query) ||
    matching.matkul_tipe.toLowerCase().includes(query)
  );
});

// Computed property to group matchings by lecturer
const groupedMatchingList = computed(() => {
  const groups = {};
  
  filteredMatchingList.value.forEach(matching => {
    const dosenName = matching.dosen.dosen_nama;
    if (!groups[dosenName]) {
      groups[dosenName] = [];
    }
    groups[dosenName].push(matching);
  });
  
  return groups;
});
</script>