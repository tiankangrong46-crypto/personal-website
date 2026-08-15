<script setup>
import { computed, ref } from 'vue'
import { locale } from '../locale'
const frontCard = ref(''); const copiedCard = ref('')
const cards = [{ id:'email', label:'EMAIL', value:'tiankangrong46@gmail.com', href:'mailto:tiankangrong46@gmail.com' }, { id:'phone', label:'PHONE', value:'+86 183 0850 7649', href:'tel:+8618308507649' }, { id:'wechat', label:'WECHAT', value:'wxid_fl2p8o21jrlc22' }]
const text = computed(() => locale.value === 'en' ? { title:'Contact me?', subtitle:'Support is welcome. Let us talk about working together.\nEven a casual chat works.', copy:'COPY', copied:'COPIED' } : { title:'联系劳资？', subtitle:'球球了给点赞助吧球球了谈谈合作吧\n纯聊天都行', copy:'复制', copied:'已复制' })
async function copy(card) { await navigator.clipboard.writeText(card.value); copiedCard.value=card.id; setTimeout(()=>copiedCard.value='',1600) }
</script>
<template><main class="page contact-page"><section class="contact-section"><div class="contact-heading"><p class="eyebrow">Start a conversation</p><h1>{{ text.title }}</h1><p class="contact-copy">{{ text.subtitle }}</p></div><div class="contact-card-stack" aria-label="Contact methods"><article v-for="card in cards" :key="card.id" class="contact-card" :class="[`contact-card-${card.id}`, { 'is-front': frontCard === card.id }]" tabindex="0" @mouseenter="frontCard=card.id" @mouseleave="frontCard=''" @focusin="frontCard=card.id" @focusout="frontCard=''"><span>{{ card.label }}</span><a v-if="card.href" :href="card.href">{{ card.value }}</a><strong v-else>{{ card.value }}</strong><button type="button" @click="copy(card)">{{ copiedCard === card.id ? text.copied : text.copy }} <b aria-hidden="true">→</b></button></article></div></section></main></template>
