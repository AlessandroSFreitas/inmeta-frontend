<template>
    <NuxtLayout>
        <section class="sell-container">
            <section class="bg-white dark:bg-gray-900">
                <div v-if="errorMessage" class="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
                    {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
                    {{ successMessage }}
                </div>
                <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Criar produto</h2>
                    <form @submit.prevent="createProduct" class="space-y-8">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nome</label>
                            <input v-model="product.name" type="name" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                        </div>
                        <div>
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Preço</label>
                            <input v-model="product.price" type="number" id="price" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                        </div>
                        <div>
                            <label for="quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quantidade em estoque</label>
                            <input v-model="product.stockQuantity" type="number" id="quantity" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input v-model="product.isInternational" id="where" aria-describedby="where" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="where" class="font-light text-gray-500 dark:text-gray-300">É uma venda internacional?</label>
                            </div>
                        </div>
                        <div>
                            <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tempo estimado para entrega?</label>
                            <input v-model="product.estimatedDeliveryTime" type="text" id="time" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                        </div>
                        <div>
                            <label for="seller" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vendedor</label>
                            <input v-model="product.seller" type="text" id="seller" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Descrição</label>
                            <textarea v-model="product.description" id="description" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Descreva seu produto..." required></textarea>
                        </div>
                        <div>
                            <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Imagem do produto (url)</label>
                            <input v-model="product.image" type="text" id="image" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                        </div>
                        <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Criar produto</button>
                    </form>
                </div>
            </section>
            <slot></slot>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const product = reactive({
  name: '',
  price: 0,
  stockQuantity: 0,
  isInternational: false,
  estimatedDeliveryTime: '',
  seller: '',
  description: '',
  image: '',
});
const router = useRouter();
const successMessage = ref('');
const errorMessage = ref('');
const config = useRuntimeConfig();

async function createProduct() {
  try {
    const response = await fetch(`${config.public.apiUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar o produto');
    }

    successMessage.value = 'Produto criado com sucesso!';
    setTimeout(() => {
        successMessage.value = '';
        router.push('/home');
    }, 5000);
  } catch (error) {
    errorMessage.value = (error as Error).message;
    setTimeout(() => {
        errorMessage.value = '';
    }, 5000);
  }
}
</script>