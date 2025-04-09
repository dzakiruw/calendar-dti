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
          <input v-model="form.hindari_agenda" type="text" class="w-full mt-2 p-2 border rounded-lg" placeholder="Masukkan agenda" required />
        </div>

        <!-- Hari Hindari (Single Select with Radio Buttons in Two Rows) -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Hari Hindari</label>
          <div class="grid grid-cols-3 gap-4 mt-2">
            <label v-for="hari in hariListRow1" :key="hari" class="inline-flex items-center">
              <input type="radio" v-model="form.hindari_hari" :value="hari" class="mr-2" /> {{ hari }}
            </label>
          </div>
          <div class="grid grid-cols-3 gap-4 mt-2">
            <label v-for="hari in hariListRow2" :key="hari" class="inline-flex items-center">
              <input type="radio" v-model="form.hindari_hari" :value="hari" class="mr-2" /> {{ hari }}
            </label>
          </div>
        </div>

        <!-- Sesi Hindari (Single Select with Radio Buttons aligned) -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Sesi Hindari</label>
          <div class="flex gap-4 mt-2">
            <label v-for="sesi in sesiList" :key="sesi" class="inline-flex items-center">
              <input type="radio" v-model="form.hindari_sesi" :value="sesi" class="mr-2" /> {{ sesi }}
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
              <input type="checkbox" v-model="selectedSemesters" :value="n" class="mr-2" />
              Semester {{ n }}
            </label>
          </div>
        </div>

        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
          {{ editIndex !== null ? 'Update' : 'Submit' }}
        </button>
        <button v-if="editIndex !== null" @click="cancelEdit" type="button" class="bg-gray-400 text-white py-2 px-4 rounded-lg w-full mt-2 hover:bg-gray-500">
          Cancel Edit
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
              <p class="font-semibold">{{ jadwal.hindari_agenda }}</p>
              <p class="text-sm text-gray-600"><span class="font-bold">Hari:</span> {{ formatHari(jadwal.hindari_hari) }}</p>
              <p class="text-sm text-gray-600"><span class="font-bold">Sesi:</span> {{ formatSesi(jadwal.hindari_sesi) }}</p>
              <p class="text-sm text-gray-600"><span class="font-bold">Semester:</span> {{ jadwal.hindari_smt.join(', ') }}</p>
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
import { ref, onMounted } from 'vue'
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
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken
    if (!token) {
      throw new Error('User is not authenticated')
    }

    const response = await axios.get('http://10.15.41.68:3000/jadwal_hindari', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    // Directly use "SATU", "DUA", "TIGA" from the database
    jadwalList.value = response.data
  } catch (error) {
    console.log('Gagal mengambil data jadwal hindari', error)
  }
}

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
    } else {
      response = await axios.post('http://10.15.41.68:3000/jadwal_hindari', newJadwal, { headers });
    }

    console.log(response.data); // Log the response to verify

    // Re-fetch the jadwal list after submitting
    await fetchJadwalList();
    resetForm();
  } catch (error) {
    console.error('Error in submitForm:', error);
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
    hindari_hari: jadwal.hindari_hari,  // Direct string
    hindari_sesi: reverseSesiMap[jadwal.hindari_sesi] || jadwal.hindari_sesi,  // Convert "SATU" to "SESI 1"
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
  const jadwalId = jadwalList.value[index].id_hindari
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken
    if (!token) {
      throw new Error('User is not authenticated')
    }

    await axios.delete(`http://10.15.41.68:3000/jadwal_hindari/${jadwalId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    jadwalList.value.splice(index, 1)
  } catch (error) {
    console.log('Gagal menghapus data jadwal hindari', error)
  }
}

const resetForm = () => {
  form.value = { hindari_agenda: '', hindari_hari: '', hindari_sesi: '', hindari_smt: [] }
  selectedSemesters.value = []
  selectAllSemesters.value = false
}

onMounted(() => {
  fetchJadwal()
})
</script>
