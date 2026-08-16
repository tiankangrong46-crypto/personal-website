<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getProject } from '../services/portfolioApi'
import ProjectGallery from '../components/ProjectGallery.vue'
const props = defineProps({ slug: { type: String, required: true } })
const project = ref(null); const loading = ref(true); const missing = ref(false)
const galleryImages = computed(() => (project.value?.images || []).map((image) => image.url || image.image_url).filter(Boolean))
async function load() { loading.value = true; missing.value = false; try { project.value = await getProject(props.slug) } catch { missing.value = true } finally { loading.value = false } }
onMounted(load); watch(() => props.slug, load)
</script>
<template><main class="page category-page"><section class="category-header"><RouterLink class="back-link" to="/showcase">← Back to showcase</RouterLink><p v-if="loading" class="page-state">Loading project...</p><p v-else-if="missing" class="page-state">Project not found.</p><template v-else><p class="eyebrow">{{project.category?.name}}</p><h1>{{project.title}}</h1><p>{{project.description || project.summary}}</p></template></section><section v-if="project" class="project-cards"><article class="project-card"><div v-if="project.cover_image_url" class="project-cover"><img :src="project.cover_image_url" :alt="project.title"/></div><div class="card-copy"><h2>{{project.title}}</h2><div class="card-details"><p>{{project.description || project.summary}}</p><div class="stack-wrap"><span>TECH STACK</span><ul class="stack-list"><li v-for="item in project.tech_stack" :key="item">{{item}}</li></ul></div></div></div><ProjectGallery v-if="galleryImages.length" :images="galleryImages" :project-name="project.title"/></article></section></main></template>
