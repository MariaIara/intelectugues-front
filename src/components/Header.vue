<script setup>
import Logo from "@/components/Logo.vue";
import Button from "@/components/Button.vue";
import router from "@/router";

</script>

<template>
  <header class="bg-white flex justify-center sm:justify-between items-center px-4 py-4 md:px-12 md:py-6 lg:px-18">
    <Logo />
    <Button title="Entrar" color="#98BF45" shadowColor="#6F8C30" @click="router.push('/app')" class="hidden sm:block" />
  </header>
</template>