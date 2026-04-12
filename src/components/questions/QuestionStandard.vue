<script setup>
const props = defineProps({
  question: { type: Object, required: true },
  answered: { type: Boolean, required: true },
  selectedAlt: { type: Object, default: null },
  isCorrect: { type: Boolean, required: true },
  lost: { type: Boolean, required: true },
})

const emit = defineEmits(['select'])

const letters = ['A', 'B', 'C', 'D', 'E']

function altClass(alt) {
  if (!props.answered)
    return `
      option-button option-idle
      border-slate-200 bg-white
      hover:border-[#488FB5]
      hover:bg-sky-50
      cursor-pointer
    `

  if (props.isCorrect && alt.is_correct)
    return `
      option-button option-correct
      border-[#98BF45]
      bg-[#98BF45]/10
      cursor-default
    `

  if (props.selectedAlt?.id === alt.id && !alt.is_correct)
    return `
      option-button option-wrong
      border-[#F25041]
      bg-[#F25041]/10
      cursor-default
    `

  return `
    option-button option-disabled
    border-slate-200 bg-white opacity-35 cursor-default
  `
}

function altLetterClass(alt) {
  if (!props.answered)
    return 'bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-sky-100 group-hover:border-[#488FB5] group-hover:text-[#488FB5]'

  if (props.isCorrect && alt.is_correct)
    return 'bg-[#6F8C30] text-white border-[#6F8C30]'

  if (props.selectedAlt?.id === alt.id && !alt.is_correct)
    return 'bg-[#F25041] text-white border-[#F25041]'

  return 'bg-slate-100 text-slate-400 border-slate-200'
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-5 sm:px-8 sm:py-7">
      <p class="text-xl sm:text-2xl font-bold text-[#424242] leading-relaxed font-[Poppins]">
        {{ question.statement }}
      </p>
    </div>

    <div class="flex flex-col gap-3">
      <button
        v-for="(alt, i) in question.alternatives"
        :key="alt.id"
        @click="emit('select', alt)"
        :disabled="answered || lost"
        class="group flex items-center gap-2 sm:gap-4 w-full text-left border-2 rounded-2xl px-3 py-3 sm:px-6 sm:py-5"
        :class="altClass(alt)"
      >
        <span
          class="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl border-2 flex items-center justify-center text-sm font-extrabold transition-all duration-200"
          :class="altLetterClass(alt)"
        >
          {{ letters[i] }}
        </span>

        <span class="flex-1 text-base font-semibold text-slate-700 leading-snug">
          {{ alt.text }}
        </span>

        <span class="w-6 h-6 shrink-0 flex items-center justify-center">
          <svg
            v-if="answered && isCorrect && alt.is_correct"
            class="text-emerald-500 w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <svg
            v-else-if="answered && selectedAlt?.id === alt.id && !alt.is_correct"
            class="text-red-500 w-6 h-6"
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
.option-button {
  transition:
    transform 0.15s ease-out,
    box-shadow 0.15s ease-out,
    background-color 0.2s,
    border-color 0.2s;
}

.option-idle {
  box-shadow: 4px 4px 0 #cbd5e1;
}

.option-idle:hover {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 #cbd5e1;
}

.option-idle:active {
  transform: translate(4px, 4px);
  box-shadow: 0 0 0 #cbd5e1;
}

.option-correct {
  box-shadow: 4px 4px 0 #6f8c30;
}

.option-wrong {
  box-shadow: 4px 4px 0 #d96055;
}

.option-disabled {
  box-shadow: none;
  transform: none;
}
</style>
