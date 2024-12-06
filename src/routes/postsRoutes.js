import express from "express";
import { listarPosts } from "../controlers/postsControler.js";

const routes = (app) => {
    // Habilitamos o middleware express.json() para que o Express possa interpretar dados no formato JSON enviados nas requisições.
    app.use(express.json());

    // Define uma rota GET para a URL "/posts". 
    // Quando um cliente fizer uma requisição GET para esta rota, esta função será executada.
    app.get("/posts", listarPosts);
}

export default routes;