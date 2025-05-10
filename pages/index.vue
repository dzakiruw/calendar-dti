<template>
  <div>
    <!-- Loading state -->
    <div v-if="!isAuthChecked" class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>

    <!-- Login Page -->
    <div v-else-if="!isLoggedIn" class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div class="w-full max-w-5xl flex flex-col md:flex-row items-start justify-between gap-8">
        <!-- Left side - Welcome Content -->
        <div class="flex flex-col items-center md:items-start md:w-1/2">
          <img src="/logo-jadi.png" alt="DTI Logo" class="w-45 max-w-xs h-auto mb-6 animate-pulse object-contain" />
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 text-center md:text-left mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Selamat Datang!
          </h1>
          <p class="text-base sm:text-lg text-gray-600 text-center md:text-left mb-8 max-w-xl">
            Sistem Penjadwalan Perkuliahan yang membantu Anda mengatur jadwal dengan mudah dan efisien
          </p>
        </div>

        <!-- Right side - Login Form -->
        <div class="md:w-1/2 w-full max-w-md">
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full border border-gray-100">
            <h2 class="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Login</h2>
            <form @submit.prevent="login" class="w-full">
              <div class="mb-5">
                <label class="block text-gray-700 font-semibold mb-2">Username</label>
                <input
                  v-model="username"
                  type="text"
                  class="w-full p-3 border rounded-lg"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div class="mb-5">
                <label class="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="w-full p-3 border rounded-lg"
                  placeholder="Enter password"
                  required
                />
              </div>
              <p v-if="errorMessage" class="text-red-600 text-sm mb-4">{{ errorMessage }}</p>
              <button
                type="submit"
                class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg w-full hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Page -->
    <div v-else class="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen flex items-center justify-center">
      <!-- Features Section -->
      <section class="w-full flex items-center justify-center">
        <div class="max-w-5xl mx-auto px-4 w-full">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div class="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
              <div class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <i class="fas fa-calendar-check text-blue-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Penjadwalan Otomatis</h3>
              <p class="text-gray-600">Generate jadwal kuliah secara otomatis dengan mempertimbangkan berbagai constraint.</p>
            </div>
            <div class="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
              <div class="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <i class="fas fa-users-cog text-indigo-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Manajemen Data</h3>
              <p class="text-gray-600">Kelola data mata kuliah, dosen, dan ruang kelas dengan mudah dan terstruktur.</p>
            </div>
            <div class="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
              <div class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <i class="fas fa-clock text-blue-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Fleksibel</h3>
              <p class="text-gray-600">Atur jadwal yang dihindari dan preferensi waktu mengajar dosen dengan fleksibel.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useRouter } from 'vue-router'
import { WrenchScrewdriverIcon } from "@heroicons/vue/24/solid";
import axios from 'axios';

// Get auth state from layout
const { user: layoutUser, isAuthenticated, updateAuthState, isAuthChecked } = inject('authState');

// Tech Stack List
const techStack = ref([
  { name: "Nuxt.js", logo: "/logo-nuxtjs.svg", link: "https://nuxt.com" },
  { name: "Vue.js", logo: "/logo-vuejs.svg", link: "https://vuejs.org" },
  { name: "Tailwind CSS", logo: "/logo-tailwindcss.svg", link: "https://tailwindcss.com" },
  { name: "Express.js", logo: "/logo-expressjs.svg", link: "https://expressjs.com" },
]);

// Team Members List
const teamMembers = ref([
  {
    name: "Sulthan Akmal Rafliansyah",
    nrp: "5027211039",
    avatar: "/rafly.png",
    linkedin: "https://www.linkedin.com/in/sulthanrafliansyah/",
  },
  {
    name: "Adiba Zalfa Camilla",
    nrp: "5027211060",
    avatar: "/diba.png",
    linkedin: "https://www.linkedin.com/in/adiba-zalfa-camilla/",
  },
  {
    name: "Tarisha Syira Mazaya Putri",
    nrp: "5027211061",
    avatar: "/icha.png",
    linkedin: "https://www.linkedin.com/in/tarishasyira/",
  },
  {
    name: "Dzakirozaaan Uzlahwasata",
    nrp: "5027211066",
    avatar: "/dzaki.png",
    linkedin: "https://www.linkedin.com/in/dzakirozaanuzlahwasata/",
  },
]);

// User session state
const user = ref({});
const isLoggedIn = ref(false);
const userName = ref("User");
const router = useRouter();

// Add these for login functionality
const username = ref('');
const password = ref('');
const errorMessage = ref('');

// On component mount, check for logged-in user
onMounted(() => {
  // Use layout's auth state
  user.value = layoutUser.value;
  isLoggedIn.value = isAuthenticated.value;
  userName.value = layoutUser.value?.username || "User";

  // Listen for auth state changes from layout
  window.addEventListener('auth-state-changed', (event) => {
    const newUser = event.detail;
    user.value = newUser || {};
    isLoggedIn.value = !!newUser?.accessToken;
    userName.value = newUser?.username || "User";
  });
});

// Handle login
const login = async () => {
  try {
    errorMessage.value = '';
    const response = await axios.post('http://10.15.41.68:3000/auth/login', {
      username: username.value,
      password: password.value
    });

    if (response.data.accessToken) {
      const userData = {
        username: username.value,
        accessToken: response.data.accessToken,
        role: response.data.role
      };

      localStorage.setItem('user', JSON.stringify(userData));
      user.value = userData;
      isLoggedIn.value = true;
      userName.value = username.value;
      
      // Update layout auth state
      updateAuthState(userData);
      
      // Clear form
      username.value = '';
      password.value = '';
      
      // Navigate to home page
      router.push('/');
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = error.response?.data?.message || 'Login failed. Please try again.';
  }
};
</script>