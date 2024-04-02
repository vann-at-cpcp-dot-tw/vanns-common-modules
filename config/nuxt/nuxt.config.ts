// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  srcDir: 'src/',
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './src/components/ui'
  },
  css: ['~/styles/index.sass'],
})
