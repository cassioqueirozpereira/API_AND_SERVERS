import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, newPostUpdate, postarNewPost, uploadImagem } from "../controlers/postsControler.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads", storage});

const routes = (app) => {
    // Habilitamos o middleware express.json() para que o Express possa interpretar dados no formato JSON enviados nas requisições.
    app.use(express.json());

    app.use(cors(corsOptions));

    // Define uma rota GET para a URL "/posts". 
    // Quando um cliente fizer uma requisição GET para esta rota, esta função será executada.
    app.get("/posts", listarPosts);

    app.post("/posts", postarNewPost);

    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", newPostUpdate);
}

export default routes;