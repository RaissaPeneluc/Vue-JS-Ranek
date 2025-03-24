<!-- A UserView é a interface do perfil do usuário já
logado e autenticado na aplicação. -->

<template>
    <div> 
        <h1> Página do Usuário {{ $store.state.user }}</h1>
    </div>
</template>

<script>
export default {
    name: "UserView",
}
</script>

<style>

</style>