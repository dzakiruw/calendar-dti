<template>
  <div class="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
    <!-- Title -->
    <h1 class="text-3xl font-bold flex items-center mb-8 text-center">
      <img src="/input-dosen.png" alt="Dosen Icon" class="w-14 h-14 mr-2" />
      Input Dosen
    </h1>

    <!-- Form + List -->
    <div class="flex flex-col sm:flex-row flex-wrap w-full max-w-6xl gap-6 justify-center">
      <!-- Dosen Input Form -->
      <form @submit.prevent="submitDosen" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kode Dosen</label>
          <input v-model="kodeDosen" type="text" class="w-full mt-2 p-2 border rounded-lg" placeholder="D123" required />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Nama Dosen</label>
          <input v-model="namaDosen" type="text" class="w-full mt-2 p-2 border rounded-lg" placeholder="Dr. John Doe" required />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Level Dosen</label>
          <select v-model="levelDosen" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Level Dosen</option>
            <option>Junior</option>
            <option>Senior</option>
            <option>Professor</option>
          </select>
        </div>

        <!-- Ketersediaan Dosen -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Ketersediaan Dosen (Sesi)</label>
          <div class="overflow-auto">
            <table class="w-full text-sm text-center border border-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border px-2 py-1">Sesi / Hari</th>
                  <th v-for="hari in hariList" :key="hari" class="border px-2 py-1">{{ hari }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, sesiIndex) in 3" :key="sesiIndex">
                  <td class="border font-semibold">Sesi {{ sesiIndex + 1 }}</td>
                  <td v-for="(col, hariIndex) in 5" :key="hariIndex" class="border px-2 py-1">
                    <input type="checkbox" v-model="ketersediaan[sesiIndex][hariIndex]" class="w-4 h-4" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
          {{ editIndex !== null ? 'Update' : 'Submit' }}
        </button>
      </form>

      <!-- Dosen List -->
<div class="flex-1 w-full sm:w-96 bg-white p-6 shadow-md rounded-lg mt-6 sm:mt-0">
  <h2 class="text-xl font-bold mb-4">
    <i class="fas fa-list-ul mr-2"></i> Daftar Dosen
  </h2>

  <!-- Empty State -->
  <div v-if="dosenList.length === 0" class="text-gray-500">
    Belum ada dosen yang diinputkan.
  </div>

  <!-- Dosen List -->
  <ul v-else class="space-y-4">
    <li
      v-for="(dosen, index) in dosenList"
      :key="index"
      class="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
    >
      <div>
        <p class="font-bold text-base">{{ dosen.nama }}<br /><span class="text-sm font-normal">{{ dosen.kode }}</span></p>
        <p class="text-sm text-gray-600 mt-1">
          <span class="font-bold">Level:</span> {{ dosen.level }}<br />
          <span class="font-bold">Ketersediaan:</span>
        </p>
        <ul class="text-sm text-gray-600 list-disc ml-5 mt-1 space-y-0.5">
          <li
            v-for="(result, sesiIndex) in getFilteredSessions(dosen.ketersediaan)"
            :key="sesiIndex"
          >
            Sesi {{ result.sesi + 1 }}: {{ result.hari.join(', ') }}
          </li>
          <li
            v-if="getFilteredSessions(dosen.ketersediaan).length === 0"
            class="italic text-gray-400 list-none"
          >
            Tidak tersedia
          </li>
        </ul>
      </div>

      <div class="flex flex-col space-y-2 ml-4">
        <button @click="editDosen(index)" class="text-gray-600 hover:text-gray-900" title="Edit">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button @click="deleteDosen(index)" class="text-red-600 hover:text-red-900" title="Hapus">
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

const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

const kodeDosen = ref('')
const namaDosen = ref('')
const levelDosen = ref('')
const ketersediaan = ref([...Array(3)].map(() => Array(5).fill(false)))

const dosenList = ref([])
const editIndex = ref(null)

const submitDosen = () => {
  const newDosen = {
    kode: kodeDosen.value,
    nama: namaDosen.value,
    level: levelDosen.value,
    ketersediaan: JSON.parse(JSON.stringify(ketersediaan.value))
  }

  if (editIndex.value !== null) {
    dosenList.value[editIndex.value] = newDosen
    editIndex.value = null
  } else {
    dosenList.value.push(newDosen)
  }

  resetForm()
}

const editDosen = (index) => {
  const dosen = dosenList.value[index]
  kodeDosen.value = dosen.kode
  namaDosen.value = dosen.nama
  levelDosen.value = dosen.level
  ketersediaan.value = JSON.parse(JSON.stringify(dosen.ketersediaan))
  editIndex.value = index
}

const deleteDosen = (index) => {
  dosenList.value.splice(index, 1)
}

const resetForm = () => {
  kodeDosen.value = ''
  namaDosen.value = ''
  levelDosen.value = ''
  ketersediaan.value = [...Array(3)].map(() => Array(5).fill(false))
}

const getFilteredSessions = (ketersediaan) => {
  return ketersediaan.map((sesi, index) => {
    const hariTersedia = sesi
      .map((val, i) => (val ? hariList[i] : null))
      .filter(Boolean)
    return hariTersedia.length ? { sesi: index, hari: hariTersedia } : null
  }).filter(Boolean)
}
</script>
