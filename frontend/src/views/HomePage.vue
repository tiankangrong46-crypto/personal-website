<script setup>
import { computed, onMounted, ref } from 'vue'
import ProjectGallery from '../components/ProjectGallery.vue'
import { locale } from '../locale'
import { getProjects } from '../services/portfolioApi'

const skillBubbles = [{ name:'Java', className:'bubble-java' }, { name:'Unity', className:'bubble-unity' }, { name:'Fusion', className:'bubble-fusion' }, { name:'Onshape', className:'bubble-onshape' }, { name:'FPV', className:'bubble-fpv' }, { name:'PID', className:'bubble-pid' }, { name:'OC', className:'bubble-oc' }, { name:'AI', className:'bubble-ai' }]
const previewImages = ref([])
const previewLoading = ref(true)
onMounted(async () => { try { const data = await getProjects({ page_size: '8' }); previewImages.value = data.results.map((project) => project.cover_image_url).filter(Boolean) } finally { previewLoading.value = false } })
const text = computed(() => locale.value === 'en'
  ? { title:'Do not scratch the itch\n\neven if it feels good', lead:'I turn ideas into working prototypes through code, structure, and real hardware tests.', showcase:'SHOWCASE', custom:'CUSTOM', contact:'CONTACT', skills:'Skills', skillLead:'Tools and interests connect through hands-on projects.', work:'Work preview', workLead:'Recent process and outcome snapshots. Drag images to explore.', gallery:'Work preview' }
  : { title:'不要扣皮股\n\n虽然很舒服', lead:'用代码、结构与真实的硬件测试，把想法做成可以运转的原型。', showcase:'展示', custom:'定制', contact:'联系', skills:'技能标签', skillLead:'不同的工具与兴趣，在一次次项目里形成彼此连接的实践路径。', work:'作品预览', workLead:'来自近期项目的过程与结果片段。左右拖动图片可以继续浏览。', gallery:'作品预览' })
</script>
<template><main class="page home-page"><section class="home-hero"><div class="home-hero-copy"><p class="eyebrow">ENGINEERING PRACTICE / 2026</p><h1>{{ text.title }}</h1><p class="home-name">kangrong</p><p class="home-lead">{{ text.lead }}</p><div class="home-actions"><RouterLink to="/showcase">{{ text.showcase }} <span>→</span></RouterLink><RouterLink to="/custom">{{ text.custom }} <span>→</span></RouterLink><RouterLink to="/contact">{{ text.contact }} <span>→</span></RouterLink></div></div><div class="home-black-panel" aria-hidden="true"></div></section><section class="skills-section"><div class="skills-heading"><p class="eyebrow">Skills in motion</p><h2>{{ text.skills }}</h2><p>{{ text.skillLead }}</p></div><div class="bubble-map"><span v-for="skill in skillBubbles" :key="skill.name" class="skill-bubble" :class="skill.className">{{ skill.name }}</span></div></section><section class="home-preview"><div class="preview-heading"><p class="eyebrow">Work preview</p><h2>{{ text.work }}</h2><p>{{ text.workLead }}</p></div><p v-if="previewLoading" class="page-state">Loading projects...</p><ProjectGallery v-else-if="previewImages.length" :images="previewImages" :project-name="text.gallery" variant="home" /><p v-else class="page-state">No published projects yet.</p></section></main></template>
