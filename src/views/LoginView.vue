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
        v-model="login.password"
      />

      <button class="btn" @click.prevent="logar">Logar</button>
    </form>
    <p class="forget">
      <a href="/" target="_blank">Esqueceu a senha?</a>
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
        password: "",
      },
    };
  },
  methods: {
    logar() {
      this.$store.dispatch("getUser", this.login.email); // Passando o email como payload, para ser paramentro de query.
      this.$router.push({ name: "usuario" }); // Redirecionando diretamente para a view do Usuário.
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