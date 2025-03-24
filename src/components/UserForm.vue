<!-- O UserForm é um componente que contém um formulário, onde ele
pode ser adaptado tanto para criação ou edição, deixando o slot como
alternativa para alteração estilizada. -->

<template>
    <form>
        <label for="name">Nome</label>
        <input id="name" name="name" type="text" v-model="name">
        
        <label for="email">E-mail</label>
        <input id="email" name="email" type="text" v-model="email">
        
        <label for="password">Senha</label>
        <input id="password" name="password" type="password" v-model="password">
        
        <label for="cep">CEP</label>
        <input id="cep" name="cep" type="text" v-model="cep" @keyup="fillCep">
                
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
import { getCep } from '@/services/services';

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
    },
    methods: {
        fillCep(){
            const cep = this.cep.replace(/\D/g, ""); // Limpar o CEP com o regex, para evitar erros de digitação.
            if(cep.length === 8) {
                getCep(cep).then(r => {
                    this.street = r.data.logradouro;
                    this.neighborhood = r.data.bairro;
                    this.city = r.data.localidade;
                    this.state = r.data.estado;
                });
            }
        }
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