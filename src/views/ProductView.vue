<!-- A ProductView é a interface de cada produto específico
selecionado pelo usuário. -->

<template>
  <section>
    <div v-if="produto" class="product">
      <ul class="photos" v-if="produto.fotos">
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img :src="foto.src" alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="price">{{ produto.preco | numberPrice }}</p>
        <p class="description">{{ produto.descricao }}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <button class="btn" v-if="!finalize" @click="finalize = true">
            Comprar
          </button>
          <FinalizePurchase v-else :produto="produto" />
        </transition>
        <button class="btn btn-disabled" v-else disabled>Produto Vendido</button>
      </div>
    </div>
    <PageLoading v-else />
  </section>
</template>

<script>
import { api } from "@/services/services";
import FinalizePurchase from "@/components/FinalizePurchase.vue";

export default {
  name: "ProductView",
  components: {
    FinalizePurchase,
  },
  props: ["id"],
  data() {
    return {
      produto: null,
      finalize: false,
    };
  },
  methods: {
    getProduct() {
      api.get(`/produto/${this.id}`).then((r) => {
        this.produto = r.data;
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style scoped>
img {
  margin-bottom: 5px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  border-radius: 4px;
}

.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e80;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 40px;
}

.photos {
  grid-row: 1 / 3;
  width: 500px;
}

.info {
  position: sticky;
  top: 20px;
}

.description {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

</style>
