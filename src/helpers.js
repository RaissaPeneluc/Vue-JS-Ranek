/* Contém funções JS gerais que podem ser reutilizadas
no site devido à demanda. */

export function serialize(obj) {
  // Criando URL para pegar a rota com base no digitado na pesquisa.
  let queryString = "";
  for (let key in obj) {
    // Serializando a informação
    queryString += `&${key}=${obj[key]}`; // Exemplo de resultado: &q=Notebook&teste=oi
  }
  return queryString;
}

// Função para realizar os getters e setters automaticamente de diversos campos.
export function mapFields(options) {
  const object = {};
  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        return this.$store.state[options.base][field];
      },
      set(value) {
        this.$store.commit(options.mutation, { [field]: value });
      },
    };
  }
  return object;
}

// A função mapFields substitui a duplicação para cada campo:
// name: {
//     get(){
//         return this.$store.state.user.name;
//     },
//     set(value) {
//         this.$store.commit("UPDATE_USER", {name: value})
//     }
// }
