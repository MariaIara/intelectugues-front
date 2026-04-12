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
                <div v-for="challenge in trackWithChallenges.challenges" :key="challenge.id" class="py-3 sm:py-5 md:py-8">
                    <ChallengeItem :challenge="challenge" :track="trackWithChallenges.track" />
                </div>
    
                <div v-if="!loading && trackWithChallenges.challenges.length === 0" class="text-center text-lg py-10">
                    Nenhum desafio encontrado :(
                </div>
            </div>
        </div>
    </section>
</template>