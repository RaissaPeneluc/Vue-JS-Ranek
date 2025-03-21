<!-- Esse componente é responsável pelo loading da tela, ele
que realiza a criação e estilização do item loading. -->

<template>
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </template>
  
  <script>
  export default {
    name: "PageLoadingComponent",
  };
  </script>
  
  <style scoped>
  
  /* Estilização dos ... */

  .loading {
    text-align: center;
    margin-top: 80px;
  }

  .loading span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #87f;
    margin: 4px;
    animation: dots .6s cubic-bezier(0.6, 0.1, 1, 0.4) infinite alternate;
  }
  
  /* Delay na animação dos ... */
  .loading span:nth-child(1) {
      animation-delay: 0.1s;
  }
  
  .loading span:nth-child(2) {
      animation-delay: 0.2s;
  }
  
  .loading span:nth-child(3) {
      animation-delay: 0.3s;
  }
  
  .loading span:nth-child(4) {
      animation-delay: 0.4s;
  }
  
  /* Animação dos ... */ 
  @keyframes dots {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 30px, 0); /* Fazendo ele subir e descer. */
    }
  }
  </style>