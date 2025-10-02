import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ReportModal from './components/ReportModal';

// --- INÍCIO DA CORREÇÃO PARA O CODESPACES ---
// Detecta se estamos no Codespaces e monta a URL da API dinamicamente.
// Se não estiver no Codespaces, ele usará o padrão 'localhost'.
const isCodespaces = window.location.hostname.includes('github.dev');

const API_URL = isCodespaces
  ? `https://` + window.location.hostname.replace('3000', '3001') + '/api'
  : 'http://localhost:3001/api';

// Linha útil para verificar no console do navegador (F12) qual URL está sendo usada.
console.log("API URL sendo usada:", API_URL);
// --- FIM DA CORREÇÃO ---


// Configuração das colunas e títulos para cada tipo de relatório
const reportConfig = {
  clientes: {
    title: 'Relatório de Clientes',
    endpoint: '/clientes',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'nome', label: 'Nome' },
      { key: 'cnpj', label: 'CNPJ' },
      { key: 'email', label: 'Email' },
    ],
  },
  produtos: {
    title: 'Relatório de Produtos',
    endpoint: '/produtos',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'nome', label: 'Nome' },
      { key: 'quantidade', label: 'Qntd.' },
      { key: 'status', label: 'Status' },
      { key: 'preco', label: 'Preço' },
    ],
  },
  pedidos: {
      title: 'Relatório de Pedidos',
      endpoint: '/pedidos',
      columns: [
          { key: 'id', label: 'ID Pedido' },
          { key: 'nomeCliente', label: 'Cliente' },
          { key: 'nomeProduto', label: 'Produto' },
          { key: 'quantidade', label: 'Quantidade' },
      ]
  }
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [currentReport, setCurrentReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Esta função é chamada quando um item do menu é clicado no Sidebar
  const handleMenuClick = async (reportType) => {
    setIsLoading(true);
    setError(null);
    setReportData(null); // Limpa dados antigos
    setIsModalOpen(true);
    setCurrentReport(reportType);

    try {
      // Faz a requisição para a API usando a URL correta
      const response = await fetch(`${API_URL}${reportConfig[reportType].endpoint}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API. O servidor backend está rodando?');
      }
      const data = await response.json();
      setReportData(data); // Armazena os dados recebidos no estado
    } catch (err) {
      setError(err.message);
      setReportData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setReportData(null);
    setCurrentReport(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <Sidebar onMenuClick={handleMenuClick} />
      <main className="main-content">
        <h1>Sistema de Gerenciamento</h1>
        <p>Clique em uma opção no menu lateral para gerar um relatório.</p>

        {/* O modal só é exibido se isModalOpen for true */}
        {isModalOpen && (
          <ReportModal
            title={reportConfig[currentReport]?.title || 'Carregando...'}
            data={isLoading ? [] : reportData}
            columns={reportConfig[currentReport]?.columns || []}
            onClose={closeModal}
          />
        )}
      </main>
    </div>
  );
}

export default App;