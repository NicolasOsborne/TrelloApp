<script setup lang="ts">
import Kanban from '../components/Pages/Kanban.vue'
</script>

<template>
  <section class="home">
    <h2>Liste des tâches</h2>
    <Kanban />
  </section>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: $color-black;
  }
}
</style>
