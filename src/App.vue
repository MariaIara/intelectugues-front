<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  await fetch(
    // 'http://localhost/sanctum/csrf-cookie',
    'https://intelectugues-api.onrender.com/sanctum/csrf-cookie',
    { credentials: 'include' }
  )
})
</script>

<template>
  <router-view />
</template>
