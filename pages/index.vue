<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <!-- Tech Stack Section -->
    <section class="w-full max-w-4xl text-center mb-12">
      <h1 class="text-3xl font-bold flex items-center justify-center gap-2">
        <WrenchScrewdriverIcon class="w-8 h-8 text-gray-600" /> Tech Stack
      </h1>
      <div class="flex flex-wrap justify-center gap-6 mt-4">
        <a
          v-for="tech in techStack"
          :key="tech.name"
          :href="tech.link"
          target="_blank"
          class="flex flex-col items-center transition transform hover:scale-105 hover:cursor-pointer"
        >
          <img :src="tech.logo" class="w-12 h-12 object-contain" :alt="tech.name + ' Logo'" />
          <p class="mt-2 text-gray-700">{{ tech.name }}</p>
        </a>
      </div>
    </section>

    <!-- Team Members Section -->
    <section class="w-full max-w-4xl text-center">
      <h1 class="text-3xl font-bold flex items-center justify-center gap-2">
        <i class="fas fa-users text-gray-600"></i> Team Members
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
        <a
          v-for="member in teamMembers"
          :key="member.name"
          :href="member.linkedin"
          target="_blank"
          class="bg-white p-4 shadow-md rounded-lg flex flex-col items-center transition transform hover:scale-105 hover:cursor-pointer"
        >
          <!-- Avatar Image with proportional size -->
          <img :src="member.avatar" class="w-20 h-20 rounded-full border-2 border-gray-300 object-cover" />
          <h2 class="mt-3 text-xl font-semibold">{{ member.name }}</h2>
          <p class="text-gray-600 mt-2">{{ member.nrp }}</p>
          <p class="text-gray-600">{{ member.role }}</p>
        </a>
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
