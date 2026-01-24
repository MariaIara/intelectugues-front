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
        class="flex flex-col items-center rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.25)] font-semibold font-[Poppins] text-lg text-[#424242] py-8 px-6 gap-4">
        <div class="rounded-full text-white p-2 m-auto" :style="{
            background: iconGradient
        }">
            <component :is="props.icon" class="h-9 w-9" />
        </div>
        <h3>{{ props.text }}</h3>
    </div>
</template>