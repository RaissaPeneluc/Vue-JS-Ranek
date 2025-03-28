<!-- Esse componente é responsável pela lista de produtos
que são disponibilizados através de uma API local. -->

<template>
  <section class="products-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="products" key="produtos">
        <div class="product" v-for="(produto, index) in produtos" :key="index">
          <router-link :to="{ name: 'produto', params: { id: produto.id } }">
            <!-- Adicionando a paginação ao clicar em um produto da lista. -->
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              alt="produto.fotos[0].titulo"
            />
            <p class="price">{{ produto.preco | numberPrice }}</p>
            <h2 class="title">{{ produto.nome }}</h2>
            <p class="description">{{ produto.descricao }}</p>
          </router-link>
        </div>
        <PaginateProducts
          :productsTotal="productsTotal"
          :productsPerPage="productsPerPage"
        />
      </div>
      <div v-else-if="produtos && produtos.length === 0" key="sem-resultados">
        <p class="sem-resultados">
          Busca sem resultados. Tente buscar outro termo.
        </p>
      </div>
      <PageLoading key="loading" v-else />
    </transition>
  </section>
</template>

<script>
import { api } from "@/services/services";
import { serialize } from "@/helpers";

import PaginateProducts from "./PaginateProducts.vue";

export default {
  name: "ProductsList",
  components: {
    PaginateProducts,
  },
  data() {
    return {
      produtos: null,
      productsPerPage: 3,
      productsTotal: 0,
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);

      return `/produto?_limit=${this.productsPerPage}${query}`; // Passando um limite para criar paginação se passar do limite.
    },
  },
  methods: {
    getProducts() {
      this.produtos = null;
      api.get(this.url).then((r) => {
        this.productsTotal = Number(r.headers["x-total-count"]); // Garantindo que sempre vai ser número.
        this.produtos = r.data; // A única diferença é a adição do .data.
      });

      // Realiza a mesma função que o axios, porém no axios não é preciso transformar em JSON.

      //   fetch("http://localhost:3000/produto")
      //     .then((r) => r.json())
      //     .then((r) => {
      //       this.products = r;
      //     });
    },
  },
  watch: {
    // Monitorando toda vez que o URL for alterada.
    url() {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
/* Estilização dos Produtos */
.products-container {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: white;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.price {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
}

/* Transições */

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate(0, -20px, 0);
}

.v-leave-to {
  transform: translate(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}

/* Responsividade */

@media screen and (max-width: 500px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}
</style>
