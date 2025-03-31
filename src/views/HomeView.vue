<script setup lang="ts">
import Kanban from '../components/Pages/Kanban.vue'

defineProps<{}>()
</script>

<template>
  <section class="home">
    <h1>Trello</h1>
    <Kanban />
  </section>
</template>

<style lang="scss" scoped>
.home {
}
</style>
