<script setup>
import Logo from "@/components/Logo.vue";
import Button from "@/components/Button.vue";
import router from "@/router";

</script>

<template>
  <header class="bg-white flex justify-between items-center px-18 py-6">
    <Logo />
    <Button title="Entrar" color="#98BF45" shadowColor="#6F8C30" @click="router.push('/app')" />
  </header>
</template>