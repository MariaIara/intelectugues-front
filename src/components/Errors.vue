<script setup>
const props = defineProps(['errors']);
</script>

<template>
    <div v-if="props.errors.length" class="w-full bg-red-100 text-red-700 p-3 rounded-lg mt-4 text-sm">
        <ul class="space-y-1">
            <li v-for="(error, index) in props.errors" :key="index">
                {{ error }}
            </li>
        </ul>
    </div>
</template>