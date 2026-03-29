<script setup>
import { ref } from 'vue'

const props = defineProps(['title', 'color', 'shadowColor'])

const isHover = ref(false)
</script>

<template>
  <button
    type="button"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    class="block font-[Poppins] w-max px-10 py-2 rounded-lg text-white font-bold
           cursor-pointer transition-all duration-150 ease-out"
    :style="{
      backgroundColor: props.color,
      boxShadow: isHover
        ? `1px 1px 0 ${props.shadowColor}`
        : `4px 4px 0 ${props.shadowColor}`,
      transform: isHover
        ? 'translate(3px, 3px)'
        : 'translate(0, 0)'
    }"
  >
    {{ props.title }}
  </button>
</template>