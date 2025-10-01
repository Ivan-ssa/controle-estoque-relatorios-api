import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ReportModal from './components/ReportModal';

// URL da nossa API que está rodando em localhost:3001
const API_URL = 'http://localhost:3001/api';

// Configuração das colunas para cada tipo de relatório
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

  const handleMenuClick = async (reportType) => {
    setIsLoading(true);
    setError(null);
    setIsModalOpen(true);
    setCurrentReport(reportType);

    try {
      const response = await fetch(`${API_URL}${reportConfig[reportType].endpoint}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err.message);
      setReportData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReportData(null);
    setCurrentReport(null);
  };

  return (
    <div className="app-container">
      <Sidebar onMenuClick={handleMenuClick} />
      <main className="main-content">
        <h1>Sistema de Gerenciamento</h1>
        <p>Clique em uma opção no menu lateral para gerar um relatório.</p>

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