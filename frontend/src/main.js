import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomePage from './views/HomePage.vue'
import ShowcasePage from './views/ShowcasePage.vue'
import CustomPage from './views/CustomPage.vue'
import CustomComputerPage from './views/CustomComputerPage.vue'
import CustomFpvPage from './views/CustomFpvPage.vue'
import CustomModelPage from './views/CustomModelPage.vue'
import ContactPage from './views/ContactPage.vue'
import CategoryPage from './views/CategoryPage.vue'
import ProjectDetailPage from './views/ProjectDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/showcase', component: ShowcasePage },
    { path: '/custom', component: CustomPage },
    { path: '/custom/computer', component: CustomComputerPage },
    { path: '/custom/fpv', component: CustomFpvPage },
    { path: '/custom/model', component: CustomModelPage },
    { path: '/contact', component: ContactPage },
    { path: '/cs', component: CategoryPage, props: { category: 'cs' } },
    { path: '/design', component: CategoryPage, props: { category: 'design' } },
    { path: '/fpv', component: CategoryPage, props: { category: 'fpv' } },
    { path: '/projects/:slug', component: ProjectDetailPage, props: true },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

const reveal = {
  mounted(element) {
    element.classList.add('scroll-reveal')
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      element.classList.add('is-visible')
      observer.unobserve(element)
    }, { threshold: 0.14 })
    element._revealObserver = observer
    observer.observe(element)
  },
  unmounted(element) {
    element._revealObserver?.disconnect()
  },
}

createApp(App).use(router).directive('reveal', reveal).mount('#app')
