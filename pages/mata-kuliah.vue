<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-6">📚 Input Mata Kuliah</h1>

    <!-- Mata Kuliah Form -->
    <form @submit.prevent="submitMataKuliah" class="bg-white p-6 shadow-md rounded-lg w-96">
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Kode Mata Kuliah</label>
        <input type="text" v-model="kode" class="w-full mt-2 p-2 border rounded-lg" placeholder="ET234602" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Nama Mata Kuliah</label>
        <input type="text" v-model="nama" class="w-full mt-2 p-2 border rounded-lg" placeholder="Capstone Project" required />
      </div>

      <!-- Kelas Multiple Choice (Checkboxes) -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Pilih Kelas</label>
        <div class="flex flex-col sm:flex-row items-center mt-2">
          <label class="flex items-center mr-4">
            <input type="checkbox" v-model="kelas" value="A" class="mr-2" /> Kelas A
          </label>
          <label class="flex items-center mr-4">
            <input type="checkbox" v-model="kelas" value="B" class="mr-2" /> Kelas B
          </label>
          <label class="flex items-center">
            <input type="checkbox" v-model="kelas" value="C" class="mr-2" /> Kelas C
          </label>
        </div>
      </div>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Assume dosenList is coming from /dosen page or global store
const kode = ref("");
const nama = ref("");
const selectedDosen = ref("");
const kelas = ref([]); // Use array to store multiple kelas selections

const dosenList = ref([
  { name: "Dosen 1" },
  { name: "Dosen 2" },
  { name: "Dosen 3" },
  { name: "Dosen 4" },
]);

const submitMataKuliah = () => {
  alert(`Mata Kuliah: ${nama.value}, Kode: ${kode.value}, Dosen: ${selectedDosen.value}, Kelas: ${kelas.join(", ")}`);
  // Reset form fields after submission
  kode.value = "";
  nama.value = "";
  selectedDosen.value = "";
  kelas.value = [];
};
</script>

<style scoped>
/* Optional: Custom styles */
</style>
