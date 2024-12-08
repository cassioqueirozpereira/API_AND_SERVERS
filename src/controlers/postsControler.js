import { getTodosPosts, createPost, postUpdate } from "../models/postsModel.js";
import fs from "fs"
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Chama a função getTodosPosts() para obter todos os posts do banco de dados.
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e o array de posts no formato JSON.
    res.status(200).json(posts);
}

export async function postarNewPost(req, res) {
    const newPost = req.body;
    try {
        const postCriado = await createPost(newPost);
        res.status(200).json(postCriado);
    }

    catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try {
        const postCriado = await createPost(newPost);
        const updatedImage = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, updatedImage)        
        res.status(200).json(postCriado);
    }

    catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function newPostUpdate(req, res) {
    const id = req.params.id;
    const urlImage = `https://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const post = {
            imgUrl: urlImage,
            descricao: descricao,
            alt: req.body.alt
        }    
        const postCriado = await postUpdate(id, post);
        res.status(200).json(postCriado);
    }

    catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}