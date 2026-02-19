<script setup>
import { ref, onMounted } from 'vue'

import TrackItem from './TrackItem.vue'
import { api } from '@/lib/api'

const tracks = ref([]);

async function loadTracks() {
    try {
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
    <div id="tracks" class="bg-white border border-[#DFDFDF] rounded-2xl p-8 max-h-fit">
        <Title title="Trilhas de Estudo" />
        <div class="grid grid-cols-2 mt-6">
            <TrackItem v-for="track in tracks" :key="track.id" :track="track" />
        </div>
    </div>
</template>