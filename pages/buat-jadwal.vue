<template>
  <div class="h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
    <!-- Title with Icon -->
    <div class="mb-6 w-full sm:w-auto">
      <h1 class="text-3xl font-bold flex items-center">
        <img src="/matching-dosenmatkul.png" alt="Icon Matching" class="inline-block w-16 h-16 mr-2" />
        Matching Dosen & Mata Kuliah
      </h1>
    </div>

    <!-- Layout Form + List -->
    <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-6">
      <!-- Form -->
      <form @submit.prevent="submitMatching" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96 mb-6 sm:mb-0">
        <!-- Mata Kuliah -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Pilih Mata Kuliah</label>
          <select v-model="selectedMataKuliah" @change="updateKelas" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Mata Kuliah</option>
            <option v-for="mk in mataKuliahList" :key="mk.matkul_kode" :value="mk">
              {{ mk.matkul_kode }} - {{ mk.matkul_nama }}
            </option>
          </select>
        </div>

        <!-- Mata Kuliah Type -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Jenis Mata Kuliah</label>
          <select v-model="selectedMataKuliahType" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Jenis Mata Kuliah</option>
            <option value="DEPARTEMEN">Departemen</option>
            <option value="PENGAYAAN">Pengayaan</option>
          </select>
        </div>

        <!-- Mata Kuliah Kelas -->
        <div class="mb-4" v-if="selectedMataKuliah">
          <label class="block text-gray-700 font-semibold">Pilih Kelas</label>
          <select v-model="selectedKelas" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Kelas</option>
            <option v-for="kelas in selectedMataKuliah.mata_kuliah_kelas" :key="kelas.id_mk_kelas" :value="kelas">
              {{ kelas.nama_kelas }}
            </option>
          </select>
        </div>

        <!-- Dosen Dropdown -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Pilih Dosen</label>
          <select v-model="selectedDosen" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Dosen</option>
            <option v-for="dosen in dosenList" :key="dosen.dosen_kode" :value="dosen">
              {{ dosen.dosen_kode }} - {{ dosen.dosen_nama }}
            </option>
          </select>
        </div>

        <!-- Semester Checkbox -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Pilih Semester</label>
          <div class="grid grid-cols-2 gap-2">
            <label v-for="semester in 8" :key="semester" class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                :value="semester" 
                v-model="selectedSemesters" 
                class="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>Semester {{ semester }}</span>
            </label>
          </div>
        </div>

        <!-- Button -->
        <div class="flex space-x-4">
          <button 
            type="submit" 
            class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
            :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
          </button>

          <!-- Cancel Button (Only shows in Edit Mode) -->
          <button 
            type="button" 
            @click="cancelEdit" 
            v-if="editIndex !== null" 
            class="bg-gray-600 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-700">
            Cancel Edit
          </button>
        </div>
      </form>

      <!-- Daftar Matching -->
      <div class="flex-1 w-full sm:w-96 bg-white p-6 shadow-md rounded-lg mt-6 sm:mt-0">
        <h2 class="text-xl font-bold mb-4">
          <i class="fas fa-list-ul mr-2"></i> Daftar Matching
        </h2>

        <!-- Search Bar -->
        <div class="mb-4">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              class="w-full p-2 pl-10 border rounded-lg"
              placeholder="Cari matching..."
            />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredMatchingList.length === 0" class="text-gray-500">
          {{ searchQuery ? 'Tidak ditemukan matching yang sesuai.' : 'Belum ada matching yang diinputkan.' }}
        </div>

        <!-- Matching List -->
        <div v-else class="overflow-y-auto max-h-[calc(100vh-300px)] pr-2">
          <div v-for="(classes, dosenName) in groupedMatchingList" :key="dosenName" class="mb-6">
            <h3 class="text-lg font-semibold mb-2">{{ dosenName }}:</h3>
            <ul class="space-y-4">
              <li v-for="(matching, index) in classes" :key="index" class="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p class="text-sm text-gray-600">
                    <span class="font-bold">Kelas:</span> {{ matching.mata_kuliah_kelas.nama_kelas }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <span class="font-bold">Kode MK:</span> {{ matching.mata_kuliah_kelas.matkul_kode }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <span class="font-bold">Semester:</span> {{ matching.mk_kelas_sem.join(', ') }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <span class="font-bold">Tipe:</span> {{ matching.matkul_tipe }}
                  </p>
                </div>
                <div class="flex space-x-4">
                  <button @click="editMatching(matchingList.value.indexOf(matching))" class="text-gray-600 hover:text-gray-900">
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button @click="deleteMatching(matchingList.value.indexOf(matching))" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash-alt"></i>
                  </button>
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