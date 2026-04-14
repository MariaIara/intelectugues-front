<script setup>

defineProps({
    userRank: Object,
    index: Number,
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
    <div class="flex items-center rounded-2xl gap-3 mt-3 px-3 md:px-4 py-2" :style="{
        backgroundColor: colors[index]?.backgroundColor,
        border: `2px solid ${colors[index]?.strokeColor}`
    }">
        <span class="text-base font-bold text-[#5B5B5B] w-6 shrink-0 text-center">{{ index }}°</span>
        <img :src="userRank?.avatar?.image" alt="avatar" class="w-10 h-10 rounded-full shrink-0 object-cover">
        <p class="text-sm font-medium text-[#424242] flex-1 truncate">{{ userRank?.name }}</p>
        <span
            class="text-xs font-semibold text-[#246385] bg-[#246385]/10 px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap">
            {{ userRank?.weekly_score }} pts
        </span>
    </div>
</template>