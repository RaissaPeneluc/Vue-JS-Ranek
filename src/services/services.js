/* Esse serviço tem a função de conter todos os serviços
utilizados pelo axios. */

import axios from "axios";

// Criando uma nova instância de axios.
const axiosInstance = axios.create({ // Retorna a URL base utilizada com a API.
    baseURL: "http://localhost:3000"
})


export const api = {
    get(endpoint) {
        return axiosInstance.get(endpoint); // Se não retornar, não retorna uma promise e não tem como utilizar o then.
    },
    post(endpoint, body) { // body é o corpo do POST, o que está sendo mandado para o servidor.
        return axiosInstance.post(endpoint, body); 
    }
};