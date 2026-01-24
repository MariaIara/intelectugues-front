<script setup>
import { computed } from 'vue';

const props = defineProps({
    icon: {
        type: Object,
        required: true
    },
    backgroundColor: String,
    effectsColor: String,
    textColor: String,
    backgroundColorIcon: String
});

const iconGradient = computed(() =>
    `linear-gradient(to right, ${props.effectsColor}, ${props.backgroundColorIcon})`
)
</script>

<template>
    <div class="border-r-2 border-[#D9D9D9] p-6 flex justify-start items-center">
        <div class="flex items-center gap-6 rounded-3xl p-6 min-w-fit" :style="{
            backgroundColor: props.backgroundColor,
            border: `3px solid ${props.effectsColor}`,
            color: props.textColor
        }">
            <div class="m-auto bg-linear-to-r p-6 rounded-2xl" :style="{
                background: iconGradient
            }">
                <component :is="props.icon" class="h-12 w-12" :style="{ color: props.backgroundColor }" />
            </div>
            <div>
                <h5 class="font-medium font-[Poppins] text-2xl">Concordância</h5>
                <div class="bg-[#FFFFFF] rounded-full w-full h-2.5 mt-1">
                    <div class="rounded-full w-8/10 h-2.5" :style="{
                        backgroundColor: props.effectsColor
                    }"></div>
                </div>
                <p>80%</p>
            </div>
        </div>
    </div>
    <div class="border-l-2 border-[#D9D9D9] p-6 flex justify-center items-center">
        <p class="rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.25)] py-2 px-6 max-w-fit">💡 Antes de P ou B: use M</p>
    </div>
</template>