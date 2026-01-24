<script setup>
const props = defineProps(['position', 'picture', 'name', 'backgroundColor', 'strokeColor']);
</script>

<template>
    <div class="flex items-center rounded-3xl gap-2 mt-5 px-8 py-1.5" :style="{
        backgroundColor: props.backgroundColor,
        border: `3px solid ${props.strokeColor}`
    }">
        <span class="text-xl text-[#5B5B5B]">{{ props.position }}°</span>
        <img :src="picture" alt="" class="w-12">
        <p class="text-lg ml-4">{{ props.name }}</p>
    </div>
</template>