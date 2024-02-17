<script>
import { RouterLink, RouterView } from 'vue-router';

// 改為 option api
export default {
  components: { RouterLink, RouterView }
};
</script>

<template>
  <RouterView />
</template>

<style>
nav {
  padding: 30px;
  a {
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
