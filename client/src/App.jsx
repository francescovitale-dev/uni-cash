import React, { useState, useMemo } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from './components/Header'
import HomePage from './HomePage'
import './App.css';

const App = () => {

  return (
    <div className="App">
      <Header className="mb-3" />
      <HomePage className="mt-3" />
    </div>
  );
}

export default App;
