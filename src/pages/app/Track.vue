<script setup>

import HeaderApp from "@/components/HeaderApp.vue";
import { NotebookPen } from "lucide-vue-next";

</script>
<template>
    <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] h-full pb-6">
        <HeaderApp />
        <section class="px-5 mt-10 mx-auto">
            <div class="flex items-center justify-between bg-white my-10 p-6 rounded-2xl border border-[#DFDFDF]">
                <div class="flex items-center gap-4">
                    <div class="bg-linear-to-r from-[#246385] to-[#519AC0] rounded-2xl w-fit p-4 mx-4">
                        <NotebookPen class="text-[#C6E0ED] w-12 h-12 m-auto" />
                    </div>
                    <div class="text-[#424242]">
                        <h1 class="font-[Poppins] font-semibold text-2xl">Ortografia</h1>
                        <p class="">Complete todos os desafios para dominar este conteúdo.</p>
                    </div>
                </div>
                <div>
                    <p>Progresso</p>
                    <p>80%</p>
                </div>
            </div>
        </section>

    </div>
</template>