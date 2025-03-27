/* Esse serviço tem a função de conter todos os serviços
utilizados pelo axios. */

import axios from "axios";

// Criando uma nova instância de axios.
const axiosInstance = axios.create({ // Retorna a URL base utilizada com a API.
    baseURL: "http://localhost/ranek/wp-json/api"
})

// Interceptador vai ocorrer sempre que o axios tentar fazer algumas dos requests. 
axiosInstance.interceptors.request.use( // São passadas duas funções: Uma com uma configuração que vai acontecer e outra de erro.
    function(config) {
        const token = window.localStorage.token;
        if (token) { // Verificação se há token.
            config.headers.Authorization = token; // Coloca o token no header de autorização.
        } 
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
); 

export const api = {
    get(endpoint) {
        return axiosInstance.get(endpoint); // Se não retornar, não retorna uma promise e não tem como utilizar o then.
    },
    post(endpoint, body) { // body é o corpo do POST, o que está sendo mandado para o servidor.
        return axiosInstance.post(endpoint, body); 
    },
    put(endpoint, body) {
        return axiosInstance.put(endpoint, body);
    },
    delete(endpoint) {
        return axiosInstance.delete(endpoint);
    },
    login(body) {
        return axios.post("http://localhost/ranek/wp-json/jwt-auth/v1/token", body)
    },
    validateToken(){
        return axiosInstance.post("http://localhost/ranek/wp-json/jwt-auth/v1/token/validate")
    }
};

export function getCep(cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}