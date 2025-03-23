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
          <li>ET234601 - Algoritma</li>
          <li>ET234602 - Basis Data</li>
          <li>ET234603 - Struktur Data</li>
        </ul>
      </div>

      <!-- Dosen -->
      <div class="bg-white p-4 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold mb-2"><i class="fas fa-user-tie mr-2"></i> Dosen</h2>
        <ul class="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>Dr. A (Senior)</li>
          <li>Prof. B (Professor)</li>
          <li>Dr. C (Junior)</li>
        </ul>
      </div>

      <!-- Ruang Kelas -->
      <div class="bg-white p-4 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold mb-2"><i class="fas fa-chalkboard-teacher mr-2"></i> Ruang Kelas</h2>
        <ul class="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>R101 (Kapasitas: 40)</li>
          <li>R102 (Kapasitas: 35)</li>
        </ul>
      </div>

      <!-- Jadwal Hindari -->
      <div class="bg-white p-4 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold mb-2"><i class="fas fa-calendar-times mr-2 text-red-500"></i> Jadwal Hindari</h2>
        <ul class="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>Senin - Sesi 2</li>
          <li>Rabu - Sesi 1</li>
        </ul>
      </div>

      <!-- Matching -->
      <div class="bg-white p-4 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold mb-2"><i class="fas fa-link mr-2"></i> Matching Dosen & Matkul</h2>
        <ul class="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>Capstone Project - Dr. A</li>
          <li>Algoritma - Prof. B</li>
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
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const jadwalGenerated = ref([])

const generateJadwal = () => {
  // Placeholder generate – diganti dengan algoritma nanti
  jadwalGenerated.value = [
    { hari: 'Senin', sesi: '1', matkul: 'Algoritma', dosen: 'Dr. A', ruangan: 'R101' },
    { hari: 'Rabu', sesi: '2', matkul: 'Basis Data', dosen: 'Prof. B', ruangan: 'R102' },
    { hari: 'Jumat', sesi: '3', matkul: 'Struktur Data', dosen: 'Dr. C', ruangan: 'R101' },
  ]
}

const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(jadwalGenerated.value)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Jadwal')
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, 'calendar_dti.xlsx')
}
</script>
