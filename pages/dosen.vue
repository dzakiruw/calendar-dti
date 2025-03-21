<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
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

      <!-- Availability Input -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Ketersediaan Dosen</label>
        <div class="grid grid-cols-6 gap-2 text-center text-sm font-medium">
          <span></span>
          <span>Senin</span>
          <span>Selasa</span>
          <span>Rabu</span>
          <span>Kamis</span>
          <span>Jumat</span>
          <template v-for="(sesi, sIndex) in 3" :key="sIndex">
            <span class="font-semibold">Sesi {{ sesi }}</span>
            <template v-for="(hari, hIndex) in 5" :key="hIndex">
              <input type="checkbox" v-model="ketersediaan[sIndex][hIndex]" class="w-5 h-5" />
            </template>
          </template>
        </div>
      </div>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
        Simpan Dosen
      </button>
    </form>

    <!-- Display list of Dosen -->
    <div v-if="dosenList.length" class="mt-6 w-96 bg-white p-6 shadow-md rounded-lg">
      <h2 class="text-xl font-bold mb-4">📋 List of Dosen</h2>
      <div v-for="(dosen, index) in dosenList" :key="index" class="p-4 border border-gray-200 rounded-lg mb-2">
        <p><strong>{{ dosen.kode }}</strong> - {{ dosen.nama }} ({{ dosen.level }})</p>
        <p class="text-sm text-gray-600">Ketersediaan:</p>
        <ul class="text-sm grid grid-cols-6 gap-1 mt-1">
          <span></span>
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <template v-for="(sesi, sIndex) in 3" :key="sIndex">
            <span class="font-semibold">S{{ sesi }}</span>
            <template v-for="(hari, hIndex) in 5" :key="hIndex">
              <span :class="dosen.ketersediaan[sIndex][hIndex] ? 'text-green-600' : 'text-red-600'">
                {{ dosen.ketersediaan[sIndex][hIndex] ? '✔' : '✘' }}
              </span>
            </template>
          </template>
        </ul>
        <div class="mt-2 flex justify-end space-x-2">
          <button @click="editDosen(index)" class="text-blue-600 hover:text-blue-900">Edit</button>
          <button @click="deleteDosen(index)" class="text-red-600 hover:text-red-900">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Dosen details
const kodeDosen = ref("");
const namaDosen = ref("");
const levelDosen = ref("");
const ketersediaan = ref([...Array(3)].map(() => Array(5).fill(false)));

const dosenList = ref([]);
const editIndex = ref(null);

const submitDosen = () => {
  const newDosen = {
    kode: kodeDosen.value,
    nama: namaDosen.value,
    level: levelDosen.value,
    ketersediaan: JSON.parse(JSON.stringify(ketersediaan.value)),
  };

  if (editIndex.value !== null) {
    dosenList.value[editIndex.value] = newDosen;
    editIndex.value = null;
  } else {
    dosenList.value.push(newDosen);
  }

  resetForm();
};

const editDosen = (index) => {
  const dosen = dosenList.value[index];
  kodeDosen.value = dosen.kode;
  namaDosen.value = dosen.nama;
  levelDosen.value = dosen.level;
  ketersediaan.value = JSON.parse(JSON.stringify(dosen.ketersediaan));
  editIndex.value = index;
};

const deleteDosen = (index) => {
  dosenList.value.splice(index, 1);
};

const resetForm = () => {
  kodeDosen.value = "";
  namaDosen.value = "";
  levelDosen.value = "";
  ketersediaan.value = [...Array(3)].map(() => Array(5).fill(false));
};
</script>