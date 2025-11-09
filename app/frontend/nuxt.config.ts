// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
  ],
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    ssrApiBaseUrl: '',
    public: {
      apiBaseUrl: '',
    },
  },
  devServer: {
    port: 3000,
  },
  compatibilityDate: '2025-11-09',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
