<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

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
]


async function loadTracks() {
    try {
        const response = await api.get('/tracks');

        const apiTracks = response.data.data.data;

        tracks.value = apiTracks.map(track => ({
            ...track
        }));
    } catch (error) {
        console.error('Erro ao buscar trilhas:', error);
    }
}

onMounted(loadTracks)
</script>

<template>
    <div id="tracks" class="bg-white border border-[#DFDFDF] rounded-2xl p-8 max-h-fit">
        <Title title="Trilhas de Estudo" />
        <div class="grid grid-cols-2 mt-6">
            <TrackItem v-for="track in tracks" :key="track.id" :index="track.index" :name="track.name"
                :icon="icons[track.index]" :backgroundColor="colors[track.index].backgroundColor"
                :effectsColor="colors[track.index].effectsColor" :textColor="colors[track.index].textColor"
                :backgroundColorIcon="colors[track.index].backgroundColorIcon" />
        </div>
    </div>
</template>