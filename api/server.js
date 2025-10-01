const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // Porta que a API vai rodar

// Habilita o CORS para que seu app React (que roda em outra porta) possa fazer requisições
app.use(cors());
app.use(express.json()); // Permite que o express entenda JSON

// --- Nosso "Banco de Dados" Falso ---
const db = {
  clientes: [
    { id: 1, nome: 'Empresa A', cnpj: '11.111.111/0001-11', email: 'contato@empresa-a.com' },
    { id: 2, nome: 'Mercado B', cnpj: '22.222.222/0001-22', email: 'compras@mercado-b.com' },
    { id: 3, nome: 'Loja C', cnpj: '33.333.333/0001-33', email: 'financeiro@loja-c.com' },
  ],
  produtos: [
    { id: 101, nome: 'Parafuso Sextavado', quantidade: 1500, tipo: 'Fixação', status: 'Em Estoque', preco: 0.50 },
    { id: 102, nome: 'Arruela Lisa', quantidade: 3000, tipo: 'Fixação', status: 'Em Estoque', preco: 0.10 },
    { id: 103, nome: 'Chave de Fenda', quantidade: 0, tipo: 'Ferramenta', status: 'Sem Estoque', preco: 15.00 },
    { id: 104, nome: 'Martelo', quantidade: 50, tipo: 'Ferramenta', status: 'Em Estoque', preco: 25.00 },
  ],
  pedidos: [
      { id: 1001, clienteId: 1, produtoId: 101, quantidade: 500, nomeCliente: 'Empresa A', nomeProduto: 'Parafuso Sextavado' },
      { id: 1002, clienteId: 2, produtoId: 103, quantidade: 10, nomeCliente: 'Mercado B', nomeProduto: 'Chave de Fenda' },
      { id: 1003, clienteId: 1, produtoId: 104, quantidade: 5, nomeCliente: 'Empresa A', nomeProduto: 'Martelo' },
  ]
};

// --- Nossas Rotas (Endpoints) da API ---
app.get('/api/clientes', (req, res) => {
  console.log('Recebida requisição para /api/clientes');
  res.json(db.clientes);
});

app.get('/api/produtos', (req, res) => {
  console.log('Recebida requisição para /api/produtos');
  res.json(db.produtos);
});

app.get('/api/pedidos', (req, res) => {
    console.log('Recebida requisição para /api/pedidos');
    res.json(db.pedidos);
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor da API rodando em http://localhost:${PORT}`);
});