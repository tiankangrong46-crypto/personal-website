<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  projectName: { type: String, required: true },
  variant: { type: String, default: 'default' },
})

const activeIndex = ref(0)
const dragStartX = ref(null)
const dragDistance = ref(0)

const relativePosition = (index) => {
  const distance = (index - activeIndex.value + props.images.length) % props.images.length
  if (distance === 0) return 'is-active'
  if (distance === 1) return 'is-next'
  if (distance === props.images.length - 1) return 'is-previous'
  return 'is-hidden'
}

const startDrag = (event) => {
  dragStartX.value = event.clientX
  dragDistance.value = 0
  event.currentTarget.setPointerCapture(event.pointerId)
}

const moveDrag = (event) => {
  if (dragStartX.value === null) return
  dragDistance.value = event.clientX - dragStartX.value
}

const endDrag = () => {
  if (dragStartX.value === null) return
  if (dragDistance.value > 55) activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
  if (dragDistance.value < -55) activeIndex.value = (activeIndex.value + 1) % props.images.length
  dragStartX.value = null
  dragDistance.value = 0
}
</script>

<template>
  <div
    :class="['project-gallery', `gallery-${variant}`, { 'is-dragging': dragStartX !== null }]"
    role="group"
    :aria-label="`${projectName} 项目图库，可左右拖拽切换图片`"
    @pointerdown="startDrag"
    @pointermove="moveDrag"
    @pointerup="endDrag"
    @pointercancel="endDrag"
  >
    <img
      v-for="(image, index) in images"
      :key="image"
      :src="image"
      :alt="`${projectName} 图库图片 ${index + 1}`"
      :class="relativePosition(index)"
      :style="relativePosition(index) === 'is-active' && dragStartX !== null ? { '--drag-x': `${Math.max(-55, Math.min(55, dragDistance))}px` } : undefined"
      draggable="false"
    />
    <p class="gallery-status">{{ activeIndex + 1 }} / {{ images.length }} · 左右拖拽切换</p>
  </div>
</template>
