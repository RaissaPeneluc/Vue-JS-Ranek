<template>
  <div class="product" v-if="product">
    <router-link class="product-img" :to="{ name: 'produto', params: { id: product.id } }">
      <img v-if="product.fotos" :src="product.fotos[0].src" :alt="product.fotos[0].titulo">
      <p>Ver Produto</p></router-link
    >
    <div class="info">
      <p class="price">{{ product.preco | numberPrice }}</p>
      <h2 class="title">{{ product.nome }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"],
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
</style>
