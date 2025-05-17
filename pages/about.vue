<template>
  <div class="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen flex flex-col items-center justify-center">
    <!-- Team Members Section -->
    <section class="w-full py-8">
      <div class="max-w-5xl mx-auto px-4 flex flex-col items-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center justify-center gap-3 mb-6">
          <i class="fas fa-users text-blue-600"></i>
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Team Members</span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center">
          <a
            v-for="member in teamMembers"
            :key="member.name"
            :href="member.linkedin"
            target="_blank"
            class="group flex flex-col items-center p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <div class="relative mb-2">
              <img 
                :src="member.avatar" 
                class="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover group-hover:border-blue-100"
              />
              <div class="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 shadow-lg group-hover:bg-indigo-600 flex items-center justify-center">
                <i class="fab fa-linkedin-in text-sm"></i>
              </div>
            </div>
            <h3 class="text-sm font-bold text-gray-800 mb-1 text-center group-hover:text-blue-600">{{ member.name }}</h3>
            <p class="text-xs text-gray-500">{{ member.nrp }}</p>
            <p class="text-xs font-medium text-blue-600 group-hover:text-indigo-600">Developer</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="w-full py-8">
      <div class="max-w-5xl mx-auto px-4 flex flex-col items-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center justify-center gap-3 mb-6">
          <WrenchScrewdriverIcon class="w-8 h-8 text-blue-600" />
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tech Stack</span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center">
          <a
            v-for="tech in techStack"
            :key="tech.name"
            :href="tech.link"
            target="_blank"
            class="group flex flex-col items-center p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <img :src="tech.logo" class="w-16 h-16 object-contain mb-2 group-hover:animate-bounce" :alt="tech.name + ' Logo'" />
            <p class="text-sm font-semibold text-gray-700 group-hover:text-blue-600">{{ tech.name }}</p>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
</script> 