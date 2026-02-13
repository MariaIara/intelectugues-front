<script setup>
import { api } from '@/lib/api'
import { NotebookPen } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const track = ref(null)

const route = useRoute()
const trackId = route.params.id

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
})
</script>


<template>
    <section class="bg-white mt-10 mx-10 px-10 p-6 rounded-2xl border border-[#DFDFDF]">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="bg-linear-to-r from-[#246385] to-[#519AC0] rounded-2xl w-fit p-4">
                    <NotebookPen class="text-[#C6E0ED] w-12 h-12 m-auto" />
                </div>
                <div class="text-[#424242] mx-4">
                    <h1 class="font-[Poppins] font-semibold text-2xl">{{ track?.name }}</h1>
                    <p class="">{{ track?.description }}</p>
                </div>
            </div>
            <div class="">
                <p class="text-[#5B5B5B] text-md">Progresso</p>
                <div class="flex justify-end text-lg">
                    <p>{{ track?.track_progress }}%</p>
                </div>
            </div>
        </div>
        <div class="bg-[#EAEAEA] rounded-full w-full h-3.5 mt-4">
            <div class="rounded-full h-3.5" :style="{
                backgroundColor: '#246385',
                width: `${track?.track_progress}%`
            }" />
        </div>
    </section>
</template>