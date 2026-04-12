<script setup>

import CardTrackPage from "@/components/app/CardTrackPage.vue";
import ChallengeItem from "@/components/app/ChallengeItem.vue";
import HeaderApp from "@/components/app/HeaderApp.vue";
import { api } from "@/lib/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const trackWithChallenges = ref({
    track: null,
    challenges: []
});

const loading = ref(false);

const route = useRoute();

async function loadChallengesByTrack(trackId) {
    try {
        loading.value = true;

        const response = await api.get(
            `user/tracks/${trackId}/challenges`
        );

        trackWithChallenges.value = response.data.data;
    } catch (error) {
        console.error('Erro ao buscar desafios:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    loadChallengesByTrack(route.params.id)
});

</script>
<template>
    <HeaderApp />
    <section class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] min-h-screen pt-10 px-4 sm:px-10 lg:px-20 pb-10">
        <div class="max-w-5xl w-full mx-auto">
            <div class="max-w-360 mx-auto">
                <CardTrackPage />
            </div>
            <div class="bg-white rounded-2xl border border-[#DFDFDF] max-w-360 mx-auto mt-4 sm:mt-8 px-3 sm:px-6 md:px-10">

                <template v-if="loading">
                    <div v-for="i in 5" :key="i" class="py-3 sm:py-5 md:py-8 border-b border-gray-100 last:border-0">
                        <div class="animate-pulse flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl py-4 px-4 sm:py-6 sm:px-6 gap-4 bg-gray-100" style="box-shadow: 8px 8px 0 #e5e7eb;">
                            <div class="flex flex-col gap-3 flex-1">
                                <div class="h-6 bg-gray-200 rounded-full w-48" />
                                <div class="h-4 bg-gray-200 rounded-full w-24" />
                            </div>
                            <div class="flex sm:flex-col flex-row items-center sm:items-end justify-between gap-2 sm:gap-4">
                                <div class="h-5 bg-gray-200 rounded-full w-32" />
                                <div class="h-8 bg-gray-200 rounded-3xl w-28" />
                            </div>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <div v-for="challenge in trackWithChallenges.challenges" :key="challenge.id" class="py-3 sm:py-5 md:py-8">
                        <ChallengeItem :challenge="challenge" :track="trackWithChallenges.track" />
                    </div>

                    <div v-if="trackWithChallenges.challenges.length === 0" class="text-center text-lg py-10">
                        Nenhum desafio encontrado :(
                    </div>
                </template>

            </div>
        </div>
    </section>
</template>