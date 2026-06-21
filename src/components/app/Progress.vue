<script setup>
import { CircleStar, Flame, Trophy } from 'lucide-vue-next';
import Title from '../Title.vue';
import { onMounted, reactive, ref } from 'vue';
import { api } from '@/lib/api';

const loading = ref(false);

const data = reactive({
    general_sequence: '',
    general_score: '',
    level: '',
    needed_score: '',
    percentaul_progress: ''
});

const fetchProgress = async () => {
    try {
        loading.value = true;
        const response = await api.get('/profile');
        Object.assign(data, response.data.data);

        data.level = response.data.data.level;

        data.needed_score = response.data.data.level.next_level?.needed_score;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchProgress();
});
</script>

<template>
    <div class="bg-white border border-[#DFDFDF] rounded-2xl p-4 md:p-6 xl:p-8">

        <template v-if="loading">
            <div class="h-6 bg-gray-200 rounded-full w-48 animate-pulse" />
            <div class="grid grid-cols-3 items-center mt-4 md:mt-5 xl:mt-6 gap-2 md:gap-3 xl:gap-4">
                <div v-for="i in 3" :key="i" class="rounded-2xl px-3 py-4 md:px-6 md:py-5 xl:px-12 xl:py-6 animate-pulse bg-gray-100 border-4 border-gray-200 flex flex-col items-center gap-2">
                    <div class="w-7 h-7 bg-gray-200 rounded-full" />
                    <div class="h-5 bg-gray-200 rounded-full w-12" />
                    <div class="h-3 bg-gray-200 rounded-full w-16" />
                </div>
            </div>
            <div class="mt-4 md:mt-5 xl:mt-6 animate-pulse">
                <div class="h-3 bg-gray-200 rounded-full w-64 mb-2" />
                <div class="block bg-gray-200 rounded-full w-full h-3.5" />
            </div>
        </template>

        <template v-else>
            <div class="flex justify-between">
                <Title title="Acompanhe seu Progresso" />
            </div>
            <div class="grid grid-cols-3 items-center mt-4 md:mt-5 xl:mt-6 gap-2 md:gap-3 xl:gap-4">
                <div class="bg-[#FAE8E7] text-[#F25041] border-4 border-[#F25041] rounded-2xl text-center px-3 py-4 md:px-6 md:py-5 xl:px-12 xl:py-6">
                    <Flame class="m-auto w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8" />
                    <p class="font-medium font-[Poppins] text-base md:text-xl xl:text-2xl mt-2">{{ data.general_sequence }}<span class="hidden md:inline"> dias</span></p>
                    <p class="text-xs md:text-sm">Sequência</p>
                </div>
                <div class="bg-[#FFFBE4] text-[#998400] border-4 border-[#F2DC4E] rounded-2xl text-center px-3 py-4 md:px-6 md:py-5 xl:px-12 xl:py-6">
                    <Trophy class="m-auto w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8" />
                    <p class="font-medium font-[Poppins] text-base md:text-xl xl:text-2xl mt-2">{{ data.general_score }}<span class="hidden md:inline"> pontos</span></p>
                    <p class="text-xs md:text-sm">{{ data.general_score }}/{{ data.needed_score }} XP</p>
                </div>
                <div class="bg-[#C6E0ED] text-[#246385] border-4 border-[#246385] rounded-2xl text-center px-3 py-4 md:px-6 md:py-5 xl:px-12 xl:py-6">
                    <CircleStar class="m-auto w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8" />
                    <p class="font-medium font-[Poppins] text-base md:text-xl xl:text-2xl mt-2">{{ data.level.name }}</p>
                    <p class="text-xs md:text-sm">Nível</p>
                </div>
            </div>
            <div class="mt-4 md:mt-5 xl:mt-6">
                <p class="text-sm">Seu progresso no nível {{ data.level.name }} é de {{ Math.floor(data.level.percentual_progress) }}%</p>
                <div class="block bg-[#BDBDBD] rounded-full w-full h-3.5">
                    <div class="bg-linear-to-r from-[#98BF45] to-[#6F8C30] rounded-full h-3.5 mt-1" :style="{
                        width: `${data.level.percentual_progress}%`
                    }"></div>
                </div>
            </div>
        </template>

    </div>
</template>