<script setup>
import Logo from "@/components/Logo.vue";

</script>

<template>
    <header class="bg-white flex flex-col sm:flex-row justify-between items-center gap-6 px-6 py-6 md:px-16 md:py-8 lg:px-30">
        <Logo />
        <div class="flex flex-wrap justify-center font-md font-[Poppins] text-md gap-x-6 gap-y-2 md:gap-x-10 lg:gap-x-22">
            <a href="#">Sobre nós</a>
            <a href="#">© 2025 Intelectugues</a>
            <a href="#">Termos de Uso</a>
            <a href="#">Privacidade</a>
        </div>
    </header>
</template>