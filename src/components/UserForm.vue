<template>
    <form>
        <label for="name">Nome</label>
        <input id="name" name="name" type="text" v-model="name">
        
        <label for="email">E-mail</label>
        <input id="email" name="email" type="text" v-model="email">
        
        <label for="password">Senha</label>
        <input id="password" name="password" type="password" v-model="password">
        
        <label for="cep">CEP</label>
        <input id="cep" name="cep" type="text" v-model="cep">
                
        <label for="street">Rua</label>
        <input id="street" name="street" type="text" v-model="street">
        
        <label for="number">Número</label>
        <input id="number" name="number" type="text" v-model="number">
        
        <label for="neighborhood">Bairro</label>
        <input id="neighborhood" name="neighborhood" type="text" v-model="neighborhood">

        <label for="city">Cidade</label>
        <input id="city" name="city" type="text" v-model="city">
        
        <label for="state">Estado</label>
        <input id="state" name="state" type="text" v-model="state">
      
        <!-- Usando slot porque esse componente vai ser reaproveitado -->
        <div class="button">
            <slot></slot>
        </div>
    </form>
</template>

<script>
import { mapFields } from '@/helpers';

export default {
    name: "LoginCreate",
    computed: {
        ...mapFields({
            fields: [
                "name",
                "email",
                "password",
                "street",
                "cep",
                "number",
                "neighborhood",
                "city",
                "state"
            ],
            base: "user",
            mutation: "UPDATE_USER"
        })
    }
}
</script>

<style scoped>

form {
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
}

.button {
    grid-column: 2;
}
</style>