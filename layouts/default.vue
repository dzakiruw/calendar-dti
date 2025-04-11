<template>
  <div class="flex h-screen">
    <!-- Sidebar (Fixed on the left) -->
    <div v-if="user.username" :class="{'bg-gray-100': showSidebarBackground, 'bg-transparent': !showSidebarBackground}" class="w-64 h-screen shadow-md fixed">
      <sidebar />
    </div>

    <!-- Main Content (Takes remaining space) -->
    <div :class="{'ml-64': user.username, 'ml-0': !user.username}" class="flex-1 flex items-center justify-center bg-gray-50">
      <slot />
    </div>
  </div>
</template>

<script setup>
import sidebar from '~/components/sidebar.vue'
import { ref, onMounted } from 'vue'

const user = ref({});
const showSidebarBackground = ref(false);

// Function to handle logout
const logout = () => {
  localStorage.removeItem('user');
  user.value = {}; // Clear user state
  showSidebarBackground.value = false; // Hide sidebar background immediately
  window.location.reload();  // Optional: Force a reload to ensure UI consistency
}

// On component mount, check if the user is logged in
onMounted(() => {
  if (process.client) { // Only run this in the browser (client-side)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      user.value = storedUser;  // Set user data in state if found
      showSidebarBackground.value = true; // Show sidebar background when logged in
    } else {
      showSidebarBackground.value = false; // Hide sidebar background if not logged in
    }

    // You can safely use window or document here
    window.addEventListener('storage', () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser) {
        user.value = updatedUser;
        showSidebarBackground.value = true;
      } else {
        user.value = {};
        showSidebarBackground.value = false;
      }
    });
  }
});
</script>
