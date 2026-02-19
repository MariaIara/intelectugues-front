<script setup>
import { TrendingUp } from 'lucide-vue-next';
import Title from '../Title.vue';
import RankDiv from './RankDiv.vue';
import Button from '../Button.vue';
import { onMounted, ref } from 'vue';
import { api } from '@/lib/api';

const usersRank = ref([]);

async function loadRank() {
    try {
        const response = await api.get('/users/ranking');

        usersRank.value = response.data.data.data;
    } catch (error) {
        console.error('Erro ao buscar trilhas:', error);
    }
}

onMounted(() => {
    loadRank();
});

</script>

<template>
    <div id="ranking" class="bg-white border border-[#DFDFDF] rounded-2xl p-8">
        <div class="flex justify-between">
            <Title title="Ranking" />
            <TrendingUp class="text-[#424242]" />
        </div>
        <div class="mt-12">
            <div v-for="(userRank, index) in usersRank.slice(0, 5)" :key="userRank.id">
                <RankDiv :userRank="userRank" :index="index + 1" />
            </div>
        </div>
        <div class="flex justify-end">
            <p class="text-sm text-[#6C6C6C] mt-3">O ranking expira em 07/01</p>
        </div>
        <div class="flex items-center justify-center">
            <span class="text-3xl text-[#6C6C6C] mt-2">...</span>
        </div>
        <Button title="Ver Ranking Completo" color="#98BF45" shadowColor="#6F8C30"
            class="text-lg m-auto mt-6 px-14 py-2.5" />
    </div>
</template>