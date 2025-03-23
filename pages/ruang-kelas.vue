<template>
  <div class="h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
    <!-- Title with Image -->
    <div class="mb-6 w-full sm:w-auto">
      <h1 class="text-3xl font-bold flex items-center">
        <img src="/input-kelas.png" alt="Kelas Icon" class="inline-block w-16 h-16 mr-2" />
        Input Kelas
      </h1>
    </div>

    <!-- Layout for Form & List -->
    <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-6">
      <!-- Input Form -->
      <form @submit.prevent="submitForm" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96 mb-6 sm:mb-0">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kode Ruangan</label>
          <input
            v-model="form.kodeRuangan"
            type="text"
            class="w-full mt-2 p-2 border rounded-lg"
            placeholder="Masukkan kode ruangan"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kapasitas Ruangan</label>
          <input
            v-model="form.kapasitasRuangan"
            type="number"
            class="w-full mt-2 p-2 border rounded-lg"
            placeholder="Masukkan kapasitas ruangan"
            required
          />
        </div>

        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
        >
          {{ editIndex !== null ? 'Update' : 'Submit' }}
        </button>
      </form>

      <!-- Daftar Ruang Kelas -->
      <div class="flex-1 bg-white p-6 shadow-md rounded-lg w-full sm:w-96">
        <h2 class="text-xl font-bold mb-4">
          <i class="fas fa-list-ul mr-2"></i> Daftar Ruang Kelas
        </h2>

        <div v-if="ruangKelasList.length === 0" class="text-gray-500">
          Belum ada data ruang kelas.
        </div>

        <ul v-else class="space-y-4">
          <li
            v-for="(ruangKelas, index) in ruangKelasList"
            :key="index"
            class="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p><strong>{{ ruangKelas.kodeRuangan }}</strong></p>
              <p class="text-sm text-gray-600">
                <span class="font-bold">Kapasitas:</span> {{ ruangKelas.kapasitasRuangan }}
              </p>
            </div>
            <div class="flex space-x-4">
              <button @click="editRuangKelas(index)" class="text-gray-600 hover:text-gray-900">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteRuangKelas(index)" class="text-red-600 hover:text-red-900">
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

const form = ref({
  kodeRuangan: '',
  kapasitasRuangan: '',
})

const ruangKelasList = ref([])
const editIndex = ref(null)

const submitForm = () => {
  if (editIndex.value !== null) {
    ruangKelasList.value[editIndex.value] = { ...form.value }
    editIndex.value = null
  } else {
    ruangKelasList.value.push({ ...form.value })
  }

  form.value = {
    kodeRuangan: '',
    kapasitasRuangan: '',
  }
}

const editRuangKelas = (index) => {
  form.value = { ...ruangKelasList.value[index] }
  editIndex.value = index
}

const deleteRuangKelas = (index) => {
  ruangKelasList.value.splice(index, 1)
}
</script>
