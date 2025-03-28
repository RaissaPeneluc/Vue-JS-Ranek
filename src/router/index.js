import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import LoginView from "@/views/LoginView.vue";
import UserView from "@/views/User/UserView.vue";
import UserProductsView from "@/views/User/UserProductsView.vue";
import UserEditView from "@/views/User/UserEditView.vue";
import UserSalesView from "@/views/User/UserSalesView.vue";
import UserPurchasesView from "@/views/User/UserPurchasesView.vue";
import PageNotFoundView from "@/views/User/PageNotFoundView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: PageNotFoundView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/produto/:id",
      name: "produto",
      component: ProductView,
      props: true,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/usuario",
      component: UserView,
      meta: {
        login: true,
      },
      children: [
        {
          path: "",
          name: "usuario",
          component: UserProductsView,
        },
        {
          path: "editar",
          name: "usuario-editar",
          component: UserEditView,
        },
        {
          path: "compras",
          name: "compras",
          component: UserPurchasesView,
        },
        {
          path: "vendas",
          name: "vendas",
          component: UserSalesView,
        },
      ],
    },
  ],
  scrollBehavior() {
    // Adicionando um comportamento de scroll suave ao mudar de rota.
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

router.beforeEach((to, from, next) => {
  // Antes de mudar de rota ele irá realizar as verificações.
  if (to.matched.some((record) => record.meta.login)) {
    // Verifica ao entrar na página, vai ser necessário o login: true.
    if (!window.localStorage.token) {
      // Se o usuário não estiver logado manda ele para a página de login.
      next("/login");
    } else {
      next(); // Se estiver logado, entra na página normalmente.
    }
  }
  next();
});

export default router;
