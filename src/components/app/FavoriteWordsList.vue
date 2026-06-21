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

const handleFavorite = async () => {
    try {
        loading.value = true;

        await api.post(`/words/${selectedWord.value.id}/favorite`, {
            word: selectedWord.value.word
        });

        words.value = words.value.filter(
            word => word.id !== selectedWord.value.id
        );

        closeModal();
    } catch (error) {
        console.error('Erro ao remover do dicionário:', error);
    } finally {
        loading.value = false;
    }
};

const selectedWord = ref(null);

const openModal = (word) => {
    selectedWord.value = word;
};

const closeModal = () => {
    selectedWord.value = null;
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
            <li v-for="i in 6" :key="i"
                class="border border-gray-200 bg-gray-50 rounded-xl p-3 animate-pulse flex flex-col gap-2">
                <div class="h-5 bg-gray-200 rounded-full w-28" />
                <div class="h-3 bg-gray-200 rounded-full w-full" />
                <div class="h-3 bg-gray-200 rounded-full w-4/5" />
            </li>
        </ul>

        <ul v-else class="flex flex-col gap-2 max-h-90 lg:h-90 overflow-y-auto">
            <li v-for="word in words" :key="word.id" @click="openModal(word)"
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

    <div v-if="selectedWord" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeModal">
        <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                    <h2 class="text-2xl font-bold text-[#190f01]">
                        {{ selectedWord.word }}
                    </h2>
                    <span class="inline-block mt-1 rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                        {{ selectedWord.category }}
                    </span>
                </div>

                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-xl">
                    ✕
                </button>
            </div>

            <div class="mb-4">
                <h3 class="font-semibold text-gray-700 mb-1">
                    Significado
                </h3>
                <p class="text-gray-600">
                    {{ selectedWord.meaning }}
                </p>
            </div>

            <div v-if="selectedWord.synonymous?.length" class="mb-4">
                <h3 class="font-semibold text-gray-700 mb-2">
                    Sinônimos
                </h3>

                <div class="flex flex-wrap gap-2">
                    <span v-for="synonym in selectedWord.synonymous" :key="synonym"
                        class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                        {{ synonym }}
                    </span>
                </div>
            </div>

            <div class="text-sm text-gray-500">
                Adicionada ao dicionário em:
                {{ selectedWord.shorted_at }}
            </div>

            <div class="mt-5 w-full">
                <button @click="handleFavorite" :class="selectedWord.is_favorited
                    ? 'text-red-500 border-red-200 hover:bg-red-50'
                    : 'text-[#98BF45] border-[#98BF45]/40 hover:bg-[#98BF45]/8'
                    " class="block w-full px-5 py-2.5 border rounded-xl transition cursor-pointer font-medium text-sm">
                    {{ selectedWord.is_favorited ? 'Remover do dicionário' : 'Adicionar ao dicionário' }}
                </button>
            </div>
        </div>
    </div>
</template>