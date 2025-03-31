<template>
    <section class="carousel-container">
      <swiper
        :modules="modules"
        :slides-per-view="3"
        :loop="true"
        :autoplay="{ delay: 3000 }"
        navigation
        class="mySwiper"
      >
        <swiper-slide v-for="(image, index) in images" :key="index">
            <img :src="image" alt="Product Image" class="carousel-image" />
        </swiper-slide>
    </swiper>
    </section>
</template>
  
<script setup>
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';

  const images = [
    '/images/imagem1.jpg',
    '/images/imagem2.jpg',
    '/images/imagem3.jpg',
    '/images/imagem4.jpg',
    '/images/imagem5.jpg',
    '/images/imagem6.jpg',
    '/images/imagem7.jpg',
    '/images/imagem8.jpg',
  ];

  const modules = [Navigation, Pagination, Scrollbar, A11y];
</script>
  
<style scoped>
  .carousel-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .carousel-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>