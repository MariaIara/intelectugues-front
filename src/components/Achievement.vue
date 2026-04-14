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
    `linear-gradient(135deg, ${props.effectsColor}, ${props.backgroundColorIcon})`
)

</script>

<template>
    <div
        class="relative flex flex-col items-center rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#F0F0F0] font-[Poppins] text-[#424242] overflow-hidden h-full min-h-35 md:min-h-40 xl:min-h-45 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.13)]">
        <div class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" :style="{ background: iconGradient }" />

        <div
            class="flex flex-col items-center justify-between gap-3 px-3 pt-6 pb-4 md:px-4 md:pt-7 md:pb-5 xl:px-5 xl:pt-8 xl:pb-6 h-full w-full text-center">
            <div class="rounded-full text-white p-2.5 md:p-3 shrink-0" :style="{ background: iconGradient }">
                <component :is="props.icon" class="h-5 w-5 md:h-6 md:w-6 xl:h-7 xl:w-7" />
            </div>

            <p
                class="text-xs md:text-sm xl:text-base font-semibold leading-snug line-clamp-3 flex-1 flex items-center justify-center">
                {{ props.text }}
            </p>
        </div>
    </div>
</template>