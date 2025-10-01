import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Importando o CSS global que já criamos
import App from './App'; // Importando nosso componente principal

// Esta linha encontra a <div id="root"> no seu index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Esta linha "renderiza" (desenha) seu componente App dentro daquela div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
