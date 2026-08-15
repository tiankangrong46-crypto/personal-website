<script setup>
import { computed } from 'vue'
import { categories, withImages } from '../data/projects'
import ProjectGallery from '../components/ProjectGallery.vue'
import { locale } from '../locale'

const props = defineProps({ category: { type: String, required: true } })
const category = computed(() => categories[props.category])
const projects = computed(() => withImages(props.category))
const header = computed(() => {
  const en = { cs: ['Computer Science', 'From local AI to real-time applications, focused on useful systems.'], design: ['Design', 'From modeling and printing to assembly and testing.'], fpv: ['FPV', 'From soldering to firmware and flight-controller tuning.'] }
  return locale.value === 'en' ? en[props.category] : [category.value.name, category.value.description]
})
</script>

<template>
  <main class="page category-page">
    <section class="category-header">
      <RouterLink class="back-link" to="/showcase">← 返回展示</RouterLink>
      <p class="eyebrow">{{ category.kicker }}</p>
      <h1>{{ header[0] }}</h1>
      <p>{{ header[1] }}</p>
    </section>

    <section class="project-cards" :aria-label="`${category.name} 项目`">
      <article v-for="project in projects" :key="project.name" v-reveal class="project-card">
        <div v-if="project.images.length" class="project-cover">
          <img :src="project.images[0]" :alt="`${project.name} 项目封面`" />
        </div>
        <div v-else class="project-cover cover-placeholder"><span>PROJECT ARCHIVE</span></div>
        <div class="card-copy">
          <h2>{{ project.name }}</h2>
          <div class="card-details">
            <p>{{ project.description }}</p>
            <div class="stack-wrap">
              <span>TECH STACK / 技术栈</span>
              <ul class="stack-list" aria-label="技术栈"><li v-for="item in project.stack" :key="item">{{ item }}</li></ul>
            </div>
          </div>
        </div>
        <ProjectGallery v-if="project.images.length > 1" :images="project.images.slice(1)" :project-name="project.name" />
        <div v-else class="project-gallery gallery-placeholder" aria-label="图库待补充"><span>图库待补充</span><i></i><i></i><i></i></div>
      </article>
    </section>
  </main>
</template>
