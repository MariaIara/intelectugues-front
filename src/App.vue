<script>
await fetch('http://localhost/sanctum/csrf-cookie', {
  credentials: 'include'
});
</script>

<template>
  <router-view />
</template>
