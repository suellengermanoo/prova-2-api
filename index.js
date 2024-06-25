const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// banco de dados em memória
var clientes = [];

app.get('/listar', (request, response) => {
  response.json(clientes);
});

app.post("/cadastrar", (request, response) => {
    let cliente = request.body;
    console.log(cliente);
    clientes.push(cliente); // adiciona o cliente no BD
    response.json({ success: true });
});

app.delete("/excluir/:cpf", (request, response) => {
  let cpf = request.params.cpf;
  for (let i = 0; i < clientes.length; i++) {
    let cliente = clientes[i];
    if (cliente.cpf == cpf) {
        // remove o elemento encontrado na posição "i"
        clientes.splice(i, 1);
    }
  }
  response.json({ success: true });
});

app.put("/alterar", (request, response) => {
  let cliente = request.body;
  // procura o cliente que tem o CPF enviado
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cpf == cliente.cpf) {
      // substitui os dados do cliente pelos dados enviados pelo front
      clientes[i] = cliente;
    }
  }
  response.json({ success: true });
});

// Rota para busca de clientes pelo Tamanho do sapato
app.get('/buscar', (request, response) => {
    const termo = request.query.termo.toLowerCase(); // Obtém o termo de busca
    const clientesFiltrados = clientes.filter(cliente => cliente["Tamanho do sapato"].toLowerCase().includes(termo)); // Filtra os clientes pelo Tamanho do sapato
    response.json(clientesFiltrados);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
