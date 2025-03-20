<template>
  <div class="w-64 bg-gray-100 text-gray-900 h-screen shadow-md flex flex-col">
    <!-- Sidebar Header -->
    <div class="flex items-center px-6 py-4 bg-white shadow">
      <img src="/logo-dti.png" alt="DTI Logo" class="w-8 h-8 mr-2 rounded-full" />
      <h1 class="text-lg font-bold">Calendar-DTI</h1>
    </div>

    <!-- Sidebar Menu -->
    <nav class="flex-1 px-2 mt-4">
      <!-- Home -->
      <NuxtLink to="/" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
        <i class="fas fa-home mr-3"></i> Home
      </NuxtLink>

      <!-- Data Kalender (Dropdown) -->
      <div class="mt-4">
        <button @click="toggleDropdown('kalender')" class="flex items-center justify-between w-full px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
          <span class="flex items-center">
            <i class="fas fa-calendar-alt mr-3"></i> Data Kalender
          </span>
          <i :class="dropdowns.kalender ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </button>
        <div v-if="dropdowns.kalender" class="ml-6 mt-2 space-y-1">
          <a href="/mata-kuliah" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-book mr-2"></i> Mata Kuliah
          </a>
          <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-user-tie mr-2"></i> Dosen
          </a>
          <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-chalkboard-teacher mr-2"></i> Ruang Kelas
          </a>
          <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-calendar-times mr-2"></i> Jadwal Hindari
          </a>
        </div>
      </div>

      <!-- Jadwal (Dropdown) -->
      <div class="mt-4">
        <button @click="toggleDropdown('jadwal')" class="flex items-center justify-between w-full px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
          <span class="flex items-center">
            <i class="fas fa-calendar-check mr-3"></i> Jadwal
          </span>
          <i :class="dropdowns.jadwal ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </button>
        <div v-if="dropdowns.jadwal" class="ml-6 mt-2 space-y-1">
          <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-edit mr-2"></i> Buat Jadwal
          </a>
          <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-list mr-2"></i> Pilih Jadwal
          </a>
        </div>
      </div>
    </nav>

    <!-- Sidebar Footer (User Info) -->
    <div class="px-4 py-3 bg-white shadow flex items-center justify-between">
      <span class="flex items-center">
        <i class="fas fa-user mr-3"></i> Sulthan Akmal
      </span>
      <i class="fas fa-chevron-down cursor-pointer"></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const dropdowns = ref({
  kalender: false,
  jadwal: false,
});

const toggleDropdown = (menu) => {
  dropdowns.value[menu] = !dropdowns.value[menu];
};
</script>

<style scoped>
/* Optional: Additional styling can be added here */
</style>
