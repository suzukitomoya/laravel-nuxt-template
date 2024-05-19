<script setup lang="ts">
import type { HelloResponse } from "~/types";

const { data }  = await useFetch<HelloResponse>('http://nginx/api/hello')
</script>

<template>
<div>
  <h1>hello nuxt!</h1>
  <div>{{ data?.message }}</div>
</div>
</template>
