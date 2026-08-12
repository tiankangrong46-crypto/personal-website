<script setup>
import { computed, ref } from 'vue'

const selectedFile = ref(null)
const request = ref('')
const fileInput = ref(null)
const fileLabel = computed(() => selectedFile.value?.name || '选择参考图片')

function onFileChange(event) {
  selectedFile.value = event.target.files?.[0] || null
}

function chooseFile() {
  fileInput.value?.click()
}

function submitRequest() {
  const subject = '3D 模型定制需求'
  const fileInfo = selectedFile.value
    ? `参考图片文件：${selectedFile.value.name}\n请在打开的邮件中手动附上此图片。`
    : '参考图片文件：未选择'
  const body = `你好，我想咨询 3D 模型定制服务。\n\n${fileInfo}\n\n打印需求与形状描述：\n${request.value || '未填写'}\n`
  window.location.href = `mailto:tiankangrong46@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
        <p class="attachment-note">提交后会打开邮件客户端。请将选中的图片作为附件加入邮件后发送。</p>
        <button class="computer-submit" type="submit">提交模型需求 <span aria-hidden="true">↗</span></button>
      </form>
    </section>
  </main>
</template>
