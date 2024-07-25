<script setup lang="ts">
import type { StyleValue } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    placeholder: string
    type: string
    id?: string
    maxLength?: number
    styleObject?: StyleValue
    regexp?: RegExp
    errorMessage?: string
  }>(),
  {
    id: 'input',
    maxLength: 1600
  }
)
const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()
const handleChange = (e: Event) => {
  let value = ''
  if (props.regexp) {
    ;(e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(
      props.regexp,
      ''
    )
    value = (e.target as HTMLInputElement).value
  } else {
    value = (e.target as HTMLInputElement).value
  }
  emits('update:modelValue', value)
}
</script>

<template>
  <div class="custom-input" :style="styleObject">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      @input="handleChange($event)"
      class="custom-input__input"
      :class="{
        'custom-input__input__error': errorMessage
      }"
      :maxlength="maxLength"
    />
    <p class="form-error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped lang="css">
.custom-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.custom-input > label {
  color: var(--white-color);
}
.custom-input__input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-color);
  background-color: var(--white-color);
  background-clip: padding-box;
  border: 1px solid var(--light-gray);
  border-radius: 0.25rem;
  outline: none;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
.custom-input__input__error {
  border: 1px solid darkred;
}
.form-error-message {
  color: darkred;
  font-size: 14px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
