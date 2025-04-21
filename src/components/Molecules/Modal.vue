<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{ show: boolean }>()
const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="emit('close')">
        <i class="bi bi-x-lg"></i>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  position: relative;
  background: $color-background;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: $box-shadow;
  border: 2px solid $color-black;
  min-width: 300px;
  max-width: 600px;
  max-height: 80vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.modalTitle {
  max-width: 350px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-selects {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.modal-dateSelect {
  accent-color: $color-green;
}
</style>
