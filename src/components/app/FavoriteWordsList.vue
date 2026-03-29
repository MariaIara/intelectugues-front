<script setup>
import { api } from '@/lib/api';
import { onMounted, ref, watch } from 'vue';

const words = ref([]);
const search = ref('');
let timeout = null;

const fetchWords = async () => {
    try {
        const response = await api.get('/user/words', {
            params: {
                search: search.value || undefined
            }
        });

        words.value = response.data.data;
    } catch (error) {
        console.error('Erro ao buscar dicionário:', error);
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
    <div class="bg-white rounded-2xl shadow-sm p-8 min-h-full">
        <h3 class="font-[Poppins] font-semibold text-center text-xl text-[#424242]">
            Meu dicionário
        </h3>

        <input v-model="search" type="text" class="my-6 border w-full py-3 rounded-lg border-gray-300 text-sm px-4"
            placeholder="🔎 Buscar palavra" />

        <ul class="flex flex-col gap-2 h-90 overflow-y-auto pr-4">
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