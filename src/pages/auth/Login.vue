<template>
  <div class="bg-linear-to-r from-[#E7F1F5] to-[#F7FCFD] h-screen flex justify-center items-center font-[Roboto]">
    <div class="bg-white border border-[#DFDFDF] p-8 w-full max-w-md rounded-2xl flex flex-col items-center mx-5">
      <h3 class="text-2xl font-semibold font-[Poppins]">Entrar na conta</h3>
      <form action="submit" class="w-full mt-10 flex flex-col gap-5">
        <div class="w-full">
          <label for="email" class="font-[Poppins] text-sm">Email</label>
          <input type="email" name="email" class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5" placeholder="maria@gmail.com" required>
        </div>
        <div class="w-full">
          <label for="password" class="font-[Poppins] text-sm">Senha</label>
          <input type="password" name="password" class="w-full mt-1 block bg-[#EBEBEB] rounded-lg p-2.5" placeholder="*******" required>
        </div>
        <button 
          class="block font-[Poppins] bg-[#98BF45] w-max mx-auto px-10 py-3 rounded-lg text-white font-bold shadow-[4px_4px_0_#6F8C30] mt-6 cursor-pointer hover:shadow-none hover:translate-1 transition-all">
          Entrar na Conta
        </button>
      </form>
      <p class="mt-6 text-center">Ainda não possui conta? <router-link to="/register" class="text-[#6F8C30] cursor-pointer underline">Criar conta</router-link>.</p>
    </div>
  </div>
</template>