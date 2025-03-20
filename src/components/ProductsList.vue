<template>
  <section class="products-container">
    <div v-for="product in products" :key="product.id">
      <img
        v-if="product.fotos"
        :src="product.fotos[0].src"
        alt="product.fotos[0].titulo"
      />
      <p class="price">{{ product.preco }}</p>
      <h2 class="title">{{ product.nome }}</h2>
      <p class="description">{{ product.descricao }}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      products: null,
    };
  },
  methods: {
    getProducts() {
      fetch("http://localhost:3000/produto")
        .then((r) => r.json())
        .then((r) => {
          this.products = r;
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style></style>
