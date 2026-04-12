<script setup>
import { api } from '@/lib/api';
import { LogOut, UserCircle2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const showDropdown = ref(false);

const props = defineProps(['user']);

const logout = async () => {
    try {
        await api.post('/logout');
    } catch (e) {
    } finally {
        localStorage.removeItem('token');
        router.push('/login');
    }
};
</script>

<template>
    <router-link to="/profile" class="relative" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
        <img :src="props.user?.avatar?.image" alt="avatar"
            class="w-12 cursor-pointer border-2 border-[#E7F1F5] rounded-full">
        <transition name="fade">
            <div v-if="showDropdown"
                class="absolute right-0 w-44 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                <router-link to="/profile"
                    class="w-full flex items-center gap-4 text-gray-700 px-8 py-2.5 hover:bg-gray-100 cursor-pointer transition">
                    <UserCircle2 size="18" />
                    Perfil
                </router-link>

                <button @click="logout"
                    class="w-full flex items-center gap-4 px-8 py-2.5 text-red-500 hover:bg-red-50 cursor-pointer transition">
                    <LogOut size="18" />
                    Logout
                </button>
            </div>
        </transition>
    </router-link>
</template>