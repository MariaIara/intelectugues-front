<script setup>
import { api } from '@/lib/api'
import { Drama, Handshake, NotebookPen, Sparkles } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const track = ref(null)

const route = useRoute()
const trackId = route.params.id

const icons = {
    Drama,
    Handshake,
    NotebookPen,
    Sparkles
};

async function loadTrack(trackId) {
    try {
        const response = await api.get(`tracks/${trackId}`)

        const apiTrack = response.data.data

        const attemptsData = await loadAttemptsByTrack(apiTrack.id)

        const trackWithData = {
            ...apiTrack,
            track_progress: attemptsData?.track_progress,
            attempts: attemptsData?.attempts
        }

        track.value = trackWithData
    } catch (error) {
        console.error('Erro ao buscar tentativas:', error)
    }
}

async function loadAttemptsByTrack(trackId) {
    try {
        const response = await api.get(
            `user/tracks/${trackId}/challenge-attempts`
        )

        const data = response.data.data

        return {
            track_progress: data.track_progress,
            attempts: data.attempts
        }
    } catch (error) {
        console.error('Erro ao buscar tentativas:', error)
        return null
    }
}

onMounted(() => {
    loadTrack(trackId)
});

const iconGradient = computed(() => {
    if (!track.value?.metadata) return ''

    return `linear-gradient(to right, ${track.value.metadata.effectsColor}, ${track.value.metadata.backgroundColorIcon})`
});
</script>


<template>
    <section class="bg-white px-4 sm:px-6 md:px-10 p-6 rounded-2xl border border-[#DFDFDF]">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex items-center gap-4">
                <div class="rounded-2xl w-fit p-3 sm:p-4 shrink-0" :style="{
                    background: iconGradient
                }">
                    <component :is="icons[track?.metadata.icon]" class="h-8 w-8 sm:h-12 sm:w-12"
                        :style="{ color: track?.metadata.backgroundColor }" />
                </div>
                <div class="text-[#424242]">
                    <h1 class="font-[Poppins] font-semibold text-xl sm:text-2xl">{{ track?.name }}</h1>
                    <p class="text-sm sm:text-base">{{ track?.description }}</p>
                </div>
            </div>
            <div class="sm:text-right">
                <p class="text-[#5B5B5B] text-md">Progresso</p>
                <div class="flex sm:justify-end text-lg">
                    <p>{{ track?.track_progress }}%</p>
                </div>
            </div>
        </div>
        <div class="bg-[#EAEAEA] rounded-full w-full h-3.5 mt-4">
            <div class="rounded-full h-3.5" :style="{
                backgroundColor: track?.metadata.effectsColor,
                width: `${track?.track_progress}%`
            }" />
        </div>
    </section>
</template>