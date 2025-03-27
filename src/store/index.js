import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services/services";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, // Evita a modificação do objeto pelo lado de fora.
  state: {
    login: false, // Usuário logado ou deslogado.
    usuario: {
      // Usuário em estado geral, com todas informações dele sempre no state.
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    usuario_produtos: null,
  },
  getters: {},

  // Mutações é o que muda o state (usuário).
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.usuario = Object.assign(state.usuario, payload); // Combinando objetos, para evitar sobreposição e deletar o objeto antigo. Agora ele só substitui o necessário.
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USER_PRODUCTS(state, payload) {
      state.usuario_produtos.unshit(payload); // unshit manda a informação para o início do array.
    },
  },

  actions: {
    // Action para buscar a informação do usuário através da API.
    getUser(context) {
      return api.get(`/usuario`).then((r) => {
        // Utilizando o payload como query.
        context.commit("UPDATE_USER", r.data); // Atualiza o usuário.
        context.commit("UPDATE_LOGIN", true); // Deixa o usuário "logado".
      });
    },
    // Action para buscar os produtos do usuário através da API.
    getUserProducts(context) {
      api.get(`/produto?usuario_id=${context.state.usuario.id}`).then((r) => {
        context.commit("UPDATE_USER_PRODUCTS", r.data);
      });
    },
    // Action para criar o usuário.
    createUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email }); // Atualizando o ID.
      return api.post("/usuario", payload);
    },
    loginUser(context, payload) {
      return api
        .login({
          username: payload.email,
          password: payload.senha,
        })
        .then(r => {
          window.localStorage.token = `Bearer ${r.data.token}`
        });
    },
    // Action para deslogar um usuário, limpa o objeto e coloca o login como false.
    logoutUser(context) {
      context.commit("UPDATE_USER", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      window.localStorage.removeItem("token"); // Removendo o token do usuário.
      context.commit("UPDATE_LOGIN", false);
    },
  },
  modules: {},
});
