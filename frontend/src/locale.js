import { ref, watch } from 'vue'

export const locale = ref(localStorage.getItem('locale') === 'en' ? 'en' : 'zh')

watch(locale, (value) => {
  localStorage.setItem('locale', value)
  document.documentElement.lang = value === 'en' ? 'en' : 'zh-CN'
}, { immediate: true })
