import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '@/services/services';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    login: false,  // Usuário logado ou deslogado.
    user: { // Usuário em estado geral, com todas informações dele sempre no state.
      id: "",
      name: "",
      email: "",
      password: "",
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  },
  getters: {
  },

  // Mutações é o que muda o usuário.
  mutations: {
      UPDATE_LOGIN(state, payload) {
        state.login = payload;
      },
      UPDATE_USER(state, payload) {
        state.user = payload;
      }
  },

  actions: {
    // Action para buscar a informação do usuário através da API.
    getUser(context, payload) { 
      api.get(`/usuario/${payload}`).then(r => { // Utilizando o payload como query.
        context.commit("UPDATE_USER", r.data ); // Atualiza o usuário.
        context.commit("UPDATE_LOGIN", true ); // Deixa o usuário "logado".
      })
    }
  },
  modules: {
  }
})
