<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 class="text-3xl font-bold mb-6">Register</h1>

    <!-- Register Form -->
    <form @submit.prevent="register" class="bg-white p-6 shadow-md rounded-lg w-96">
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

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="w-full mt-2 p-2 border rounded-lg"
          placeholder="Confirm password"
          required
        />
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>

      <button
        type="submit"
        class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
      >
        Register
      </button>
    </form>

    <p class="mt-4">
      Already have an account? <NuxtLink to="/login" class="text-blue-600">Login here</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const router = useRouter();

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match!";
    return;
  }

  try {
    // Send register request to the backend
    const response = await axios.post("http://10.15.41.68:3000/auth/register", {
      username: username.value,
      password: password.value,
    });

    // Handle successful registration
    if (response.data.message === "Registration successful") {
      // Redirect to login page after successful registration
      router.push("/login");
    }
  } catch (error) {
    // Handle any errors from the API request
    errorMessage.value = error.response ? error.response.data : "An error occurred. Please try again.";
  }
};
</script>
