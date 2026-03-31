<script setup>
import { BookOpenCheck, GraduationCap, Medal, Zap } from 'lucide-vue-next';
import Achievement from '../Achievement.vue';
import Title from '../Title.vue';
import { onMounted, reactive, computed } from 'vue';
import { api } from '@/lib/api';

const data = reactive({
    achievements: []
});

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
        const response = await api.get('/user/achievements');
        data.achievements = response.data.data ?? [];
    } catch (error) {
        console.error('Erro ao buscar conquistas:', error);
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
    <div id="achievements" class="bg-white border border-[#DFDFDF] rounded-2xl p-8">
        <Title title="Suas Conquistas Recentes" />

        <div v-for="(row, rowIndex) in achievementRows" :key="rowIndex"
            class="grid grid-cols-4 items-center justify-center gap-6 mt-6">
            <Achievement v-for="achievement in row" :key="achievement.id"
                :backgroundColorIcon="colorsByAchievementType[achievement.type]?.backgroundColorIcon"
                :effectsColor="colorsByAchievementType[achievement.type]?.effectsColor"
                :icon="colorsByAchievementType[achievement.type]?.icon" :text="achievement.description" />
        </div>
    </div>
</template>