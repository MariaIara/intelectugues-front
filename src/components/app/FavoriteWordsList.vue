<script setup>
import { api } from '@/lib/api';
import { onMounted, ref, watch } from 'vue';

const words = ref([]);
const search = ref('');
const loading = ref(false);
let timeout = null;

const fetchWords = async () => {
    try {
        loading.value = true;
        const response = await api.get('/user/words', {
            params: {
                search: search.value || undefined
            }
        });

        words.value = response.data.data;
    } catch (error) {
        console.error('Erro ao buscar dicionário:', error);
    } finally {
        loading.value = false;
    }
};

watch(search, () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        fetchWords();
    }, 400);
});

onMounted(fetchWords);
</script>

<template>
    <div class="bg-white rounded-2xl shadow-sm p-6 md:p-8 min-h-full">
        <h3 class="font-[Poppins] font-semibold text-center text-xl text-[#424242]">
            Meu dicionário
        </h3>

        <input v-model="search" type="text" class="my-6 border w-full py-3 rounded-lg border-gray-300 text-sm px-4"
            placeholder="🔎 Buscar palavra" />

        <ul v-if="loading" class="flex flex-col gap-2 max-h-90 lg:h-90 overflow-y-auto">
            <li v-for="i in 6" :key="i" class="border border-gray-200 bg-gray-50 rounded-xl p-3 animate-pulse flex flex-col gap-2">
                <div class="h-5 bg-gray-200 rounded-full w-28" />
                <div class="h-3 bg-gray-200 rounded-full w-full" />
                <div class="h-3 bg-gray-200 rounded-full w-4/5" />
            </li>
        </ul>

        <ul v-else class="flex flex-col gap-2 max-h-90 lg:h-90 overflow-y-auto">
            <li v-for="word in words" :key="word.id"
                class="border border-[#FFDCAB] bg-[#FFF2E1] rounded-xl p-3 cursor-pointer hover:opacity-80 transition-all">
                <h4 class="text-lg text-[#190f01] font-medium">
                    {{ word.word }}
                </h4>
                <p class="text-sm italic text-[#b99057]">
                    {{ word.meaning }}
                </p>
            </li>
        </ul>
    </div>
</template>