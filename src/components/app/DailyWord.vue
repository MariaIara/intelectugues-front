<script setup>
import { api } from '@/lib/api';
import { Star } from 'lucide-vue-next';
import { onMounted, reactive, ref } from 'vue';
import Loading from '../Loading.vue';

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
    <div class="bg-[#DF786E] border border-[#B2463C] rounded-2xl p-8">
        <div class="flex justify-between">
            <h3 class="font-semibold font-[Poppins] text-2xl text-[#320202]">Dicionário</h3>
            <a href="#" class="text-sm text-[#FFF2E1]">{{ data.date }}</a>
        </div>
        <div class="flex justify-between mt-8">
            <div>
                <h4 class="font-medium text-2xl text-white">{{ data.word }}</h4>
                <p class="text-sm text-[#E6E6E6]">{{ data.category }}</p>
            </div>
            <button class="self-start cursor-pointer hover:scale-125 transition-all" @click="handleFavorite">
                <Star :fill="data.is_favorited ? '#FFF2E1' : 'none'" :stroke="data.is_favorited ? '#FFF2E1' : '#FFF2E1'"
                    class="text-white" />
            </button>
        </div>
        <p class=" text-white mt-6">{{ data.meaning }}</p>
        <div class="flex mt-4 gap-4">
            <span v-for="(synonym, index) in data.synonymous" :key="index"
                class="bg-[#FFF2E1] border border-[#FFDCAB] text-[#545454] rounded-2xl px-4 py-1"> {{
                    synonym }}
            </span>
        </div>
    </div>
    <Loading v-if="loading" />
</template>