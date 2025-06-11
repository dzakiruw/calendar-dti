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
        <div class="flex flex-col items-center md:items-start md:w-1/2 p-8">
          <div class="flex items-center space-x-6 mb-8">
            <img src="/logo.png" alt="DTI Logo" class="w-32 h-32 rounded-lg shadow-lg animate-pulse object-contain" />
            <div class="flex flex-col">
              <h1 class="text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">JADI</h1>
              <span class="text-xl text-gray-600">Jadwal Automasi Departemen ITS</span>
            </div>
          </div>
          <h2 class="text-4xl sm:text-5xl font-bold text-gray-800 text-center md:text-left mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Selamat Datang!
          </h2>
          <p class="text-lg sm:text-xl text-gray-600 text-center md:text-left mb-8 max-w-2xl">
            Sistem Penjadwalan Perkuliahan yang membantu Anda mengatur jadwal dengan mudah dan efisien
          </p>
        </div>

        <!-- Right side - Login Form -->
        <div class="md:w-1/2 w-full max-w-md">
          <div class="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full border border-white/70 hover:shadow-blue-100/30 transition-all duration-500">
            <h2 class="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Login</h2>
            <form @submit.prevent="login" class="w-full">
              <div class="mb-5">
                <label class="block text-gray-700 font-semibold mb-2">Username</label>
                <input
                  v-model="username"
                  type="text"
                  class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div class="mb-5">
                <label class="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="w-full p-3 border border-gray-200/50 bg-white/40 backdrop-blur-xl rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
                  placeholder="Enter password"
                  required
                />
              </div>
              <p v-if="errorMessage" class="text-red-600 text-sm mb-4">{{ errorMessage }}</p>
              <button
                type="submit"
                class="bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-xl text-white py-3 px-4 rounded-lg w-full hover:from-blue-700/90 hover:to-indigo-700/90 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Page -->
    <div v-else class="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 py-12">
        <!-- Header Section with Logo and App Name -->
        <div class="flex flex-col items-center text-center mb-10">
          <div class="flex items-center space-x-8 mb-10">
            <img src="/logo.png" alt="DTI Logo" class="w-32 h-32 rounded-lg shadow-lg animate-pulse object-contain" />
            <div class="flex flex-col items-start">
              <h1 class="text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">JADI</h1>
              <span class="text-2xl text-gray-600">Jadwal Automasi Departemen ITS</span>
            </div>
          </div>
          <div class="max-w-4xl">
            <p class="text-xl text-gray-600 leading-relaxed">
              JADI adalah sistem penjadwalan dengan fleksibilitas untuk menciptakan jadwal kuliah yang optimal. Dengan JADI, proses penjadwalan yang sebelumnya memakan waktu berjam-jam kini dapat diselesaikan dalam hitungan menit, sambil tetap mempertimbangkan preferensi dosen dan ketersediaan ruangan.
            </p>
          </div>
        </div>

        <!-- Features Section -->
        <section class="mb-16">
          <h2 class="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent pb-1">
            Fitur Unggulan
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white/40 backdrop-blur-xl rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 border border-white/70 hover:shadow-blue-100/30">
              <div class="flex items-center justify-center w-20 h-20 bg-blue-100/50 backdrop-blur-xl rounded-xl mb-6 shadow-md">
                <i class="fas fa-calendar-check text-blue-600 text-3xl"></i>
              </div>
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">Penjadwalan Otomatis</h3>
              <p class="text-gray-600 text-lg text-justify">Sistem cerdas yang menghasilkan jadwal kuliah secara otomatis dengan mempertimbangkan berbagai constraint dan preferensi dosen, menghemat waktu dan mengurangi konflik jadwal.</p>
            </div>

            <div class="bg-white/40 backdrop-blur-xl rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 border border-white/70 hover:shadow-indigo-100/30">
              <div class="flex items-center justify-center w-20 h-20 bg-indigo-100/50 backdrop-blur-xl rounded-xl mb-6 shadow-md">
                <i class="fas fa-users-cog text-indigo-600 text-3xl"></i>
              </div>
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">Manajemen Data Terpadu</h3>
              <p class="text-gray-600 text-lg text-justify">Platform terpusat untuk mengelola semua data akademik, dari mata kuliah hingga ruang kelas, dengan antarmuka yang intuitif dan mudah digunakan.</p>
            </div>

            <div class="bg-white/40 backdrop-blur-xl rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 border border-white/70 hover:shadow-blue-100/30">
              <div class="flex items-center justify-center w-20 h-20 bg-blue-100/50 backdrop-blur-xl rounded-xl mb-6 shadow-md">
                <i class="fas fa-clock text-blue-600 text-3xl"></i>
              </div>
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">Fleksibilitas Maksimal</h3>
              <p class="text-gray-600 text-lg text-justify">Sistem yang adaptif dengan kebutuhan pengguna, memungkinkan penyesuaian jadwal yang cepat dan efisien sesuai dengan perubahan yang diperlukan.</p>
            </div>
          </div>
        </section>
      </div>
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
    const response = await axios.post('http://10.4.90.25:3000/auth/login', {
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