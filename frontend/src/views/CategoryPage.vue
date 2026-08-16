<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getCategories, getProject, getProjects } from '../services/portfolioApi'
import ProjectGallery from '../components/ProjectGallery.vue'
import { locale } from '../locale'

const props = defineProps({ category: { type: String, required: true } })
const category = ref(null)
const projects = ref([])
const loading = ref(true)
const error = ref(false)
const categorySlugs = { cs: 'cs', design: 'category-5', fpv: 'category-4' }
const categoryKickers = { cs: 'CODE / SYSTEMS', design: 'DESIGN / FABRICATION', fpv: 'FPV / FIELD WORK' }
async function load() {
  loading.value = true; error.value = false
  try {
    const categories = await getCategories()
    category.value = categories.find((item) => item.slug === categorySlugs[props.category]) || null
    if (!category.value) throw new Error('Category not found')
    const data = await getProjects({ category: category.value?.slug })
    projects.value = await Promise.all(data.results.map(async (project) => {
      try { return await getProject(project.slug) } catch { return project }
    }))
  } catch { error.value = true } finally { loading.value = false }
}
onMounted(load); watch(() => props.category, load)
const englishProjects = {
  cs: [['CacheRag', 'A Qwen-based local RAG knowledge base with caching to reduce token use.'], ['LocalAI', 'Local multimodal Qwen deployment for experiments and practical development.'], ['Unity 2D Game', 'A 2D action game with hand-drawn animation, collisions, and an endless map.'], ['PC Setup & System Configuration', 'Desktop assembly, BIOS initialization, operating system, and driver setup.']],
  design: [['4-inch Fully Printed FPV', 'A fully 3D-printed 4-inch FPV frame balancing stiffness, resilience, and weight.'], ['Airsoft Payload Bay', 'A flight-controller-linked payload bay actuated through a servo module.'], ['Cyberpunk Mantis Blades', 'A wearable Halloween prop built around an ESP32-S3 control board.'], ['Display / Tablet Stand', 'An adjustable PETG stand for displays, tablets, and desk mounting.'], ['Drone Timed Drop', 'A timed or servo-controlled drone release mechanism.'], ['Desktop Bin', 'A compact 3D-printed desktop bin for common bag sizes.'], ['Collectible Stand', 'A display and storage stand for standard boxed collectibles.']],
  fpv: [['Soldering Showcase', 'Electronic assembly, clean wiring, and soldering work for FPV systems.'], ['3-inch FPV Build', 'Structure, electronics, firmware, and PID tuning for a compact FPV platform.'], ['5-inch FPV Build', 'Complete assembly and flight-controller tuning for a standard 5-inch FPV platform.']],
}
const displayProjects = computed(() => projects.value.map((project, index) => locale.value === 'en' && englishProjects[props.category]?.[index] ? { ...project, title: englishProjects[props.category][index][0], summary: englishProjects[props.category][index][1] } : project))
const header = computed(() => {
  const en = { cs: ['Computer Science', 'From local AI to real-time applications, focused on useful systems.'], design: ['Design', 'From modeling and printing to assembly and testing.'], fpv: ['FPV', 'From soldering to firmware and flight-controller tuning.'] }
  return locale.value === 'en' ? en[props.category] : [category.value?.name || '', category.value?.description || '']
})
</script>

<template>
  <main class="page category-page">
    <section class="category-header">
      <RouterLink class="back-link" to="/showcase">{{ locale === 'en' ? '← Back to showcase' : '← 返回展示' }}</RouterLink>
      <p class="eyebrow">{{ category?.kicker || categoryKickers[props.category] }}</p>
      <h1>{{ header[0] }}</h1>
      <p>{{ header[1] }}</p>
    </section>

    <p v-if="loading" class="page-state">Loading projects...</p><p v-else-if="error" class="page-state">Unable to load projects.</p><p v-else-if="!projects.length" class="page-state">No published projects yet.</p>
    <section v-else class="project-cards" :aria-label="`${header[0]} projects`">
      <article v-for="project in displayProjects" :key="project.name" v-reveal class="project-card">
        <RouterLink v-if="project.cover_image_url" class="project-cover" :to="`/projects/${project.slug}`">
          <img :src="project.cover_image_url" :alt="`${project.title} project cover`" />
        </RouterLink>
        <div v-else class="project-cover cover-placeholder"><span>PROJECT ARCHIVE</span></div>
        <div class="card-copy">
          <h2>{{ project.title }}</h2>
          <div class="card-details">
            <p>{{ project.summary }}</p>
            <div class="stack-wrap">
              <span>{{ locale === 'en' ? 'TECH STACK' : 'TECH STACK / 技术栈' }}</span>
              <ul class="stack-list" :aria-label="locale === 'en' ? 'Technology stack' : '技术栈'"><li v-for="item in (project.tech_stack || project.stack || [])" :key="item">{{ item }}</li></ul>
            </div>
          </div>
        </div>
        <ProjectGallery v-if="project.images?.length" :images="project.images.map((image) => image.image_url)" :project-name="project.title" />
        <div v-else class="project-gallery gallery-placeholder" :aria-label="locale === 'en' ? 'Gallery coming soon' : '图库待补充'"><span>{{ locale === 'en' ? 'GALLERY COMING SOON' : '图库待补充' }}</span><i></i><i></i><i></i></div>
      </article>
    </section>
  </main>
</template>
