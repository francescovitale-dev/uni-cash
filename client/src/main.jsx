import React from 'react';
import ReactDOM from 'react-dom/client';
// import { GlobalProvider } from './context/globalContext'; // Assicurati che il percorso sia corretto
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
