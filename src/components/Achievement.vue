<script setup>
import { computed } from 'vue';

const props = defineProps({
    icon: {
        type: Object,
        required: true
    },
    effectsColor: String,
    backgroundColorIcon: String,
    text: String
});

const iconGradient = computed(() =>
    `linear-gradient(to right, ${props.effectsColor}, ${props.backgroundColorIcon})`
)
</script>

<template>
    <div
        class="flex flex-col items-center rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.25)] font-semibold font-[Poppins] text-sm md:text-base xl:text-lg text-[#424242] py-4 px-3 md:py-6 md:px-5 xl:py-8 xl:px-6 gap-3 md:gap-4 text-center">
        <div class="rounded-full text-white p-2 m-auto" :style="{
            background: iconGradient
        }">
            <component :is="props.icon" class="h-6 w-6 md:h-7 md:w-7 xl:h-9 xl:w-9" />
        </div>
        <h3>{{ props.text }}</h3>
    </div>
</template>