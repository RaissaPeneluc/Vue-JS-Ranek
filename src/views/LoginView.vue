<!-- A LoginView é a interface de autenticação da aplicação. -->

<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">E-mail</label>
      <input type="email" name="email" id="email" v-model="login.email" />

      <label for="password">Senha</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="login.senha"
      />

      <button class="btn" @click.prevent="logar">Logar</button>
      <ErrorNotification :erros="erros"/>
    </form>
    <p class="forget">
      <a href="http://localhost/ranek/wp-login.php?action=lostpassword" target="_blank">Esqueceu a senha? Clique aqui</a>
    </p>
    <LoginCreate />
  </section>
</template>

<script>
import LoginCreate from "@/components/LoginCreate.vue";

export default {
  components: {
    LoginCreate,
  },
  data() {
    return {
      login: {
        email: "",
        senha: "",
      },
      erros: [],
    };
  },
  methods: {
    logar() {
      this.erros = [];
      this.$store.dispatch("loginUser", this.login).then((r) => {
        this.$store.dispatch("getUser"); // Puxando o usuário
        this.$router.push({ name: "usuario" }); // Redirecionando diretamente para a view do Usuário.
        console.log(r);
      }).catch(error => {
          this.erros.push(error.response.data.message); // Pegando o erro que já vem predefinido pelo WordPress.
      });
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.forget {
  text-align: center;
  margin: 20px auto 0 auto;
}

.forget a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
