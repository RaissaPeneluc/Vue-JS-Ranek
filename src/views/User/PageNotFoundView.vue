<template>
  <div class="info">
    <h1>Página não encontrada.</h1>
    <router-link to="/" class="btn"> Volte para a tela inicial</router-link>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style scoped>
h1 {
  margin: 80px 0;
  color: #e80;
}

.info {
  justify-items: center;
}
</style>
