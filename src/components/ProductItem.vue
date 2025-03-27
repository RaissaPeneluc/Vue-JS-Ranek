<template>
  <div class="product" v-if="produto">
    <router-link class="product-img" :to="{ name: 'produto', params: { id: produto.id } }">
      <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo">
     </router-link
    >
    <div class="info">
      <p class="price">{{ produto.preco | numberPrice }}</p>
      <h2 class="title">{{ produto.nome }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["produto"],
};
</script>

<style scoped>

.product {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 1fr;
    grid-gap: 20px;
    margin-bottom: 40px;
    position: relative;
}

.info{
    align-self: end;
}

.product-img {
    border-radius: 4px;
    overflow: hidden;
    height: 100px;
}

/* Responsividade */

@media screen and (max-width: 500px) {
  .product {
  grid-template-columns: 1fr;
  grid-gap: 10px;
}
}
</style>
