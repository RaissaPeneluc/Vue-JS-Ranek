<template>
  <section>
    <h2>Criar a Sua Conta</h2>
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
    };
  },
  methods: {
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        this.$router.push({ name: "usuario" });
      } catch(error) {
        console.log(error);
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