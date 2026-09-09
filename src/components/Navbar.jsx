import React, { useState, useEffect } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Link, NavLink } from 'react-router-dom';
import { STORE_CONFIG } from '../data/config';
import { Calculator, ChevronRight, Clock, HelpCircle, MapPin, Menu, Moon, Phone, RefreshCw, Route, ShieldCheck, Smartphone, Sun, Truck, X } from 'lucide-react';


/** Drawer navigation. Each entry carries an icon and a one-line hint so the menu
 *  reads as a way in, not just a list of words. */
const MOBILE_LINKS = [
  { to: '/how-it-works', label: 'How It Works', hint: 'Ghana Card, deposit, take it home', icon: Route },
  { to: '/calculator', label: 'Price Calculator', hint: 'Work out your daily or weekly MoMo', icon: Calculator },
  { to: '/all-iphones', label: 'All iPhones', hint: 'UK used and brand new, 38 in stock', icon: Smartphone },
  { to: '/trade-in', label: 'Trade-In Your Phone', hint: 'Turn your old phone into deposit', icon: RefreshCw },
  { to: '/faq', label: 'Questions', hint: 'Warranty, delivery, early payoff', icon: HelpCircle },
  { to: '/visit-shop', label: 'Visit The Shop', hint: 'KFC Circle, Accra', icon: MapPin }
];

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generalWhatsAppUrl = STORE_CONFIG.makeWhatsAppLink(
    "Hello Paindem Smart Cells! 👋 I want to buy an iPhone on your Pay Small Small scheme with Ghana Card. Please guide me on pickup or nationwide delivery."
  );

  return (
    <>
      {/* Top micro announcement bar with Nationwide Delivery & Circle address */}
      <div className="top-banner">
        <div className="container top-banner-container">
          <div className="top-banner-left">
            <span className="top-banner-badge">
              <Truck size={12} className="inline-icon" /> Nationwide Delivery
            </span>
            <span className="top-banner-text">
              Delivering to all 16 regions in Ghana • Or pick up at Circle, Accra
            </span>
          </div>
          <div className="top-banner-right">
            <span><Clock size={13} className="inline-icon" /> Mon–Sat: 8:30 AM – 7:00 PM</span>
            <a href="tel:0547537715" className="top-banner-phone">
              <Phone size={13} className="inline-icon" /> 054 753 7715
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <img src="/logo.jpg" alt="Paindem Smart Cells" className="brand-logo-img" />
            <div className="brand-info">
              <div className="brand-title">PAINDEM <span className="brand-accent">SMART CELLS</span></div>
              <div className="brand-slogan">{STORE_CONFIG.slogan}</div>
            </div>
          </Link>

          {/* Everyday Common Menu Words as Router Links */}
          <nav className="desktop-nav">
            <NavLink 
              to="/how-it-works" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              How It Works
            </NavLink>
            <NavLink 
              to="/calculator" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Price Calculator
            </NavLink>
            <NavLink 
              to="/all-iphones" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              All iPhones
            </NavLink>
            <NavLink 
              to="/trade-in" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Trade-In
            </NavLink>
            <NavLink 
              to="/faq" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Questions (FAQ)
            </NavLink>
            <NavLink 
              to="/visit-shop" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Visit Shop
            </NavLink>
          </nav>

          <div className="nav-cta-group">
            {/* Theme Toggle Button (Light/Dark) */}
            <button 
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon size={19} className="theme-icon-moon" />
              ) : (
                <Sun size={19} className="theme-icon-sun" />
              )}
            </button>

            <a 
              href={generalWhatsAppUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-whatsapp-nav"
            >
              <WhatsAppIcon size={18} />
              <span>Chat on WhatsApp</span>
            </a>

            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <img src="/logo.jpg" alt="Paindem" className="brand-logo-img-sm" />
                <div className="mobile-brand-name">
                  <strong>PAINDEM</strong>
                  <span>SMART CELLS</span>
                  <em className="brand-slogan">{STORE_CONFIG.slogan}</em>
                </div>
              </div>
              <div className="mobile-drawer-controls">
                <button 
                  type="button"
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <button className="close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
            </div>
            
            <nav className="mobile-links-list" aria-label="Mobile menu">
              {MOBILE_LINKS.map(({ to, label, hint, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="mobile-nav-icon"><Icon size={18} /></span>
                  <span className="mobile-nav-text">
                    <span className="mobile-nav-label">{label}</span>
                    <span className="mobile-nav-hint">{hint}</span>
                  </span>
                  <ChevronRight size={16} className="mobile-nav-chevron" />
                </NavLink>
              ))}
            </nav>

            <div className="mobile-drawer-footer">
              <a 
                href={generalWhatsAppUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <WhatsAppIcon size={18} />
                <span>Chat on WhatsApp</span>
              </a>
              <div className="mobile-call-row">
                <Phone size={14} /> Call: <a href="tel:0547537715">054 753 7715</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
