<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { onMounted } from 'vue'

withDefaults(
  defineProps<{
    showModal: boolean
  }>(),
  {
    showModal: false
  }
)

const emits = defineEmits<{
  (e: 'close-modal'): void
}>()

onMounted(() => {
  const mainContainer = document.querySelector('body')
  mainContainer?.addEventListener('click', () => emits('close-modal'))
})
</script>

<template>
  <Teleport to="body">
    <div class="custom-modal" v-if="showModal">
      <div class="custom-modal__wrapper">
        <CloseIcon class="custom-modal__close" @click="$emit('close-modal')" />
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="css">
.custom-modal {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  background: rgba(217, 217, 217, 0.7);
  backdrop-filter: blur(12px);
}
.custom-modal__wrapper {
  padding: 30px;
  background: var(--white-color);
  max-width: 605px;
  max-height: 624px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 16px;
  position: relative;
}
.custom-modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
