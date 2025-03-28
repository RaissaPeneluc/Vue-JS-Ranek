<template>
  <section>
    <div v-if="sales">
      <h2>Vendas</h2>
      <div class="products-wrapper" v-for="(sale, index) in sales" :key="index">
        <ProductItem v-if="sale.produto" :produto="sale.produto">
          <p class="buyer">
            <span>Comprador:</span>
            {{ sale.comprador_id }}
          </p>
        </ProductItem>
        <div class="delivery">
          <h3>Entrega:</h3>
          <ul v-if="sale.endereco">
            <li v-for="(value, key) in sale.endereco" :key="key">
              <!-- Percorrendo o endereço -->
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PageLoading v-else/>
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { api } from "@/services/services";
import { mapState } from "vuex";

export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      sales: null,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getSales() {
      api.get("/transacao?tipo=vendedor_id").then((r) => {
        this.sales = r.data;
      });
    },
  },
  watch: {
    // Se o login mudar ele chama o método.
    login() {
      this.getSales();
    },
  },
  created() {
    if (this.login) {
      this.getSales();
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

h3 {
  justify-self: end;
  margin: 0px;
}

.products-wrapper {
  margin-bottom: 40px;
}

.buyer span {
  color: #e80;
}

.delivery {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

/* Responsividade */

@media screen and (max-width: 500px) {
  h3 {
    justify-self: start;
  }

  .delivery {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }

}
</style>
