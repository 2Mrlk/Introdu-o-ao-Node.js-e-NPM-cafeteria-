

const http = require('http');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
 const dados = [
  { id: 1, nome: "Espresso", descricao: "Café forte e concentrado", preco: 5.0 },
  { id: 2, nome: "Cappuccino", descricao: "Café com leite vaporizado e espuma", preco: 7.0 },
  { id: 3, nome: "Latte", descricao: "Café com bastante leite vaporizado", preco: 7.5 },
  { id: 4, nome: "Mocha", descricao: "Café com chocolate e leite vaporizado", preco: 8.0 }
];

const server = http.createServer((req, res) => {
    console.log(`Requisição recebida: ${req.url}`.green);

    if(req.url === '/api/escalacao') {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        return res.end(JSON.stringify(escalação));
    }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);

    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
           if (err.code === 'ENOENT') {
               const path404 = path.join(__dirname, 'public', '404.html');
               fs.readFile(path404, (err404, content404) => {
                       res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                       res.end(content404 || 'Página não encontrada');
                   });
           } else {
               res.writeHead(500);
               res.end(`Erro do servidor: ${err.code}`);
           }
         } else {
               res.writeHead(200, {'Content-Type': contentType});
               res.end(content, 'utf-8');
           }
        });
       });
    // if (req.url === '/') {
    //     const filePath = path.join(__dirname, 'public', 'index.html');

    //     fs.readFile(filePath, (err, content) => {  
    //         if (err) {
    //             res.writeHead(500);
    //             res.end('Erro do servidor');
    //         }else {
    //             res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //             res.end(content);
    //         }
    //     });
    // }

//     else if (req.url === '/api/dados') {
//         res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
//         res.end(JSON.stringify(dados));
//     }

//         else {
//             const path404 = path.join(__dirname, 'public', '404.html');
            
//             fs.readFile(path404, (err, content) => {  
//             if (err) {
//                 res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
//                 res.end('Página não encontrada (404)');
//             }else {
//                 res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
//                 res.end(content);
//             }
//         });
//     }
// });

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`.green.bold);
});