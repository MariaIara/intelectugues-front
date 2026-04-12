<script setup>
import { api } from '@/lib/api';
import { Star } from 'lucide-vue-next';
import { onMounted, reactive, ref } from 'vue';

const loading = ref(false);
const errors = ref([]);

const data = reactive({
    id: '',
    date: '',
    word: '',
    category: '',
    meaning: '',
    synonymous: [],
    is_favorited: false
});

const fetchDailyWord = async () => {
    try {
        loading.value = true;
        const response = await api.get('/words/daily');
        Object.assign(data, response.data.data);
        data.date = new Date().toLocaleDateString('pt-BR');
    } catch (error) {
        errors.value = error;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchDailyWord();
});

const handleFavorite = async () => {
    try {
        loading.value = true;
        await api.post(`/words/${data.id}/favorite`, {
            word: data.word
        });

        data.is_favorited = !data.is_favorited
    } catch (error) {
        errors.value = error;
    } finally {
        loading.value = false;
    }
}

</script>

<template>
    <div class="bg-[#DF786E] border border-[#B2463C] rounded-2xl p-4 md:p-6 xl:p-8">

        <template v-if="loading">
            <div class="flex justify-between animate-pulse">
                <div class="h-7 bg-[#c96059] rounded-full w-28" />
                <div class="h-4 bg-[#c96059] rounded-full w-20" />
            </div>
            <div class="flex justify-between mt-4 md:mt-6 xl:mt-8 animate-pulse">
                <div class="flex flex-col gap-2">
                    <div class="h-7 bg-[#c96059] rounded-full w-32" />
                    <div class="h-4 bg-[#c96059] rounded-full w-20" />
                </div>
                <div class="w-6 h-6 bg-[#c96059] rounded-full" />
            </div>
            <div class="mt-4 md:mt-5 xl:mt-6 animate-pulse flex flex-col gap-2">
                <div class="h-3 bg-[#c96059] rounded-full w-full" />
                <div class="h-3 bg-[#c96059] rounded-full w-5/6" />
                <div class="h-3 bg-[#c96059] rounded-full w-4/6" />
            </div>
            <div class="flex flex-wrap mt-3 md:mt-4 gap-2 md:gap-3 xl:gap-4 animate-pulse">
                <div v-for="i in 3" :key="i" class="h-7 bg-[#c96059] rounded-2xl w-20" />
            </div>
        </template>

        <template v-else>
            <div class="flex justify-between">
                <h3 class="font-semibold font-[Poppins] text-2xl text-[#320202]">Dicionário</h3>
                <a href="#" class="text-sm text-[#FFF2E1]">{{ data.date }}</a>
            </div>
            <div class="flex justify-between mt-4 md:mt-6 xl:mt-8">
                <div>
                    <h4 class="font-medium text-2xl text-white">{{ data.word }}</h4>
                    <p class="text-sm text-[#E6E6E6]">{{ data.category }}</p>
                </div>
                <button class="self-start cursor-pointer hover:scale-125 transition-all" @click="handleFavorite">
                    <Star :fill="data.is_favorited ? '#FFF2E1' : 'none'" :stroke="data.is_favorited ? '#FFF2E1' : '#FFF2E1'"
                        class="text-white" />
                </button>
            </div>
            <p class="text-white mt-4 md:mt-5 xl:mt-6">{{ data.meaning }}</p>
            <div class="flex flex-wrap mt-3 md:mt-4 gap-2 md:gap-3 xl:gap-4">
                <span v-for="(synonym, index) in data.synonymous" :key="index"
                    class="bg-[#FFF2E1] border border-[#FFDCAB] text-[#545454] rounded-2xl px-4 py-1"> {{
                        synonym }}
                </span>
            </div>
        </template>

    </div>
</template>