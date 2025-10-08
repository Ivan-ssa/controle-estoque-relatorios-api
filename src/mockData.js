// src/mockData.js

// --- CLIENTES ---
// Lista ajustada para o novo foco de produtos (restaurantes, eventos, etc.)
export const clientes = [
  { id: 1, nome: 'Alimentos Frescos S.A.', cnpj: '11.111.111/0001-11', email: 'compras@frescos.com' },
  { id: 2, nome: 'Rede de Fast Food Veloz', cnpj: '22.222.222/0001-22', email: 'suprimentos@fastfoodveloz.com' },
  { id: 3, nome: 'Distribuidora Log Express', cnpj: '55.555.555/0001-55', email: 'pedidos@logexpress.com' },
  { id: 4, nome: 'Laticínios Sabor do Campo', cnpj: '66.666.666/0001-66', email: 'contato@sabordocampo.com' },
  { id: 5, nome: 'Limpeza Brilho Total', cnpj: '77.777.777/0001-77', email: 'compras@brilhototal.net' },
  { id: 6, nome: 'Organiza Festas Eventos', cnpj: '12.345.678/0001-90', email: 'contato@organizafestas.com' },
  { id: 7, nome: 'Cafeteria Aroma Ltda', cnpj: '87.654.321/0001-09', email: 'pedidos@aromacafeteria.com' },
  { id: 8, nome: 'Hospital Bem-Estar', cnpj: '15.975.324/0001-12', email: 'suprimentos@hospitalbemestar.com'},
  { id: 9, nome: 'Padaria Pão Quente', cnpj: '24.680.135/0001-21', email: 'compras@paoquentepadaria.com.br'},
  { id: 10, nome: 'Sorveteria Gelado Bom', cnpj: '98.765.432/0001-21', email: 'compras@geladobom.com'}
];

// --- PRODUTOS ---
// Catálogo totalmente focado em sacos, copos e descartáveis.
export const produtos = [
  // Sacos e Sacolas
  { id: 101, nome: 'Saco Plástico para Talher 7x25cm (1000 un)', quantidade: 5000, tipo: 'Sacos e Sacolas', preco: 45.00 },
  { id: 102, nome: 'Sacola Plástica Alça Camiseta 40x50cm (Fardo)', quantidade: 2500, tipo: 'Sacos e Sacolas', preco: 60.00 },
  { id: 103, nome: 'Saco de Lixo Reforçado 100L (Pardo c/ 100)', quantidade: 800, tipo: 'Sacos e Sacolas', preco: 85.00 },
  { id: 104, nome: 'Saco PEBD Transparente 30x40cm (1000 un)', quantidade: 0, tipo: 'Sacos e Sacolas', preco: 75.00 },
  { id: 105, nome: 'Sacola Papel Kraft Média (100 un)', quantidade: 950, tipo: 'Sacos e Sacolas', preco: 120.00 },

  // Copos e Potes
  { id: 201, nome: 'Copo Descartável PP 200ml (Tubo c/ 100)', quantidade: 15000, tipo: 'Copos e Potes', preco: 4.50 },
  { id: 202, nome: 'Copo PS para Café 50ml Branco (Caixa c/ 1000)', quantidade: 8000, tipo: 'Copos e Potes', preco: 35.00 },
  { id: 203, nome: 'Pote para Molho 30ml com Tampa (100 un)', quantidade: 4500, tipo: 'Copos e Potes', preco: 22.00 },
  { id: 204, nome: 'Copo de Açaí/Milkshake 500ml com Tampa Bolha (50 un)', quantidade: 1200, tipo: 'Copos e Potes', preco: 38.00 },

  // Talheres e Utensílios
  { id: 301, nome: 'Garfo Descartável Refeição Branco (Pacote c/ 50)', quantidade: 12000, tipo: 'Talheres e Utensílios', preco: 5.50 },
  { id: 302, nome: 'Faca Descartável Sobremesa Transparente (Pacote c/ 50)', quantidade: 0, tipo: 'Talheres e Utensílios', preco: 4.80 },
  { id: 303, nome: 'Colher de Café Descartável (Pacote c/ 100)', quantidade: 9000, tipo: 'Talheres e Utensílios', preco: 3.20 },
  { id: 304, nome: 'Pazinha para Sorvete Colorida (Pacote c/ 100)', quantidade: 6000, tipo: 'Talheres e Utensílios', preco: 4.00 },

  // Embalagens para Delivery
  { id: 401, nome: 'Embalagem de Isopor para Hambúrguer (Caixa c/ 100)', quantidade: 1500, tipo: 'Embalagens para Delivery', preco: 55.00 },
  { id: 402, nome: 'Caixa de Papelão para Pizza 35cm (Pacote c/ 25)', quantidade: 700, tipo: 'Embalagens para Delivery', preco: 40.00 },
];

// --- PEDIDOS ---
// Volume de pedidos significativamente maior, simulando um histórico de 1 ano.
export const pedidos = [
  // Outubro - Dezembro 2024
  { id: 1001, clienteId: 2, produtoId: 401, quantidade: 30, dataPedido: '2024-10-09' },
  { id: 1002, clienteId: 7, produtoId: 202, quantidade: 10, dataPedido: '2024-10-11' },
  { id: 1003, clienteId: 9, produtoId: 102, quantidade: 5, dataPedido: '2024-10-15' },
  { id: 1004, clienteId: 3, produtoId: 103, quantidade: 20, dataPedido: '2024-10-22' },
  { id: 1005, clienteId: 2, produtoId: 201, quantidade: 100, dataPedido: '2024-11-05' },
  { id: 1006, clienteId: 6, produtoId: 301, quantidade: 50, dataPedido: '2024-11-10' },
  { id: 1007, clienteId: 10, produtoId: 304, quantidade: 40, dataPedido: '2024-11-18' },
  { id: 1008, clienteId: 1, produtoId: 104, quantidade: 15, dataPedido: '2024-11-25' },
  { id: 1009, clienteId: 7, produtoId: 303, quantidade: 30, dataPedido: '2024-12-02' },
  { id: 1010, clienteId: 2, produtoId: 105, quantidade: 10, dataPedido: '2024-12-12' },
  { id: 1011, clienteId: 6, produtoId: 204, quantidade: 20, dataPedido: '2024-12-20' },

  // Janeiro - Março 2025
  { id: 1012, clienteId: 8, produtoId: 101, quantidade: 10, dataPedido: '2025-01-08' },
  { id: 1013, clienteId: 9, produtoId: 102, quantidade: 15, dataPedido: '2025-01-15' },
  { id: 1014, clienteId: 2, produtoId: 201, quantidade: 150, dataPedido: '2025-01-22' },
  { id: 1015, clienteId: 7, produtoId: 202, quantidade: 20, dataPedido: '2025-02-03' },
  { id: 1016, clienteId: 10, produtoId: 204, quantidade: 60, dataPedido: '2025-02-14' },
  { id: 1017, clienteId: 3, produtoId: 402, quantidade: 40, dataPedido: '2025-02-28' },
  { id: 1018, clienteId: 5, produtoId: 103, quantidade: 30, dataPedido: '2025-03-10' },
  { id: 1019, clienteId: 2, produtoId: 401, quantidade: 40, dataPedido: '2025-03-18' },
  { id: 1020, clienteId: 6, produtoId: 301, quantidade: 80, dataPedido: '2025-03-25' },

  // Abril - Junho 2025
  { id: 1021, clienteId: 1, produtoId: 102, quantidade: 25, dataPedido: '2025-04-07' },
  { id: 1022, clienteId: 7, produtoId: 202, quantidade: 15, dataPedido: '2025-04-14' },
  { id: 1023, clienteId: 9, produtoId: 105, quantidade: 10, dataPedido: '2025-04-28' },
  { id: 1024, clienteId: 2, produtoId: 201, quantidade: 200, dataPedido: '2025-05-05' },
  { id: 1025, clienteId: 10, produtoId: 304, quantidade: 100, dataPedido: '2025-05-19' },
  { id: 1026, clienteId: 3, produtoId: 102, quantidade: 50, dataPedido: '2025-05-26' },
  { id: 1027, clienteId: 8, produtoId: 301, quantidade: 60, dataPedido: '2025-06-09' },
  { id: 1028, clienteId: 2, produtoId: 401, quantidade: 50, dataPedido: '2025-06-16' },
  { id: 1029, clienteId: 7, produtoId: 303, quantidade: 40, dataPedido: '2025-06-23' },

  // Julho - Outubro 2025
  { id: 1030, clienteId: 6, produtoId: 204, quantidade: 30, dataPedido: '2025-07-01' },
  { id: 1031, clienteId: 10, produtoId: 304, quantidade: 120, dataPedido: '2025-07-15' },
  { id: 1032, clienteId: 2, produtoId: 201, quantidade: 250, dataPedido: '2025-07-29' },
  { id: 1033, clienteId: 9, produtoId: 102, quantidade: 20, dataPedido: '2025-08-05' },
  { id: 1034, clienteId: 3, produtoId: 402, quantidade: 30, dataPedido: '2025-08-18' },
  { id: 1035, clienteId: 5, produtoId: 103, quantidade: 25, dataPedido: '2025-08-27' },
  { id: 1036, clienteId: 2, produtoId: 401, quantidade: 60, dataPedido: '2025-09-08' },
  { id: 1037, clienteId: 7, produtoId: 202, quantidade: 25, dataPedido: '2025-09-17' },
  { id: 1038, clienteId: 1, produtoId: 101, quantidade: 30, dataPedido: '2025-09-26' },
  { id: 1039, clienteId: 6, produtoId: 301, quantidade: 100, dataPedido: '2025-10-02' },
  { id: 1040, clienteId: 10, produtoId: 204, quantidade: 50, dataPedido: '2025-10-07' },
  // ... e assim por diante, com centenas de outros pedidos para completar o ano.
];


// Função auxiliar que já calcula o status dos produtos.
export const getProdutosComStatus = () => produtos.map(p => ({
  ...p,
  status: p.quantidade > 0 ? 'Em Estoque' : 'Sem Estoque'
}));