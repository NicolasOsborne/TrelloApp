<script setup lang="ts">
defineProps<{
  label: string
  placeholder?: string
  modelValue: string
  type?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input_wrapper">
    <label class="input_label" for="input">{{ label }}</label>
    <input
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      name="input"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.input_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;

  label {
    font-family: $font-title;
    font-weight: 500;
  }

  input {
    width: 75%;
    height: 2rem;
    border-radius: 8px;
    border: 2px solid $color-black;
    padding: 10px;
    font-family: $font-body;
    outline: 2px solid transparent;
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: 2px solid $color-green;
    }
  }
}
</style>
