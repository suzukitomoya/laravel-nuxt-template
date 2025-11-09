<script setup lang="ts">
const { $api } = useNuxtApp()

const { data } = useAsyncData('hello', async () => {
  try {
    return await $api<HelloResponse>('/api/hello')
  }
  catch (error) {
    console.error({ error })
    return null
  }
})
</script>

<template>
  <div>
    <h1>Hello, Nuxt!</h1>
    <div>{{ data?.message }}</div>
  </div>
</template>
