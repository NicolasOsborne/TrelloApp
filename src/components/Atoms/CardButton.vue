<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  content: string
  action: () => void
}>()
</script>

<template>
  <button class="button" @click="props.action">
    <i :class="props.content"></i>
  </button>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0.5rem 0.55rem;
  background-color: $color-red;
  color: $color-black;
  border: 1px solid $color-black;
  box-shadow: $box-shadow;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  i {
    font-size: 1rem;
  }

  &:hover {
    transform: translate($box-shadow-x, $box-shadow-y);
    box-shadow: none;
  }
}
</style>
