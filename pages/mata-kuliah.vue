<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-6">📚 Input Mata Kuliah</h1>

    <!-- Mata Kuliah Form -->
    <form @submit.prevent="submitMataKuliah" class="bg-white p-6 shadow-md rounded-lg w-96">
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Kode Mata Kuliah</label>
        <input type="text" v-model="kode" class="w-full mt-2 p-2 border rounded-lg" placeholder="Masukkan kode mata kuliah" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Nama Mata Kuliah</label>
        <input type="text" v-model="nama" class="w-full mt-2 p-2 border rounded-lg" placeholder="Masukkan nama mata kuliah" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Dosen Pengampu</label>
        <select v-model="selectedDosen" class="w-full mt-2 p-2 border rounded-lg" required>
          <option disabled value="">Pilih Dosen</option>
          <option v-for="(dosen, index) in dosenList" :key="index" :value="dosen.name">{{ dosen.name }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Kelas</label>
        <select v-model="kelas" class="w-full mt-2 p-2 border rounded-lg" required>
          <option value="A">Kelas A</option>
          <option value="B">Kelas B</option>
          <option value="C">Kelas C</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
        Simpan Mata Kuliah
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
const kelas = ref("A");

const dosenList = ref([
  { name: "Dosen 1" },
  { name: "Dosen 2" },
  { name: "Dosen 3" },
  { name: "Dosen 4" },
]);

const submitMataKuliah = () => {
  alert(`Mata Kuliah: ${nama.value}, Kode: ${kode.value}, Dosen: ${selectedDosen.value}, Kelas: ${kelas.value}`);
  // Reset form fields after submission
  kode.value = "";
  nama.value = "";
  selectedDosen.value = "";
  kelas.value = "A";
};
</script>

<style scoped>
/* Optional: Styling */
</style>
