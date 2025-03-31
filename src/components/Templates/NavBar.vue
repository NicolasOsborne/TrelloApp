<script setup lang="ts"></script>

<template>
  <header class="header">
    <h1 class="header_title">TrelloApp</h1>
    <div class="header_links"></div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;

  &_title {
    font-size: 2rem;
    font-weight: 600;
  }

  &_links {
  }
}
</style>
