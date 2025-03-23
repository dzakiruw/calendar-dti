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

        <!-- Dosen Dropdown Multiple -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Pilih Dosen</label>
          <div class="relative">
            <button @click.prevent="toggleDropdown" class="w-full mt-2 p-2 border rounded-lg bg-white text-left">
              {{ selectedDosen.length ? selectedDosen.map(d => d.nama).join(", ") : "Pilih Dosen" }}
            </button>
            <div v-if="dropdownOpen" class="absolute w-full mt-1 bg-white border rounded-lg shadow-md z-10 p-2 max-h-48 overflow-y-auto">
              <label v-for="dosen in dosenList" :key="dosen.id" class="block px-2 py-1 hover:bg-gray-100 rounded">
                <input type="checkbox" v-model="selectedDosen" :value="dosen" class="mr-2" />
                {{ dosen.nama }}
              </label>
            </div>
          </div>
        </div>

        <!-- Button -->
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
          {{ editIndex !== null ? 'Update' : 'Submit' }}
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
                <span class="font-bold">Dosen:</span> {{ match.dosen.map(d => d.nama).join(", ") }}
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
import { ref } from 'vue'

// Dummy Data
const mataKuliahList = ref([
  { kode: 'MK101', nama: 'Algoritma' },
  { kode: 'MK102', nama: 'Basis Data' }
])

const dosenList = ref([
  { id: 1, nama: 'Dr. A' },
  { id: 2, nama: 'Prof. B' },
  { id: 3, nama: 'Dr. C' }
])

// States
const selectedMataKuliah = ref(null)
const selectedDosen = ref([])
const dropdownOpen = ref(false)
const matchingList = ref([])
const editIndex = ref(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const submitMatching = () => {
  if (!selectedMataKuliah.value || selectedDosen.value.length === 0) return

  const data = {
    mataKuliah: selectedMataKuliah.value,
    dosen: [...selectedDosen.value]
  }

  if (editIndex.value !== null) {
    matchingList.value[editIndex.value] = data
    editIndex.value = null
  } else {
    matchingList.value.push(data)
  }

  resetForm()
}

const editMatching = (index) => {
  selectedMataKuliah.value = matchingList.value[index].mataKuliah
  selectedDosen.value = [...matchingList.value[index].dosen]
  editIndex.value = index
}

const deleteMatching = (index) => {
  matchingList.value.splice(index, 1)
}

const resetForm = () => {
  selectedMataKuliah.value = null
  selectedDosen.value = []
  dropdownOpen.value = false
}
</script>
