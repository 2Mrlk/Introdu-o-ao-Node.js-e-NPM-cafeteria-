const http = require('http');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

const PORT = 3000;

//simular dados de um banco de dados
const dados = [
  { id: 1, nome: "Espresso", descricao: "Café forte e concentrado", preco: 5.0 },
  { id: 2, nome: "Cappuccino", descricao: "Café com leite vaporizado e espuma", preco: 7.0 },
  { id: 3, nome: "Latte", descricao: "Café com bastante leite vaporizado", preco: 7.5 },
  { id: 4, nome: "Mocha", descricao: "Café com chocolate e leite vaporizado", preco: 8.0 }
];

//criar o servidor
//função call back que recebe a requisição (req) e a resposta (res)
//req (Request): informações sobre pedido do usuário.
//res (Response): objeto para enviar a resposta de volta ao usuário.
const server = http.createServer((req, res) => {
    
    //log para ver qual URL está sendo acessada no terminal
    console.log(`Requisição recebida: ${req.url}`.blue);

    //roteamento simples (caminho da URL)
    if (req.url === '/'){
        //lê o arquivo 'index.html' que está na pasta public
        const filePath = path.join(__dirname, 'public', 'index.html');

        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro no servidor');
            }else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            }
        });
    }
    else if (req.url === '/api/dados') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(dados));
    }
    else {
           const Path404 = path.join(__dirname, 'public', '404.html');
       
            fs.readFile(Path404, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('página não encontrada (404)');
            }else {
              res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('página não encontrada (404)');
            }
        });
    }
});
server.listen(PORT, () => {
    console.log(`Servidor rodando http://localhost:${PORT}`.green.bold);
});