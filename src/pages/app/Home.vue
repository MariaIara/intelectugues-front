<script setup>
import Achievement from "@/components/Achievement.vue";
import Button from "@/components/Button.vue";
import DailyWord from "@/components/daily-word.vue";
import HeaderApp from "@/components/HeaderApp.vue";
import RankDiv from "@/components/RankDiv.vue";
import Title from "@/components/Title.vue";
import TrackToLeft from "@/components/TrackToLeft.vue";
import TrackToRight from "@/components/TrackToRight.vue";
import { BookOpenCheck, CircleStar, Drama, Flame, GraduationCap, Handshake, Medal, NotebookPen, Rocket, Sparkles, TrendingUp, Trophy, Zap } from "lucide-vue-next";

</script>

<template>
  <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] h-full pb-6">
    <HeaderApp />
    <section id="section-one" class="max-w-360 mx-auto grid grid-cols-[2.3fr_1fr] px-5 mt-10 gap-6">
      <div id="progress" class="bg-white border border-[#DFDFDF] rounded-2xl p-8">
        <div class="flex justify-between">
          <Title title="Acompanhe seu Progresso" />
          <a href="#" class="text-sm text-[#6E6E6E] underline">Ver Mais</a>
        </div>
        <div class="grid grid-cols-3 items-center mt-6 gap-4">
          <div class="bg-[#FAE8E7] text-[#F25041] border-4 border-[#F25041] rounded-2xl text-center px-12 py-6">
            <Flame class="m-auto w-8 h-8" />
            <p class="font-medium font-[Poppins] text-2xl mt-2">12 dias</p>
            <p>Sequência</p>
          </div>
          <div class="bg-[#FFFBE4] text-[#998400] border-4 border-[#F2DC4E] rounded-2xl text-center px-12 py-6">
            <Trophy class="m-auto w-8 h-8" />
            <p class="font-medium font-[Poppins] text-2xl mt-2">80 pontos</p>
            <p>12/20 XP</p>
          </div>
          <div class="bg-[#C6E0ED] text-[#246385] border-4 border-[#246385] rounded-2xl text-center px-12 py-6">
            <CircleStar class="m-auto w-8 h-8" />
            <p class="font-medium font-[Poppins] text-2xl mt-2">Prata</p>
            <p>Nível</p>
          </div>
        </div>
        <div class="mt-6">
          <p class="text-sm">Seu progresso no nível Prata é de 80%</p>
          <div class="block bg-[#BDBDBD] rounded-full w-full h-3.5">
            <div class="bg-linear-to-r from-[#98BF45] to-[#6F8C30] rounded-full w-8/10 h-3.5 mt-1"></div>
          </div>
        </div>
      </div>
      <DailyWord />
    </section>

    <section id="section-two" class="max-w-360 max-h-fit mx-auto grid grid-cols-[2.3fr_1fr] px-5 mt-6 gap-6">
      <div id="tracks" class="bg-white border border-[#DFDFDF] rounded-2xl p-8 max-h-fit">
        <Title title="Trilhas de Estudo" />
        <div class="grid grid-cols-2 mt-6">
          <TrackToLeft backgroundColor="#FAE8E7" effectsColor="#F25041" textColor="#F25041"
            backgroundColorIcon="#FE8276" :icon="Handshake" />
          <TrackToRight backgroundColor="#C6E0ED" effectsColor="#246385" textColor="#246385"
            backgroundColorIcon="#519AC0" :icon="NotebookPen" />
          <TrackToLeft backgroundColor="#FFFBE4" effectsColor="#F2DC4E" textColor="#998400"
            backgroundColorIcon="#F5EBA6" :icon="Sparkles" />
          <TrackToRight backgroundColor="#E4F6BC" effectsColor="#98BF45" textColor="#98BF45"
            backgroundColorIcon="#B9DB70" :icon="Drama" />
        </div>
      </div>

      <div class="grid grid-rows-[5fr_1fr]">
        <div id="ranking" class="bg-white border border-[#DFDFDF] rounded-2xl p-8">
          <div class="flex justify-between">
            <Title title="Ranking" />
            <TrendingUp class="text-[#424242]" />
          </div>
          <div class="mt-12">
            <RankDiv position="1" picture="src/assets/avatar/avatar-two.svg" name="Daenerys Targaryen"
              backgroundColor="#F2E6B8" strokeColor="#C9B465" />
            <RankDiv position="2" picture="src/assets/avatar/avatar-one.svg" name="Você" backgroundColor="#E6E8EC"
              strokeColor="#BBC1CB" />
            <RankDiv position="3" picture="src/assets/avatar/avatar-three.svg" name="Tyrion Lannister"
              backgroundColor="#E3C2A6" strokeColor="#B9906E" />
            <RankDiv position="4" picture="src/assets/avatar/avatar-four.svg" name="Arya Stark"
              backgroundColor="#FFFFFF" strokeColor="#E6E6E6" />
            <RankDiv position="5" picture="src/assets/avatar/avatar-five.svg" name="Jon Snow" backgroundColor="#FFFFFF"
              strokeColor="#E6E6E6" />
          </div>
          <div class="flex justify-end">
            <p class="text-sm text-[#6C6C6C] mt-3">O ranking expira em 07/01</p>
          </div>
          <div class="flex items-center justify-center">
            <span class="text-3xl text-[#6C6C6C] mt-2">...</span>
          </div>
          <Button title="Ver Ranking Completo" color="#98BF45" shadowColor="#6F8C30"
            class="text-lg m-auto mt-6 px-14 py-2.5" />
        </div>
        <div id="daily-challenge"
          class="bg-linear-to-r from-[#95CAE6] to-[#DCF3FF] border border-[#DFDFDF] rounded-2xl py-4 px-6 mt-6">
          <div class="flex items-center gap-4">
            <Title title="Desafio Diário" />
            <Rocket class="text-[#3B3939]" />
          </div>
          <p class="text-lg mt-1">
            Ganhe + 100 pontos extras.
            <a href="#" class="underline">Clique para começar.</a>
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
