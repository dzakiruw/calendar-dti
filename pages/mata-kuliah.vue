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

      <!-- Pilih Kelas (Radio Buttons) -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Pilih Kelas</label>
        <div class="flex flex-col sm:flex-row items-center mt-2">
          <label class="flex items-center mr-4">
            <input type="radio" v-model="kelas" value="Kelas A" class="mr-2" /> Kelas A
          </label>
          <label class="flex items-center mr-4">
            <input type="radio" v-model="kelas" value="Kelas B" class="mr-2" /> Kelas B
          </label>
          <label class="flex items-center mr-4">
            <input type="radio" v-model="kelas" value="Kelas C" class="mr-2" /> Kelas C
          </label>
          <label class="flex items-center">
            <input type="radio" v-model="kelas" value="Kelas D" class="mr-2" /> Kelas D
          </label>
        </div>
      </div>

      <!-- Pilih Semester -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Semester</label>
        <select v-model="semester" class="w-full mt-2 p-2 border rounded-lg" required>
          <option disabled value="">Pilih Semester</option>
          <option v-for="n in 8" :key="n" :value="n">Semester {{ n }}</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
        Submit
      </button>
    </form>

    <!-- Container Daftar Mata Kuliah -->
    <div v-if="mataKuliahList.length" class="mt-6 w-96 bg-white p-6 shadow-md rounded-lg">
      <h2 class="text-xl font-bold">📋 Daftar Mata Kuliah</h2>
      <ul class="mt-2 space-y-2">
        <li v-for="(mataKuliah, index) in mataKuliahList" :key="index" class="bg-gray-100 p-2 rounded-lg flex justify-between items-center">
          <div>
            <p><strong>{{ mataKuliah.kode }}</strong> - {{ mataKuliah.nama }}</p>
            <p class="text-sm text-gray-600">Kelas: {{ mataKuliah.kelas }} | Semester: {{ mataKuliah.semester }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="editMataKuliah(index)" class="text-blue-600 hover:text-blue-900">✏️</button>
            <button @click="deleteMataKuliah(index)" class="text-red-600 hover:text-red-900">🗑️</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const kode = ref("");
const nama = ref("");
const kelas = ref("");
const semester = ref("");

const mataKuliahList = ref([]);

const submitMataKuliah = () => {
  if (kode.value.trim() && nama.value.trim() && kelas.value.trim() && semester.value) {
    mataKuliahList.value.push({
      kode: kode.value,
      nama: nama.value,
      kelas: kelas.value,
      semester: semester.value
    });

    kode.value = "";
    nama.value = "";
    kelas.value = "";
    semester.value = "";
  }
};

const editMataKuliah = (index) => {
  const mataKuliah = mataKuliahList.value[index];
  kode.value = mataKuliah.kode;
  nama.value = mataKuliah.nama;
  kelas.value = mataKuliah.kelas;
  semester.value = mataKuliah.semester;
  mataKuliahList.value.splice(index, 1);
};

const deleteMataKuliah = (index) => {
  mataKuliahList.value.splice(index, 1);
};
</script>
