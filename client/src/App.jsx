import React, { useState, useMemo } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
// import Orb from './components/Orb/Orb';
// import Navigation from './components/Navigation/Navigation';
// import Dashboard from './components/Dashboard/Dashboard';
// import Income from './components/Income/Income';
// import Expenses from './components//Expenses/Expenses';
// import { useGlobalContext } from './context/globalContext';
import Header from './Header'
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
