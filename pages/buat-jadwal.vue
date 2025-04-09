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
          <select v-model="selectedMataKuliah" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Mata Kuliah</option>
            <option v-for="mk in mataKuliahList" :key="mk.kode" :value="mk">
              {{ mk.kode }} - {{ mk.nama }}
            </option>
          </select>
        </div>

        <!-- Dosen Dropdown -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Pilih Dosen</label>
          <select v-model="selectedDosen" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Dosen</option>
            <option v-for="dosen in dosenList" :key="dosen.dosen_kode" :value="dosen.dosen_kode">
              {{ dosen.dosen_nama }}
            </option>
          </select>
        </div>

        <!-- Button -->
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
          Submit
        </button>
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
              <p><strong>{{ match.mataKuliah.kode }}</strong> - {{ match.mataKuliah.nama }}</p>
              <p class="text-sm text-gray-600">
                <span class="font-bold">Dosen:</span> {{ match.dosen.map(d => d.dosen_nama).join(", ") }}
              </p>
            </div>
            <div class="flex space-x-2">
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

// Dummy Data
const mataKuliahList = ref([
  { kode: 'MK101', nama: 'Algoritma' },
  { kode: 'MK102', nama: 'Basis Data' }
])

const dosenList = ref([])  // List dosen yang di-fetch dari API
const selectedMataKuliah = ref(null)
const selectedDosen = ref(null)
const matchingList = ref([])  // Daftar matching yang sudah dipilih
const editIndex = ref(null)

// Fungsi untuk mengambil token dari localStorage
const getToken = () => {
  const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
  return token || null;
}

// Fungsi untuk mengambil data mata kuliah
const fetchMataKuliah = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('User is not authenticated');

    const response = await axios.get('http://10.15.41.68:3000/mk_dosen', {
      headers: { Authorization: `Bearer ${token}` }
    });

    mataKuliahList.value = response.data;
    console.log('Mata Kuliah List:', mataKuliahList.value);  // Debugging log
  } catch (error) {
    console.error('Error fetching mata kuliah:', error);
    alert('Failed to fetch Mata Kuliah data. Please check your authentication token.');
  }
}

// Fungsi untuk mengambil data dosen
const fetchDosen = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('User is not authenticated');

    const response = await axios.get('http://10.15.41.68:3000/dosen', {
      headers: { Authorization: `Bearer ${token}` }
    });

    dosenList.value = response.data;
    console.log('Dosen List:', dosenList.value);  // Debugging log
  } catch (error) {
    console.error('Error fetching dosen:', error);
    alert('Failed to fetch Dosen data. Please check your authentication token.');
  }
}

// Fetch data saat halaman dimuat
onMounted(() => {
  fetchMataKuliah();
  fetchDosen();
})

// Fungsi untuk menangani submit matching
const submitMatching = () => {
  if (!selectedMataKuliah.value || !selectedDosen.value) return

  const matchingData = {
    mataKuliah: selectedMataKuliah.value,
    dosen: selectedDosen.value
  }

  if (editIndex.value !== null) {
    matchingList.value[editIndex.value] = matchingData
    editIndex.value = null
  } else {
    matchingList.value.push(matchingData)
  }

  resetForm()
}

// Fungsi untuk mereset form
const resetForm = () => {
  selectedMataKuliah.value = null
  selectedDosen.value = null
}

// Fungsi untuk mengedit matching
const editMatching = (index) => {
  const match = matchingList.value[index]
  selectedMataKuliah.value = match.mataKuliah
  selectedDosen.value = match.dosen
  editIndex.value = index
}

// Fungsi untuk menghapus matching
const deleteMatching = (index) => {
  matchingList.value.splice(index, 1)
}
</script>
