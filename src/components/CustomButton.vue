<script setup lang="ts">
import type { StyleValue } from 'vue'

withDefaults(
  defineProps<{
    type: 'button' | 'submit' | 'reset' | undefined
    styleObject?: StyleValue
  }>(),
  {
    type: 'button'
  }
)
</script>

<template>
  <button :type="type" @click="$emit('click')" class="custom-button" :style="styleObject">
    <slot />
  </button>
</template>

<style scoped lang="css">
.custom-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
  background: var(--blue-color);
  color: var(--white-color);
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
}
</style>
