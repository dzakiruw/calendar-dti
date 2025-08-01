<template>
  <div v-if="isAuthenticated" class="w-full h-full bg-white/40 backdrop-blur-xl text-gray-900 flex flex-col relative border-r border-white/70 shadow-lg">
    <!-- Sidebar Header -->
    <div class="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-xl">
      <div class="flex items-center space-x-3">
        <img 
          :src="profilePic" 
          alt="User Profile" 
          class="w-10 h-10 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-300 object-cover border border-white/40" 
          @error="$event.target.src = '/logo.png'"
        />
        <div class="flex flex-col">
          <h1 class="text-lg font-bold text-white leading-tight">Perkuliahan</h1>
          <span class="text-sm text-blue-100 font-medium mt-1">{{ userName }}</span>
        </div>
      </div>
    </div>

    <!-- Toggle Button - Fixed Position -->
    <button 
      @click="toggleSidebar" 
      class="absolute -right-10 top-4 bg-white/40 backdrop-blur-xl p-2 rounded-r-lg shadow-md hover:bg-gray-100/60 transition-colors z-30 border border-white/70"
    >
      <i class="fas" :class="[
        (isDesktop && isDesktopCollapsed) || (!isDesktop && !isMobileOpen) 
          ? 'fa-chevron-right' 
          : 'fa-chevron-left'
      ]"></i>
    </button>

    <!-- Sidebar Menu -->
    <nav class="flex-1 px-3 py-4 overflow-y-auto bg-gradient-to-b from-gray-50/40 to-white/40 backdrop-blur-xl">
      <!-- Home -->
      <div class="mb-4">
        <NuxtLink to="/" 
          class="flex items-center px-4 py-3 rounded-xl transition-all duration-300 group"
          :class="[
            route.path === '/' 
              ? 'bg-indigo-100/40 backdrop-blur-xl text-indigo-700 border-l-4 border-indigo-600/70 shadow-sm' 
              : 'text-gray-600 hover:bg-blue-50/40 hover:backdrop-blur-xl hover:shadow-sm'
          ]"
          @click="handleClick"
        >
          <div class="flex items-center">
            <div class="p-2 rounded-lg w-9 h-9 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   route.path === '/'
                     ? 'bg-indigo-200/60 backdrop-blur-xl shadow-inner'
                     : 'bg-blue-100/40 backdrop-blur-xl group-hover:bg-blue-200/60 shadow-inner'
                 ]">
              <i class="fas fa-home" :class="route.path === '/' ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 font-medium" :class="route.path === '/' ? 'text-indigo-700' : 'group-hover:text-blue-600'">Home</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Data Kalender (Dropdown) -->
      <div class="mb-4 space-y-1">
        <button 
          @click="toggleDropdown('kalender')" 
          class="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 group"
          :class="[
            activeInKalender && !isSpecificKalenderRoute
              ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600'
              : 'text-gray-600 hover:bg-blue-50'
          ]"
        >
          <div class="flex items-center">
            <div class="p-2 rounded-lg w-9 h-9 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   activeInKalender && !isSpecificKalenderRoute
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-calendar-alt" :class="activeInKalender && !isSpecificKalenderRoute ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 font-medium" :class="activeInKalender && !isSpecificKalenderRoute ? 'text-indigo-700' : 'group-hover:text-blue-600'">Data Kalender</span>
          </div>
          <i :class="[
               dropdowns.kalender ? 'fas fa-chevron-up' : 'fas fa-chevron-down',
               activeInKalender && !isSpecificKalenderRoute ? 'text-indigo-700' : 'text-gray-400 group-hover:text-blue-600'
             ]"
             class="transition-transform duration-300"
             :style="{ transform: dropdowns.kalender ? 'rotate(-180deg)' : 'rotate(0)' }"
          ></i>
        </button>
        <div v-if="dropdowns.kalender" class="pl-4 space-y-1">
          <NuxtLink to="/mata-kuliah" 
            class="flex items-center px-4 py-2 rounded-xl transition-all duration-300 group"
            :class="[
              route.path === '/mata-kuliah'
                ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600'
                : 'text-gray-600 hover:bg-blue-50'
            ]"
            @click="handleClick"
          >
            <div class="p-2 rounded-lg w-8 h-8 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   route.path === '/mata-kuliah'
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-book" :class="route.path === '/mata-kuliah' ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 text-sm font-medium" :class="route.path === '/mata-kuliah' ? 'text-indigo-700' : 'group-hover:text-blue-600'">Mata Kuliah</span>
          </NuxtLink>
          <NuxtLink to="/dosen" 
            class="flex items-center px-4 py-2 rounded-xl transition-all duration-300 group"
            :class="[
              route.path === '/dosen'
                ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600'
                : 'text-gray-600 hover:bg-blue-50'
            ]"
            @click="handleClick"
          >
            <div class="p-2 rounded-lg w-8 h-8 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   route.path === '/dosen'
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-user-tie" :class="route.path === '/dosen' ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 text-sm font-medium" :class="route.path === '/dosen' ? 'text-indigo-700' : 'group-hover:text-blue-600'">Dosen</span>
          </NuxtLink>
          <NuxtLink to="/ruang-kelas" 
            class="flex items-center px-4 py-2 rounded-xl transition-all duration-300 group"
            :class="[
              route.path === '/ruang-kelas'
                ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600'
                : 'text-gray-600 hover:bg-blue-50'
            ]"
            @click="handleClick"
          >
            <div class="p-2 rounded-lg w-8 h-8 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   route.path === '/ruang-kelas'
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-chalkboard-teacher" :class="route.path === '/ruang-kelas' ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 text-sm font-medium" :class="route.path === '/ruang-kelas' ? 'text-indigo-700' : 'group-hover:text-blue-600'">Ruang Kelas</span>
          </NuxtLink>
          <NuxtLink to="/jadwal-hindari" 
            class="flex items-center px-4 py-2 rounded-xl transition-all duration-300 group"
            :class="[
              route.path === '/jadwal-hindari'
                ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600'
                : 'text-gray-600 hover:bg-blue-50'
            ]"
            @click="handleClick"
          >
            <div class="p-2 rounded-lg w-8 h-8 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   route.path === '/jadwal-hindari'
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-calendar-times" :class="route.path === '/jadwal-hindari' ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 text-sm font-medium" :class="route.path === '/jadwal-hindari' ? 'text-indigo-700' : 'group-hover:text-blue-600'">Jadwal Hindari</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Jadwal (Dropdown) -->
      <div class="mb-4 space-y-1">
        <button 
          @click="toggleDropdown('jadwal')" 
          class="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 group"
          :class="[
            activeInJadwal && !isSpecificJadwalRoute
              ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600'
              : 'text-gray-600 hover:bg-blue-50'
          ]"
        >
          <div class="flex items-center">
            <div class="p-2 rounded-lg w-9 h-9 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   activeInJadwal && !isSpecificJadwalRoute
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-calendar-check" :class="activeInJadwal && !isSpecificJadwalRoute ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 font-medium" :class="activeInJadwal && !isSpecificJadwalRoute ? 'text-indigo-700' : 'group-hover:text-blue-600'">Jadwal</span>
          </div>
          <i :class="[
               dropdowns.jadwal ? 'fas fa-chevron-up' : 'fas fa-chevron-down',
               activeInJadwal && !isSpecificJadwalRoute ? 'text-indigo-700' : 'text-gray-400 group-hover:text-blue-600'
             ]"
             class="transition-transform duration-300"
             :style="{ transform: dropdowns.jadwal ? 'rotate(-180deg)' : 'rotate(0)' }"
          ></i>
        </button>
        <div v-if="dropdowns.jadwal" class="pl-4 space-y-1">
          <NuxtLink to="/jadwal-matching" 
            class="flex items-center px-4 py-2 rounded-xl transition-all duration-300 group"
            :class="[
              route.path === '/jadwal-matching'
                ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600'
                : 'text-gray-600 hover:bg-blue-50'
            ]"
            @click="handleClick"
          >
            <div class="p-2 rounded-lg w-8 h-8 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   route.path === '/jadwal-matching'
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-edit" :class="route.path === '/jadwal-matching' ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 text-sm font-medium" :class="route.path === '/jadwal-matching' ? 'text-indigo-700' : 'group-hover:text-blue-600'">Jadwal Matching</span>
          </NuxtLink>
          <NuxtLink to="/pilih-jadwal" 
            class="flex items-center px-4 py-2 rounded-xl transition-all duration-300 group"
            :class="[
              route.path === '/pilih-jadwal'
                ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600'
                : 'text-gray-600 hover:bg-blue-50'
            ]"
            @click="handleClick"
          >
            <div class="p-2 rounded-lg w-8 h-8 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   route.path === '/pilih-jadwal'
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-list" :class="route.path === '/pilih-jadwal' ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 text-sm font-medium" :class="route.path === '/pilih-jadwal' ? 'text-indigo-700' : 'group-hover:text-blue-600'">Generate Jadwal</span>
          </NuxtLink>
        </div>
      </div>

      <!-- About / Tentang -->
      <div class="mb-4">
        <NuxtLink to="/about" 
          class="flex items-center px-4 py-3 rounded-xl transition-all duration-300 group"
          :class="[
            route.path === '/about' 
              ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600' 
              : 'text-gray-600 hover:bg-blue-50'
          ]"
          @click="handleClick"
        >
          <div class="flex items-center">
            <div class="p-2 rounded-lg w-9 h-9 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   route.path === '/about'
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-info-circle" :class="route.path === '/about' ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 font-medium" :class="route.path === '/about' ? 'text-indigo-700' : 'group-hover:text-blue-600'">Tentang</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Users Management -->
      <div class="mb-4" v-if="user?.role === 'ADMINISTRATOR'">
        <NuxtLink to="/users" 
          class="flex items-center px-4 py-3 rounded-xl transition-all duration-300 group"
          :class="[
            route.path === '/users' 
              ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600' 
              : 'text-gray-600 hover:bg-blue-50'
          ]"
          @click="handleClick"
        >
          <div class="flex items-center">
            <div class="p-2 rounded-lg w-9 h-9 flex items-center justify-center transition-colors duration-300"
                 :class="[
                   route.path === '/users'
                     ? 'bg-indigo-200'
                     : 'bg-blue-100 group-hover:bg-blue-200'
                 ]">
              <i class="fas fa-users" :class="route.path === '/users' ? 'text-indigo-700' : 'text-blue-600'"></i>
            </div>
            <span class="ml-3 font-medium" :class="route.path === '/users' ? 'text-indigo-700' : 'group-hover:text-blue-600'">Manajemen Pengguna</span>
          </div>
        </NuxtLink>
      </div>
    </nav>

    <!-- Sidebar Footer -->
    <div class="px-4 py-4 bg-gradient-to-r from-gray-50/40 to-white/40 backdrop-blur-xl border-t border-white/70">
      <div class="flex items-center justify-between">
        <NuxtLink to="/profile" 
          class="flex items-center space-x-3 group" 
          @click="handleClick"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 shadow-inner"
               :class="[
                 route.path === '/profile'
                   ? 'bg-indigo-200/60 backdrop-blur-xl'
                   : 'bg-blue-100/40 backdrop-blur-xl group-hover:bg-blue-200/60'
               ]">
              <i class="fas fa-user" :class="route.path === '/profile' ? 'text-indigo-700' : 'text-blue-600'"></i>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium" :class="route.path === '/profile' ? 'text-indigo-700' : 'text-gray-700 group-hover:text-blue-600'">{{ user.username }}</span>
            <span class="text-xs text-gray-500">View Profile</span>
          </div>
        </NuxtLink>

        <button 
          @click="handleLogout" 
          class="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50/40 hover:backdrop-blur-xl hover:text-red-600 transition-colors duration-300 shadow-inner"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed, watch, onUnmounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

// Get runtime config for API base URL
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

const dropdowns = ref({
  kalender: false,
  jadwal: false,
});

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['closeSidebar', 'toggleSidebar']);

// Inject auth state from layout
const { user, isAuthenticated, updateAuthState } = inject('authState');

// Sidebar states
const isDesktopCollapsed = ref(false);
const isMobileOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 1024);

// Check viewport size on resize
const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

// Check if sidebar is collapsed from localStorage
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    isDesktopCollapsed.value = savedCollapsed === 'true';
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Watch for sidebar state changes from parent component
const updateSidebarState = (event) => {
  if (event.detail) {
    isDesktopCollapsed.value = event.detail.isDesktopCollapsed;
    isMobileOpen.value = event.detail.isMobileOpen;
  }
};

// Profile picture logic
const profilePic = ref(localStorage.getItem('profilePic') || '/avatar.svg');

const updateProfilePic = () => {
  profilePic.value = localStorage.getItem('profilePic') || '/avatar.svg';
};

// User name from API
const userName = ref('');

onMounted(async () => {
  window.addEventListener('storage', updateProfilePic);
  window.addEventListener('sidebar-state-changed', updateSidebarState);
  updateProfilePic();
  
  // Fetch user name from API
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (token) {
      const res = await axios.get(`${apiBaseUrl}/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      userName.value = res.data?.name || res.data?.username || '';
    }
  } catch (e) {
    userName.value = user?.username || '';
  }
  const storedDropdowns = JSON.parse(localStorage.getItem('dropdowns'));
  if (storedDropdowns) {
    dropdowns.value = storedDropdowns;
  }
  if (isKalenderActive.value) {
    dropdowns.value.kalender = true;
  }
  if (isJadwalActive.value) {
    dropdowns.value.jadwal = true;
  }
});

onUnmounted(() => {
  window.removeEventListener('storage', updateProfilePic);
  window.removeEventListener('sidebar-state-changed', updateSidebarState);
});

// Watch for route changes to close sidebar on mobile
watch(route, () => {
  if (!isDesktop.value) {
    emit('closeSidebar');
  }
});

// Computed properties for active states
const activeInKalender = computed(() => {
  return ['/mata-kuliah', '/dosen', '/ruang-kelas', '/jadwal-hindari'].includes(route.path);
});

const activeInJadwal = computed(() => {
  return ['/jadwal-matching', '/pilih-jadwal'].includes(route.path);
});

// Check if a specific route is active to avoid highlighting parent
const isSpecificKalenderRoute = computed(() => {
  return ['/mata-kuliah', '/dosen', '/ruang-kelas', '/jadwal-hindari'].includes(route.path);
});

const isSpecificJadwalRoute = computed(() => {
  return ['/jadwal-matching', '/pilih-jadwal'].includes(route.path);
});

// Toggle sidebar
const toggleSidebar = () => {
  emit('toggleSidebar');
};

// Handle link clicks on mobile
const handleClick = () => {
  // Check if we're on mobile by checking window width
  if (!isDesktop.value) {
    emit('closeSidebar');
  }
};

// Logout function
const handleLogout = () => {
  // Clear all auth-related data
  localStorage.removeItem('user');
  localStorage.removeItem('profilePic');
  localStorage.removeItem('dropdowns');
  
  // Update auth state
  updateAuthState(null);
  
  // Force a page reload to ensure clean state
  window.location.href = '/';
};

// Toggle dropdowns
const toggleDropdown = (menu) => {
  dropdowns.value[menu] = !dropdowns.value[menu];
  // Save dropdown state to localStorage
  localStorage.setItem('dropdowns', JSON.stringify(dropdowns.value));
};
</script>