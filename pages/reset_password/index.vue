<template>
<section class="bg-gray-50 dark:bg-gray-900">
    <div v-if="errorMessage" class="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {{ successMessage }}
    </div>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Mudar senha
            </h2>
            <form @submit.prevent="handleSubmit" class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu usuário</label>
                    <input v-model="username" type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="seu usuário" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nova Senha</label>
                    <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirme a nova senha</label>
                    <input v-model="confirmPassword" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Mudar senha</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Já possui uma conta? <NuxtLink to="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login aqui</NuxtLink>
                </p>
            </form>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();
const config = useRuntimeConfig();

const handleSubmit = async () => {
    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'As senhas não coincidem. Por favor, tente novamente.';
        setTimeout(() => {
            errorMessage.value = '';
        }, 5000);
        return;
    }

    try {
        const response = await fetch(`${config.public.apiUrl}/api/auth/reset_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                newPassword: password.value,
            }),
        });

        console.log('Response:', response);

        if (!response.ok) {
            throw new Error('Erro ao alterar a senha. Por favor, tente novamente.');
        }

        successMessage.value = 'Senha alterada com sucesso!';
        setTimeout(() => {
            successMessage.value = '';
            router.push('/');
        }, 5000);
    } catch (error) {
        errorMessage.value = error.message;
        setTimeout(() => {
            errorMessage.value = '';
        }, 5000);
        return;
    }
}
</script>