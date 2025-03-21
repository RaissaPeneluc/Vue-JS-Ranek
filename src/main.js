import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PageLoading from './components/PageLoading.vue'

Vue.config.productionTip = false

// Carregando o componente globalmente, pois vai ser usado em diversos componentes.
Vue.component("PageLoading", PageLoading); 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
