<template>
  <div class="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
    <div class="bg-white p-8 shadow-md rounded-lg w-96">
      <h2 class="text-3xl font-bold text-center mb-6">Profile</h2>
      
      <div v-if="user.name">
        <p class="text-xl font-semibold">Welcome, {{ user.name }}</p>
        <p class="text-sm text-gray-600">Your account details</p>
        <!-- You can display more profile data here -->
      </div>
      
      <div v-else>
        <p class="text-red-600 font-semibold">You need to log in or register to view your profile.</p>
        <div class="mt-4 flex justify-center space-x-4">
          <NuxtLink to="/login" class="bg-blue-600 text-white py-2 px-4 rounded-lg">Login</NuxtLink>
          <NuxtLink to="/register" class="bg-green-600 text-white py-2 px-4 rounded-lg">Register</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const user = ref({});

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    user.value = storedUser;
  }
});
</script>
