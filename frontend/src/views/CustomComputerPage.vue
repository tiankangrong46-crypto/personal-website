<script setup>
import { computed, ref } from 'vue'

const uses = ['游戏', '工作', '视频剪辑', '编程', '办公', '日常']
const budgets = Array.from({ length: 100 }, (_, index) => `￥${index + 1}000`)
const brands = ['Intel', 'AMD', 'NVIDIA', '都行']

const selectedUses = ref([])
const selectedBudgets = ref([])
const selectedBrands = ref([])
const hasIssue = ref('否')

const summary = computed(() => [
  `用途：${selectedUses.value.length ? selectedUses.value.join('、') : '未选择'}`,
  `预算范围：${selectedBudgets.value.length ? selectedBudgets.value.join('、') : '未选择'}`,
  `品牌偏好：${selectedBrands.value.length ? selectedBrands.value.join('、') : '未选择'}`,
  `是否为故障排查：${hasIssue.value}`,
].join('\n'))

function submitRequest() {
  const subject = '电脑配置调试需求'
  const body = `你好，我想咨询电脑配置调试服务。\n\n${summary.value}\n\n补充说明：\n`
  window.location.href = `mailto:tiankangrong46@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
</script>

<template>
  <main class="page custom-service-page computer-service-page">
    <RouterLink class="back-link" to="/custom">← 返回定制</RouterLink>
    <section class="computer-request-layout">
      <div class="computer-request-copy">
        <p class="eyebrow">Custom service / 01</p>
        <h1>电脑配置调试</h1>
        <p>根据你的预算与用途，定制最合适的电脑配置方案。</p>
        <p>根据你遇到的问题，拿出最合适的解决方案。</p>
      </div>

      <form class="computer-request-form" @submit.prevent="submitRequest">
        <fieldset>
          <legend>用途 <small>可多选，也可不选</small></legend>
          <div class="choice-grid">
            <label v-for="item in uses" :key="item" class="choice-chip">
              <input v-model="selectedUses" type="checkbox" :value="item" />
              <span>{{ item }}</span>
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>预算范围 <small>每 1000 元一档，可多选</small></legend>
          <div class="choice-grid budget-grid">
            <label v-for="item in budgets" :key="item" class="choice-chip">
              <input v-model="selectedBudgets" type="checkbox" :value="item" />
              <span>{{ item }}</span>
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>品牌偏好 <small>可多选，也可不选</small></legend>
          <div class="choice-grid">
            <label v-for="item in brands" :key="item" class="choice-chip">
              <input v-model="selectedBrands" type="checkbox" :value="item" />
              <span>{{ item }}</span>
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>是否遇到问题而非定制配置？</legend>
          <div class="choice-grid issue-grid">
            <label v-for="item in ['是', '否']" :key="item" class="choice-chip">
              <input v-model="hasIssue" type="radio" name="has-issue" :value="item" />
              <span>{{ item }}</span>
            </label>
          </div>
        </fieldset>

        <button class="computer-submit" type="submit">提交配置需求 <span aria-hidden="true">↗</span></button>
      </form>
    </section>
  </main>
</template>
