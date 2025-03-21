<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 class="text-3xl font-bold mb-6">🎓 Matching Dosen & Mata Kuliah</h1>

    <!-- Form Matching -->
    <form @submit.prevent="submitMatching" class="bg-white p-6 shadow-md rounded-lg w-96">
      <!-- Pilih Mata Kuliah -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Pilih Mata Kuliah</label>
        <select v-model="selectedMataKuliah" class="w-full mt-2 p-2 border rounded-lg" required>
          <option disabled value="">Pilih Mata Kuliah</option>
          <option v-for="mk in mataKuliahList" :key="mk.kode" :value="mk">
            {{ mk.kode }} - {{ mk.nama }}
          </option>
        </select>
      </div>

      <!-- Pilih Dosen (Checkbox Dropdown) -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Pilih Dosen</label>
        <div class="relative">
          <button @click.prevent="toggleDropdown" class="w-full mt-2 p-2 border rounded-lg bg-white text-left">
            {{ selectedDosen.length ? selectedDosen.map(d => d.nama).join(", ") : "Pilih Dosen" }}
          </button>
          <div v-if="dropdownOpen" class="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
            <div v-for="dosen in dosenList" :key="dosen.id" class="p-2 flex items-center hover:bg-gray-100">
              <input type="checkbox" :value="dosen" v-model="selectedDosen" class="mr-2" />
              <span>{{ dosen.nama }}</span>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
        Tambahkan
      </button>
    </form>

    <!-- Daftar Matching Mata Kuliah - Dosen -->
    <div v-if="matchingList.length" class="mt-6 w-96 bg-white p-6 shadow-md rounded-lg">
      <h2 class="text-xl font-bold">📋 Daftar Mata Kuliah - Dosen</h2>
      <ul class="mt-2">
        <li v-for="(match, index) in matchingList" :key="index" class="bg-gray-100 p-2 rounded-lg mt-2 flex justify-between items-center">
          <div>
            <p><strong>{{ match.mataKuliah.kode }}</strong> - {{ match.mataKuliah.nama }}</p>
            <p class="text-sm text-gray-600">Dosen: {{ match.dosen.map(d => d.nama).join(", ") }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="editMatching(index)" class="text-blue-600 hover:text-blue-900">✏️</button>
            <button @click="deleteMatching(index)" class="text-red-600 hover:text-red-900">🗑️</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Data Dummy (Nantinya diambil dari page lain)
const mataKuliahList = ref([
  { kode: 'MK101', nama: 'Algoritma' },
  { kode: 'MK102', nama: 'Basis Data' }
]);

const dosenList = ref([
  { id: 1, nama: 'Dr. A' },
  { id: 2, nama: 'Prof. B' },
  { id: 3, nama: 'Dr. C' }
]);

// State untuk form input
const selectedMataKuliah = ref(null);
const selectedDosen = ref([]);
const dropdownOpen = ref(false);
const matchingList = ref([]);
const editIndex = ref(null);

// Toggle dropdown dosen
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Submit Matching
const submitMatching = () => {
  if (!selectedMataKuliah.value || selectedDosen.value.length === 0) return;

  if (editIndex.value !== null) {
    matchingList.value[editIndex.value] = { mataKuliah: selectedMataKuliah.value, dosen: [...selectedDosen.value] };
    editIndex.value = null;
  } else {
    matchingList.value.push({ mataKuliah: selectedMataKuliah.value, dosen: [...selectedDosen.value] });
  }

  resetForm();
};

// Edit Matching
const editMatching = (index) => {
  selectedMataKuliah.value = matchingList.value[index].mataKuliah;
  selectedDosen.value = [...matchingList.value[index].dosen];
  editIndex.value = index;
};

// Hapus Matching
const deleteMatching = (index) => {
  matchingList.value.splice(index, 1);
};

// Reset Form
const resetForm = () => {
  selectedMataKuliah.value = null;
  selectedDosen.value = [];
  dropdownOpen.value = false;
};
</script>
