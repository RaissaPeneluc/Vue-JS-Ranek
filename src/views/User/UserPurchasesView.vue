<template>
  <section>
    <div v-if="purchases">
      <h2>Compras</h2>
      <div
        class="products-wrapper"
        v-for="(purchase, index) in purchases"
        :key="index"
      >
        <ProductItem v-if="purchase.produto" :produto="purchase.produto">
          <p class="seller">
            <span>Vendedor:</span>
            {{ purchase.vendedor_id }}
          </p>
        </ProductItem>
      </div>
    </div>
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
      purchases: null,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getPurchases() {
      api.get('/transacao?tipo=comprador_id').then((r) => {
        this.purchases = r.data;
      });
    },
  },
  watch: {
    // Se o login mudar ele chama o método.
    login() {
      this.getPurchases();
    },
  },
  created() {
    if (this.login) {
      this.getPurchases();
    }
  },
};
</script>

<style scoped>
.products-wrapper {
    margin-bottom: 40px;
}

.seller span{
    color: #e80;
}

h2 {
    margin-bottom: 20px;
}
</style>
