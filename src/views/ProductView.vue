<template>
    <section v-if="produto" class="product">
        <ul class="photos" v-if="produto.fotos">
            <li v-for="(foto, index) in produto.fotos" :key="index">
                <img :src="foto.src" alt="foto.titulo">
            </li>
        </ul>
        <p>Produto {{ id }}</p>
    </section>
</template>

<script>
import { api } from '@/services/services';

export default {
    name: "ProductView",
    props: ["id"],
    data(){
        return {
            produto: null,
        }
    },
    methods: {
        getProduct() {
            api.get(`/produto/${this.id}`).then(r => {
                this.produto = r.data;
            })
        }
    }, 
    created(){
        this.getProduct();
    }
}
</script>

<style>

</style>