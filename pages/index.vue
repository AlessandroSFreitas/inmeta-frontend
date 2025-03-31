<template>
<section class="bg-gray-50 dark:bg-gray-900">
    <div v-if="errorMessage" class="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {{ errorMessage }}
    </div>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Entre com sua conta
                </h1>
                <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
                    <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu usuário</label>
                        <input v-model="username" type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Seu usuário aqui" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                        <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div class="flex items-center justify-between">
                        <NuxtLink to="/reset_password" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Esqueceu a senha?</NuxtLink>
                    </div>
                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Não tem uma conta ainda? <NuxtLink to="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NuxtLink>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const config = useRuntimeConfig();

const handleLogin = async () => {
  try {
    const response = await fetch(config.public.apiUrl + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', data.token);
    }

    router.push('/home');
  } catch (error) {
    errorMessage.value = (error as Error).message;

    setTimeout(() => {
      errorMessage.value = '';
    }, 5000);
  }
};
</script>