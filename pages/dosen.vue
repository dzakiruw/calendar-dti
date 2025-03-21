<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-6">📚 Input Dosen</h1>

    <!-- Dosen Input Form -->
    <form @submit.prevent="submitDosen" class="bg-white p-6 shadow-md rounded-lg w-96">
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Kode Dosen</label>
        <input type="text" v-model="kodeDosen" class="w-full mt-2 p-2 border rounded-lg" placeholder="D123" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Nama Dosen</label>
        <input type="text" v-model="namaDosen" class="w-full mt-2 p-2 border rounded-lg" placeholder="Dr. John Doe" required />
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

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
        Simpan Dosen
      </button>
    </form>

    <!-- Display list of Dosen -->
    <div v-if="dosenList.length" class="mt-6 w-96">
      <h2 class="text-xl font-bold">List of Dosen</h2>
      <ul class="mt-2">
        <li v-for="(dosen, index) in dosenList" :key="index" class="bg-gray-100 p-2 rounded-lg mt-2">
          {{ dosen.kode }} - {{ dosen.nama }} - {{ dosen.level }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Dosen details
const kodeDosen = ref("");
const namaDosen = ref("");
const levelDosen = ref("");

// Array to store dosen list
const dosenList = ref([]);

// Function to submit dosen data
const submitDosen = () => {
  if (kodeDosen.value.trim() && namaDosen.value.trim() && levelDosen.value.trim()) {
    dosenList.value.push({
      kode: kodeDosen.value,
      nama: namaDosen.value,
      level: levelDosen.value
    });
    
    // Reset form fields after submission
    kodeDosen.value = "";
    namaDosen.value = "";
    levelDosen.value = "";
  }
};
</script>

<style scoped>
/* Optional: Styling */
</style>
