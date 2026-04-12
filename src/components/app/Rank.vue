<script setup>
import { TrendingUp } from 'lucide-vue-next';
import Title from '../Title.vue';
import RankDiv from './RankDiv.vue';
import Button from '../Button.vue';
import { onMounted, ref } from 'vue';
import { api } from '@/lib/api';

const usersRank = ref([]);
const loading = ref(false);

async function loadRank() {
    try {
        loading.value = true;
        const response = await api.get('/users/ranking');

        usersRank.value = response.data.data.data;
    } catch (error) {
        console.error('Erro ao buscar trilhas:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    loadRank();
});

</script>

<template>
    <div id="ranking" class="bg-white border border-[#DFDFDF] rounded-2xl p-4 md:p-6 xl:p-8">

        <template v-if="loading">
            <div class="flex justify-between animate-pulse">
                <div class="h-6 bg-gray-200 rounded-full w-24" />
                <div class="w-6 h-6 bg-gray-200 rounded-full" />
            </div>
            <div class="mt-4 md:mt-8 xl:mt-12 flex flex-col gap-3">
                <div v-for="i in 5" :key="i" class="animate-pulse flex items-center gap-3">
                    <div class="w-8 h-5 bg-gray-200 rounded-full shrink-0" />
                    <div class="w-9 h-9 bg-gray-200 rounded-full shrink-0" />
                    <div class="flex-1 h-4 bg-gray-200 rounded-full" />
                    <div class="w-14 h-4 bg-gray-200 rounded-full shrink-0" />
                </div>
            </div>
            <div class="mt-6 animate-pulse">
                <div class="h-10 bg-gray-200 rounded-full w-full" />
            </div>
        </template>

        <template v-else>
            <div class="flex justify-between">
                <Title title="Ranking" />
                <TrendingUp class="text-[#424242]" />
            </div>
            <div class="mt-4 md:mt-8 xl:mt-12">
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
        </template>

    </div>
</template>