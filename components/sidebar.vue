<template>
  <div class="w-64 bg-gray-100 text-gray-900 h-screen shadow-md flex flex-col">
    <!-- Sidebar Header -->
    <div class="flex items-center px-6 py-4 bg-white shadow">
      <img src="/logo-dti.png" alt="DTI Logo" class="w-8 h-8 mr-2" />
      <h1 class="text-lg font-bold">Calendar-DTI</h1>
    </div>

    <!-- Sidebar Menu -->
    <nav class="flex-1 px-2 mt-4">
      <!-- Home -->
      <NuxtLink to="/" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
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
          <NuxtLink to="/mata-kuliah" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-book mr-2"></i> Mata Kuliah
          </NuxtLink>
          <NuxtLink to="/dosen" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-user-tie mr-3"></i> Dosen
          </NuxtLink>
          <NuxtLink to="/ruang-kelas" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-chalkboard-teacher mr-2"></i> Ruang Kelas
          </NuxtLink>
          <NuxtLink to="/jadwal-hindari" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-calendar-times mr-2"></i> Jadwal Hindari
          </NuxtLink>
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
          <NuxtLink to="/buat-jadwal" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-edit mr-2"></i> Buat Jadwal
          </NuxtLink>
          <NuxtLink to="/pilih-jadwal" class="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <i class="fas fa-list mr-2"></i> Pilih Jadwal
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Sidebar Footer -->
    <div class="px-4 py-3 bg-white shadow flex items-center justify-between">
      <span v-if="user.name">
        <i class="fas fa-user mr-3"></i>
        <NuxtLink v-if="user.name" to="/profile" class="text-gray-600 hover:text-gray-900">{{ user.name }}</NuxtLink>
        <NuxtLink v-else to="/login" class="text-gray-600 hover:text-gray-900">Guest</NuxtLink>
      </span>

      <!-- Show logout button if user is logged in -->
      <button v-if="user.name" @click="logout" class="text-gray-600 hover:text-gray-900">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
      <button v-else @click="redirectToLogin" class="text-gray-600 hover:text-gray-900">
        <i class="fas fa-sign-in-alt"></i> Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'

const dropdowns = ref({
  kalender: false,
  jadwal: false,
});

const user = ref({});
const router = useRouter();

// On component mount, check for logged-in user
onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    user.value = storedUser;
  }

  // Load dropdown states from localStorage
  const storedDropdowns = JSON.parse(localStorage.getItem('dropdowns'));
  if (storedDropdowns) {
    dropdowns.value = storedDropdowns;
  }
});

// Logout function
const logout = () => {
  // Clear user data from localStorage
  localStorage.removeItem('user');
  user.value = {}; // Clear user state
  router.push('/login'); // Redirect to login page
};

// Redirect to login page if the user clicks the guest button
const redirectToLogin = () => {
  router.push('/login');
};

// Toggle dropdowns
const toggleDropdown = (menu) => {
  dropdowns.value[menu] = !dropdowns.value[menu];
  // Save dropdown state to localStorage
  localStorage.setItem('dropdowns', JSON.stringify(dropdowns.value));
};
</script>

<style scoped>
/* Optional: Additional styling can be added here */
</style>
