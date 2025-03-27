<!-- O LoginCreate é um componente que contém a criação do usuário, ele é
incorporado por outro componente que traz o formulário utilizado para a
criação. -->

<template>
  <section>
    <h2>Criar a Sua Conta</h2>
    <ErrorNotification :erros="erros"/>
    <transition mode="out-in">
      <button v-if="!create" class="btn" @click="create = true">
        Criar Conta
      </button>
      <UserForm v-else>
        <button class="btn btn-form" @click.prevent="createUser">
          Criar Usuário
        </button>
      </UserForm>
    </transition>
  </section>
</template>

<script>
import UserForm from "./UserForm.vue";

export default {
  name: "LoginCreate",
  components: {
    UserForm,
  },
  data() {
    return {
      create: false,
      erros: [],
    };
  },
  methods: {
    // Método assíncrono para só acontecer uma ação após a outra for concluída.
    async createUser() {
      this.erros = [];
      try {
        await this.$store.dispatch("createUser", this.$store.state.usuario);
        await this.$store.dispatch("loginUser", this.$store.state.usuario); // Antes de puxar o usuário, ele vai logar.
        await this.$store.dispatch("getUser");
        this.$router.push({ name: "usuario" });
      } catch(error) {
        this.erros.push(error.response.data.message); // Pegando o erro que já vem predefinido pelo WordPress.
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>