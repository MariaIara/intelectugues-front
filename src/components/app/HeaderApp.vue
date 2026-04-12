<script setup>
import { Trophy, Zap } from 'lucide-vue-next';
import Logo from "@/components/Logo.vue";
import { onMounted, reactive, ref } from 'vue';
import { api } from '@/lib/api';
import DropdownMenu from './DropdownMenu.vue';
import { useRoute } from 'vue-router';

const router = useRoute();

const loading = ref(false);

const data = reactive({
  user: {},
});

const fetchUser = async () => {
  try {
    loading.value = true;
    const response = await api.get('/profile');
    data.user = response.data.data;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchUser();
});

</script>

<template>
  <header class="bg-white font-[Poppins] py-3 md:py-4">
    <div class="max-w-360 mx-auto px-3 md:px-5 flex justify-between items-center">
      <Logo />
      <div class="flex items-center gap-0 xl:gap-8">
        <div class="hidden md:flex md:gap-4 items-center">
          <div class="flex items-center gap-1.5 bg-[#FFF9D1] rounded-3xl h-full px-6 py-2 border border-[#F2DC4E]">
            <Trophy color="#DBC32A" size="18" />
            <p class="text-[#DBC32A]">{{ data.user.general_score }} pts</p>
          </div>
          <div class="flex items-center gap-1.5 bg-[#FAE8E7] rounded-3xl h-full px-6 py-2 border border-[#F25041]">
            <Zap color="#F25041" size="18" />
            <p class="text-[#F25041]">{{ data.user.general_sequence }} dias seguidos</p>
          </div>
        </div>

        <DropdownMenu v-if="router.path != '/profile'" :user="data.user" />

      </div>
    </div>
  </header>
</template>