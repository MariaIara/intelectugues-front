<script setup>
import { ref, onMounted } from 'vue'

import { Drama, Handshake, NotebookPen, Sparkles } from 'lucide-vue-next'
import TrackItem from './TrackItem.vue'
import { api } from '@/lib/api'

const tracks = ref([]);

const icons = [
    Handshake,
    NotebookPen,
    Sparkles,
    Drama
];

const colors = [
    {
        backgroundColor: '#FAE8E7',
        effectsColor: '#F25041',
        textColor: '#F25041',
        backgroundColorIcon: '#FE8276'
    },
    {
        backgroundColor: '#C6E0ED',
        effectsColor: '#246385',
        textColor: '#246385',
        backgroundColorIcon: '#519AC0'
    },
    {
        backgroundColor: '#FFFBE4',
        effectsColor: '#F2DC4E',
        textColor: '#998400',
        backgroundColorIcon: '#F5EBA6'
    },
    {
        backgroundColor: '#E4F6BC',
        effectsColor: '#98BF45',
        textColor: '#98BF45',
        backgroundColorIcon: '#B9DB70'
    }
];

const tips = [
    '💡 Antes de P ou B: use M',
    '💡 Som de Z entre vogais: use S',
    '💡 Plural de palavras em ÃO: ões',
    '💡 Plural de palavras em L: is'
];


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
            <TrackItem v-for="track in tracks" :key="track.id" :index="track.index" :name="track.name"
                :tip="tips[track.index]" :track_progress="track.track_progress" :icon="icons[track.index]"
                :backgroundColor="colors[track.index].backgroundColor" :effectsColor="colors[track.index].effectsColor"
                :textColor="colors[track.index].textColor"
                :backgroundColorIcon="colors[track.index].backgroundColorIcon" />
        </div>
    </div>
</template>