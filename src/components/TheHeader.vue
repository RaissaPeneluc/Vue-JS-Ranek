<!-- Esse componente é responsável pelo header da página. -->

<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/ranek.svg" alt="Ranek" />
      </router-link>
      <router-link v-if="$store.state.login === true" to="/usuario" class="btn">
        {{ name }}
      </router-link>
      <router-link v-else to="/login" class="btn"> Vender / Login </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    name(){
      return this.$store.state.usuario.nome.replace(/ .*/, ""); // Utilizando o reject para puxar somente o primeiro nome, tudo que vier depois do espaço vai virar " ".
    }
  }
};
</script>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:  15px 20px;
    box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo{
    padding: 10px 0;
}

.logo img {
    width: 90px;
}
</style>
