<template>
  <section>
    <h2>Endereço de Envio</h2>
    <UserForm>
      <button class="btn" @click.prevent="finalizePurchase">
        Finalizar Compra
      </button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from "./UserForm.vue";
import { api } from "@/services/services";
import { mapState } from "vuex";

export default {
  name: "FinalizePurchase",
  components: {
    UserForm,
  },
  props: ["produto"],
  computed: {
    ...mapState(["usuario"]),

    purchase() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
        },
      };
    },
  },
  methods: {
    createTransaction() {
      return api.post("/transacao", this.purchase).then(() => {
        this.$router.push({ name: "compras" });
      });
    },
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.usuario);
        await this.$store.dispatch("loginUser", this.$store.state.usuario); // Antes de puxar o usuário, ele vai logar.
        await this.$store.dispatch("getUser");
        await this.createTransaction();
        this.$router.push({ name: "usuario" });
      } catch (error) {
        console.log(error);
      }
    },
    finalizePurchase() {
      if (this.$store.state.login) {
        this.createTransaction();
      } else {
        this.createUser();
      }
    },
  },
};
</script>

<style scoped>
h2 {
    margin-top: 40px;
    margin-bottom: 20px;
}

.btn {
    background: #e80;
}
</style>
