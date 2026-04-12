<script setup>
import { computed } from 'vue';
import {
  CircleCheckBig,
  CircleDot,
  Lock
} from 'lucide-vue-next';

const props = defineProps([
  'challenge',
  'track'
]);

const status = computed(() => props.challenge.status);

const statusStyles = computed(() => {
  const base = props.track.metadata;

  return {
    finished: {
      bg: base.backgroundColor,
      shadow: base.effectsColor,
      text: base.textColor,
      label: 'Desafio concluído'
    },
    in_progress: {
      bg: `${base.backgroundColor}80`,
      shadow: `${base.effectsColor}80`,
      text: `${base.textColor}CC`,
      label: 'Em progresso'
    },
    blocked: {
      bg: '#E5E7EB',
      shadow: '#9CA3AF',
      text: '#6B7280',
      label: 'Bloqueado'
    }
  }[status.value];
});

const statusIcon = computed(() => ({
  finished: CircleCheckBig,
  in_progress: CircleDot,
  blocked: Lock
}[status.value]));
</script>

<template>
  <router-link
    :to="`/app/challenge/${challenge.id}`"
    class="pressable-card flex flex-col sm:flex-row sm:items-center sm:justify-between
           rounded-2xl py-4 px-4 sm:py-6 sm:px-6
           gap-4
           transition-all duration-150
           hover:translate-x-2 hover:translate-y-2
           active:translate-x-2 active:translate-y-2
           cursor-pointer"
    :class="{ 'pointer-events-none opacity-60': status === 'blocked' }"
    :style="{
      '--bg': statusStyles.bg,
      '--shadow': statusStyles.shadow,
      '--text': statusStyles.text
    }"
  >
    <div class="flex flex-col font-[Poppins] gap-2 sm:gap-4">
      <h1 class="font-semibold text-xl sm:text-2xl">
        {{ challenge.name }}
      </h1>

      <p class="font-medium text-base sm:text-lg">
        {{ challenge.questions_count }} questões
      </p>
    </div>

    <div class="flex sm:flex-col flex-row items-center sm:items-end justify-between gap-2 sm:gap-4">
      <div class="flex font-[Poppins] font-medium text-base sm:text-lg gap-2 items-center">
        <p>{{ statusStyles.label }}</p>
        <component :is="statusIcon" />
      </div>

      <div class="flex">
        <p class="bg-white rounded-3xl py-1 px-4">
          +{{ challenge.score }} pontos
        </p>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.pressable-card {
  background-color: var(--bg);
  color: var(--text);
  box-shadow: 8px 8px 0 var(--shadow);
}

.pressable-card:hover,
.pressable-card:active {
  box-shadow: 1px 1px 0 0;
}
</style>