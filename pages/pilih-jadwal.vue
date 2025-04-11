<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Title -->
    <div class="mb-6 flex items-center justify-center gap-3">
      <img src="/pilih-jadwal.png" alt="Icon Pilih Jadwal" class="w-12 h-12" />
      <h1 class="text-3xl font-bold text-center">Pilih Jadwal</h1>
    </div>

    <!-- Informasi Daftar Data -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <!-- Mata Kuliah -->
      <div class="bg-white p-4 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold mb-2"><i class="fas fa-book mr-2"></i> Mata Kuliah</h2>
        <ul class="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li v-for="mk in mataKuliahList" :key="mk.matkul_kode">
            <strong>{{ mk.matkul_nama }}</strong> - {{ mk.matkul_kode }}
          </li>
        </ul>
      </div>

      <!-- Dosen -->
      <div class="bg-white p-4 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold mb-2"><i class="fas fa-user-tie mr-2"></i> Dosen</h2>
        <ul class="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li v-for="dosen in dosenList" :key="dosen.dosen_kode">
            <strong>{{ dosen.dosen_nama }}</strong> - {{ dosen.dosen_kode }} (Level: {{ dosen.dosen_level }})
          </li>
        </ul>
      </div>

      <!-- Ruang Kelas -->
      <div class="bg-white p-4 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold mb-2"><i class="fas fa-chalkboard-teacher mr-2"></i> Ruang Kelas</h2>
        <ul class="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li v-for="ruang in ruangKelasList" :key="ruang.ruangan_kode">
            <strong>{{ ruang.ruangan_kode }}</strong> - Kapasitas: {{ ruang.ruangan_kapasitas }}
          </li>
        </ul>
      </div>

      <!-- Jadwal Hindari -->
      <div class="bg-white p-4 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold mb-2"><i class="fas fa-calendar-times mr-2 text-red-500"></i> Jadwal Hindari</h2>
        <ul class="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li v-for="hindari in jadwalHindari" :key="hindari.id">
            <strong>{{ hindari.hindari_agenda }}</strong> - {{ hindari.hindari_hari }} (Sesi: {{ hindari.hindari_sesi }})
          </li>
        </ul>
      </div>

      <!-- Matching -->
      <div class="flex-1 bg-white p-6 shadow-md rounded-lg w-full sm:w-96">
      <h2 class="text-xl font-bold mb-4">
        <i class="fas fa-list-ul mr-2"></i> Daftar Matching
      </h2>

      <!-- Displaying "No data" message if matchingList is empty -->
      <div v-if="matchingList.length === 0" class="text-gray-500">
        Belum ada data matching.
      </div>

      <!-- Simple List of Matching Items -->
      <!-- Simple List of Matching Items -->
<ul v-else class="space-y-2">
  <li v-for="(match, index) in matchingList" :key="index" class="text-gray-700">
    <!-- Ensure that match.kelas is defined before accessing nama_kelas -->
    <strong>{{ match.kelas.nama_kelas }}</strong> - {{ match.dosen.dosen_nama }}
  </li>
</ul>
    </div>
    </div>

    <!-- Tombol Aksi -->
    <div class="flex flex-col sm:flex-row gap-4 justify-start mt-4">
      <button
        @click="generateJadwal"
        class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow"
      >
        <i class="fas fa-cogs mr-2"></i> Generate Jadwal
      </button>

      <button
        @click="exportExcel"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow"
      >
        <i class="fas fa-file-excel mr-2"></i> Export ke Excel
      </button>
    </div>

    <!-- Hasil Jadwal -->
    <div v-if="jadwalGenerated.length" class="mt-8">
      <h2 class="text-xl font-bold mb-4"><i class="fas fa-calendar-alt mr-2"></i> Hasil Jadwal</h2>
      <table class="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead class="bg-gray-200 text-left text-sm font-semibold">
          <tr>
            <th class="px-4 py-2">Hari</th>
            <th class="px-4 py-2">Sesi</th>
            <th class="px-4 py-2">Mata Kuliah</th>
            <th class="px-4 py-2">Dosen</th>
            <th class="px-4 py-2">Ruangan</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in jadwalGenerated"
            :key="index"
            class="border-t text-sm"
          >
            <td class="px-4 py-2">{{ row.hari }}</td>
            <td class="px-4 py-2">{{ row.sesi }}</td>
            <td class="px-4 py-2">{{ row.matkul }}</td>
            <td class="px-4 py-2">{{ row.dosen }}</td>
            <td class="px-4 py-2">{{ row.ruangan }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import axios from 'axios'

// Define refs for storing lists of data
const mataKuliahList = ref([]);
const dosenList = ref([]);
const ruangKelasList = ref([]);
const jadwalHindari = ref([]);
const matchingList = ref([]);
const jadwalGenerated = ref([]);

// Fetch Data function
const getToken = () => {
  const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
  return token || null;
}

const fetchData = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('User is not authenticated');

    // Fetch Mata Kuliah
    const mataKuliahResponse = await axios.get('http://10.15.41.68:3000/mata_kuliah', {
      headers: { Authorization: `Bearer ${token}` }
    });
    mataKuliahList.value = mataKuliahResponse.data;

    // Fetch Ruang Kelas
    const ruangKelasResponse = await axios.get('http://10.15.41.68:3000/ruangan', {
      headers: { Authorization: `Bearer ${token}` }
    });
    ruangKelasList.value = ruangKelasResponse.data;

    // Fetch Dosen
    const dosenResponse = await axios.get('http://10.15.41.68:3000/dosen', {
      headers: { Authorization: `Bearer ${token}` }
    });
    dosenList.value = dosenResponse.data;

    // Fetch Jadwal Hindari
    const jadwalHindariResponse = await axios.get('http://10.15.41.68:3000/jadwal_hindari', {
      headers: { Authorization: `Bearer ${token}` }
    });
    jadwalHindari.value = jadwalHindariResponse.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const fetchMatchingData = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!token) throw new Error('User is not authenticated');

    const response = await axios.get('http://10.15.41.68:3000/mk_dosen', {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Ensure the response data is properly handled
    if (response.data && Array.isArray(response.data)) {
      matchingList.value = response.data.map((match) => ({
        id_mk_kelas_dosen: match.id_mk_kelas_dosen,
        kelas: match.mata_kuliah_kelas,
        dosen: match.dosen
      }));
    } else {
      matchingList.value = [];
      console.error('Invalid matching data format received.');
    }
  } catch (error) {
    console.error('Gagal mengambil data matching', error);
    alert('Failed to fetch Matching data. Please check your authentication token.');
  }
};

onMounted(() => {
  fetchData();
  fetchMatchingData();
})

// Function to generate jadwal (dummy logic for testing)
const generateJadwal = () => {
  jadwalGenerated.value = [
    { hari: 'Senin', sesi: '1', matkul: 'Algoritma', dosen: 'Dr. A', ruangan: 'R101' },
    { hari: 'Rabu', sesi: '2', matkul: 'Basis Data', dosen: 'Prof. B', ruangan: 'R102' },
    { hari: 'Jumat', sesi: '3', matkul: 'Struktur Data', dosen: 'Dr. C', ruangan: 'R101' },
  ]
}

// Function to export jadwal to Excel
const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(jadwalGenerated.value)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Jadwal')
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, 'jadwal.xlsx')
}
</script>
