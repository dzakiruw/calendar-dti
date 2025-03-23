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
import { ref } from "vue";
import { useRouter } from "vue-router";

// Define username and password for login
const correctUsername = "dzaki";
const correctPassword = "dzaki";

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const router = useRouter();

// Handle login
const login = () => {
  if (username.value === correctUsername && password.value === correctPassword) {
    // Store user data in localStorage
    const user = { username: username.value };
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to home or profile page after successful login
    router.push("/");
  } else {
    // Show error message if credentials are wrong
    errorMessage.value = "Invalid username or password.";
  }
};
</script>
