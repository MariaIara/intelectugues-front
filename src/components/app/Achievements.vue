<script setup>
import { BookOpenCheck, GraduationCap, Medal, Zap } from 'lucide-vue-next';
import Achievement from '../Achievement.vue';
import Title from '../Title.vue';
import { onMounted, reactive, computed, ref } from 'vue';
import { api } from '@/lib/api';

const data = reactive({
    achievements: []
});

const loading = ref(false);

const colorsByAchievementType = {
    track: {
        backgroundColorIcon: '#B3CC7E',
        effectsColor: '#98BF45',
        icon: GraduationCap
    },
    sequence: {
        backgroundColorIcon: '#E9A49E',
        effectsColor: '#F25041',
        icon: Zap
    },
    ranking: {
        backgroundColorIcon: '#EEE18E',
        effectsColor: '#DBC32A',
        icon: Medal
    },
    favorite_words: {
        backgroundColorIcon: '#8ECAEB',
        effectsColor: '#246385',
        icon: BookOpenCheck
    }
};

const fetchAchievements = async () => {
    try {
        loading.value = true;
        const response = await api.get('/user/achievements');
        data.achievements = response.data.data ?? [];
    } catch (error) {
        console.error('Erro ao buscar conquistas:', error);
    } finally {
        loading.value = false;
    }
};

const limitedAchievements = computed(() =>
    data.achievements.slice(0, 8)
);

const achievementRows = computed(() => {
    const rows = [];
    for (let i = 0; i < limitedAchievements.value.length; i += 4) {
        rows.push(limitedAchievements.value.slice(i, i + 4));
    }
    return rows;
});

onMounted(fetchAchievements);
</script>

<template>
    <div id="achievements" class="bg-white border border-[#DFDFDF] rounded-2xl p-4 md:p-6 xl:p-8">

        <template v-if="loading">
            <div class="h-6 bg-gray-200 rounded-full w-52 animate-pulse" />
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 xl:gap-6 mt-4 md:mt-5 xl:mt-6">
                <div v-for="i in 8" :key="i" class="animate-pulse flex flex-col items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-4">
                    <div class="w-14 h-14 bg-gray-200 rounded-full" />
                    <div class="h-3 bg-gray-200 rounded-full w-full" />
                    <div class="h-3 bg-gray-200 rounded-full w-3/4" />
                </div>
            </div>
        </template>

        <template v-else>
            <Title title="Suas Conquistas Recentes" />
            <div v-for="(row, rowIndex) in achievementRows" :key="rowIndex"
                class="grid grid-cols-2 md:grid-cols-4 items-stretch gap-3 md:gap-4 xl:gap-6 mt-4 md:mt-5 xl:mt-6">
                <Achievement v-for="achievement in row" :key="achievement.id"
                    :backgroundColorIcon="colorsByAchievementType[achievement.type]?.backgroundColorIcon"
                    :effectsColor="colorsByAchievementType[achievement.type]?.effectsColor"
                    :icon="colorsByAchievementType[achievement.type]?.icon" :text="achievement.description" />
            </div>
        </template>

    </div>
</template>