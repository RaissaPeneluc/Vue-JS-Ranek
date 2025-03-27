<!-- Esse componente é responsável pela busca de produtos. -->

<template>
  <form>
    <input name="search" id="search" type="text" v-model="search" placeholder="Buscar..."/>     
    <input
      type="submit"
      id="lupa"
      value="Buscar"
      @click.prevent="searchProducts"
    /> <!-- Prevent para evitar o refresh no browser. -->
  </form>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchProducts() {
      this.$router.push({ query: { q: this.search } }); // Mudando o roteamento, usando o query para parâmetro de busca, usando o conteúdo digitado.
    },
  },
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
  padding: 0 10px;
}

#search {
  width: 100%;
  padding: 20px;
  border: none;
}

#search:focus, /* Focus é quando tá selecionado. */
#search:hover {
  transform: scale(1.1);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url(../assets/search.svg) no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}
</style>
