<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  options: Array<{ label: string; value: string }>
  label?: string
  id?: string
}>()

const emit = defineEmits<(event: 'update:modelValue', value: string) => void>()

const onChange = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value
  emit('update:modelValue', selectedValue)
}
</script>

<template>
  <div class="select-wrapper">
    <label v-if="props.label" :for="props.id" class="select-label">{{
      props.label
    }}</label>
    <select :value="props.modelValue" @change="onChange">
      <option
        v-for="option in props.options"
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
  gap: 4px;
}

.select-label {
  font-weight: bold;
  margin-bottom: 4px;
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
</style>
