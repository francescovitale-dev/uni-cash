import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Tracker from "./components/Tracker/Tracker";
import Footer from "./components/Footer/Footer"; 
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

import './index.css'

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    setAuthenticated(!!isAuthenticated);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200 dark:from-gray-900 dark:via-gray-800 dark:to-teal-950">
      <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route 
            path="/" 
            element={authenticated ? <Navigate to="/tracker" /> : <LandingPage />} 
          />
          <Route 
            path="/login" 
            element={authenticated ? <Navigate to="/tracker" /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={authenticated ? <Navigate to="/tracker" /> : <Signup />} 
          />
          <Route 
            path="/tracker" 
            element={authenticated ? <Tracker /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;