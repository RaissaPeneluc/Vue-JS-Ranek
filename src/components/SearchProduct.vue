<template>
  <form>
    <input name="search" id="search" type="text" v-model="search" />
    <input
      type="submit"
      id="lupa"
      value="Buscar"
      @click.prevent="searchProducts"
    />
    <!-- Prevent para evitar o refresh no browser. -->
    {{ search }}
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
}

#search {
  width: 100%;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 20px;
  border: none;
  border-radius: 4px;
  transition: all 0.3s;
}

#search:focus, /* Focus é quando tá selecionado. */
#search:hover {
    outline: none;
    
}
</style>
