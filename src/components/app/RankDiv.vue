<script setup>

defineProps({
    userRank: Object,
    index: Number
})

const colors = {
    1: {
        backgroundColor: '#E6E8EC',
        strokeColor: '#BBC1CB'
    },
    2: {
        backgroundColor: '#F2E6B8',
        strokeColor: '#C9B465'
    },
    3: {
        backgroundColor: '#E3C2A6',
        strokeColor: '#B9906E'
    },
    4: {
        backgroundColor: '#FFFFFF',
        strokeColor: '#E6E6E6'
    },
    5: {
        backgroundColor: '#FFFFFF',
        strokeColor: '#E6E6E6'
    }
}

</script>

<template>
    <div class="flex items-center rounded-3xl gap-2 mt-4 px-4 md:px-6 xl:px-8 py-1.5" :style="{
        backgroundColor: colors[index]?.backgroundColor,
        border: `3px solid ${colors[index]?.strokeColor}`
    }">
        <span class="text-xl text-[#5B5B5B]">{{ index }}°</span>
        <img :src="userRank?.avatar?.image" alt="avatar" class="w-12">
        <p class="text-lg ml-4">{{ userRank?.name }}</p>
    </div>
</template>