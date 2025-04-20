<template>
  <div class="min-h-screen flex">
    <!-- Toggle Sidebar Button (Mobile) -->
    <button 
      v-if="isAuthenticated" 
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md hover:bg-gray-100"
    >
      <i :class="isSidebarOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-gray-600 text-xl"></i>
    </button>

    <!-- Sidebar Overlay (Mobile) -->
    <div 
      v-if="isAuthenticated && isSidebarOpen" 
      @click="toggleSidebar"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
    ></div>

    <!-- Sidebar -->
    <div 
      v-if="isAuthenticated" 
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
        'lg:translate-x-0': true
      }"
      class="w-64 fixed inset-y-0 left-0 shadow-md bg-white z-20 transform transition-transform duration-300 ease-in-out"
    >
      <sidebar />
    </div>

    <!-- Main Content -->
    <div 
      :class="{
        'ml-0 lg:ml-64': isAuthenticated,
        'ml-0': !isAuthenticated
      }" 
      class="flex-1 min-h-screen bg-gray-50 transition-all duration-300 ease-in-out"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import sidebar from '~/components/sidebar.vue'
import { ref, computed, onMounted, provide } from 'vue'

const user = ref({});
const isSidebarOpen = ref(false);

// Computed property to check if user is authenticated
const isAuthenticated = computed(() => {
  return user.value && user.value.accessToken;
});

// Function to toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Function to update authentication state
const updateAuthState = (newUser) => {
  user.value = newUser || {};
};

// Provide the auth state and update function to child components
provide('authState', {
  user,
  isAuthenticated,
  updateAuthState
});

// On component mount, check if the user is logged in
onMounted(() => {
  if (process.client) { // Only run this in the browser (client-side)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.accessToken) {
      updateAuthState(storedUser);
    } else {
      updateAuthState(null);
    }

    // Listen for storage events to handle auth state changes
    window.addEventListener('storage', () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      updateAuthState(updatedUser || null);
    });
  }
});
</script>
