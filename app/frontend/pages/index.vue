<script setup lang="ts">
import type { HelloResponse } from '~/types'

const { data } = await useAppFetch<HelloResponse>('/api/hello')
</script>

<template>
  <div>
    <h1>Hello, Nuxt!</h1>
    <div>{{ data?.message }}</div>
  </div>
</template>
