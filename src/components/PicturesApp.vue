<script setup>
import desktop from '@/assets/app-desktop.png'
import mobile from '@/assets/app-mobile.png'
</script>
<template>
    <div class="relative flex justify-center w-full lg:w-auto">
        <img :src="desktop" alt="image app desktop" class="w-full max-w-sm md:max-w-lg lg:w-225">
        <img :src="mobile" alt="image app mobile" class="hidden sm:block absolute -right-4 -bottom-10 w-28 h-48 md:-right-6 md:-bottom-12 md:w-36 md:h-60 lg:-right-10 lg:-bottom-16 lg:w-54 lg:h-90">
    </div>
</template>