<script setup>
import DailyWord from "@/components/app/DailyWord.vue";
import Title from "@/components/Title.vue";
import { Rocket } from "lucide-vue-next";
import Progress from "@/components/app/Progress.vue";
import Tracks from "@/components/app/Tracks.vue";
import HeaderApp from "@/components/app/HeaderApp.vue";
import Rank from "@/components/app/Rank.vue";
import Achievements from "@/components/app/Achievements.vue";

</script>

<template>
  <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] h-full pb-6">
    <HeaderApp />
    <section id="section-one" class="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-[2.3fr_1fr] px-3 md:px-5 mt-4 md:mt-6 xl:mt-10 gap-3 md:gap-5 xl:gap-6">
      <Progress />
      <DailyWord />
    </section>

    <section id="section-two" class="max-w-360 max-h-fit mx-auto grid grid-cols-1 md:grid-cols-[2.3fr_1fr] px-3 md:px-5 mt-3 md:mt-5 xl:mt-6 gap-3 md:gap-5 xl:gap-6">
      <Tracks />

      <!-- <div class="flex flex-col md:grid md:grid-rows-[5fr_1fr] max-h-fit"> -->
        <Rank />
        <!-- <div id="daily-challenge"
          class="bg-linear-to-r from-[#95CAE6] to-[#DCF3FF] border border-[#DFDFDF] rounded-2xl py-3 px-4 md:py-4 md:px-6 mt-3 md:mt-5 xl:mt-6">
          <div class="flex items-center gap-4">
            <Title title="Desafio Diário" class="mt-2" />
            <Rocket class="text-[#3B3939]" />
          </div>
          <p class="text-base xl:text-lg mt-2">
            Ganhe + 100 pontos extras.
            <a href="#" class="underline">Comece agora.</a>
          </p>
        </div> -->
      <!-- </div> -->
    </section>

    <section id="section-three" class="max-w-360 mx-auto px-3 md:px-5 mt-3 md:mt-5 xl:mt-6 gap-6">
      <Achievements />
    </section>
  </div>
</template>
