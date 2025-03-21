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
