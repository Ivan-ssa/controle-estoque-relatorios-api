import React from 'react';

function Sidebar({ onMenuClick }) {
  return (
    <div className="sidebar">
      <h2>Relatórios</h2>
      <ul>
        <li onClick={() => onMenuClick('clientes')}>Clientes</li>
        <li onClick={() => onMenuClick('produtos')}>Produtos</li>
        <li onClick={() => onMenuClick('pedidos')}>Pedidos</li>
      </ul>
    </div>
  );
}

export default Sidebar;