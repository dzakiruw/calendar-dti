<template>
  <div class="flex h-screen">
    <!-- Sidebar (Fixed on the left) -->
    <div class="w-64 h-screen bg-gray-100 shadow-md fixed">
      <sidebar />
    </div>

    <!-- Main Content (Takes remaining space) -->
    <div class="flex-1 ml-64 flex items-center justify-center bg-gray-50">
      <slot />
    </div>
  </div>
</template>

<script setup>
import sidebar from '~/components/sidebar.vue'
</script>
