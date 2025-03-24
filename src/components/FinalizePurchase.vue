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
  props: ["product"],
  computed: {
    ...mapState(["user"]),

    purchase() {
      return {
        comprador_id: this.user.email,
        vendedor_id: this.product.usuario_id,
        produto: this.product,
        endereco: {
          cep: this.user.cep,
          rua: this.user.rua,
          numero: this.user.numero,
          bairro: this.user.bairro,
          cidade: this.user.cidade,
          estado: this.user.estado,
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
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
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
