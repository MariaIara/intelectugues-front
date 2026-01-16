<script setup>
import { Trophy, Zap } from 'lucide-vue-next';
import Logo from "@/components/Logo.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";

</script>

<template> 
    <header class="bg-white flex justify-between items-center px-12 py-4">
      <Logo/>
      <div class="flex items-center gap-8">
        <div class="flex gap-4 items-center">
          <div class="flex items-center gap-1.5 bg-[#FFF9D1] rounded-3xl h-full px-6 py-2 border border-[#F2DC4E]">
            <Trophy color="#DBC32A" size="18" />
            <p class="text-[#DBC32A]">12 pts</p>
          </div>
          <div class="flex items-center gap-1.5 bg-[#FAE8E7] rounded-3xl h-full px-6 py-2 border border-[#F25041]">
            <Zap color="#F25041" size="18" />
            <p class="text-[#F25041]">12 dias</p>
          </div>
        </div>
        <ProfilePicture/>
      </div>
    </header>
</template>