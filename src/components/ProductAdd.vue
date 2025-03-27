<template>
  <form class="add-product">
    <label for="name">Nome</label>
    <input id="name" name="name" type="text" v-model="produto.nome" />

    <label for="price">Preço (R$)</label>
    <input id="price" name="price" type="number" v-model="produto.preco" />

    <label for="photos">Fotos</label>
    <input id="photos" name="photos" type="file" ref="fotos" />

    <label for="description">Descrição</label>
    <textarea
      id="description"
      name="description"
      type="number"
      v-model="produto.descricao"
    ></textarea>

    <input
      type="button"
      class="btn"
      value="Adicionar Produto"
      @click.prevent="addProduct"
    />
  </form>
</template>

<script>
import { api } from "@/services/services";

export default {
  name: "ProductAdd",
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: "",
        sold: "false",
      },
    };
  },
  methods: {
    // Adicionando informações extras ao produto.
    formatProduct() {
      this.produto.usuario_id = this.$store.state.usuario.id;
    },
    // Adicionando o produto à lista de produtos.
    addProduct() {
      this.formatProduct();
      api.post("/produto", this.produto).then(() => {
        this.$store.dispatch("getUserProducts");
      });
    },
  },
};
</script>

<style scoped>

.add-product {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom: 60px;
}

.btn {
    grid-column: 2;
}

</style>
