<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50">
    <!-- Title -->
    <h1 class="text-3xl font-bold mb-6">📅 Input Jadwal Dihindari</h1>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="bg-white p-6 shadow-md rounded-lg w-96">
      <!-- Input Agenda Hindari -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Agenda Hindari</label>
        <input
          v-model="form.agenda"
          type="text"
          class="w-full mt-2 p-2 border rounded-lg"
          placeholder="Masukkan agenda yang dihindari"
          required
        />
      </div>

      <!-- Input Hari Hindari -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Hari Hindari</label>
        <select v-model="form.hari" class="w-full mt-2 p-2 border rounded-lg" required>
          <option value="Senin">Senin</option>
          <option value="Selasa">Selasa</option>
          <option value="Rabu">Rabu</option>
          <option value="Kamis">Kamis</option>
          <option value="Jumat">Jumat</option>
        </select>
      </div>

      <!-- Input Sesi Hindari -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Sesi Hindari</label>
        <select v-model="form.sesi" class="w-full mt-2 p-2 border rounded-lg" required>
          <option value="sesi 1">Sesi 1</option>
          <option value="sesi 2">Sesi 2</option>
          <option value="sesi 3">Sesi 3</option>
        </select>
      </div>

      <!-- Input Berlaku untuk Smt -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Berlaku untuk Smt</label>
        <div class="relative">
          <button @click.prevent="toggleSemesterDropdown" class="w-full mt-2 p-2 border rounded-lg bg-white text-left">
            {{ selectedSemesters.length ? selectedSemesters.join(", ") : "Pilih Semester" }}
          </button>
          <div v-if="showSemesterDropdown" class="absolute w-full mt-1 bg-white border rounded-lg shadow-md p-2">
            <label class="block">
              <input type="checkbox" v-model="selectAllSemesters" @change="toggleSelectAll" class="mr-2" /> Pilih Semua Semester
            </label>
            <div class="mt-2">
              <label v-for="n in 8" :key="n" class="block">
                <input type="checkbox" v-model="selectedSemesters" :value="`Semester ${n}`" class="mr-2" /> Semester {{ n }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
        {{ editIndex !== null ? 'Update Jadwal' : 'Simpan Jadwal' }}
      </button>
    </form>

    <!-- Daftar Jadwal yang Dihindari -->
    <div class="mt-8 bg-white p-6 shadow-md rounded-lg w-96">
      <h2 class="text-2xl font-bold mb-4">📋 Daftar Jadwal Dihindari</h2>
      <div v-if="jadwalList.length === 0" class="text-gray-500">Belum ada jadwal yang dihindari.</div>
      <div v-else class="space-y-4">
        <div v-for="(jadwal, index) in jadwalList" :key="index" class="p-4 border border-gray-200 rounded-lg">
          <div class="flex justify-between items-center">
            <div>
              <p class="font-medium">Agenda: {{ jadwal.agenda }}</p>
              <p class="text-sm text-gray-600">Hari: {{ jadwal.hari }}</p>
              <p class="text-sm text-gray-600">Sesi: {{ jadwal.sesi }}</p>
              <p class="text-sm text-gray-600">Semester: {{ jadwal.semesters.join(", ") }}</p>
            </div>
            <div class="flex space-x-2">
              <!-- Edit Button -->
              <button @click="editJadwal(index)" class="text-blue-600 hover:text-blue-900">✏️</button>
              <!-- Delete Button -->
              <button @click="deleteJadwal(index)" class="text-red-600 hover:text-red-900">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Data Form
const form = ref({ agenda: '', sesi: 'sesi 1', hari: 'Senin', semesters: [] });

// Data Jadwal
const jadwalList = ref([]);

// Index untuk Edit
const editIndex = ref(null);

// Dropdown Semester
const showSemesterDropdown = ref(false);
const selectedSemesters = ref([]);
const selectAllSemesters = ref(false);

const toggleSemesterDropdown = () => {
  showSemesterDropdown.value = !showSemesterDropdown.value;
};

const toggleSelectAll = () => {
  if (selectAllSemesters.value) {
    selectedSemesters.value = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);
  } else {
    selectedSemesters.value = [];
  }
};

// Submit Form
const submitForm = () => {
  if (editIndex.value !== null) {
    // Edit Data
    jadwalList.value[editIndex.value] = { ...form.value, semesters: [...selectedSemesters.value] };
    editIndex.value = null;
  } else {
    // Tambah Data Baru
    jadwalList.value.push({ ...form.value, semesters: [...selectedSemesters.value] });
  }

  // Reset Form
  form.value = { agenda: '', sesi: 'sesi 1', hari: 'Senin', semesters: [] };
  selectedSemesters.value = [];
  selectAllSemesters.value = false;
};

// Edit Data
const editJadwal = (index) => {
  form.value = { ...jadwalList.value[index] };
  selectedSemesters.value = [...jadwalList.value[index].semesters];
  editIndex.value = index;
};

// Hapus Data
const deleteJadwal = (index) => {
  jadwalList.value.splice(index, 1);
};
</script>
