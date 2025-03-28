<template>
  <section>
    <UserForm>
      <button class="btn" @click.prevent="updateUser">Atualizar Usuário</button>
    </UserForm>
    <ErrorNotification :erros="erros"/>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { api } from "@/services/services";

export default {
  name: "UserEditView",
  components: {
    UserForm,
  },
  data(){
    return {
      erros: []
    }
  },
  methods: {
    updateUser() {
      this.erros = [];
      api
        .put('/usuario', this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUser");
          this.$router.push({ name: "usuario" });
        })
        .catch((error) => {
          this.erros.push(error.response.data.message); // Pegando o erro que já vem predefinido pelo WordPress.
        });
    },
  },
  created(){
    document.title = "Usuário | Editar";
  }
};
</script>

<style></style>
