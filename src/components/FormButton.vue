<script setup>
const props = defineProps(['title']);
</script>

<template>
    <button type="button"
        class="block font-[Poppins] bg-[#98BF45] w-max mx-auto px-10 py-3 rounded-lg text-white font-bold shadow-[4px_4px_0_#6F8C30] mt-6 cursor-pointer hover:shadow-none hover:translate-1 transition-all">
        {{ props.title }}
    </button>
</template>