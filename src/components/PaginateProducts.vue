<!-- Esse componente é responsável pela criação da paginação
e a navegação entre as páginas. -->

<template>
  <ul v-if="pagesTotal > 1"> <!-- Só mostra a paginação se tiver mais de uma página. -->
    
    <router-link :to="{ query: query(1) }">Início</router-link>

    <li v-for="page in pagesRange" :key="page">
      <router-link :to="{ query: query(page) }">{{ page }}</router-link>
    </li>
    <router-link :to="{ query: query(pagesTotal) }">Última</router-link>
  </ul>
</template>

<script>
export default {
  props: {
    productsPerPage: {
      type: Number, // Garantindo só vir Number.
      default: 1,
    },
    productsTotal: {
      type: Number, // Garantindo só vir Number.
      default: 1,
    },
  },
  methods: {
    query(page) {
      return {
        ...this.$route.query, // Desestruturando o objeto route.
        _page: page,
      };
    },
  },
  computed: {
    // Cria a navegação das páginas.
    pagesRange() {
      // Vai sempre retornar um array, com a limitação de páginas que vão ser demonstradas no momento.
      const current = Number(this.$route.query._page); // Pegando a página atual do usuário.
      const range = 8; // Dando um limite de total de páginas aparecendo.
      const offset = Math.ceil(range / 2); // Pegando itens anteriores da lista.
      const total = this.pagesTotal; // Pegando o total de páginas.
      const pagesArray = [];

      // Criando um array com total de páginas.
      for (let i = 1; i <= total; i++) {
        pagesArray.push(i); // Populando o array.
      }

      /* Fazendo o controle de número de páginas. */

      // Controle dos números antes e depois da atual página.
      pagesArray.splice(0, current - offset); // Splice recebe 2 argumentos: De onde começa a remover itens do array e até onde é removido.

      // Controle do total de páginas exibidas.
      pagesArray.splice(range, total); // Começa sempre do range, ou seja, novo item, até o total.

      return pagesArray;
    },
    pagesTotal() {
      const total = this.productsTotal / this.productsPerPage;
      return total !== Infinity ? Math.ceil(total) : 0; // Arredondando sempre o total pra cima. Se o total for infinito, ele arredonda para 0.
    },
  },
};
</script>

<style>
ul {
  grid-column: 1/ -1; /* Sempre pegando uma coluna de ponta a ponta. */
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: white;
}
</style>
