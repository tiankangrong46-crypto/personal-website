<script setup>
const image = (path) => encodeURI(`/projects/${path}`)

const categories = [
  { code: '01', name: 'CS', path: '/cs' },
  { code: '02', name: '设计', path: '/design' },
  { code: '03', name: '穿越机', path: '/fpv' },
]

const featuredProjects = [
  { category: 'CS / UNITY', title: '小型游戏世界', description: '手绘动画、碰撞逻辑与无限地图，在一个轻量的 2D 世界里持续发生。', image: image('CS/unity游戏/Screenshot 2026-08-11 155006.png'), alt: 'Unity 2D 游戏画面' },
  { category: '设计 / FABRICATION', title: '全打印飞行器', description: '从结构设计到材料选择，为 4 寸机架寻找强度、韧性与重量之间的平衡。', image: image('设计/4寸打印穿越机/微信图片_20260811142956_93_20.jpg'), alt: '3D 打印的穿越机结构' },
  { category: 'FPV / FIELD WORK', title: '3 寸飞行器调试', description: '以真实的装配、布线和飞控调试，完成一台可持续维护的 3 寸穿越机。', image: image('穿越机/穿越机组装_3inch/微信图片_20260811164206_101_20.jpg'), alt: '手持的 3 寸穿越机' },
  { category: 'CS / LOCAL AI', title: '即时缓存的 RAG', description: '为本地知识库加入缓存策略，让每一次检索更贴近实际使用成本。', image: image('CS/CacheRag/Screenshot 2026-08-11 160151.png'), alt: '本地 RAG 系统界面' },
  { category: '设计 / DAILY TOOL', title: '可调桌面支架', description: '为数位屏、平板与桌面尺寸留下余量，也让日常使用足够稳定。', image: image('设计/数位屏_平板支架/微信图片_20260811142419_81_20.jpg'), alt: '3D 打印的平板支架' },
  { category: 'FPV / ASSEMBLY', title: '焊接细节', description: '整洁的线路、可靠的焊点与反复检查，是飞行系统进入下一步的基础。', image: image('featured-solder-detail-cw.jpg'), alt: '旋转后的穿越机内部焊接细节' },
]
</script>

<template>
  <main class="page showcase-hub">
    <div class="category-nav" aria-label="展示分类">
      <RouterLink v-for="category in categories" :key="category.code" :to="category.path">
        <span>{{ category.code }}</span><strong>{{ category.name }}</strong><b>查看 ↗</b>
      </RouterLink>
    </div>

    <section class="showcase-intro">
      <p class="eyebrow">Project archive</p>
      <h1>展示</h1>
      <p>我最近开始的项目</p>
    </section>

    <section class="showcase-showreel" aria-label="精选项目展示">
      <article v-for="(project, index) in featuredProjects" :key="project.title" v-reveal class="showcase-feature" :class="{ 'is-reversed': index % 2 }">
        <div class="feature-copy">
          <p>{{ project.category }}</p>
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
        </div>
        <RouterLink class="feature-image" :to="project.category.startsWith('CS') ? '/cs' : project.category.startsWith('设计') ? '/design' : '/fpv'">
          <img :src="project.image" :alt="project.alt" />
        </RouterLink>
      </article>
    </section>
  </main>
</template>
