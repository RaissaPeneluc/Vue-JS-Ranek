<!-- A HomeView é a interface principal da aplicação, onde após autenticação
do usuário, ela vai disponilizar todas as informações e caminhos para as
páginas da aplicação. -->

<template>
  <section>
    <h1>Compre ou Venda</h1>
    <SearchProduct />
    <ProductsList />
  </section>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';
import SearchProduct from '@/components/SearchProduct.vue';

export default {
  name: 'HomeView',
  components: {
    ProductsList,
    SearchProduct
  },
  created(){
    document.title = "Ranek";
  }
}
</script>

<style scoped>
h1{
  color: #87f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>