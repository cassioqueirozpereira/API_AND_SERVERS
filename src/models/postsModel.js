// Importamos a função conectarAoBanco do arquivo dbConfig.js, que será responsável por estabelecer a conexão com o banco de dados.
import conectarAoBanco from "../config/dbConfig.js";

// Esta linha estabelece a conexão com o banco de dados, utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO. 
// O resultado da conexão é armazenado na constante 'conexao'.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona que retorna todos os posts de uma coleção chamada "posts" no banco de dados.
export async function getTodosPosts() {
    // Obtém o banco de dados chamado "Teste" da conexão estabelecida.
    const db = conexao.db("Teste");
    // Obtém a coleção "posts" dentro do banco de dados.
    const collection = db.collection("posts");
    // Retorna um array com todos os documentos da coleção "posts".
    return collection.find().toArray();
}