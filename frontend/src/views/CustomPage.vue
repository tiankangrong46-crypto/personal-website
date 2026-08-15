<script setup>
import { computed } from 'vue'
import { locale } from '../locale'

const text = computed(() => locale.value === 'en'
  ? { computer: 'PC configuration & tuning', fpv: 'FPV configuration', model: '3D model custom work', title: 'Make your own device and model', subtitle: 'Low overhead, high uptime. Build something that is yours.' }
  : { computer: '电脑配置调试', fpv: '穿越机配置定制', model: '3D 模型定制', title: '定制你的专属设备与模型', subtitle: '低开销高在线时长，帮你打造属于你的作品' })
</script>

<template>
  <main class="page custom-page custom-hub">
    <nav class="custom-service-nav" aria-label="定制服务分类">
      <RouterLink to="/custom/computer">{{ text.computer }} <span aria-hidden="true">→</span></RouterLink>
      <RouterLink to="/custom/fpv">{{ text.fpv }} <span aria-hidden="true">→</span></RouterLink>
      <RouterLink to="/custom/model">{{ text.model }} <span aria-hidden="true">→</span></RouterLink>
    </nav>
    <section class="custom-hub-hero">
      <div class="custom-hub-intro"><p class="eyebrow">Custom work / 01-03</p><h1>{{ text.title }}</h1><p>{{ text.subtitle }}</p></div>
      <div class="custom-poster-pair" aria-label="Custom work posters">
        <img class="custom-poster custom-poster-one" src="/projects/custom-posters/custom-poster-one.jpg?v=20260811210321" alt="Custom FPV model poster" />
        <img class="custom-poster custom-poster-two" src="/projects/custom-posters/custom-poster-two.jpg?v=20260811210322" alt="3D printing poster" />
      </div>
    </section>
  </main>
</template>
