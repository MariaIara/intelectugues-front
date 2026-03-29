<script setup>
import { api } from '@/lib/api';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const challenge  = ref(null);
const loading    = ref(true);
const route      = useRoute();
const router     = useRouter();

const currentIndex    = ref(0);
const selectedAlt     = ref(null);
const answered        = ref(false);
const isCorrect       = ref(false);
const completed       = ref(false);
const animating       = ref(false);
const streakCount     = ref(0);
const totalCorrect    = ref(0);
const wrongCount      = ref(0);
const showXP          = ref(false);
const showStreak      = ref(false);
const xpEarned        = ref(0);

const questions       = computed(() => challenge.value?.questions ?? []);
const currentQuestion = computed(() => questions.value[currentIndex.value]);
const completedPct    = computed(() =>
  questions.value.length
    ? ((currentIndex.value + (answered.value && isCorrect.value ? 1 : 0)) / questions.value.length) * 100
    : 0
);
const hearts = computed(() => Math.max(0, 3 - wrongCount.value));
const letters = ['A', 'B', 'C', 'D', 'E'];

async function loadChallenge(id) {
  try {
    const { data } = await api.get(`challenges/${id}`);
    challenge.value = data.data;
  } catch (err) {
    console.error('Erro ao buscar desafio:', err);
  } finally {
    loading.value = false;
  }
}
onMounted(() => loadChallenge(route.params.id));

function selectAlternative(alt) {
  if (answered.value || animating.value) return;
  selectedAlt.value = alt;
  answered.value    = true;
  isCorrect.value   = !!alt.is_correct;

  if (alt.is_correct) {
    streakCount.value++;
    totalCorrect.value++;
    xpEarned.value = streakCount.value >= 3 ? 20 : 10;
    triggerXP();
    if (streakCount.value >= 3) triggerStreak();
  } else {
    streakCount.value = 0;
    wrongCount.value++;
    setTimeout(() => {
      answered.value    = false;
      selectedAlt.value = null;
      isCorrect.value   = false;
    }, 1000);
  }
}

function triggerXP() {
  showXP.value = true;
  setTimeout(() => { showXP.value = false; }, 1800);
}
function triggerStreak() {
  showStreak.value = true;
  setTimeout(() => { showStreak.value = false; }, 2200);
}

function nextQuestion() {
  if (animating.value) return;
  animating.value = true;
  setTimeout(() => {
    currentIndex.value++;
    answered.value    = false;
    selectedAlt.value = null;
    isCorrect.value   = false;
    animating.value   = false;
  }, 320);
}

async function finishChallenge() {
  completed.value = true;
  try {
    await api.post(`challenges/${challenge.value.id}/attempt`, { without_errors: wrongCount.value == 0 });
  } catch (err) {
    console.error('Erro ao finalizar desafio:', err);
  }
}

function goBack() {
    router.push('/app/track/' + challenge.value.track_id);
}

function altClass(alt) {
  if (!answered.value)
    return 'border-slate-200 bg-white hover:border-[#488FB5] hover:bg-sky-50 hover:translate-x-1.5 hover:shadow-md cursor-pointer';
  if (alt.is_correct)
    return 'border-[#98BF45] bg-[#98BF45]/10 shadow-md cursor-default';
  if (selectedAlt.value?.id === alt.id)
    return 'border-[#F25041] bg-[#F25041]/10 cursor-default';
  return 'border-slate-200 bg-white opacity-35 cursor-default';
}

function altLetterClass(alt) {
  if (!answered.value)
    return 'bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-sky-100 group-hover:border-[#488FB5] group-hover:text-[#488FB5]';
  if (alt.is_correct)
    return 'bg-[#6F8C30] text-white border-[#6F8C30]';
  if (selectedAlt.value?.id === alt.id)
    return 'bg-[#F25041] text-white border-[#F25041]';
  return 'bg-slate-100 text-slate-400 border-slate-200';
}
</script>

<template>
  <div v-if="loading" class="min-h-screen bg-slate-50 flex items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <div class="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style="border-color: #488FB5; border-top-color: transparent;"></div>
      <p class="text-slate-500 font-medium">Carregando desafio…</p>
    </div>
  </div>

  <div v-else-if="challenge" class="min-h-screen bg-slate-50 flex flex-col">

    <header class="bg-white border-b border-slate-200 px-5 py-5 flex items-center gap-3 sticky top-0 z-20 shadow-sm">

      <button
        @click="goBack"
        class="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800
               border border-slate-200 hover:border-slate-400 rounded-lg px-3 py-1.5 transition-all shrink-0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
        </svg>
        Voltar
      </button>

      <div class="flex-1 flex flex-col gap-1 min-w-0">
        <div class="flex items-center justify-between text-xs font-semibold">
          <span class="text-slate-400">{{ currentIndex + 1 }} / {{ questions.length }}</span>
          <span style="color: #488FB5;">{{ Math.round(completedPct) }}%</span>
        </div>
        <div class="h-3.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            :style="{ width: completedPct + '%', background: 'linear-gradient(90deg, #488FB5, #6BAED6)' }"
          >
            <div class="absolute inset-0 progress-shimmer"></div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-0.5 shrink-0">
        <span
          v-for="n in 3" :key="n"
          class="text-lg transition-all duration-300"
          :class="n <= hearts ? 'scale-100' : 'opacity-20 grayscale scale-90'"
        >❤️</span>
      </div>

      <div class="flex items-center gap-1.5 rounded-full px-3 py-1.5 shrink-0" style="background-color: #DF786E;">
        <span class="text-base leading-none">⚡</span>
        <span class="text-sm font-bold text-white">{{ totalCorrect * 10 }} XP</span>
      </div>
    </header>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4 scale-90"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-300"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div v-if="showStreak"
           class="fixed top-[72px] left-1/2 -translate-x-1/2 z-50 pointer-events-none
                  font-bold text-sm px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2"
           style="background: linear-gradient(90deg, #FFC675, #F2DC4E); color: #5c3d00;">
        🔥 Sequência x{{ streakCount }}! Bônus +10 XP
      </div>
    </Transition>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-50"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-400"
      leave-to-class="opacity-0 -translate-y-8 scale-75"
    >
      <div v-if="showXP && !showStreak"
           class="fixed top-[72px] left-1/2 -translate-x-1/2 z-50 pointer-events-none
                  text-white font-black text-base px-6 py-2 rounded-full shadow-lg"
           style="background-color: #D96055;">
        +{{ xpEarned }} XP ⚡
      </div>
    </Transition>

    <main class="flex-1 flex flex-col px-4 sm:px-8 py-6 w-full max-w-3xl mx-auto">

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-10"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-280 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-10"
        mode="out-in"
      >
        <div :key="currentQuestion.id" class="flex flex-col gap-4 flex-1">

          <div class="bg-slate-100 rounded-3xl shadow-sm border border-slate-200 px-8 py-7">
            <div class="flex items-center justify-between mb-5">
              <span class="text-xs font-bold uppercase tracking-widest rounded-lg px-3 py-1.5"
                    style="color: #488FB5; background-color: #488FB5/10; background: #e8f4fb; border: 1px solid #b3d6ea;">
                Questão {{ currentIndex + 1 }}
              </span>
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 scale-75"
                enter-to-class="opacity-100 scale-100"
              >
                <div v-if="streakCount >= 2"
                     class="flex items-center gap-1.5 font-bold text-sm rounded-full px-3 py-1 animate-pulse"
                     style="color: #5c3d00; background-color: #fff3cd; border: 1px solid #FFC675;">
                  🔥 {{ streakCount }} seguidas
                </div>
              </Transition>
            </div>

            <p class="text-2xl sm:text-3xl font-bold text-slate-800 leading-relaxed" style="font-family: 'Georgia', serif;">
              {{ currentQuestion.statement }}
            </p>
          </div>

          <div class="flex flex-col gap-3 flex-1">
            <button
              v-for="(alt, i) in currentQuestion.alternatives"
              :key="alt.id"
              @click="selectAlternative(alt)"
              :disabled="answered"
              class="group flex items-center gap-4 w-full text-left border-2 rounded-2xl
                     px-6 py-5 transition-all duration-200"
              :class="altClass(alt)"
            >
              <span
                class="w-10 h-10 shrink-0 rounded-xl border-2 flex items-center justify-center
                       text-sm font-extrabold transition-all duration-200"
                :class="altLetterClass(alt)"
              >{{ letters[i] }}</span>

              <span class="flex-1 text-base font-semibold text-slate-700 leading-snug">
                {{ alt.text }}
              </span>

              <span class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg v-if="answered && alt.is_correct"
                     class="text-emerald-500 w-6 h-6" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <svg v-else-if="answered && selectedAlt?.id === alt.id && !alt.is_correct"
                     class="text-red-500 w-6 h-6" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </span>
            </button>
          </div>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div
              v-if="answered"
              class="flex items-center gap-4 rounded-2xl border-2 px-6 py-4"
              :style="isCorrect
                ? 'background:#f2f8ec; border-color:#98BF45;'
                : 'background:#fdf1f0; border-color:#F25041;'"
            >
              <span class="text-3xl shrink-0">{{ isCorrect ? '🎉' : '😬' }}</span>

              <div class="flex flex-col gap-0.5 flex-1">
                <strong class="text-sm font-extrabold" :style="isCorrect ? 'color:#6F8C30' : 'color:#F25041'">
                  {{ isCorrect ? 'Correto!' : 'Não foi dessa vez…' }}
                </strong>
                <span class="text-xs text-slate-500">
                  {{ isCorrect ? 'Ótima resposta! Pode avançar.' : 'Selecione a alternativa correta para continuar.' }}
                </span>
              </div>

              <div v-if="isCorrect" class="ml-auto shrink-0">
                <button
                  v-if="currentIndex < questions.length - 1"
                  @click="nextQuestion"
                  class="flex items-center gap-2 text-white font-bold text-sm rounded-xl px-5 py-3
                         transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style="background: linear-gradient(135deg, #488FB5, #6BAED6);"
                >
                  Próxima
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </button>
                <button
                  v-else
                  @click="finishChallenge"
                  class="flex items-center gap-2 text-white font-bold text-sm rounded-xl px-5 py-3
                         transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style="background: linear-gradient(135deg, #FFC675, #F2DC4E); color: #5c3d00;"
                >
                  Concluir 🏆
                </button>
              </div>
            </div>
          </Transition>

        </div>
      </Transition>
    </main>
  </div>

  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <div
      v-if="completed"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      @click.self="goBack"
    >
      <Transition
        enter-active-class="transition-all duration-400 ease-out"
        enter-from-class="opacity-0 translate-y-10 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
      >
        <div v-if="completed" class="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">

          <div class="relative inline-block mb-3">
            <span class="text-7xl block animate-bounce">🏆</span>
            <span class="absolute -top-2 -right-3 text-2xl trophy-star">⭐</span>
            <span class="absolute -top-2 -left-3 text-2xl trophy-star-2">✨</span>
          </div>

          <h2 class="text-2xl font-black text-slate-800 mb-1" style="font-family: 'Georgia', serif;">
            Desafio Concluído!
          </h2>
          <p class="text-sm text-slate-500 mb-6">
            Você completou <span class="font-bold text-slate-700">{{ challenge.name }}</span>
          </p>

          <div class="grid grid-cols-3 gap-3 mb-5">
            <div class="rounded-2xl py-4 px-2 flex flex-col items-center gap-1"
                 style="background:#e8f4fb; border: 1px solid #b3d6ea;">
              <span class="text-2xl">⚡</span>
              <span class="text-xl font-black" style="color:#488FB5;">{{ totalCorrect * 10 }}</span>
              <span class="text-xs text-slate-500 font-medium">XP</span>
            </div>
            <div class="rounded-2xl py-4 px-2 flex flex-col items-center gap-1"
                 style="background:#f2f8ec; border: 1px solid #98BF45;">
              <span class="text-2xl">🎯</span>
              <span class="text-xl font-black" style="color:#6F8C30;">{{ totalCorrect }}/{{ questions.length }}</span>
              <span class="text-xs text-slate-500 font-medium">Acertos</span>
            </div>
            <div class="rounded-2xl py-4 px-2 flex flex-col items-center gap-1"
                 style="background:#fdf1f0; border: 1px solid #F25041;">
              <span class="text-2xl">❤️</span>
              <span class="text-xl font-black" style="color:#D96055;">{{ hearts }}/3</span>
              <span class="text-xs text-slate-500 font-medium">Vidas</span>
            </div>
          </div>

          <div class="rounded-2xl px-6 py-4 mb-6 text-white"
               style="background: linear-gradient(135deg, #488FB5, #6BAED6);">
            <p class="text-xs font-bold uppercase tracking-widest opacity-80 mb-0.5">Pontuação do desafio</p>
            <p class="text-4xl font-black">+{{ challenge.score }} pts</p>
          </div>

          <button
            @click="goBack"
            class="w-full text-white font-bold rounded-2xl py-4 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style="background: linear-gradient(135deg, #488FB5, #6BAED6);"
          >
            Voltar à trilha
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.progress-shimmer {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.trophy-star {
  animation: float 1.2s ease-in-out infinite;
}
.trophy-star-2 {
  animation: float 1.5s ease-in-out 0.3s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-10deg); }
  50%       { transform: translateY(-8px) rotate(10deg); }
}
</style>