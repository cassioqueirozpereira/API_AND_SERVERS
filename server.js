import express from "express";

// iniciando o express, agora da para usar tudo do express nessa constante "app". Agora o "app" representa o servidor.
const app = express();

// express.json ativa o json.
app.use(express.json());

// posts está recebendo um array.
const posts = [
    {
        id: 1,
        descricao: "Um gato",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Uma gata",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "um casal de gato",
        imagem: "https://placecats.com/millie/300/150"
    }
];

// listen ativa o servidor. 3000 é uma porta padrão para servidor local. () => abre uma função onde você escreve o que ela vai fazer ali mesmo. Uma função que não vai poder ser utilizada novamente em outro lugar.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// rota por onde o cliente vai chegar para acessar nossos dados do servidor do tipo get. req de requisição e res de resposta. 200 é um código HTTP > código numérico que indica algo, no caso 200 é que está ok
app.get("/posts/:", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
};

// 
app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id)
    res.status(200).json(posts[index]);
});