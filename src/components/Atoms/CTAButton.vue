<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  content: string
  action: () => void
}>()
</script>

<template>
  <button class="button" @click="props.action">
    {{ props.content }}
  </button>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid $color-black;
  box-shadow: $box-shadow;
  padding: 0.5rem 1rem;
  background-color: $color-green;
  color: $color-black;
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translate($box-shadow-x, $box-shadow-y);
    box-shadow: none;
  }
}
</style>
