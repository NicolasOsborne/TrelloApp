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
@import './assets/styles/main.scss';
main {
  min-height: 100vh;
  width: 100%;
  background-color: $color-white;
}
</style>
