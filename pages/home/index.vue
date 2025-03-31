<template>
    <NuxtLayout>
        <Carousel />
        <br />
        <div v-if="isLoading" class="flex justify-center mt-6">
            <p class="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
                Carregando produtos...
            </p>
            
        </div>
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                <div
                    v-for="(product, index) in paginatedProducts"
                    :key="index"
                    class="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                    <img
                        :src="product.image || '/images/imagem_default.jpg'"
                        alt="Product Image"
                        class="rounded-t-lg w-full h-48 object-cover"
                    />
                    <div class="p-4">
                        <h5 class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            {{ product.name }}
                        </h5>
                        <p class="text-sm text-gray-700 dark:text-gray-400">
                            {{ product.description }}
                        </p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                            R$ {{ product.price.toFixed(2) }}
                        </p>
                        <div class="flex justify-between mt-4">
                            <button
                                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
                            >
                                Comprar
                            </button>
                            <NuxtLink :to="`/products/${product._id}`">
                                <button
                                    class="w-full ml-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-800"
                                    @click="editProduct(product)"
                                >
                                    Editar
                                </button>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-12"></div>
            <div class="flex justify-center items-center mt-6">
                <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="changePage(page)"
                    :class="[ 
                        'mx-1 px-4 py-2 rounded-lg',
                        page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    ]"
                >
                    {{ page }}
                </button>
            </div>
            <div class="my-12"></div>
        </div>
    </NuxtLayout>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import Carousel from '../components/home/Carousel.vue';

const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = 9;
const isLoading = ref(true);

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return products.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

function changePage(page) {
    currentPage.value = page;
}

function editProduct(product) {
  console.log('Editando produto:', product);
}

async function getAllProducts() {
    try {
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }

        const data = await response.json();
        products.value = data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
  getAllProducts();
});
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #2563eb;
}
</style>