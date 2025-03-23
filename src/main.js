import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PageLoading from './components/PageLoading.vue'

Vue.config.productionTip = false

// Carregando o componente globalmente, pois vai ser usado em diversos componentes.
Vue.component("PageLoading", PageLoading); 

// Como só vai ter 1 filtro, declarando ele globalmente ao invés de um arquivo isolado.
Vue.filter("numberPrice", valor => {
  valor = Number(valor);

  if(!isNaN(valor)) { // Verificação se valor está chegando como um número para o filtro
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  } else {
     return "";
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
