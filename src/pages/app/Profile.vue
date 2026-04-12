<script setup>
import FavoriteWordsList from '@/components/app/FavoriteWordsList.vue';
import HeaderApp from '@/components/app/HeaderApp.vue';
import { api } from '@/lib/api';
import { Flame } from 'lucide-vue-next';
import { onMounted, reactive, computed, ref } from 'vue';

const data = reactive({
    user: {}
});

const loading = ref(false);

const fetchUser = async () => {
    try {
        loading.value = true;
        const response = await api.get('/profile');
        data.user = response.data.data;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(fetchUser);

const progress = computed(() => {
    return data.user?.level?.percentual_progress ?? 0;
});
</script>

<template>
    <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] min-h-screen pb-10">

        <HeaderApp />

        <div class="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1.5fr]">
            <section class="w-full px-4 mt-10 space-y-6">

                <template v-if="loading">
                    <div class="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center animate-pulse">
                        <div class="w-32 h-32 bg-gray-200 rounded-full" />
                        <div class="h-6 bg-gray-200 rounded-full w-40 mt-6" />
                        <div class="w-full mt-6">
                            <div class="flex justify-between mb-2">
                                <div class="h-3 bg-gray-200 rounded-full w-28" />
                                <div class="h-3 bg-gray-200 rounded-full w-10" />
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl p-6 text-center shadow-sm animate-pulse flex flex-col items-center gap-3">
                            <div class="h-3 bg-gray-200 rounded-full w-28" />
                            <div class="h-8 bg-gray-200 rounded-full w-20" />
                        </div>
                    </div>
                </template>

                <template v-else>
                    <div class="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center">

                        <div class="relative">
                            <img :src="data.user?.avatar?.image" alt="avatar"
                                class="w-32 h-32 rounded-full border-4 border-[#E7F1F5] shadow-md" />

                            <div class="absolute w-max -bottom-2 left-1/2 -translate-x-1/2
                               bg-[#98BF45] 500 text-white text-xs px-3 py-1
                               rounded-full shadow">
                                Lv. {{ data.user?.level?.name }}
                            </div>
                        </div>

                        <h1 class="text-2xl font-bold mt-6 text-[#424242]">
                            {{ data.user?.name }}
                        </h1>

                        <div class="w-full mt-6">
                            <div class="flex justify-between text-sm text-gray-500 mb-2">
                                <span>Progresso do nível</span>
                                <span>{{ progress }}%</span>
                            </div>

                            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div class="bg-linear-to-r from-[#98BF45] to-[#6F8C30] h-3 rounded-full transition-all duration-500"
                                    :style="{ width: progress + '%' }"></div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <p class="text-gray-400 text-sm">Pontuação Geral</p>
                            <h2 class="text-3xl font-bold text-[#998400] mt-2">
                                {{ data.user?.general_score }}
                            </h2>
                        </div>

                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <p class="text-gray-400 text-sm">Pontuação Semanal</p>
                            <h2 class="text-3xl font-bold text-[#246385] mt-2">
                                {{ data.user?.weekly_score }}
                            </h2>
                        </div>

                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <p class="text-gray-400 text-sm">Sequência</p>
                            <h2 class="text-3xl flex gap-2 justify-center items-center font-bold text-[#F25041] mt-2">
                                <Flame class="w-8 h-8" />
                                {{ data.user?.weekly_sequence }}
                            </h2>
                        </div>

                    </div>
                </template>

            </section>
            <section class="w-full px-4 mt-10 mb-10">
                <FavoriteWordsList />
            </section>
        </div>

    </div>
</template>