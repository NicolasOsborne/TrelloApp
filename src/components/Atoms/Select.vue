<script setup lang="ts">
defineProps<{
  modelValue: string
  options: Array<{ label: string; value: string }>
  label?: string
  id?: string
}>()

const emit = defineEmits(['update:modelValue'])

const onChange = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value
  emit('update:modelValue', selectedValue)
}
</script>

<template>
  <div class="select-wrapper">
    <label v-if="label" :for="id">{{ label }}</label>
    <select :value="modelValue" @change="onChange">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;

  label {
    font-weight: 600;
  }

  select {
    width: max-content;
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
