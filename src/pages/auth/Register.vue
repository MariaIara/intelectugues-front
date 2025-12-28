<script setup>
import FormButton from "@/components/FormButton.vue";
import Loading from "@/components/Loading.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref(false);
const errors = ref({});

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

async function submitForm() {
  loading.value = true;
  errors.value = {};

  try {
    const res = await fetch('http://localhost/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      return errors.value = data.errors ?? {
        general: data.message ?? 'Erro inesperado'
      };
    }

    localStorage.setItem('token', data.token);

    router.push('/app');
  } catch (error) {
    errors.value = { general: 'Erro de conexão com o servidor' };
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] h-screen flex justify-center items-center font-[Roboto]">
    <div class="bg-white border border-[#DFDFDF] p-8 w-full max-w-md rounded-2xl flex flex-col items-center mx-5">
      <h3 class="text-2xl font-semibold font-[Poppins]">Criar conta</h3>
      <form class="w-full mt-10 flex flex-col gap-5">
        <div class="w-full">
          <label for="name" class="font-[Poppins] text-sm">
            Nome
          </label>
          <input type="text" name="name" v-model="form.name" class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5"
            placeholder="Maria das Dores" required>
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">
            {{ errors.name[0] }}
          </p>
        </div>
        <div class="w-full">
          <label for="email" class="font-[Poppins] text-sm">Email</label>
          <input type="email" name="email" v-model="form.email" class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5"
            placeholder="maria@gmail.com" required>
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">
            {{ errors.email[0] }}
          </p>
        </div>
        <div>
          <div class="flex items-center gap-5">
            <div class="w-full">
              <label for="password" class="font-[Poppins] text-sm">Senha</label>
              <input type="password" name="password" v-model="form.password"
                class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5" placeholder="*******" required>
            </div>
            <div class="w-full">
              <label for="password_confirmation" class="font-[Poppins] text-sm">Confirmar Senha</label>
              <input type="password" name="password_confirmation" v-model="form.password_confirmation"
                class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5" placeholder="*******" required>
            </div>
          </div>
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">
            {{ errors.password[0] }}
          </p>
        </div>

        <div v-if="errors.general" class="w-full bg-red-100 text-red-700 p-3 rounded-lg mt-4 text-sm">
          {{ errors.general }}
        </div>

        <FormButton title="Criar Conta" @click="submitForm" />
      </form>
      <p class="mt-6 text-center">Já possui conta? <router-link to="/login"
          class="text-[#6F8C30] cursor-pointer underline">Entrar na conta</router-link>.</p>
    </div>
  </div>
  <Loading v-if="loading" />
</template>