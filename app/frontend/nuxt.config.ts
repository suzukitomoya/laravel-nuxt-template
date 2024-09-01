// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',
  nitro: {
    serveStatic: true,
  },
  devServer: {
    port: 3000,
  },
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      // `nuxt build --dotenv .env.serverless`してもruntimeConfigに上書きされない。process.envには入っているため以下のようにしているが、上書きされない理由を調査したい。（ローカルdocker環境では上書きされる）
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || undefined,
    },
  },
  modules: [
    '@nuxt/eslint',
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
