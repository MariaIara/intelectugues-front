<script setup>
import HeaderApp from '@/components/app/HeaderApp.vue';
import RankDiv from '@/components/app/RankDiv.vue';
import { api } from '@/lib/api';
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { nextMonday, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { onMounted, ref, computed } from 'vue';

const users = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const total = ref(0);
const loading = ref(false);

const rankingExpiry = computed(() => {
    const expiry = nextMonday(new Date());
    return format(expiry, "dd/MM", { locale: ptBR });
});

const globalOffset = computed(() => (currentPage.value - 1) * 10);

async function loadRanking(page = 1) {
    try {
        loading.value = true;
        const response = await api.get('/users/ranking', { params: { page } });
        const paginator = response.data.data;
        users.value = paginator.data;
        currentPage.value = paginator.current_page;
        lastPage.value = paginator.last_page;
        total.value = paginator.total;
    } catch (error) {
        console.error('Erro ao buscar ranking:', error);
    } finally {
        loading.value = false;
    }
}

function goToPage(page) {
    if (page < 1 || page > lastPage.value || loading.value) return;
    loadRanking(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => loadRanking());
</script>

<template>
    <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] min-h-screen pb-10">
        <HeaderApp />

        <div class="max-w-2xl mx-auto px-4 mt-8">

            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                    <TrendingUp class="text-[#246385] w-6 h-6" />
                    <h1 class="text-2xl font-bold text-[#424242] font-[Poppins]">Ranking Semanal</h1>
                </div>
                <p class="text-sm text-[#6C6C6C]">Expira em {{ rankingExpiry }}</p>
            </div>

            <div class="bg-white border border-[#DFDFDF] rounded-2xl p-4 md:p-6">

                <template v-if="loading">
                    <div v-for="i in 10" :key="i" class="animate-pulse flex items-center gap-3 mt-3">
                        <div class="w-8 h-5 bg-gray-200 rounded-full shrink-0" />
                        <div class="w-9 h-9 bg-gray-200 rounded-full shrink-0" />
                        <div class="flex-1 h-4 bg-gray-200 rounded-full" />
                        <div class="w-14 h-4 bg-gray-200 rounded-full shrink-0" />
                    </div>
                    <div class="mt-6 animate-pulse flex justify-center gap-2">
                        <div class="w-9 h-9 bg-gray-200 rounded-lg" />
                        <div class="w-24 h-9 bg-gray-200 rounded-lg" />
                        <div class="w-9 h-9 bg-gray-200 rounded-lg" />
                    </div>
                </template>

                <template v-else>
                    <div v-if="users.length === 0" class="text-center py-12 text-[#6C6C6C]">
                        Nenhum usuário no ranking ainda.
                    </div>

                    <div v-else>
                        <RankDiv
                            v-for="(user, index) in users"
                            :key="user.id"
                            :userRank="user"
                            :index="globalOffset + index + 1"
                        />

                        <div class="flex items-center justify-between mt-6 pt-4 border-t border-[#DFDFDF]">
                            <p class="text-sm text-[#6C6C6C]">
                                {{ total }} participantes
                            </p>

                            <div class="flex items-center gap-2">
                                <button
                                    @click="goToPage(currentPage - 1)"
                                    :disabled="currentPage === 1 || loading"
                                    class="flex items-center justify-center w-9 h-9 rounded-lg border border-[#DFDFDF] text-[#424242] hover:bg-[#246385]/8 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                                >
                                    <ChevronLeft class="w-4 h-4" />
                                </button>

                                <span class="text-sm font-medium text-[#424242] px-2">
                                    {{ currentPage }} / {{ lastPage }}
                                </span>

                                <button
                                    @click="goToPage(currentPage + 1)"
                                    :disabled="currentPage === lastPage || loading"
                                    class="flex items-center justify-center w-9 h-9 rounded-lg border border-[#DFDFDF] text-[#424242] hover:bg-[#246385]/8 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                                >
                                    <ChevronRight class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>
