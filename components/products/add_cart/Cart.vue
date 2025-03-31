<script setup lang="ts">
const count = ref(0);
</script>

<template>
    <button @click="count++" class="px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300">
        Add to cart
    </button>
    <p>Count is {{ count }}</p>
</template>
