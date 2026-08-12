<script setup>
import { ref } from 'vue'

const frontCard = ref('')
const copiedCard = ref('')

const contactCards = [
  { id: 'email', label: 'EMAIL', value: 'tiankangrong46@gmail.com', href: 'mailto:tiankangrong46@gmail.com' },
  { id: 'phone', label: 'PHONE', value: '+86 183 0850 7649', href: 'tel:+8618308507649' },
  { id: 'wechat', label: 'WECHAT', value: 'wxid_fl2p8o21jrlc22' },
]

async function copyContact(card) {
  try {
    await navigator.clipboard.writeText(card.value)
  } catch {
    const helper = document.createElement('textarea')
    helper.value = card.value
    helper.style.position = 'fixed'
    helper.style.opacity = '0'
    document.body.appendChild(helper)
    helper.select()
    document.execCommand('copy')
    helper.remove()
  }
  copiedCard.value = card.id
  window.setTimeout(() => {
    if (copiedCard.value === card.id) copiedCard.value = ''
  }, 1600)
}
</script>

<template>
  <main class="page contact-page">
    <section class="contact-section">
      <div class="contact-heading">
        <p class="eyebrow">Start a conversation</p>
        <h1>联系劳资？</h1>
        <p class="contact-copy">球球了给点赞助吧球球了谈谈合作吧<br />纯聊天都行</p>
      </div>

      <div class="contact-card-stack" aria-label="联系方式">
        <article v-for="card in contactCards" :key="card.id" class="contact-card" :class="[`contact-card-${card.id}`, { 'is-front': frontCard === card.id }]" tabindex="0" @mouseenter="frontCard = card.id" @mouseleave="frontCard = ''" @focusin="frontCard = card.id" @focusout="frontCard = ''">
          <span>{{ card.label }}</span>
          <a v-if="card.href" :href="card.href">{{ card.value }}</a>
          <strong v-else>{{ card.value }}</strong>
          <button type="button" @click="copyContact(card)">{{ copiedCard === card.id ? '已复制' : '复制' }} <b aria-hidden="true">↗</b></button>
        </article>
      </div>
    </section>
  </main>
</template>
