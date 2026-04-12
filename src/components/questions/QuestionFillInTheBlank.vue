<script setup>
import { computed } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  answered: { type: Boolean, required: true },
  selectedAlt: { type: Object, default: null },
  isCorrect: { type: Boolean, required: true },
  lost: { type: Boolean, required: true },
})

const emit = defineEmits(['select'])

const parts = computed(() => props.question.statement.split('___'))

const blankState = computed(() => {
  if (!props.answered || !props.selectedAlt) return 'idle'
  return props.isCorrect ? 'correct' : 'wrong'
})

function chipClass(alt) {
  if (!props.answered)
    return 'chip-idle border-slate-200 bg-white text-slate-700 hover:border-[#488FB5] hover:bg-sky-50 hover:text-[#488FB5] cursor-pointer'

  if (props.isCorrect && alt.is_correct)
    return 'chip border-[#98BF45] bg-[#98BF45]/10 text-[#4a6e1a] cursor-default'

  if (props.selectedAlt?.id === alt.id && !alt.is_correct)
    return 'chip border-[#F25041] bg-[#F25041]/10 text-[#c0392b] cursor-default'

  return 'chip border-slate-200 bg-white text-slate-400 opacity-35 cursor-default'
}
</script>

<template>
  <div class="flex flex-col gap-4 sm:gap-8">
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-6 sm:px-8 sm:py-10">
      <p class="text-xl sm:text-2xl font-bold text-[#424242] leading-loose font-[Poppins] flex flex-wrap items-center gap-x-3 gap-y-2">
        <span v-if="parts[0]">{{ parts[0] }}</span>

        <span
          class="inline-flex items-center justify-center min-w-32 px-5 h-12 rounded-xl border-b-2 border-dashed text-lg font-bold transition-all duration-300"
          :class="{
            'border-slate-400 bg-slate-100 text-slate-400': blankState === 'idle' && !selectedAlt,
            'border-[#488FB5] bg-sky-50 text-[#488FB5]': blankState === 'idle' && selectedAlt,
            'border-[#98BF45] bg-[#98BF45]/10 text-[#4a6e1a]': blankState === 'correct',
            'border-[#F25041] bg-[#F25041]/10 text-[#c0392b]': blankState === 'wrong',
          }"
        >
          <span v-if="selectedAlt">{{ selectedAlt.text }}</span>
          <span v-else class="text-slate-300 text-base font-medium tracking-widest">_ _ _</span>
        </span>

        <span v-if="parts[1]">{{ parts[1] }}</span>
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="alt in question.alternatives"
        :key="alt.id"
        @click="emit('select', alt)"
        :disabled="answered || lost"
        class="px-3 py-3 sm:px-6 sm:py-5 rounded-xl border-2 text-sm sm:text-base font-bold transition-all duration-200"
        :class="chipClass(alt)"
      >
        <span class="flex items-center justify-center gap-2">
          {{ alt.text }}
          <svg
            v-if="answered && isCorrect && alt.is_correct"
            class="w-5 h-5 text-emerald-600"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <svg
            v-else-if="answered && selectedAlt?.id === alt.id && !alt.is_correct"
            class="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.chip {
  transition:
    transform 0.15s ease-out,
    box-shadow 0.15s ease-out,
    background-color 0.2s,
    border-color 0.2s;
}

.chip-idle {
  box-shadow: 3px 3px 0 #cbd5e1;
  transition:
    transform 0.15s ease-out,
    box-shadow 0.15s ease-out,
    background-color 0.2s,
    border-color 0.2s;
}

.chip-idle:hover {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #94a3b8;
}

.chip-idle:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 #cbd5e1;
}
</style>
