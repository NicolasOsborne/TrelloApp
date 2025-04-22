<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
  options: Array<{ label: string; value: string; color?: string }>
  label?: string
  id?: string
  margin?: string
}>()

const emit = defineEmits(['update:modelValue'])

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectOption = (value: string) => {
  emit('update:modelValue', value)
  isDropdownOpen.value = false
}
</script>
<template>
  <div class="custom-select">
    <label v-if="label" :for="id" class="custom-select_label">{{
      label
    }}</label>
    <div
      class="custom-select_button"
      @click="toggleDropdown"
      :style="{
        backgroundColor: options.find((opt) => opt.value === modelValue)?.color,
      }"
    >
      {{ options.find((opt) => opt.value === modelValue)?.label || 'Select' }}
    </div>
    <div
      v-if="isDropdownOpen"
      class="custom-select_dropdown"
      :style="{ marginTop: margin || '4rem' }"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="custom-select_option"
        :style="{ backgroundColor: option.color }"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-select {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;

  &_label {
    font-family: $font-title;
    font-weight: 500;
  }

  &_button {
    padding: 0.25rem 0.5rem;
    border: 1px solid $color-black;
    border-radius: 4px;
    box-shadow: $box-shadow;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translate($box-shadow-x, $box-shadow-y);
      box-shadow: none;
    }
  }

  &_dropdown {
    position: fixed;
    background-color: $color-background;
    padding: 0.75rem;
    border: 2px solid $color-black;
    border-radius: 8px;
    box-shadow: $box-shadow;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: fit-content;
  }

  &_option {
    padding: 0.25rem 0.5rem;
    border: 1px solid $color-black;
    border-radius: 4px;
    box-shadow: $box-shadow;
    font-weight: 600;
    text-wrap: nowrap;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translate($box-shadow-x, $box-shadow-y);
      box-shadow: none;
    }
  }
}
</style>
