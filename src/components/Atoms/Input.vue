<script setup lang="ts">
const props = defineProps<{
  label: string
  placeholder: string
}>()
</script>

<template>
   <label class="input_label" for="input">{{ props.label }}</label>
   <input placeholder="{{ props.placeholder }}" name="input"></input>
</template>

<style lang="scss" scoped>
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
</style>