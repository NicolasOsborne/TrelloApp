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
  border-radius: 99px;
  padding: 0.5rem;
  background-color: $color-white;
  color: $color-red;
  border: 1px solid $color-red;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  i {
    font-size: 1rem;
  }

  &:hover {
    border: 1px solid $color-white;
    background-color: $color-red;
    color: $color-white;
  }
}
</style>
