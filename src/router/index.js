import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
  scrollBehavior() { // Adicionando um comportamento de scroll suave ao mudar de rota.
    return window.scrollTo({top: 0, behavior: "smooth"});
  }
});
