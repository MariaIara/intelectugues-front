<script setup>
import { computed } from 'vue';
import { Drama, Handshake, NotebookPen, Sparkles } from 'lucide-vue-next'

const { track } = defineProps(['track']);

const icons = {
    Drama,
    Handshake,
    NotebookPen,
    Sparkles
};

const tips = [
    '💡 Antes de P ou B: use M',
    '💡 Som de Z entre vogais: use S',
    '💡 Plural de palavras em ÃO: ões',
    '💡 Plural de palavras em L: is'
];

const isRight = computed(() => track.index % 2 === 0);

const iconGradient = computed(() =>
    `linear-gradient(to right, ${track.metadata.effectsColor}, ${track.metadata.backgroundColorIcon})`
);

</script>

<template>
    <template v-if="isRight">
        <router-link :to="`/app/track/${track.id}`"
            class="border-r-2 border-[#D9D9D9] p-6 flex justify-start items-center">
            <div class="flex justify-between items-center gap-6 rounded-3xl p-6 w-full" :style="{
                backgroundColor: track.metadata.backgroundColor,
                border: `3px solid ${track.metadata.effectsColor}`,
                color: track.metadata.textColor
            }">
                <div class="m-auto p-6 rounded-2xl" :style="{ background: iconGradient }">
                    <component :is="icons[track.metadata.icon]" class="h-12 w-12"
                        :style="{ color: track.metadata.backgroundColor }" />
                </div>

                <div class="flex-1">
                    <h5 class="font-medium font-[Poppins] text-2xl">{{ track.name }}</h5>

                    <div class="bg-[#FFFFFF] rounded-full w-full h-2.5 mt-1">
                        <div class="rounded-full w-8/10 h-2.5" :style="{
                            backgroundColor: track.metadata.effectsColor,
                            width: `${track.track_progress}%`
                        }" />
                    </div>

                    <p> {{ track.track_progress }}%</p>
                </div>
            </div>
        </router-link>

        <div class="border-l-2 border-[#D9D9D9] p-6 flex justify-center items-center">
            <p class="rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.25)] py-2 px-6 max-w-fit">
                {{ tips[track.index] }}
            </p>
        </div>
    </template>

    <template v-else>
        <div class="border-r-2 border-[#D9D9D9] p-6 flex justify-center items-center">
            <p class="rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.25)] py-2 px-6 max-w-fit">
                {{ tips[track.index] }}
            </p>
        </div>

        <router-link :to="`/app/track/${track.id}`"
            class="border-l-2 border-[#D9D9D9] p-6 flex justify-end items-center">
            <div class="flex justify-between items-center gap-6 rounded-3xl p-6 w-full" :style="{
                backgroundColor: track.metadata.backgroundColor,
                border: `3px solid ${track.metadata.effectsColor}`,
                color: track.metadata.textColor
            }">
                <div class="m-auto p-6 rounded-2xl" :style="{ background: iconGradient }">
                    <component :is="icons[track.metadata.icon]" class="h-12 w-12"
                        :style="{ color: track.metadata.backgroundColor }" />
                </div>

                <div class="flex-1">
                    <h5 class="font-medium font-[Poppins] text-2xl">{{ track.name }}</h5>

                    <div class="bg-[#FFFFFF] rounded-full w-full h-2.5 mt-1">
                        <div class="rounded-full w-8/10 h-2.5" :style="{
                            backgroundColor: track.metadata.effectsColor,
                            width: `${track.track_progress}%`
                        }" />
                    </div>

                    <p> {{ track.track_progress }}%</p>
                </div>
            </div>
        </router-link>
    </template>
</template>
