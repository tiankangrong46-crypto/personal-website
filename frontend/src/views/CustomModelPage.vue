<script setup>
import { computed, ref } from 'vue'
import { submitCustomRequest } from '../services/customRequest'

const selectedFile = ref(null)
const request = ref('')
const fileInput = ref(null)
const submitting = ref(false)
const submitMessage = ref('')
const fileLabel = computed(() => selectedFile.value?.name || '选择参考图片')

function onFileChange(event) {
  selectedFile.value = event.target.files?.[0] || null
}

function chooseFile() {
  fileInput.value?.click()
}

async function submitRequest() {
  submitting.value = true
  submitMessage.value = ''
  try {
    await submitCustomRequest({
      service: 'model',
      selections: {
        '打印需求与形状描述': request.value,
        '参考图片': selectedFile.value?.name || '未上传',
      },
      file: selectedFile.value,
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
  <main class="page custom-service-page model-service-page">
    <RouterLink class="back-link" to="/custom">← 返回定制</RouterLink>
    <section class="model-request-layout">
      <div class="model-request-copy">
        <p class="eyebrow">Custom service / 03</p>
        <h1>3D 模型定制</h1>
        <p>提供 3D 模型设计服务。</p>
        <p>从概念到成品一步到位。</p>
      </div>

      <form class="model-request-form" @submit.prevent="submitRequest">
        <div class="model-field">
          <span class="model-label">导入参考图片 <small>仅支持图片格式</small></span>
          <input ref="fileInput" accept="image/*" type="file" @change="onFileChange" />
          <button class="file-picker" type="button" @click="chooseFile"><span>{{ fileLabel }}</span><b>选择图片 ↗</b></button>
        </div>
        <label class="model-field" for="model-description">
          <span class="model-label">描述打印需求 <small>形状、尺寸、用途或其他细节</small></span>
          <textarea id="model-description" v-model="request" placeholder="例如：需要一款适配桌面的耳机支架，主体为圆角，预留 30mm 固定孔位。"></textarea>
        </label>
        <p class="attachment-note">参考图会作为附件随需求一并发送，单张图片最大 5MB。</p>
        <button class="computer-submit" type="submit" :disabled="submitting">{{ submitting ? '正在发送...' : '提交模型需求' }} <span aria-hidden="true">↗</span></button>
        <p v-if="submitMessage" class="submit-message">{{ submitMessage }}</p>
      </form>
    </section>
  </main>
</template>
