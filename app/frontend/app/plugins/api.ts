// Base https://nuxt.com/docs/guide/recipes/custom-usefetch

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: (import.meta.server && config.ssrApiBaseUrl)
      ? config.ssrApiBaseUrl
      : config.public.apiBaseUrl,
    headers: {
      Accept: 'application/json',
    },
  })

  return {
    provide: {
      api,
    },
  }
})
