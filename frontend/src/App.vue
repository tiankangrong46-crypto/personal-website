<script setup>
import { computed, ref, watch } from 'vue'

const locale = ref(localStorage.getItem('locale') === 'en' ? 'en' : 'zh')
const labels = computed(() => locale.value === 'en'
  ? { home: 'HOME', showcase: 'SHOWCASE', custom: 'CUSTOM', contact: 'CONTACT', contactNote: 'GET IN TOUCH', pc: 'BUILD A PC' }
  : { home: '首页', showcase: '展示', custom: '定制', contact: '联系', contactNote: '联系劳资', pc: '弄台电脑' })
watch(locale, (value) => { localStorage.setItem('locale', value); document.documentElement.lang = value === 'en' ? 'en' : 'zh-CN' }, { immediate: true })
</script>

<template>
  <header class="site-header">
    <div class="locale-switch" aria-label="Language switch"><button type="button" :class="{ 'is-active': locale === 'zh' }" @click="locale = 'zh'">中文</button><span>/</span><button type="button" :class="{ 'is-active': locale === 'en' }" @click="locale = 'en'">EN</button></div>
    <RouterLink class="brand" to="/" aria-label="YB 首页">YB<span>／</span>STUDIO</RouterLink>
    <nav :key="$route.path" :class="{ 'nav-entry': ['/', '/showcase', '/custom', '/contact'].includes($route.path) }" aria-label="主导航">
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/showcase">展示</RouterLink>
      <RouterLink to="/custom">定制</RouterLink>
      <RouterLink to="/contact">联系</RouterLink>
    </nav>
    <div :key="$route.path" :class="{ 'nav-entry': ['/', '/showcase', '/custom', '/contact'].includes($route.path) }" class="header-actions">
      <RouterLink class="header-note" to="/contact">联系劳资</RouterLink>
      <a class="header-note" href="https://pconfig.tkr-studio.com">弄台电脑</a>
    </div>
  </header>

  <RouterView />
</template>
