<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`,
    { credentials: 'include' }
  )
})
</script>

<template>
  <router-view />
</template>
