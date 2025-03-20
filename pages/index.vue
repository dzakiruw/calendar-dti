<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <!-- Tech Stack Section -->
    <section class="w-full max-w-4xl text-center mb-12">
      <h1 class="text-3xl font-bold flex items-center justify-center gap-2">
        <WrenchScrewdriverIcon class="w-8 h-8 text-purple-600" /> Tech Stack
      </h1>
      <div class="flex flex-wrap justify-center gap-6 mt-4">
        <div v-for="tech in techStack" :key="tech.name" class="flex flex-col items-center">
          <img :src="tech.logo" class="w-12 h-12" alt="Tech Stack Logo" />
          <p class="mt-2 text-gray-700">{{ tech.name }}</p>
        </div>
      </div>
    </section>

    <!-- Team Members Section -->
    <section class="w-full max-w-4xl text-center">
      <h1 class="text-3xl font-bold flex items-center justify-center gap-2">
        <i class="fas fa-users text-purple-600"></i> Team Members
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
        <div v-for="member in teamMembers" :key="member.name" class="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
          <img :src="member.avatar" class="w-20 h-20 rounded-full border-2 border-gray-300" />
          <h2 class="mt-3 text-xl font-semibold">{{ member.name }}</h2>
          <p class="text-gray-600 mt-2">{{ member.nrp }}</p>
          <p class="text-gray-600">{{ member.role }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { WrenchScrewdriverIcon, UserGroupIcon, CubeTransparentIcon, BoltIcon, CpuChipIcon, RocketLaunchIcon } from "@heroicons/vue/24/solid";

const techStack = ref([
  { name: "Nuxt.js", logo: "/logo-nuxtjs.svg" },
  { name: "Vue.js", logo: "/logo-vuejs.svg" },
  { name: "Tailwind CSS", logo: "/logo-tailwindcss.svg" },
  { name: "Express.js", logo: "/logo-expressjs.svg" },
]);

// Team Members List
const teamMembers = ref([
  { name: "Sulthan Akmal Rafliansyah", nrp: "5027211039", role: "UI/UX Designer & Frontend Developer", avatar: "/rafly.png" },
  { name: "Adiba Zalfa Camilla", nrp: "5027211060", role: "Backend Developer & DevOps", avatar: "/diba.png" },
  { name: "Tarisha Syira Mazaya Putri", nrp: "5027211061", role: "Algorithm & Frontend Dev", avatar: "/icha.png" },
  { name: "Dzakirozaaan Uzlahwasata", nrp: "5027211066", role: "Algorithm & Backend Dev", avatar: "/dzaki.png" },
]);
</script>
