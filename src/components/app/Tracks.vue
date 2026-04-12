<script setup>
import { ref, onMounted } from 'vue'

import TrackItem from './TrackItem.vue'
import { api } from '@/lib/api'

const tracks = ref([]);
const loading = ref(false);

async function loadTracks() {
    try {
        loading.value = true;
        const response = await api.get('/tracks');

        const apiTracks = response.data.data.data;

        const tracksWithData = await Promise.all(
            apiTracks.map(async (track) => {
                const attemptsData = await loadAttemptsByTrack(track.id);

                return {
                    ...track,
                    track_progress: attemptsData.track_progress,
                    attempts: attemptsData.attempts
                };
            })
        );

        tracks.value = tracksWithData;
    } catch (error) {
        console.error('Erro ao buscar trilhas:', error);
    } finally {
        loading.value = false;
    }
}

async function loadAttemptsByTrack(trackId) {
    try {
        const response = await api.get(`user/tracks/${trackId}/challenge-attempts`);

        const data = response.data.data;

        return {
            track_progress: data.track_progress,
            attempts: data.attempts
        };
    } catch (error) {
        console.error('Erro ao buscar tentativas:', error);
    }
}

onMounted(loadTracks)
</script>

<template>
    <div id="tracks" class="bg-white border border-[#DFDFDF] rounded-2xl p-4 md:p-6 xl:p-8 max-h-fit">

        <template v-if="loading">
            <div class="h-6 bg-gray-200 rounded-full w-36 animate-pulse" />
            <div class="grid grid-cols-1 xl:grid-cols-2 mt-4 md:mt-6 gap-3">
                <div v-for="i in 4" :key="i" class="animate-pulse flex items-center gap-4 rounded-3xl p-3 md:p-4 xl:p-6 bg-gray-100 border-2 border-gray-200">
                    <div class="w-14 h-14 md:w-18 md:h-18 xl:w-24 xl:h-24 bg-gray-200 rounded-2xl shrink-0" />
                    <div class="flex-1 flex flex-col gap-2">
                        <div class="h-5 bg-gray-200 rounded-full w-3/4" />
                        <div class="h-2.5 bg-gray-200 rounded-full w-full" />
                        <div class="h-3 bg-gray-200 rounded-full w-10" />
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <Title title="Trilhas de Estudo" />
            <div class="grid grid-cols-1 xl:grid-cols-2 mt-4 md:mt-6">
                <TrackItem v-for="track in tracks" :key="track.id" :track="track" />
            </div>
        </template>

    </div>
</template>