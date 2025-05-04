<template>
  <div class="min-h-screen flex">
    <!-- Loading state -->
    <div v-if="!isAuthChecked" class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>

    <!-- Toggle Sidebar Button (Mobile) -->
    <button 
      v-if="isAuthenticated && isAuthChecked" 
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md hover:bg-gray-100"
    >
      <i :class="isSidebarOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-gray-600 text-xl"></i>
    </button>

    <!-- Sidebar Overlay (Mobile) -->
    <div 
      v-if="isAuthenticated && isSidebarOpen && isAuthChecked" 
      @click="toggleSidebar"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
    ></div>

    <!-- Sidebar -->
    <div 
      v-if="isAuthenticated && isAuthChecked" 
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
        'ml-0 lg:ml-64': isAuthenticated && isAuthChecked,
        'ml-0': !isAuthenticated || !isAuthChecked
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
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const user = ref({});
const isSidebarOpen = ref(false);
const isAuthChecked = ref(false);

// Function to validate token (frontend-safe)
const validateToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    // Cek expiry (exp dalam detik)
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return false; // Token expired
    }
    return true; // Token masih berlaku
  } catch (error) {
    return false;
  }
};

// Function to check and update auth state
const checkAuthState = async () => {
  if (process.client) {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.accessToken) {
      const isValid = validateToken(storedUser.accessToken);
      if (isValid) {
        updateAuthState(storedUser);
      } else {
        // Token is invalid, clear auth state
        localStorage.removeItem('user');
        localStorage.removeItem('profilePic');
        localStorage.removeItem('dropdowns');
        updateAuthState(null);
      }
    } else {
      updateAuthState(null);
    }
  }
};

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
  isAuthChecked.value = true;
  // Dispatch event to notify other components
  window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: newUser }));
};

// Provide the auth state and update function to child components
provide('authState', {
  user,
  isAuthenticated,
  updateAuthState,
  isAuthChecked
});

// On component mount, check if the user is logged in
onMounted(async () => {
  // Check auth state immediately
  await checkAuthState();

  // Listen for storage events to handle auth state changes
  window.addEventListener('storage', async () => {
    await checkAuthState();
  });

  // Add route change listener to check auth state on navigation
  window.addEventListener('popstate', async () => {
    await checkAuthState();
  });

  // Listen for auth state changes from other components
  window.addEventListener('auth-state-changed', (event) => {
    user.value = event.detail || {};
  });
});
</script>
