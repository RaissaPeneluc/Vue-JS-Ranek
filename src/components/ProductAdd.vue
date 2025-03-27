<template>
  <form class="add-product">
    <label for="name">Nome</label>
    <input id="name" name="name" type="text" v-model="produto.nome" />

    <label for="price">Preço (R$)</label>
    <input id="price" name="price" type="number" v-model="produto.preco" />

    <label for="photos">Fotos</label>
    <input id="photos" name="photos" type="file" multiple ref="fotos" />

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
      const form = new FormData(); // Criando um FormData para enviar para o WordPress. A partir dele vai ser adicionado tudo que for preciso sobre o produto.

      const files = this.$refs.fotos.files;
      for(let i=0; i< files.length; i++){
        form.append(files[i].name, files[i]);
      }

      form.append("nome", this.produto.nome);
      form.append("preco", this.produto.preco);
      form.append("descricao", this.produto.descricao);
      form.append("vendido", this.produto.vendido);
      form.append("usuario_id", this.$store.state.usuario.id);

      return form;
    },
    // Adicionando o produto à lista de produtos.
    addProduct() {
      const produto = this.formatProduct();
      api.post("/produto", produto).then(() => {
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
