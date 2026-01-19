<script setup>
import Button from "@/components/Button.vue";
import HeaderApp from "@/components/HeaderApp.vue";
import RankDiv from "@/components/RankDiv.vue";
import Title from "@/components/Title.vue";
import { CircleStar, Flame, Star, TrendingUp, Trophy } from "lucide-vue-next";

</script>

<template>
  <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] h-full">
    <HeaderApp />
    <section id="section-one" class="max-w-360 mx-auto grid grid-cols-[2fr_1fr] px-5 mt-10 gap-6">
      <div id="progress" class="bg-white border border-[#DFDFDF] rounded-2xl p-6">
        <div class="flex justify-between">
          <Title title="Acompanhe seu Progresso" />
          <a href="#" class="text-sm text-[#6E6E6E] underline">Ver Mais</a>
        </div>
        <div class="grid grid-cols-3 items-center mt-6 gap-4">
          <div class="bg-[#FAE8E7] text-[#F25041] border-2 border-[#F25041] rounded-lg text-center px-12 py-6">
            <Flame class="m-auto w-8 h-8" />
            <p class="font-medium font-[Poppins] text-xl mt-2">12 dias</p>
            <p>Sequência</p>
          </div>
          <div class="bg-[#FFFBE4] text-[#998400] border-2 border-[#F2DC4E] rounded-lg text-center px-12 py-6">
            <Trophy class="m-auto w-8 h-8" />
            <p class="font-medium font-[Poppins] text-xl mt-2">80 pontos</p>
            <p>12/20 XP</p>
          </div>
          <div class="bg-[#C6E0ED] text-[#246385] border-2 border-[#246385] rounded-lg text-center px-12 py-6">
            <CircleStar class="m-auto w-8 h-8" />
            <p class="font-medium font-[Poppins] text-xl mt-2">Prata</p>
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
      <div id="dictionary" class="bg-[#DF786E] border border-[#B2463C] rounded-2xl p-6">
        <div class="flex justify-between">
          <h3 class="font-semibold font-[Poppins] text-2xl text-[#320202]">Dicionário</h3>
          <a href="#" class="text-sm text-[#FFF2E1]">22 dez 2025</a>
        </div>
        <div class="flex justify-between mt-8">
          <div>
            <h4 class="font-medium text-2xl text-white">Hipérbole</h4>
            <p class="text-sm text-[#E6E6E6]">substantivo</p>
          </div>
          <Star class="text-[#FFF2E1]" />
        </div>
        <p class="text-white mt-6">Ênfase expressiva resultante do exagero da significação.</p>
        <div class="flex mt-4 gap-4">
          <span class="bg-[#FFF2E1] border border-[#FFDCAB] text-[#545454] rounded-2xl px-4 py-1">exagero</span>
          <span class="bg-[#FFF2E1] border border-[#FFDCAB] text-[#545454] rounded-2xl px-4 py-1">aumento</span>
          <span class="bg-[#FFF2E1] border border-[#FFDCAB] text-[#545454] rounded-2xl px-4 py-1">ampliação</span>
        </div>
      </div>
    </section>

    <section id="section-two" class="max-w-360 mx-auto grid grid-cols-[2fr_1fr] px-5 mt-6 gap-6">
      <div id="tracks" class="bg-white border border-[#DFDFDF] rounded-2xl p-6">
        <Title title="Trilhas de Estudo" />
      </div>
      <div id="ranking" class="bg-white border border-[#DFDFDF] rounded-2xl p-6">
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
          <RankDiv position="4" picture="src/assets/avatar/avatar-four.svg" name="Arya Stark" backgroundColor="#FFFFFF"
            strokeColor="#E6E6E6" />
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
    </section>
  </div>
</template>
