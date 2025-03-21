<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-6">📚 Match Dosen with Mata Kuliah</h1>

    <form @submit.prevent="submitMatching" class="bg-white p-6 shadow-md rounded-lg w-96">
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Pilih Mata Kuliah</label>
        <select v-model="selectedMataKuliah" class="w-full mt-2 p-2 border rounded-lg" required>
          <option disabled value="">Pilih Mata Kuliah</option>
          <option v-for="(mataKuliah, index) in mataKuliahList" :key="index" :value="mataKuliah.name">{{ mataKuliah.name }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Pilih Dosen Pengampu</label>
        <select v-model="selectedDosen" class="w-full mt-2 p-2 border rounded-lg" required>
          <option disabled value="">Pilih Dosen</option>
          <option v-for="(dosen, index) in dosenList" :key="index" :value="dosen.name">{{ dosen.name }}</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
        Simpan Dosen dan Mata Kuliah
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Simulate existing data (can be replaced with dynamic data from API or store)
const mataKuliahList = ref([
  { name: "Capstone Project" },
  { name: "Advanced Programming" },
]);

const dosenList = ref([
  { name: "Dosen 1" },
  { name: "Dosen 2" },
  { name: "Dosen 3" },
]);

const selectedMataKuliah = ref("");
const selectedDosen = ref("");

const submitMatching = () => {
  alert(`Mata Kuliah: ${selectedMataKuliah.value}, Dosen: ${selectedDosen.value}`);
};
</script>

<style scoped>
/* Optional: Custom styles */
</style>
