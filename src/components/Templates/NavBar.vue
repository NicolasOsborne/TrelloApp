<script setup lang="ts"></script>

<template>
  <header class="header">
    <h1 class="header_title">My Tasks</h1>
    <div class="header_links"></div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  padding: 1rem 2rem;
  border-bottom: 2px solid $color-black;
  border-top: 2px solid $color-black;
  background-color: $color-white;

  &_title {
    font-size: 2rem;
    font-weight: 600;
    color: $color-black;
  }
}
</style>
