// src/PaginaRelatorios.jsx

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { clientes, produtos, pedidos } from './mockData';

ChartJS.register( CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement );

const PaginaRelatorios = () => {
  // --- CÁLCULOS DOS DADOS ---
  const faturamentoPorMes = pedidos.reduce((acc, pedido) => {
    const produto = produtos.find(p => p.id === pedido.produtoId);
    if (!produto) return acc;
    const valorPedido = pedido.quantidade * produto.preco;
    const mesAno = pedido.dataPedido.substring(0, 7);
    acc[mesAno] = (acc[mesAno] || 0) + valorPedido;
    return acc;
  }, {});
  const mesesOrdenados = Object.keys(faturamentoPorMes).sort();

  const rankingGeral = (chaveId) => {
    const totais = pedidos.reduce((acc, pedido) => {
      const produto = produtos.find(p => p.id === pedido.produtoId);
      if (!produto) return acc;
      const valor = pedido.quantidade * produto.preco;
      const id = pedido[chaveId];
      acc[id] = (acc[id] || 0) + valor;
      return acc;
    }, {});
    return Object.entries(totais).sort(([, a], [, b]) => b - a).slice(0, 5);
  };
  const top5ClientesData = rankingGeral('clienteId').map(([id, valor]) => ({ nome: clientes.find(c => c.id === parseInt(id))?.nome || 'Desconhecido', valor })).reverse();
  const top5ProdutosData = rankingGeral('produtoId').map(([id, valor]) => ({ nome: produtos.find(p => p.id === parseInt(id))?.nome || 'Desconhecido', valor })).reverse();

  const ESTOQUE_BAIXO_THRESHOLD = 1000;
  const ESTOQUE_SAUDAVEL_THRESHOLD = 8000;
  const produtosEstoqueBaixo = produtos.filter(p => p.quantidade > 0 && p.quantidade < ESTOQUE_BAIXO_THRESHOLD);
  const produtosSemEstoque = produtos.filter(p => p.quantidade === 0);
  const produtosExcesso = produtos.filter(p => p.quantidade >= ESTOQUE_SAUDAVEL_THRESHOLD);

  const valorEstoquePorCategoria = produtos.reduce((acc, produto) => {
    const valorTotalProduto = produto.quantidade * produto.preco;
    acc[produto.tipo] = (acc[produto.tipo] || 0) + valorTotalProduto;
    return acc;
  }, {});

  const statusEstoqueGeral = produtos.reduce((acc, produto) => {
      if (produto.quantidade === 0) { acc['Crítico'] += 1; } 
      else if (produto.quantidade < ESTOQUE_BAIXO_THRESHOLD) { acc['Baixo'] += 1; } 
      else if (produto.quantidade < ESTOQUE_SAUDAVEL_THRESHOLD) { acc['Saudável'] += 1; } 
      else { acc['Excesso'] += 1; }
      return acc;
  }, { 'Crítico': 0, 'Baixo': 0, 'Saudável': 0, 'Excesso': 0 });

  // --- PREPARANDO DADOS PARA OS GRÁFICOS (SEÇÃO COMPLETA E CORRIGIDA) ---
  const dataFaturamentoMensal = {
    labels: mesesOrdenados.map(mes => new Date(mes + '-02').toLocaleString('default', { month: 'short', year: '2-digit' })),
    datasets: [{ label: 'Faturamento Mensal (R$)', data: mesesOrdenados.map(mes => faturamentoPorMes[mes]), fill: true, borderColor: 'rgb(75, 192, 192)', backgroundColor: 'rgba(75, 192, 192, 0.2)', tension: 0.1 }],
  };
  const dataTopClientes = {
    labels: top5ClientesData.map(c => c.nome),
    datasets: [{ label: 'Total Gasto (R$)', data: top5ClientesData.map(c => c.valor), backgroundColor: 'rgba(153, 102, 255, 0.6)' }],
  };
  const dataTopProdutos = {
    labels: top5ProdutosData.map(p => p.nome),
    datasets: [{ label: 'Total Faturado (R$)', data: top5ProdutosData.map(p => p.valor), backgroundColor: 'rgba(255, 159, 64, 0.6)' }],
  };
  const dataValorEstoque = {
    labels: Object.keys(valorEstoquePorCategoria),
    datasets: [{ data: Object.values(valorEstoquePorCategoria), backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] }]
  };
  const dataStatusEstoque = {
    labels: Object.keys(statusEstoqueGeral),
    datasets: [{ label: 'Nº de Produtos por Status', data: Object.values(statusEstoqueGeral), backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)'] }],
  };

  const cardStyle = { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' };
  const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif', height: '100vh' }}>
      <div style={{ width: '220px', borderRight: '1px solid #ddd', background: '#f8f9fa', padding: '20px' }}>
        <h3>Menu</h3>
        <button style={{ width: '100%', padding: '10px', textAlign: 'left', border: '1px solid #ccc', background: '#e9ecef', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Dashboard</button>
      </div>

      <main style={{ flex: 1, padding: '25px', overflowY: 'auto', background: '#f0f2f5' }}>
        <h1 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '25px' }}>Dashboard de Saúde da Empresa</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '25px' }}>

          <div style={{ ...cardStyle, gridColumn: '1 / -1' }}><Line data={dataFaturamentoMensal} options={{ responsive: true, plugins: { title: { display: true, text: 'Evolução do Faturamento Mensal' } } }} /></div>
          <div style={{ ...cardStyle, gridColumn: 'span 6' }}><Bar data={dataTopClientes} options={{ indexAxis: 'y', responsive: true, plugins: { title: { display: true, text: '🏆 Top 5 Clientes por Faturamento' }, legend: { display: false } } }} /></div>
          <div style={{ ...cardStyle, gridColumn: 'span 6' }}><Bar data={dataTopProdutos} options={{ indexAxis: 'y', responsive: true, plugins: { title: { display: true, text: '🔥 Top 5 Produtos por Faturamento' }, legend: { display: false } } }} /></div>
          <div style={{ ...cardStyle, gridColumn: 'span 4' }}>
             <h3>⚠️ Alertas de Estoque</h3>
             <h4>Estoque Baixo (&lt; 1000 un)</h4>
             <ul style={{ paddingLeft: '20px', maxHeight: '120px', overflowY: 'auto' }}>{produtosEstoqueBaixo.length > 0 ? produtosEstoqueBaixo.map(p => <li key={p.id}>{p.nome} ({p.quantidade} un)</li>) : <li>Nenhum.</li>}</ul>
             <h4 style={{ color: '#dc3545' }}>Sem Estoque</h4>
             <ul style={{ paddingLeft: '20px', maxHeight: '120px', overflowY: 'auto', color: '#dc3545' }}>{produtosSemEstoque.length > 0 ? produtosSemEstoque.map(p => <li key={p.id}>{p.nome}</li>) : <li>Nenhum.</li>}</ul>
          </div>
          <div style={{ ...cardStyle, gridColumn: 'span 8' }}>
            <h3>💰 Valor do Estoque por Categoria</h3>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
              <div style={{maxWidth: '250px'}}><Doughnut data={dataValorEstoque} options={{ responsive: true }}/></div>
              <div>
                <h4>Total: <span style={{color: 'green'}}>{formatCurrency(Object.values(valorEstoquePorCategoria).reduce((a, b) => a + b, 0))}</span></h4>
                <ul>{Object.entries(valorEstoquePorCategoria).map(([tipo, valor]) => (<li key={tipo}><strong>{tipo}:</strong> {formatCurrency(valor)}</li>))}</ul>
              </div>
            </div>
          </div>
          
          <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
            <h3>🩺 Análise Detalhada do Estoque</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', alignItems: 'flex-start' }}>
              <div style={{ height: '300px', position: 'relative' }}>
                <Bar data={dataStatusEstoque} options={{ responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Resumo da Saúde do Estoque' } } }} />
              </div>
              <div>
                  <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ color: '#dc3545', borderBottom: '1px solid #eee', paddingBottom: '5px', marginTop: 0 }}>Produtos Críticos (Estoque Zerado)</h4>
                      <ul style={{ paddingLeft: '20px', maxHeight: '100px', overflowY: 'auto', margin: 0 }}>
                          {produtosSemEstoque.length > 0 ? produtosSemEstoque.map(p => <li key={p.id}>{p.nome}</li>) : <li>Nenhum.</li>}
                      </ul>
                  </div>
                  <div>
                      <h4 style={{ color: '#0d6efd', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Produtos com Excesso de Estoque</h4>
                      <ul style={{ paddingLeft: '20px', maxHeight: '100px', overflowY: 'auto', margin: 0 }}>
                           {produtosExcesso.length > 0 ? produtosExcesso.map(p => <li key={p.id}>{p.nome} ({p.quantidade.toLocaleString('pt-BR')} un)</li>) : <li>Nenhum.</li>}
                      </ul>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PaginaRelatorios;