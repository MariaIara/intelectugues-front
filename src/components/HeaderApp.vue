<script setup>
import { Trophy, Zap } from 'lucide-vue-next';
import Logo from "@/components/Logo.vue";
import { onMounted, reactive, ref } from 'vue';
import { api } from '@/lib/api';

const loading = ref(false);

const data = reactive({
  avatar: '',
  general_score: '',
  general_sequence: ''
});

const fetchProgress = async () => {
  try {
    loading.value = true;
    const response = await api.get('/profile');
    Object.assign(data, response.data.data);
    data.avatar = response.data.data.avatar.image;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProgress();
});

</script>

<template>
  <header class="bg-white font-[Poppins] py-4">
    <div class="max-w-360 mx-auto px-5 flex justify-between items-center">
      <Logo />
      <div class="flex items-center gap-8">
        <div class="flex gap-4 items-center">
          <div class="flex items-center gap-1.5 bg-[#FFF9D1] rounded-3xl h-full px-6 py-2 border border-[#F2DC4E]">
            <Trophy color="#DBC32A" size="18" />
            <p class="text-[#DBC32A]">{{ data.general_score }} pts</p>
          </div>
          <div class="flex items-center gap-1.5 bg-[#FAE8E7] rounded-3xl h-full px-6 py-2 border border-[#F25041]">
            <Zap color="#F25041" size="18" />
            <p class="text-[#F25041]">{{ data.general_sequence }} dias seguidos</p>
          </div>
        </div>
        <img :src="data.avatar" alt="avatar" class="w-12">
      </div>
    </div>
  </header>
</template>