import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileBottomNav from './components/MobileBottomNav';
import ScrollToTop from './components/ScrollToTop';
import CompareDrawer, { CompareProvider } from './components/CompareDrawer';
import InstallPrompt from './components/InstallPrompt';

// Multi-Page Views
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import CalculatorPage from './pages/CalculatorPage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import TradeInPage from './pages/TradeInPage';
import FaqPage from './pages/FaqPage';
import VisitShopPage from './pages/VisitShopPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  // Default to light theme with toggle capability
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('paindem_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('paindem_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <ScrollToTop />
      <CompareProvider>
        <div className={`app-layout theme-${theme}`}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main className="main-content-area">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/all-iphones" element={<CatalogPage />} />
              <Route path="/iphone/:slug" element={<ProductPage />} />
              <Route path="/trade-in" element={<TradeInPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/visit-shop" element={<VisitShopPage />} />
              {/* Unknown routes get a real 404 rather than a silent redirect home */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
          <FloatingWhatsApp />
          <MobileBottomNav />
          <CompareDrawer />
          <InstallPrompt />
        </div>
      </CompareProvider>
    </Router>
  );
}

