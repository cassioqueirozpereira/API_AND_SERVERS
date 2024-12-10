import 'dotenv/config';
// Importamos a função conectarAoBanco do arquivo dbConfig.js, que será responsável por estabelecer a conexão com o banco de dados.
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Esta linha estabelece a conexão com o banco de dados, utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO. 
// O resultado da conexão é armazenado na constante 'conexao'.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona que retorna todos os posts de uma coleção chamada "posts" no banco de dados.
export async function getTodosPosts() {
    // Obtém o banco de dados chamado "Teste" da conexão estabelecida.
    const db = conexao.db("Server");
    // Obtém a coleção "posts" dentro do banco de dados.
    const collection = db.collection("posts");
    // Retorna um array com todos os documentos da coleção "posts".
    return collection.find().toArray();
}

export async function createPost(newPost) {
    const db = conexao.db("Server");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}

export async function postUpdate(id, newPost) {
    const db = conexao.db("Server");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return collection.updateOne({_id: new ObjectId(objID)}, {$set:newPost});
}