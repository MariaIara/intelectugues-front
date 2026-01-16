<script setup>
const props = defineProps(['title', 'color', 'shadowColor']);
</script>

<template>
    <button type="button"
        class="block font-[Poppins] w-max px-10 py-2 rounded-lg text-white font-bold cursor-pointer hover:shadow-none hover:translate-y-1 transition-all"
        :style="{
            backgroundColor: props.color,
            boxShadow: `4px 4px 0 ${props.shadowColor}`
        }">
        {{ props.title }}
    </button>
</template>