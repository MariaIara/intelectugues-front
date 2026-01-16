<script setup>
import desktop from '@/assets/app-desktop.png'
import mobile from '@/assets/app-mobile.png'
</script>
<template>
    <div class="relative flex justify-center">
        <img :src="desktop" alt="image app desktop" class="w-225">
        <img :src="mobile" alt="image app mobile" class="absolute -right-10 -bottom-16 w-54 h-90">
    </div>
</template>