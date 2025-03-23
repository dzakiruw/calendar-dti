<template>
  <div class="h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
    <!-- Title with Icon -->
    <div class="mb-6 w-full sm:w-auto">
      <h1 class="text-3xl font-bold flex items-center">
        <img src="/input-jadwalhindari.png" alt="Icon Jadwal" class="inline-block w-16 h-16 mr-2" />
        Input Jadwal Dihindari
      </h1>
    </div>

    <!-- Layout -->
    <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-6">
      <!-- Form -->
      <form @submit.prevent="submitForm" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96 mb-6 sm:mb-0">
        <!-- Agenda -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Agenda Hindari</label>
          <input v-model="form.agenda" type="text" class="w-full mt-2 p-2 border rounded-lg" placeholder="Masukkan agenda" required />
        </div>

        <!-- Hari Hindari (Multiple) -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Hari Hindari</label>
          <div class="flex flex-wrap gap-2 mt-2">
            <label v-for="hari in hariList" :key="hari">
              <input type="checkbox" v-model="form.hari" :value="hari" class="mr-2" /> {{ hari }}
            </label>
          </div>
        </div>

        <!-- Sesi Hindari (Multiple) -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Sesi Hindari</label>
          <div class="flex gap-4 mt-2">
            <label v-for="sesi in sesiList" :key="sesi">
              <input type="checkbox" v-model="form.sesi" :value="sesi" class="mr-2" /> {{ sesi }}
            </label>
          </div>
        </div>

        <!-- Semester Grid -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Berlaku untuk Semester</label>
          <div class="mb-2">
            <label>
              <input type="checkbox" v-model="selectAllSemesters" @change="toggleSelectAll" class="mr-2" />
              Pilih Semua Semester
            </label>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <label v-for="n in 8" :key="n">
              <input type="checkbox" v-model="selectedSemesters" :value="`Semester ${n}`" class="mr-2" />
              Semester {{ n }}
            </label>
          </div>
        </div>

        <!-- Button -->
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
          {{ editIndex !== null ? 'Update' : 'Submit' }}
        </button>
      </form>

      <!-- List -->
      <div class="flex-1 bg-white p-6 shadow-md rounded-lg w-full sm:w-96">
        <h2 class="text-xl font-bold mb-4">
          <i class="fas fa-list-ul mr-2"></i> Daftar Jadwal Dihindari
        </h2>

        <div v-if="jadwalList.length === 0" class="text-gray-500">
          Belum ada jadwal yang dihindari.
        </div>

        <ul v-else class="space-y-4">
          <li v-for="(jadwal, index) in jadwalList" :key="index" class="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p class="font-semibold">{{ jadwal.agenda }}</p>
              <p class="text-sm text-gray-600"><span class="font-bold">Hari:</span> {{ jadwal.hari.join(', ') }}</p>
              <p class="text-sm text-gray-600"><span class="font-bold">Sesi:</span> {{ jadwal.sesi.join(', ') }}</p>
              <p class="text-sm text-gray-600"><span class="font-bold">Semester:</span> {{ jadwal.semesters.join(', ') }}</p>
            </div>
            <div class="flex space-x-4">
              <button @click="editJadwal(index)" class="text-gray-600 hover:text-gray-900">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteJadwal(index)" class="text-red-600 hover:text-red-900">
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

// Data form
const form = ref({
  agenda: '',
  hari: [],
  sesi: [],
  semesters: []
})

// Dropdowns
const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
const sesiList = ['Sesi 1', 'Sesi 2', 'Sesi 3']

// List
const jadwalList = ref([])
const editIndex = ref(null)

// Semester
const selectedSemesters = ref([])
const selectAllSemesters = ref(false)

const toggleSelectAll = () => {
  if (selectAllSemesters.value) {
    selectedSemesters.value = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`)
  } else {
    selectedSemesters.value = []
  }
}

const submitForm = () => {
  const data = {
    agenda: form.value.agenda,
    hari: [...form.value.hari],
    sesi: [...form.value.sesi],
    semesters: [...selectedSemesters.value],
  }

  if (editIndex.value !== null) {
    jadwalList.value[editIndex.value] = data
    editIndex.value = null
  } else {
    jadwalList.value.push(data)
  }

  // Reset
  form.value = { agenda: '', hari: [], sesi: [], semesters: [] }
  selectedSemesters.value = []
  selectAllSemesters.value = false
}

const editJadwal = (index) => {
  const data = jadwalList.value[index]
  form.value = {
    agenda: data.agenda,
    hari: [...data.hari],
    sesi: [...data.sesi],
    semesters: [...data.semesters]
  }
  selectedSemesters.value = [...data.semesters]
  editIndex.value = index
}

const deleteJadwal = (index) => {
  jadwalList.value.splice(index, 1)
}
</script>
