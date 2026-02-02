<script setup>
import { CircleStar, Flame, Trophy } from 'lucide-vue-next';
import Title from '../Title.vue';
import Loading from '../Loading.vue';
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

        data.level = response.data.data.level.name;
        data.needed_score = response.data.data.level.next_level.needed_score;
        data.percentual_progress = (data.general_score / data.needed_score) * 100;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchProgress();
});
</script>

<template>
    <div class="bg-white border border-[#DFDFDF] rounded-2xl p-8">
        <div class="flex justify-between">
            <Title title="Acompanhe seu Progresso" />
            <a href="#" class="text-sm text-[#6E6E6E] underline">Ver Mais</a>
        </div>
        <div class="grid grid-cols-3 items-center mt-6 gap-4">
            <div class="bg-[#FAE8E7] text-[#F25041] border-4 border-[#F25041] rounded-2xl text-center px-12 py-6">
                <Flame class="m-auto w-8 h-8" />
                <p class="font-medium font-[Poppins] text-2xl mt-2">{{ data.general_sequence }} dias</p>
                <p>Sequência</p>
            </div>
            <div class="bg-[#FFFBE4] text-[#998400] border-4 border-[#F2DC4E] rounded-2xl text-center px-12 py-6">
                <Trophy class="m-auto w-8 h-8" />
                <p class="font-medium font-[Poppins] text-2xl mt-2">{{ data.general_score }} pontos</p>
                <p>{{ data.general_score }}/{{ data.needed_score }} XP</p>
            </div>
            <div class="bg-[#C6E0ED] text-[#246385] border-4 border-[#246385] rounded-2xl text-center px-12 py-6">
                <CircleStar class="m-auto w-8 h-8" />
                <p class="font-medium font-[Poppins] text-2xl mt-2">{{ data.level }}</p>
                <p>Nível</p>
            </div>
        </div>
        <div class="mt-6">
            <p class="text-sm">Seu progresso no nível {{ data.level }} é de {{ data.percentual_progress }}%</p>
            <div class="block bg-[#BDBDBD] rounded-full w-full h-3.5">
                <div class="bg-linear-to-r from-[#98BF45] to-[#6F8C30] rounded-full h-3.5 mt-1" :style="{
                    width: `${data.percentual_progress}%`
                }"></div>
            </div>
        </div>
    </div>
    <Loading v-if="loading" />
</template>