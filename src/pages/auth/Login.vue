<script setup>
import FormButton from "@/components/FormButton.vue";
import Loading from "@/components/Loading.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref(false);
const errors = ref({});

const form = reactive({
  email: '',
  password: ''
});


async function submitForm() {
  loading.value = true;
  errors.value = {};

  try {
    const res = await fetch('http://localhost/api/login', {
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
      <h3 class="text-2xl font-semibold font-[Poppins]">Entrar na conta</h3>
      <form class="w-full mt-10 flex flex-col gap-5">
        <div class="w-full">
          <label for="email" class="font-[Poppins] text-sm"> Email </label>
          <input type="email" name="email" v-model="form.email" class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5"
            placeholder="maria@gmail.com" required />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">
            {{ errors.email[0] }}
          </p>
        </div>
        <div class="w-full">
          <label for="password" class="font-[Poppins] text-sm">Senha</label>
          <input type="password" name="password" v-model="form.password"
            class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5" placeholder="*******" required />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">
            {{ errors.password[0] }}
          </p>
        </div>
        <div v-if="errors.general" class="w-full bg-red-100 text-red-700 p-3 rounded-lg mt-4 text-sm">
          {{ errors.general }}
        </div>
        <FormButton title="Entrar na Conta" @click="submitForm" />
      </form>
      <p class="mt-6 text-center">
        Ainda não possui conta?
        <router-link to="/register" class="text-[#6F8C30] cursor-pointer underline">Criar conta</router-link>.
      </p>
    </div>
  </div>
  <Loading v-if="loading" />
</template>
