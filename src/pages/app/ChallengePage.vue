<script setup>
import Loading from '@/components/Loading.vue'
import { api } from '@/lib/api'
import { HeartCrackIcon, HeartIcon, Trophy, ZapIcon } from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import confetti from 'canvas-confetti'
import Button from '@/components/Button.vue'

const challenge = ref(null)
const loading = ref(true)
const route = useRoute()
const router = useRouter()

const currentIndex = ref(0)
const selectedAlt = ref(null)
const answered = ref(false)
const isCorrect = ref(false)
const completed = ref(false)
const animating = ref(false)
const streakCount = ref(0)
const totalCorrect = ref(0)
const wrongCount = ref(0)
const showXP = ref(false)
const showStreak = ref(false)
const xpEarned = ref(0)
const lost = ref(false)
const showVictory = ref(false)

const questions = computed(() => challenge.value?.questions ?? [])
const currentQuestion = computed(() => questions.value[currentIndex.value])
const completedPct = computed(() =>
  questions.value.length
    ? ((currentIndex.value + (answered.value && isCorrect.value ? 1 : 0)) /
        questions.value.length) *
      100
    : 0
)
const hearts = computed(() => Math.max(0, 3 - wrongCount.value))
const letters = ['A', 'B', 'C', 'D', 'E']

async function loadChallenge(id) {
  try {
    const { data } = await api.get(`challenges/${id}`)
    challenge.value = data.data
  } catch (err) {
    console.error('Erro ao buscar desafio:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => loadChallenge(route.params.id))

function fireConfetti() {
  const duration = 1200
  const end = Date.now() + duration
  const frame = () => {
    confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 } })
    confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 } })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

function fireVictoryConfetti() {
  const duration = 4000
  const end = Date.now() + duration
  const colors = ['#98BF45', '#F2DC4E', '#488FB5', '#F25041']

  const frame = () => {
    confetti({
      particleCount: 8,
      spread: 120,
      startVelocity: 45,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors
    })

    if (Date.now() < end) requestAnimationFrame(frame)
  }

  frame()
}

function selectAlternative(alt) {
  if (answered.value || animating.value || lost.value) return

  selectedAlt.value = alt
  answered.value = true
  isCorrect.value = !!alt.is_correct

  if (alt.is_correct) {
    fireConfetti()
    streakCount.value++
    totalCorrect.value++
    xpEarned.value = streakCount.value >= 3 ? 20 : 10
    triggerXP()
    if (streakCount.value >= 3) triggerStreak()

    const isLastQuestion =
      currentIndex.value === questions.value.length - 1

    if (isLastQuestion) {
      setTimeout(() => {
        finishChallenge()
        showVictory.value = true
        fireVictoryConfetti()
      }, 700)
    }
  } else {
    streakCount.value = 0
    wrongCount.value++

    if (wrongCount.value >= 3) {
      setTimeout(() => {
        lost.value = true
      }, 600)
      return
    }

    setTimeout(() => {
      answered.value = false
      selectedAlt.value = null
      isCorrect.value = false
    }, 1000)
  }
}

function triggerXP() {
  showXP.value = true
  setTimeout(() => (showXP.value = false), 1800)
}

function triggerStreak() {
  showStreak.value = true
  setTimeout(() => (showStreak.value = false), 2200)
}

function nextQuestion() {
  if (animating.value) return
  animating.value = true
  setTimeout(() => {
    currentIndex.value++
    answered.value = false
    selectedAlt.value = null
    isCorrect.value = false
    animating.value = false
  }, 320)
}

async function finishChallenge() {
  completed.value = true
  try {
    await api.post(`challenges/${challenge.value.id}/attempt`, {
      without_errors: wrongCount.value == 0
    })
  } catch (err) {
    console.error('Erro ao finalizar desafio:', err)
  }
}

function goBack() {
  router.push('/app/track/' + challenge.value.track_id)
}

function reloadPage() {
  window.location.reload()
}

function altClass(alt) {
  if (!answered.value)
    return `
      option-button option-idle
      border-slate-200 bg-white
      hover:border-[#488FB5]
      hover:bg-sky-50
      cursor-pointer
    `

  if (isCorrect.value && alt.is_correct)
    return `
      option-button option-correct
      border-[#98BF45]
      bg-[#98BF45]/10
      cursor-default
    `

  if (selectedAlt.value?.id === alt.id && !alt.is_correct)
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
  if (!answered.value)
    return 'bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-sky-100 group-hover:border-[#488FB5] group-hover:text-[#488FB5]'

  if (isCorrect.value && alt.is_correct)
    return 'bg-[#6F8C30] text-white border-[#6F8C30]'

  if (selectedAlt.value?.id === alt.id && !alt.is_correct)
    return 'bg-[#F25041] text-white border-[#F25041]'

  return 'bg-slate-100 text-slate-400 border-slate-200'
}
</script>

<template>
  <Loading v-if="loading" />

  <div v-else-if="challenge" class="min-h-screen bg-slate-50 flex flex-col">
    <header class="bg-white border-b border-slate-200 px-5 py-8 flex items-center gap-5 sticky top-0 z-20 shadow-sm">
      <button
        @click="goBack"
        class="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-400 rounded-lg px-3 py-1.5 transition-all shrink-0 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" />
        </svg>
        Voltar
      </button>

      <div class="flex-1 flex flex-col gap-1 min-w-0">
        <div class="flex items-center justify-between text-xs font-semibold">
          <span class="text-slate-400">{{ currentIndex + 1 }} / {{ questions.length }}</span>
          <span style="color:#98BF45">{{ Math.round(completedPct) }}%</span>
        </div>
        <div class="h-3.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            class="bg-linear-to-r from-[#98BF45] to-[#6F8C30] h-full rounded-full transition-all duration-500 ease-out"
            :style="{ width: completedPct + '%' }"
          ></div>
        </div>
      </div>

      <div class="flex items-center gap-0.5 shrink-0">
        <span
          v-for="n in 3"
          :key="n"
          class="text-lg transition-all duration-300"
          :class="n <= hearts ? 'scale-100' : 'opacity-20 grayscale scale-90'"
        >
          <HeartIcon class="w-6 h-6 text-[#F25041]" />
        </span>
      </div>

      <div
        class="flex items-center gap-1.5 rounded-full px-3 py-1.5 shrink-0 border border-[#F25041] bg-[#FAE8E7] text-[#F25041]"
      >
        <ZapIcon class="w-6 h-6" />
        <span class="text-sm font-bold">{{ challenge.score }} XP</span>
      </div>
    </header>

    <main class="flex-1 bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] flex flex-col px-4 sm:px-8 py-6 w-screen">
      <div class="max-w-3xl mx-auto">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-x-10"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-280 ease-in"
          leave-to-class="opacity-0 -translate-x-10"
          mode="out-in"
        >
          <div :key="currentQuestion.id" class="min-w-200 flex flex-col gap-4 flex-1">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-7">
              <p class="text-xl sm:text-2xl font-bold text-[#424242] leading-relaxed font-[Poppins]">
                {{ currentQuestion.statement }}
              </p>
            </div>

            <div class="flex flex-col gap-3 flex-1">
              <button
                v-for="(alt, i) in currentQuestion.alternatives"
                :key="alt.id"
                @click="selectAlternative(alt)"
                :disabled="answered || lost"
                class="group flex items-center gap-4 w-full text-left border-2 rounded-2xl px-6 py-5"
                :class="altClass(alt)"
              >
                <span
                  class="w-10 h-10 shrink-0 rounded-xl border-2 flex items-center justify-center text-sm font-extrabold transition-all duration-200"
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
        </Transition>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div v-if="isCorrect && currentIndex < questions.length - 1" class="ml-auto shrink-0">
            <Button
              title="Próxima >"
              color="#98BF45"
              shadowColor="#6F8C30"
              @click="nextQuestion"
              class="mx-auto mt-5"
            />
          </div>
        </Transition>
      </div>
    </main>

    <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="lost" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center flex flex-col gap-3">
          <h2 class="flex justify-center items-center gap-2 text-2xl font-bold text-[#424242]">
            Você perdeu
            <HeartCrackIcon class="w-7 h-7" />
          </h2>
          <p class="text-slate-500">Você usou todas as vidas. Tente novamente.</p>
          <Button
            title="Tentar novamente"
            color="#98BF45"
            shadowColor="#6F8C30"
            @click="reloadPage"
            class="mx-auto mt-3"
          />
        </div>
      </div>
    </Transition>

    <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="showVictory" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center flex flex-col gap-4">
          <h2 class="text-3xl font-bold text-[#424242] flex justify-center items-center gap-2">
            Desafio Concluído!
            <Trophy class="w-8 h-8 text-[#F2DC4E]" />
          </h2>

          <p class="text-slate-500">Parabéns! Você completou o desafio!</p>

          <div class="flex justify-center items-center gap-2 text-[#98BF45] font-bold">
            <ZapIcon class="w-6 h-6" />
            {{ challenge.score }} XP ganhos
          </div>

          <Button
            title="Concluir Desafio"
            color="#F2DC4E"
            shadowColor="#d1bc32"
            @click="goBack()"
            class="mx-auto mt-4",
            style="color: #786801"
          />
        </div>
      </div>
    </Transition>
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
  box-shadow: 4px 4px 0 #6F8C30;
}

.option-wrong {
  box-shadow: 4px 4px 0 #D96055;
}

.option-disabled {
  box-shadow: none;
  transform: none;
}
</style>