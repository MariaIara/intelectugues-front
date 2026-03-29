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
    class="pressable-card flex items-center justify-between
           rounded-2xl py-6 px-6
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
    <div class="flex flex-col font-[Poppins] gap-4">
      <h1 class="font-semibold text-2xl">
        {{ challenge.name }}
      </h1>

      <p class="font-medium text-lg">
        {{ challenge.questions_count }} questões
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex font-[Poppins] font-medium text-lg gap-2 items-center">
        <p>{{ statusStyles.label }}</p>
        <component :is="statusIcon" />
      </div>

      <div class="flex">
        <p class="bg-white rounded-3xl mx-auto py-1 px-4">
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