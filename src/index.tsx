import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './stylesheets/App.scss';

const rootElement = document.getElementById('yield');

if (!rootElement) {
  throw new Error('Elemento root não encontrado.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
