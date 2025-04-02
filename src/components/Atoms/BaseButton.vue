<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  content?: string
  icon?: string
  action: () => void
  variant?: 'cta' | 'card'
}>()
</script>

<template>
  <button class="button" :class="variant" @click="props.action">
    <i v-if="icon" :class="icon"></i>
    <span v-if="content">{{ content }}</span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: $box-shadow;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translate($box-shadow-x, $box-shadow-y);
    box-shadow: none;
  }
}

.cta {
  border: 2px solid $color-black;
  padding: 0.5rem 1rem;
  background-color: $color-green;
  color: $color-black;
  font-size: 1.25rem;
  font-weight: 500;
}

.card {
  padding: 0.5rem 0.55rem;
  background-color: $color-red;
  color: $color-black;
  border: 1px solid $color-black;

  i {
    font-size: 1rem;
  }
}
</style>
