<script setup>
import Achievement from "@/components/Achievement.vue";
import DailyWord from "@/components/app/DailyWord.vue";
import Title from "@/components/Title.vue";
import { BookOpenCheck, GraduationCap, Medal, Rocket, TrendingUp, Zap } from "lucide-vue-next";
import Progress from "@/components/app/Progress.vue";
import Tracks from "@/components/app/Tracks.vue";
import HeaderApp from "@/components/app/HeaderApp.vue";
import Rank from "@/components/app/Rank.vue";

</script>

<template>
  <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] h-full pb-6">
    <HeaderApp />
    <section id="section-one" class="max-w-360 mx-auto grid grid-cols-[2.3fr_1fr] px-5 mt-10 gap-6">
      <Progress />
      <DailyWord />
    </section>

    <section id="section-two" class="max-w-360 max-h-fit mx-auto grid grid-cols-[2.3fr_1fr] px-5 mt-6 gap-6">
      <Tracks />

      <div class="grid grid-rows-[5fr_1fr] max-h-fit">
        <Rank />
        <div id="daily-challenge"
          class="bg-linear-to-r from-[#95CAE6] to-[#DCF3FF] border border-[#DFDFDF] rounded-2xl py-4 px-6 mt-6">
          <div class="flex items-center gap-4">
            <Title title="Desafio Diário" class="mt-2" />
            <Rocket class="text-[#3B3939]" />
          </div>
          <p class="text-lg mt-2">
            Ganhe + 100 pontos extras.
            <a href="#" class="underline">Comece agora.</a>
          </p>
        </div>
      </div>
    </section>

    <section id="section-three" class="max-w-360 mx-auto px-5 mt-6 gap-6">
      <div id="achievements" class="bg-white border border-[#DFDFDF] rounded-2xl p-8">
        <Title title="Suas Conquistas Recentes" />
        <div class="grid grid-cols-4 items-center justify-center gap-6 mt-6">
          <Achievement backgroundColorIcon="#B3CC7E" effectsColor="#98BF45" text="Trilha Completa: Ortografia"
            :icon="GraduationCap" />
          <Achievement backgroundColorIcon="#E9A49E" effectsColor="#F25041" text="21 dias de ofensiva" :icon="Zap" />
          <Achievement backgroundColorIcon="#EEE18E" effectsColor="#DBC32A" text="1° lugar no Ranking" :icon="Medal" />
          <Achievement backgroundColorIcon="#8ECAEB" effectsColor="#246385" text="20 palavras novas"
            :icon="BookOpenCheck" />
        </div>
        <div class="grid grid-cols-4 items-center justify-center gap-6 mt-6">
          <Achievement backgroundColorIcon="#8ECAEB" effectsColor="#246385" text="10 palavras novas"
            :icon="BookOpenCheck" />
          <Achievement backgroundColorIcon="#B3CC7E" effectsColor="#98BF45" text="Trilha Completa: Verbos"
            :icon="GraduationCap" />
          <Achievement backgroundColorIcon="#E9A49E" effectsColor="#F25041" text="14 dias de ofensiva" :icon="Zap" />
          <Achievement backgroundColorIcon="#EEE18E" effectsColor="#DBC32A" text="3° lugar no Ranking" :icon="Medal" />
        </div>
      </div>
    </section>
  </div>
</template>
