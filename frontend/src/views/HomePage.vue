<script setup>
import ProjectGallery from '../components/ProjectGallery.vue'

const skillBubbles = [
  { name: 'Java', className: 'bubble-java' },
  { name: 'Unity', className: 'bubble-unity' },
  { name: 'Fusion', className: 'bubble-fusion' },
  { name: 'Onshape', className: 'bubble-onshape' },
  { name: 'FPV', className: 'bubble-fpv' },
  { name: 'PID', className: 'bubble-pid' },
  { name: 'OC 超频', className: 'bubble-oc' },
  { name: 'AI', className: 'bubble-ai' },
]

const previewImages = [
  'Screenshot 2026-08-11 175537.png',
  'Screenshot 2026-08-11 175628.png',
  '微信图片_20260811180339_103_20.jpg',
  '微信图片_20260811180339_104_20.jpg',
].map((file) => encodeURI(`/projects/preview/${file}`))
</script>

<template>
  <main class="page home-page">
    <section class="home-hero">
      <div class="home-hero-copy">
      <p class="eyebrow">ENGINEERING PRACTICE / 2026</p>
      <h1>不要扣譬股，<br />虽然很舒服</h1>
      <p class="home-name">kangrong</p>
      <p class="home-lead">用代码、结构与真实的硬件测试，把想法做成可以运转的原型。</p>
      <div class="home-actions" aria-label="首页快捷入口">
        <RouterLink to="/showcase">展示 <span aria-hidden="true">↗</span></RouterLink>
        <RouterLink to="/custom">定制 <span aria-hidden="true">↗</span></RouterLink>
        <RouterLink to="/contact">联系 <span aria-hidden="true">↗</span></RouterLink>
      </div>
      </div>
      <div class="home-black-panel" aria-hidden="true"></div>
    </section>

    <section class="skills-section">
      <div class="skills-heading">
        <p class="eyebrow">Skills in motion</p>
        <h2>技能标签</h2>
        <p>不同的工具与兴趣，在一次次项目里形成彼此连接的实践路径。</p>
      </div>
      <div class="bubble-map" aria-label="技能标签气泡图">
        <span v-for="skill in skillBubbles" :key="skill.name" class="skill-bubble" :class="skill.className">{{ skill.name }}</span>
      </div>
    </section>

    <section class="home-preview">
      <div class="preview-heading">
        <p class="eyebrow">Work preview</p>
        <h2>作品预览</h2>
        <p>来自近期项目的过程与结果片段。左右拖动图片可以继续浏览。</p>
      </div>
      <ProjectGallery :images="previewImages" project-name="作品预览" variant="home" />
    </section>
  </main>
</template>
