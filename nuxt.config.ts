// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-20',
  devtools: { enabled: true },

  // Only include the Tailwind CSS module
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  // External resources like Font Awesome
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
        },
      ],
    },
  },
})