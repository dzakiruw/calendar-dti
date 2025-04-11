<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 class="text-3xl font-bold mb-6">Login</h1>

    <!-- Login Form -->
    <form @submit.prevent="login" class="bg-white p-6 shadow-md rounded-lg w-96">
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Username</label>
        <input
          v-model="username"
          type="text"
          class="w-full mt-2 p-2 border rounded-lg"
          placeholder="Enter username"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full mt-2 p-2 border rounded-lg"
          placeholder="Enter password"
          required
        />
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>

      <button
        type="submit"
        class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
      >
        Login
      </button>
    </form>

    <!-- Register Link -->
    <p class="mt-4">
      Don't have an account? <NuxtLink to="/register" class="text-blue-600">Register here</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

// Reset any state or clear session-related information before entering the login page
onBeforeMount(() => {
  // Optionally clear localStorage or reset any global state (like Vuex or reactive states)
  localStorage.removeItem('user');  // Clear user data in localStorage
});

// Handle login
const login = async () => {
  try {
    const response = await axios.post("http://10.15.41.68:3000/auth/login", {
      username: username.value,
      password: password.value,
    });

    if (response.data.accessToken) {
      const user = {
        username: username.value,
        accessToken: response.data.accessToken,
        id: response.data.id,
      };

      localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
      router.push('/'); // Redirect to the home page after successful login
      window.dispatchEvent(new Event('storage')); // Trigger storage event to update sidebar
    } else {
      errorMessage.value = 'Invalid username or password.';
    }
  } catch (error) {
    errorMessage.value = error.response ? error.response.data : 'An error occurred. Please try again.';
  }
};
</script>
