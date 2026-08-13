<script setup>
import { computed, ref } from 'vue'
import { submitCustomRequest } from '../services/customRequest'

const uses = ['游戏', '工作', '视频剪辑', '编程', '办公', '日常']
const budgets = Array.from({ length: 100 }, (_, index) => `￥${index + 1}000`)
const brands = ['Intel', 'AMD', 'NVIDIA', '都行']

const selectedUses = ref([])
const selectedBudgets = ref([])
const selectedBrands = ref([])
const hasIssue = ref('否')
const contactEmail = ref('')
const submitting = ref(false)
const submitMessage = ref('')

const summary = computed(() => [
  `用途：${selectedUses.value.length ? selectedUses.value.join('、') : '未选择'}`,
  `预算范围：${selectedBudgets.value.length ? selectedBudgets.value.join('、') : '未选择'}`,
  `品牌偏好：${selectedBrands.value.length ? selectedBrands.value.join('、') : '未选择'}`,
  `是否为故障排查：${hasIssue.value}`,
].join('\n'))

async function submitRequest() {
  submitting.value = true
  submitMessage.value = ''
  try {
    await submitCustomRequest({
      service: 'computer',
      selections: {
        '用途': selectedUses.value,
        '预算范围': selectedBudgets.value,
        '品牌偏好': selectedBrands.value,
        '是否为故障排查': hasIssue.value,
      },
      contactEmail: contactEmail.value,
    })
    submitMessage.value = '需求已发送，我会尽快查看。'
  } catch (error) {
    submitMessage.value = error.message
  } finally {
    submitting.value = false
  }
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

        <label class="contact-email-field">
          <span>联系邮箱 <small>回复会发送到此邮箱</small></span>
          <input v-model.trim="contactEmail" type="email" autocomplete="email" required placeholder="name@example.com" />
        </label>
        <button class="computer-submit" type="submit" :disabled="submitting">{{ submitting ? '正在发送...' : '提交配置需求' }} <span aria-hidden="true">↗</span></button>
        <p v-if="submitMessage" class="submit-message">{{ submitMessage }}</p>
      </form>
    </section>
  </main>
</template>
