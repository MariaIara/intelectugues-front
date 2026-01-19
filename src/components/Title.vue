<script setup>
const props = defineProps(['title']);
</script>

<template>
    <h3 class="font-semibold font-[Poppins] text-2xl text-[#424242]">{{ props.title }}</h3>
</template>