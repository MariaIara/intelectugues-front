<script setup>
import FavoriteWordsList from '@/components/app/FavoriteWordsList.vue';
import HeaderApp from '@/components/app/HeaderApp.vue';
import { api } from '@/lib/api';
import { Flame, LogOut, Trophy, Pencil, X, Check } from 'lucide-vue-next';
import { onMounted, reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const data = reactive({
    user: {}
});

const loading = ref(false);

const fetchUser = async () => {
    try {
        loading.value = true;
        const response = await api.get('/profile');
        data.user = response.data.data;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(fetchUser);

const progress = computed(() => {
    return data.user?.level?.percentual_progress ?? 0;
});

const logout = async () => {
    try {
        await api.post('/logout');
    } catch (e) {
    } finally {
        localStorage.removeItem('token');
        router.push('/login');
    }
};

const showEditModal = ref(false);
const savingProfile = ref(false);
const avatars = ref([]);

const editForm = reactive({
    name: '',
    avatarId: null
});

const fetchAvatars = async () => {
    try {
        const response = await api.get('/avatars');
        avatars.value = response.data.data ?? response.data;
    } catch (error) {
        console.error('Erro ao buscar avatares:', error);
    }
};

const openEditModal = () => {
    editForm.name = data.user?.name ?? '';
    editForm.avatarId = data.user?.avatar?.id ?? null;
    if (!avatars.value.length) fetchAvatars();
    showEditModal.value = true;
};

const closeEditModal = () => {
    showEditModal.value = false;
};

const saveProfile = async () => {
    try {
        savingProfile.value = true;
        const payload = {};
        if (editForm.name) payload.name = editForm.name;
        if (editForm.avatarId) payload.avatar_id = editForm.avatarId;

        const response = await api.patch('/profile', payload);
        data.user = response.data.data;
        closeEditModal();
    } catch (error) {
        console.error('Erro ao salvar perfil:', error);
    } finally {
        savingProfile.value = false;
    }
};
</script>

<template>
    <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] min-h-screen pb-10">

        <HeaderApp />

        <div class="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1.5fr]">
            <section class="w-full px-4 mt-10 space-y-6">

                <template v-if="loading">
                    <div
                        class="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center animate-pulse">
                        <div class="w-32 h-32 bg-gray-200 rounded-full" />
                        <div class="h-6 bg-gray-200 rounded-full w-40 mt-6" />
                        <div class="w-full mt-6">
                            <div class="flex justify-between mb-2">
                                <div class="h-3 bg-gray-200 rounded-full w-28" />
                                <div class="h-3 bg-gray-200 rounded-full w-10" />
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div v-for="i in 3" :key="i"
                            class="bg-white rounded-2xl p-6 text-center shadow-sm animate-pulse flex flex-col items-center gap-3">
                            <div class="h-3 bg-gray-200 rounded-full w-28" />
                            <div class="h-8 bg-gray-200 rounded-full w-20" />
                        </div>
                    </div>
                </template>

                <template v-else>
                    <div class="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center">

                        <div class="relative">
                            <img :src="data.user?.avatar?.image" alt="avatar"
                                class="w-32 h-32 rounded-full border-4 border-[#E7F1F5] shadow-md" />

                            <div class="absolute w-max -bottom-2 left-1/2 -translate-x-1/2
                               bg-[#98BF45] 500 text-white text-xs px-3 py-1
                               rounded-full shadow">
                                Lv. {{ data.user?.level?.name }}
                            </div>
                        </div>

                        <h1 class="text-2xl font-bold mt-6 text-[#424242]">
                            {{ data.user?.name }}
                        </h1>

                        <div class="w-full mt-6">
                            <div class="flex justify-between text-sm text-gray-500 mb-2">
                                <span>Progresso do nível</span>
                                <span>{{ progress }}%</span>
                            </div>

                            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div class="bg-linear-to-r from-[#98BF45] to-[#6F8C30] h-3 rounded-full transition-all duration-500"
                                    :style="{ width: progress + '%' }"></div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <p class="text-gray-400 text-sm">Pontuação Geral</p>
                            <h2 class="text-3xl font-bold text-[#998400] mt-2">
                                {{ data.user?.general_score }}
                            </h2>
                        </div>

                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <p class="text-gray-400 text-sm">Pontuação Semanal</p>
                            <h2 class="text-3xl font-bold text-[#246385] mt-2">
                                {{ data.user?.weekly_score }}
                            </h2>
                        </div>

                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <p class="text-gray-400 text-sm">Sequência</p>
                            <h2 class="text-3xl flex gap-2 justify-center items-center font-bold text-[#F25041] mt-2">
                                <Flame class="w-8 h-8" />
                                {{ data.user?.general_sequence }}
                            </h2>
                        </div>

                    </div>

                    <div class="grid grid-cols-3 gap-3">
                        <RouterLink to="/ranking"
                            class="flex items-center justify-center gap-2 px-5 py-2.5 text-[#246385] border border-[#246385]/30 rounded-xl hover:bg-[#246385]/8 transition font-medium text-sm">
                            <Trophy class="w-4 h-4" />
                            Ver Ranking
                        </RouterLink>

                        <button @click="openEditModal"
                            class="flex items-center justify-center gap-2 px-5 py-2.5 text-[#98BF45] border border-[#98BF45]/40 rounded-xl hover:bg-[#98BF45]/8 transition cursor-pointer font-medium text-sm">
                            <Pencil class="w-4 h-4" />
                            Editar Perfil
                        </button>

                        <button @click="logout"
                            class="flex items-center justify-center gap-2 px-5 py-2.5 text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition cursor-pointer font-medium text-sm">
                            <LogOut class="w-4 h-4" />
                            Sair da conta
                        </button>
                    </div>
                </template>

            </section>
            <section class="w-full px-4 mt-10 mb-10">
                <FavoriteWordsList />
            </section>
        </div>

        <Transition name="fade">
            <div v-if="showEditModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                @click.self="closeEditModal">

                <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

                    <button @click="closeEditModal"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer">
                        <X class="w-5 h-5" />
                    </button>

                    <h2 class="text-xl font-bold text-[#424242] font-[Poppins] mb-6">Editar Perfil</h2>

                    <form @submit.prevent="saveProfile" class="space-y-6">

                        <div class="flex flex-col gap-1.5">
                            <label class="text-sm font-medium text-gray-600">Nome</label>
                            <input v-model="editForm.name" type="text" placeholder="Seu nome"
                                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#424242] outline-none focus:border-[#98BF45] focus:ring-2 focus:ring-[#98BF45]/20 transition" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-600">Avatar</label>
                            <div v-if="avatars.length" class="grid grid-cols-5 gap-3">
                                <button v-for="avatar in avatars" :key="avatar.id" type="button"
                                    @click="editForm.avatarId = avatar.id"
                                    class="rounded-full border-2 transition overflow-hidden cursor-pointer aspect-square"
                                    :class="editForm.avatarId === avatar.id
                                        ? 'border-[#98BF45] shadow-md scale-105'
                                        : 'border-transparent hover:border-gray-300'">
                                    <img :src="avatar.image" :alt="avatar.name ?? 'avatar'" class="w-full h-full object-cover" />
                                </button>
                            </div>
                            <div v-else class="flex gap-2">
                                <div v-for="i in 5" :key="i" class="w-14 h-14 rounded-full bg-gray-100 animate-pulse" />
                            </div>
                        </div>

                        <div class="flex gap-3 justify-end pt-2">
                            <button type="button" @click="closeEditModal" :disabled="savingProfile"
                                class="px-5 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer disabled:opacity-50">
                                Cancelar
                            </button>
                            <button type="submit" :disabled="savingProfile"
                                class="flex items-center gap-2 px-5 py-2.5 text-sm text-white bg-[#98BF45] rounded-xl hover:bg-[#87ac38] transition cursor-pointer font-medium disabled:opacity-60 disabled:cursor-not-allowed">
                                <Check v-if="!savingProfile" class="w-4 h-4" />
                                <svg v-else class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                </svg>
                                {{ savingProfile ? 'Salvando...' : 'Salvar' }}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </Transition>

    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>