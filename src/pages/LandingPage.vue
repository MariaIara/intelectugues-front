<script setup lang="ts">
import Button from '@/components/Button.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import PicturesApp from '@/components/PicturesApp.vue';
import router from '@/router';
import { BookType, CircleCheckBig, CircleStar, Waypoints } from 'lucide-vue-next';

</script>

<template>
    <div class="h-screen overflow-x-hidden">
        <Header />
        <div class="bg-[#F7FCFD] border-y border-[#E6E6E6] flex flex-col items-center justify-center px-40 py-30">
            <div class="bg-white rounded-3xl shadow-[0_4px_8px_0_#0000001A] mb-8 px-3 py-2">
                <p class="font-[Roboto] text-sm">Aprenda <span class="text-[#6F8C30]">português</span> de forma
                    divertida.</p>
            </div>
            <h1 class="font-bold font-[Poppins] text-center text-7xl mb-12">Seu futuro começa com as palavras certas.
            </h1>
            <div class="flex gap-4">
                <Button title="Começar gratuitamente →" color="#98BF45" shadowColor="#6F8C30"
                    @click="router.push('/register')" />
                <Button title="Entrar" color="#DBC32A" shadowColor="#A38E03" @click="router.push('/app')" />
            </div>
        </div>
        <div class="flex items-center justify-between gap-40 px-20 pt-30 pb-42">
            <div class="flex flex-col justify-center">
                <h2 class="font-bold font-[Poppins] text-4xl mb-10">Seja <span
                        class="text-[#98BF45]">protagonista</span> do seu próprio aprendizado.</h2>
                <div class="font-[Roboto] text-xl">
                    <div class="flex items-center gap-3 mb-8">
                        <Waypoints />
                        <p>Tenha acesso à uma <b>trilha de estudos</b></p>
                    </div>
                    <div class="flex items-center gap-3 mb-8">
                        <BookType />
                        <p>Aumente seu vocabulário com uma <b>nova palavra diariamente</b></p>
                    </div>
                    <div class="flex items-center gap-3 mb-8">
                        <CircleStar />
                        <p>Dispute posições no <b>ranking</b> e acompanhe sua pontuação</p>
                    </div>
                </div>
            </div>
            <PicturesApp />
        </div>
        <div
            class="bg-[#F7FCFD] border-y border-[#E6E6E6] px-20 py-36 font-medium font-[Roboto] text-2xl text-[#5F5F5F]">
            <div class="flex items-center justify-center gap-10 mb-20">
                <div
                    class="flex flex-col items-center justify-center text-center gap-4 bg-white rounded-3xl shadow-xl py-12 px-6">
                    <CircleCheckBig class="text-[#7CB500] w-10 h-10" :stroke-width="3" />
                    <h3>Aprenda português de forma divertida</h3>
                </div>
                <div
                    class="flex flex-col items-center justify-center text-center gap-4 bg-white rounded-3xl shadow-xl py-12 px-6">
                    <CircleCheckBig class="text-[#7CB500] w-10 h-10" :stroke-width="3" />
                    <h3>Receba feedbacks imediatos</h3>
                </div>
                <div
                    class="flex flex-col items-center justify-center text-center gap-4 bg-white rounded-3xl shadow-xl py-12 px-6">
                    <CircleCheckBig class="text-[#7CB500] w-10 h-10" :stroke-width="3" />
                    <h3>Seja protagonista do seu aprendizado</h3>
                </div>
                <div
                    class="flex flex-col items-center justify-center text-center gap-4 bg-white rounded-3xl shadow-xl py-12 px-6">
                    <CircleCheckBig class="text-[#7CB500] w-10 h-10" :stroke-width="3" />
                    <h3>Estude de graça e no seu ritmo</h3>
                </div>
            </div>
            <Button title="Começar gratuitamente →" color="#98BF45" shadowColor="#6F8C30"
                class="mx-auto font-bold font-[Poppins] text-xl" @click="router.push('/register')" />
        </div>
        <Footer />
    </div>
</template>
