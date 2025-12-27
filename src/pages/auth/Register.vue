<script setup>
import FormButton from '@/components/FormButton.vue';

</script>

<template>
  <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] h-screen flex justify-center items-center font-[Roboto]">
    <div class="bg-white border border-[#DFDFDF] p-8 w-full max-w-md rounded-2xl flex flex-col items-center mx-5">
      <h3 class="text-2xl font-semibold font-[Poppins]">Criar conta</h3>
      <form action="submit" class="w-full mt-10 flex flex-col gap-5">
        <div class="w-full">
          <label for="name" class="font-[Poppins] text-sm">
            Nome
          </label>
          <input type="text" name="name" class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5"
            placeholder="Maria das Dores" required>
        </div>
        <div class="w-full">
          <label for="email" class="font-[Poppins] text-sm">Email</label>
          <input type="email" name="email" class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5"
            placeholder="maria@gmail.com" required>
        </div>
        <div class="flex items-center gap-5">
          <div class="w-full">
            <label for="password" class="font-[Poppins] text-sm">Senha</label>
            <input type="password" name="password" class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5"
              placeholder="*******" required>
          </div>
          <div class="w-full">
            <label for="password_confirmation" class="font-[Poppins] text-sm">Confirmar Senha</label>
            <input type="password" name="password_confirmation" class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5"
              placeholder="*******" required>
          </div>
        </div>
        <FormButton title="Criar Conta" />
      </form>
      <p class="mt-6 text-center">Já possui conta? <router-link to="/login"
          class="text-[#6F8C30] cursor-pointer underline">Entrar na conta</router-link>.</p>
    </div>
  </div>
</template>