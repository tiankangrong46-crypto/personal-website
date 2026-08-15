<script setup>
import { computed } from 'vue'
import { locale } from './locale'

const labels = computed(() => locale.value === 'en'
  ? { home: 'HOME', showcase: 'SHOWCASE', custom: 'CUSTOM', contact: 'CONTACT', yzbj: 'YZBJ', contactNote: 'GET IN TOUCH', pc: 'BUILD A PC' }
  : { home: '首页', showcase: '展示', custom: '定制', contact: '联系', yzbj: 'YZBJ', contactNote: '联系劳资', pc: '弄台电脑' })

</script>

<template>
  <header class="site-header">
    <div class="locale-switch" aria-label="Language switch">
      <button type="button" :class="{ 'is-active': locale === 'zh' }" @click="locale = 'zh'">中文</button>
      <span>/</span>
      <button type="button" :class="{ 'is-active': locale === 'en' }" @click="locale = 'en'">EN</button>
    </div>
    <RouterLink class="brand" to="/" aria-label="YB Studio home">YB<span>×</span>STUDIO</RouterLink>
    <nav :key="$route.path" :class="{ 'nav-entry': ['/', '/showcase', '/custom', '/contact'].includes($route.path) }" aria-label="Primary navigation">
      <RouterLink to="/">{{ labels.home }}</RouterLink>
      <RouterLink to="/showcase">{{ labels.showcase }}</RouterLink>
      <RouterLink to="/custom">{{ labels.custom }}</RouterLink>
      <RouterLink to="/contact">{{ labels.contact }}</RouterLink>
    </nav>
    <div :key="$route.path" :class="{ 'nav-entry': ['/', '/showcase', '/custom', '/contact'].includes($route.path) }" class="header-actions">
      <a class="header-note" href="https://yzbjfpv.top">{{ labels.yzbj }}</a>
      <RouterLink class="header-note" to="/contact">{{ labels.contactNote }}</RouterLink>
      <a class="header-note" href="https://pconfig.tkr-studio.com">{{ labels.pc }}</a>
    </div>
  </header>

  <RouterView />
</template>
