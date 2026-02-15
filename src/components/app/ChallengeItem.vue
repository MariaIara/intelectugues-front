<script setup>
import { CircleCheckBig } from 'lucide-vue-next';

const { challenge } = defineProps([
    'challenge',
    'track'
]);

</script>
<template>
    <div class="flex items-center justify-between rounded-2xl py-6 px-10" :style="{
        backgroundColor: challenge.finished
            ? track.metadata.backgroundColor
            : `${track.metadata.backgroundColor}80`,
        boxShadow: challenge.finished
            ? `8px 8px 0 ${track.metadata.effectsColor}`
            : `8px 8px 0 ${track.metadata.effectsColor}80`,
        color: challenge.finished
            ? track.metadata.textColor
            : `${track.metadata.textColor}80`
    }">
        <div class="flex flex-col font-[Poppins] gap-4">
            <h1 class="font-semibold text-2xl">{{ challenge.name }}</h1>
            <p class="font-medium text-lg">{{ challenge.questions_count }} questões</p>
        </div>
        <div class="flex flex-col gap-4">
            <div class="flex font-[Poppins] font-medium text-lg gap-2">
                <div v-if="challenge.finished">
                    <p>Desafio concluído</p>
                </div>
                <div v-else>
                    <p>Desafio pendente</p>
                </div>
                <CircleCheckBig />
            </div>
            <div class="flex">
                <p class="bg-white rounded-3xl mx-auto py-1 px-4">+{{ challenge.score }} pontos</p>
            </div>
        </div>
    </div>
</template>