<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-6">📚 Input Dosen</h1>

    <!-- Dosen Input Form -->
    <form @submit.prevent="submitDosen" class="bg-white p-6 shadow-md rounded-lg w-96">
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Nama Dosen</label>
        <input type="text" v-model="dosenName" class="w-full mt-2 p-2 border rounded-lg" placeholder="Masukkan nama dosen" required />
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
          {{ dosen.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dosenName = ref("");
const dosenList = ref([]);

const submitDosen = () => {
  if (dosenName.value.trim()) {
    dosenList.value.push({ name: dosenName.value });
    dosenName.value = ""; // Reset input after submission
  }
};
</script>

<style scoped>
/* Optional: Styling */
</style>
