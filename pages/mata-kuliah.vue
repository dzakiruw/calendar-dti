<template>
  <div class="h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
    <!-- Title -->
    <div class="mb-6 w-full sm:w-auto flex justify-center sm:justify-start">
      <h1 class="text-3xl font-bold flex items-center">
        <img :src="logoSrc" alt="Book Icon" class="inline-block w-14 h-14 mr-2" />
        Input Mata Kuliah
      </h1>
    </div>

    <!-- Mata Kuliah Form and Mata Kuliah List -->
    <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-6">
      <!-- Mata Kuliah Form -->
      <form @submit.prevent="submitMataKuliah" class="bg-white p-6 shadow-md rounded-lg w-full sm:w-96 mb-6 sm:mb-0">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Kode Mata Kuliah</label>
          <input type="text" v-model="kode" class="w-full mt-2 p-2 border rounded-lg" placeholder="ET234602" required />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Nama Mata Kuliah</label>
          <input type="text" v-model="nama" class="w-full mt-2 p-2 border rounded-lg" placeholder="Capstone Project" required />
        </div>

        <!-- Jenis Mata Kuliah Selection -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Jenis Mata Kuliah</label>
          <select v-model="jenisMataKuliah" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Jenis Mata Kuliah</option>
            <option value="Departemen">Departemen</option>
            <option value="Pengayaan">Pengayaan</option>
          </select>
        </div>

        <!-- Semester Selection -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Semester</label>
          <select v-model="semester" class="w-full mt-2 p-2 border rounded-lg" required>
            <option disabled value="">Pilih Semester</option>
            <option v-for="n in 8" :key="n" :value="n">Semester {{ n }}</option>
          </select>
        </div>

        <!-- Pilih Kelas (Checkbox) -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold">Pilih Kelas</label>
          <div class="flex flex-wrap gap-4 mt-2">
            <label class="flex items-center">
              <input type="checkbox" v-model="kelas" value="Kelas A" class="mr-2" /> Kelas A
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="kelas" value="Kelas B" class="mr-2" /> Kelas B
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="kelas" value="Kelas C" class="mr-2" /> Kelas C
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="kelas" value="Kelas D" class="mr-2" /> Kelas D
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
          {{ editIndex !== null ? 'Update' : 'Submit' }}
        </button>
      </form>

      <!-- Daftar Mata Kuliah -->
      <div class="flex-1 w-full sm:w-96 bg-white p-6 shadow-md rounded-lg mt-6 sm:mt-0">
        <h2 class="text-xl font-bold mb-4">
          <i class="fas fa-list-ul mr-2"></i> Daftar Mata Kuliah
        </h2>

        <!-- Empty State -->
        <div v-if="mataKuliahList.length === 0" class="text-gray-500">
          Belum ada mata kuliah yang diinputkan.
        </div>

        <!-- Mata Kuliah List -->
        <ul v-else class="space-y-4">
          <li v-for="(mk, index) in mataKuliahList" :key="index" class="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p>{{ mk.nama }}<br><strong>{{ mk.kode }}</strong></p>
              <p class="text-sm text-gray-600">
                <span class="font-bold">Jenis:</span> {{ mk.jenisMataKuliah }}<br>
                <span class="font-bold">Semester:</span> {{ mk.semester }}<br>
                <span class="font-bold">Kelas:</span> {{ mk.kelas.join(", ") }}
              </p>
            </div>
            <div class="flex space-x-4">
              <button @click="editMataKuliah(index)" class="text-gray-600 hover:text-gray-900">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteMataKuliah(index)" class="text-red-600 hover:text-red-900">
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
import { ref } from "vue";

// The logo path as a reactive variable to make sure it updates dynamically
const logoSrc = ref("/input-matkul.png");

const kode = ref("");
const nama = ref("");
const jenisMataKuliah = ref("");
const semester = ref("");
const kelas = ref([]);
const mataKuliahList = ref([]);
const editIndex = ref(null);

const submitMataKuliah = () => {
  if (editIndex.value !== null) {
    mataKuliahList.value[editIndex.value] = { 
      kode: kode.value, 
      nama: nama.value, 
      jenisMataKuliah: jenisMataKuliah.value,
      semester: semester.value, 
      kelas: [...kelas.value] 
    };
    editIndex.value = null;
  } else {
    mataKuliahList.value.push({ 
      kode: kode.value, 
      nama: nama.value, 
      jenisMataKuliah: jenisMataKuliah.value,
      semester: semester.value, 
      kelas: [...kelas.value] 
    });
  }
  resetForm();
};

const editMataKuliah = (index) => {
  const mk = mataKuliahList.value[index];
  kode.value = mk.kode;
  nama.value = mk.nama;
  jenisMataKuliah.value = mk.jenisMataKuliah;
  semester.value = mk.semester;
  kelas.value = [...mk.kelas];
  editIndex.value = index;
};

const deleteMataKuliah = (index) => {
  mataKuliahList.value.splice(index, 1);
};

const resetForm = () => {
  kode.value = "";
  nama.value = "";
  jenisMataKuliah.value = "";
  semester.value = "";
  kelas.value = [];
};
</script>

<style scoped>
/* Optional: Custom styling */
</style>
