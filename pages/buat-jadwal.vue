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

        <!-- Button -->
        <div class="flex space-x-4">
          <button 
            type="submit" 
            class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
            Submit
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

      <!-- Matching List -->
      <div class="flex-1 bg-white p-6 shadow-md rounded-lg w-full sm:w-96">
        <h2 class="text-xl font-bold mb-4">
          <i class="fas fa-list-ul mr-2"></i> Daftar Matching
        </h2>

        <div v-if="matchingList.length === 0" class="text-gray-500">
          Belum ada data matching.
        </div>

        <ul v-else class="space-y-4">
          <li v-for="(match, index) in matchingList" :key="index" class="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p><strong>{{ match.kelas.nama_kelas }}</strong></p>
              <p class="text-sm text-gray-600">
                <span class="font-bold">Dosen:</span> {{ match.dosen.dosen_kode }} - {{ match.dosen.dosen_nama }}
              </p>
            </div>
            <div class="flex space-x-4">
              <button @click="editMatching(index)" class="text-gray-600 hover:text-gray-900">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteMatching(index)" class="text-red-600 hover:text-red-900">
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
import { ref, onMounted } from 'vue'
import axios from 'axios'

const mataKuliahList = ref([])  // List mata kuliah yang akan di-fetch dari API
const dosenList = ref([])  // List dosen yang di-fetch dari API
const matchingList = ref([])  // Daftar matching yang sudah dipilih
const selectedMataKuliah = ref(null)
const selectedKelas = ref(null)
const selectedDosen = ref(null)
const editIndex = ref(null)  // Track the index of the item being edited

// Fetch Data Mata Kuliah
const fetchMataKuliah = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) throw new Error('User is not authenticated');

    const response = await axios.get('http://10.15.41.68:3000/mata_kuliah', {
      headers: { Authorization: `Bearer ${token}` }
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
    if (!token) throw new Error('User is not authenticated');

    const response = await axios.get('http://10.15.41.68:3000/dosen', {
      headers: { Authorization: `Bearer ${token}` }
    });

    dosenList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data dosen', error);
  }
}

// Fetch Matching Data
const fetchMatchingData = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) throw new Error('User is not authenticated');

    const response = await axios.get('http://10.15.41.68:3000/mk_dosen', {
      headers: { Authorization: `Bearer ${token}` }
    });

    matchingList.value = response.data.map((match) => ({
      id_mk_kelas_dosen: match.id_mk_kelas_dosen,
      kelas: match.mata_kuliah_kelas,
      dosen: match.dosen
    }));
  } catch (error) {
    console.error('Gagal mengambil data matching', error);
  }
}

onMounted(() => {
  fetchMataKuliah();
  fetchDosen();
  fetchMatchingData();
})

const resetForm = () => {
  selectedMataKuliah.value = null
  selectedKelas.value = null
  selectedDosen.value = null
}

// Update Kelas when Mata Kuliah changes
const updateKelas = () => {
  // Reset selectedKelas to null when Mata Kuliah is changed
  selectedKelas.value = null;
}

// Submit Matching or Update if Edit Mode is Active
const submitMatching = async () => {
  if (!selectedMataKuliah.value || !selectedDosen.value || !selectedKelas.value) {
    console.error("Form is incomplete, cannot submit.");
    return;
  }

  const postData = {
    id_mk_kelas: selectedKelas.value.id_mk_kelas,  // Ensure the class ID is included
    nama_kelas: selectedKelas.value.nama_kelas,
    dosen_kode: selectedDosen.value.dosen_kode
  };

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) throw new Error('User is not authenticated');

    // Log data to verify what is being sent
    console.log("Submitting matching data:", postData);

    if (editIndex.value !== null) {
      // Update existing matching using PUT method
      const match = matchingList.value[editIndex.value];
      const updatedData = { ...postData };

      console.log("Updating matching with ID:", match.id_mk_kelas_dosen);
      console.log("Updated data:", updatedData);

      const response = await axios.put(`http://10.15.41.68:3000/mk_dosen/${match.id_mk_kelas_dosen}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        // After updating, fetch the latest data again
        console.log("Update successful:", response.data);

        // Fetch updated matching data from the backend
        await fetchMatchingData(); // This will update `matchingList` with the latest data
      } else {
        console.error("Update failed:", response);
      }
    } else {
      // Create new matching using POST method
      const response = await axios.post('http://10.15.41.68:3000/mk_dosen', postData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        // After creating, fetch the latest data again
        console.log("Create successful:", response.data);

        // Fetch updated matching data from the backend
        await fetchMatchingData(); // This will update `matchingList` with the latest data
      } else {
        console.error("Create failed:", response);
      }
    }

    resetForm();
    editIndex.value = null;
  } catch (error) {
    console.error('Error submitting matching:', error);
  }
};

const editMatching = (index) => {
  const match = matchingList.value[index];
  selectedMataKuliah.value = mataKuliahList.value.find(mk => mk.matkul_kode === match.kelas.matkul_kode);
  selectedKelas.value = match.kelas;  // Set the correct class when editing
  selectedDosen.value = dosenList.value.find(dosen => dosen.dosen_kode === match.dosen.dosen_kode);
  editIndex.value = index;
};

const deleteMatching = async (index) => {
  const match = matchingList.value[index];
  
  if (!match.id_mk_kelas_dosen) {
    console.error('Error: id_mk_kelas_dosen is missing');
    return;
  }

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) throw new Error('User is not authenticated');

    await axios.delete(`http://10.15.41.68:3000/mk_dosen/${match.id_mk_kelas_dosen}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    matchingList.value.splice(index, 1);
  } catch (error) {
    console.error('Error deleting matching:', error);
  }
}

const cancelEdit = () => {
  resetForm();
  editIndex.value = null;
}
</script>
