// Importamos o módulo Express, que é a base para criarmos nosso servidor web.
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Iniciamos o aplicativo Express. A constante 'app' representa o nosso servidor.
const app = express();
routes(app)

// Inicia o servidor na porta 3000. 
// Quando o servidor estiver ouvindo, a mensagem "Servidor escutando..." será exibida no console.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

