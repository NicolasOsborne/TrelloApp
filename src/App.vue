<script setup lang="ts">
import HomeView from './views/HomeView.vue'
import NavBar from './components/Templates/NavBar.vue'
</script>

<template>
  <main>
    <NavBar />
    <HomeView />
  </main>
</template>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  width: 100%;
}
</style>
