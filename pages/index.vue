<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
    <!-- Welcome Message Section -->
    <section class="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex-1 flex items-center">
      <div class="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:shadow-xl">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
          Selamat datang
        </h1>
        <h2 class="text-xl sm:text-2xl font-bold text-blue-600 text-center mb-2">
          {{ userName }}
        </h2>
        <p class="text-sm sm:text-base text-gray-600 text-center mb-4">
          Silahkan generate jadwalmu dengan mudah dan efisien
        </p>
        <div v-if="!isLoggedIn" class="flex justify-center">
          <button 
            @click="redirectToLogin"
            class="px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <i class="fas fa-sign-in-alt mr-2"></i> Login
          </button>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6">
      <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-4">
          <WrenchScrewdriverIcon class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          Tech Stack
        </h1>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <a
            v-for="tech in techStack"
            :key="tech.name"
            :href="tech.link"
            target="_blank"
            class="flex flex-col items-center p-2 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <img :src="tech.logo" class="w-8 h-8 sm:w-12 sm:h-12 object-contain mb-2" :alt="tech.name + ' Logo'" />
            <p class="text-xs sm:text-sm font-medium text-gray-700">{{ tech.name }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Team Members Section -->
    <section class="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6">
      <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-4">
          <i class="fas fa-users text-blue-600"></i>
          Team Members
        </h1>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <a
            v-for="member in teamMembers"
            :key="member.name"
            :href="member.linkedin"
            target="_blank"
            class="flex flex-col items-center p-2 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <div class="relative mb-2">
              <img 
                :src="member.avatar" 
                class="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-md object-cover"
              />
              <div class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1">
                <i class="fab fa-linkedin-in text-xs"></i>
              </div>
            </div>
            <h2 class="text-xs sm:text-sm font-semibold text-gray-800 mb-0.5 text-center">{{ member.name }}</h2>
            <p class="text-xs text-gray-600">{{ member.nrp }}</p>
            <p class="text-xs text-blue-600 font-medium">Developer</p>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { WrenchScrewdriverIcon } from "@heroicons/vue/24/solid";

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

// On component mount, check for logged-in user
onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    user.value = storedUser;
    isLoggedIn.value = true;
    userName.value = storedUser.username || "User";
  }

  window.addEventListener('storage', () => {
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    if (updatedUser) {
      user.value = updatedUser;
      isLoggedIn.value = true;
      userName.value = updatedUser.username || "User";
    } else {
      user.value = {};
      isLoggedIn.value = false;
      userName.value = "User";
    }
  });
});

// Redirect to login page
const redirectToLogin = () => {
  router.push('/login');
};
</script>