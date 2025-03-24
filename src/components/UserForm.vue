<!-- O UserForm é um componente que contém um formulário, onde ele
pode ser adaptado tanto para criação ou edição, deixando o slot como
alternativa para alteração estilizada. -->

<template>
    <form>
        <label for="name">Nome</label>
        <input id="name" name="name" type="text" v-model="nome">
        
        <label for="email">E-mail</label>
        <input id="email" name="email" type="text" v-model="email">
        
        <label for="password">Senha</label>
        <input id="password" name="password" type="password" v-model="senha">
        
        <label for="cep">CEP</label>
        <input id="cep" name="cep" type="text" v-model="cep" @keyup="fillCep">
                
        <label for="street">Rua</label>
        <input id="street" name="street" type="text" v-model="rua">
        
        <label for="number">Número</label>
        <input id="number" name="number" type="text" v-model="numero">
        
        <label for="neighborhood">Bairro</label>
        <input id="neighborhood" name="neighborhood" type="text" v-model="bairro">

        <label for="city">Cidade</label>
        <input id="city" name="city" type="text" v-model="cidade">
        
        <label for="state">Estado</label>
        <input id="state" name="state" type="text" v-model="estado">
      
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
                "nome",
                "email",
                "senha",
                "rua",
                "cep",
                "numero",
                "bairro",
                "cidade",
                "estado"
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
                    this.rua = r.data.logradouro;
                    this.bairro = r.data.bairro;
                    this.cidade = r.data.localidade;
                    this.estado = r.data.estado;
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