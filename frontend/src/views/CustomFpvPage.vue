<script setup>
import { computed, ref } from 'vue'
import { submitCustomRequest } from '../services/customRequest'

const sizes = ['65mm', '75mm', '85mm', '2inch', '2.5inch', '3inch', '3.5inch', '4inch', '5inch', '6inch', '7inch']
const uses = ['竞速', '花飞', '拍摄', '老年飞']
const videoSystems = ['模拟', '高清', 'HDzero']
const budgets = Array.from({ length: 14 }, (_, index) => `￥${(index + 1) * 500}`)

const selectedSizes = ref([])
const selectedUses = ref([])
const selectedBudgets = ref([])
const selectedVideoSystems = ref([])
const hasIssue = ref('否')
const contactEmail = ref('')
const submitting = ref(false)
const submitMessage = ref('')

const summary = computed(() => [
  `尺寸：${selectedSizes.value.length ? selectedSizes.value.join('、') : '未选择'}`,
  `用途：${selectedUses.value.length ? selectedUses.value.join('、') : '未选择'}`,
  `预算范围：${selectedBudgets.value.length ? selectedBudgets.value.join('、') : '未选择'}`,
  `图传系统：${selectedVideoSystems.value.length ? selectedVideoSystems.value.join('、') : '未选择'}`,
  `是否为故障排查：${hasIssue.value}`,
].join('\n'))

async function submitRequest() {
  submitting.value = true
  submitMessage.value = ''
  try {
    await submitCustomRequest({
      service: 'fpv',
      selections: {
        '尺寸': selectedSizes.value,
        '用途': selectedUses.value,
        '预算范围': selectedBudgets.value,
        '图传系统': selectedVideoSystems.value,
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
  <main class="page custom-service-page fpv-service-page">
    <RouterLink class="back-link" to="/custom">← 返回定制</RouterLink>
    <section class="computer-request-layout">
      <div class="computer-request-copy">
        <p class="eyebrow">Custom service / 02</p>
        <h1>穿越机配置定制</h1>
        <p>为你的飞行风格定制穿越机配置。</p>
        <p>根据你遇到的问题，拿出最合适的解决方案。</p>
      </div>

      <form class="computer-request-form" @submit.prevent="submitRequest">
        <fieldset>
          <legend>尺寸 <small>可多选，也可不选</small></legend>
          <div class="choice-grid">
            <label v-for="item in sizes" :key="item" class="choice-chip"><input v-model="selectedSizes" type="checkbox" :value="item" /><span>{{ item }}</span></label>
          </div>
        </fieldset>
        <fieldset>
          <legend>用途 <small>可多选，也可不选</small></legend>
          <div class="choice-grid">
            <label v-for="item in uses" :key="item" class="choice-chip"><input v-model="selectedUses" type="checkbox" :value="item" /><span>{{ item }}</span></label>
          </div>
        </fieldset>
        <fieldset>
          <legend>预算范围 <small>每 500 元一档，可多选</small></legend>
          <div class="choice-grid">
            <label v-for="item in budgets" :key="item" class="choice-chip"><input v-model="selectedBudgets" type="checkbox" :value="item" /><span>{{ item }}</span></label>
          </div>
        </fieldset>
        <fieldset>
          <legend>图传系统 <small>可多选，也可不选</small></legend>
          <div class="choice-grid">
            <label v-for="item in videoSystems" :key="item" class="choice-chip"><input v-model="selectedVideoSystems" type="checkbox" :value="item" /><span>{{ item }}</span></label>
          </div>
        </fieldset>
        <fieldset>
          <legend>是否遇到问题而非定制配置？</legend>
          <div class="choice-grid issue-grid">
            <label v-for="item in ['是', '否']" :key="item" class="choice-chip"><input v-model="hasIssue" type="radio" name="has-issue" :value="item" /><span>{{ item }}</span></label>
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
