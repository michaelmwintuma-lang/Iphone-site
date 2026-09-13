import React, { useState, useEffect } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { STORE_CONFIG } from '../data/config';
import {
  Calculator,
  ChevronRight,
  Clock,
  HelpCircle,
  MapPin,
  Menu,
  Moon,
  Phone,
  RefreshCw,
  Route,
  ShieldCheck,
  Smartphone,
  Sun,
  Truck,
  X,
  Sparkles,
  Store,
  Layers
} from 'lucide-react';

const MOBILE_LINKS_CORE = [
  {
    to: '/all-iphones',
    label: 'All iPhones in Stock',
    hint: 'Clean UK Used & Brand New Sealed (38 Models)',
    icon: Smartphone,
    tag: '38 Models',
    isPrimary: true
  },
  {
    to: '/how-it-works',
    label: 'How It Works (40% or 60%)',
    hint: 'Ghana Card, deposit, take your phone home today',
    icon: Route,
    tag: 'Math & Steps'
  },
  {
    to: '/calculator',
    label: 'Price Calculator',
    hint: 'Compute Daily, Weekly & Monthly MoMo installments',
    icon: Calculator,
    tag: 'Interactive'
  },
  {
    to: '/trade-in',
    label: 'Trade-In / Phone Swap',
    hint: 'Upgrade your old iPhone toward your down payment',
    icon: RefreshCw,
    tag: 'Instant Swap'
  }
];

const MOBILE_LINKS_INFO = [
  {
    to: '/visit-shop',
    label: 'Circle Showroom & Pickup',
    hint: 'Opposite KFC, Kwame Nkrumah Ave, Circle, Accra',
    icon: MapPin,
    tag: 'Accra Shop'
  },
  {
    to: '/faq',
    label: 'Warranty & Questions',
    hint: '6-Month warranty, delivery coverage, bank transfer',
    icon: HelpCircle,
    tag: 'Support'
  }
];

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Reset navbar to visible and close mobile menu when navigating
  useEffect(() => {
    setIsNavVisible(true);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Listen for global custom event (e.g. from bottom navigation Menu button)
  useEffect(() => {
    const handleToggle = () => setMobileMenuOpen(prev => !prev);
    const handleOpen = () => setMobileMenuOpen(true);
    const handleClose = () => setMobileMenuOpen(false);

    window.addEventListener('toggle-mobile-menu', handleToggle);
    window.addEventListener('open-mobile-menu', handleOpen);
    window.addEventListener('close-mobile-menu', handleClose);

    return () => {
      window.removeEventListener('toggle-mobile-menu', handleToggle);
      window.removeEventListener('open-mobile-menu', handleOpen);
      window.removeEventListener('close-mobile-menu', handleClose);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileMenuOpen]);

  // Smart scroll: hide on scroll down, drop down on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;

          if (currentScrollY <= 45) {
            setIsNavVisible(true);
            setIsScrolled(false);
          } else {
            setIsScrolled(true);

            if (delta > 6) {
              if (!mobileMenuOpen) {
                setIsNavVisible(false);
              }
            } else if (delta < -6) {
              setIsNavVisible(true);
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const generalWhatsAppUrl = STORE_CONFIG.makeWhatsAppLink(
    "Hello Paindem Smart Cells! 👋 I want to buy an iPhone on your Buy Now, Pay Later scheme with Ghana Card. Please guide me on pickup or nationwide delivery."
  );

  return (
    <>
      {/* Smart Fixed Header Wrapper */}
      <div
        className={`header-wrapper ${isScrolled ? 'scrolled' : ''} ${
          !isNavVisible && !mobileMenuOpen ? 'header--hidden' : 'header--visible'
        }`}
      >
        {/* Top micro announcement bar */}
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

        {/* Main Navbar */}
        <header className="navbar">
          <div className="container navbar-container">
            <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo.jpg" alt="Paindem Smart Cells" className="brand-logo-img" />
              <div className="brand-info">
                <div className="brand-title">PAINDEM <span className="brand-accent">SMART CELLS</span></div>
                <div className="brand-slogan">{STORE_CONFIG.slogan}</div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
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
                type="button"
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Header Placeholder to preserve page flow */}
      <div className="header-placeholder" aria-hidden="true" />

      {/* Modern iOS-Style Mobile Bottom Sheet Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-sheet-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-sheet-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            {/* Sheet Handle */}
            <div className="mobile-sheet-handle-bar">
              <span className="mobile-sheet-drag-pill"></span>
            </div>

            {/* Sheet Header */}
            <div className="mobile-sheet-header">
              <div className="mobile-sheet-brand-row">
                <img src="/logo.jpg" alt="Paindem" className="mobile-sheet-logo" />
                <div className="mobile-sheet-title-col">
                  <strong>Paindem Smart Cells</strong>
                  <span className="showroom-live-tag">
                    <span className="live-dot"></span> Circle Showroom Open
                  </span>
                </div>
              </div>

              <div className="mobile-sheet-actions-top">
                <button 
                  type="button"
                  className="mobile-sheet-theme-btn"
                  onClick={toggleTheme}
                  aria-label="Toggle Theme"
                  title="Toggle Light/Dark Theme"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <button
                  type="button"
                  className="mobile-sheet-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Sheet Navigation Groups */}
            <div className="mobile-sheet-scrollable-body">
              {/* Group 1: Core Catalog & BNPL Navigation */}
              <div className="mobile-sheet-group">
                <div className="mobile-group-title">
                  <span>Explore &amp; Installments</span>
                </div>
                <div className="mobile-group-items-box">
                  {MOBILE_LINKS_CORE.map(({ to, label, hint, icon: Icon, tag, isPrimary }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `mobile-sheet-row ${isPrimary ? 'is-featured' : ''} ${isActive ? 'active' : ''}`
                      }
                    >
                      <div className="row-icon-bubble">
                        <Icon size={18} />
                      </div>
                      <div className="row-content">
                        <div className="row-top-line">
                          <strong className="row-title">{label}</strong>
                          {tag && <span className="row-badge-pill">{tag}</span>}
                        </div>
                        <span className="row-hint">{hint}</span>
                      </div>
                      <ChevronRight size={16} className="row-chevron" />
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Group 2: Shop & Guarantees */}
              <div className="mobile-sheet-group">
                <div className="mobile-group-title">
                  <span>Showroom &amp; Trust</span>
                </div>
                <div className="mobile-group-items-box">
                  {MOBILE_LINKS_INFO.map(({ to, label, hint, icon: Icon, tag }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => `mobile-sheet-row ${isActive ? 'active' : ''}`}
                    >
                      <div className="row-icon-bubble">
                        <Icon size={18} />
                      </div>
                      <div className="row-content">
                        <div className="row-top-line">
                          <strong className="row-title">{label}</strong>
                          {tag && <span className="row-badge-pill">{tag}</span>}
                        </div>
                        <span className="row-hint">{hint}</span>
                      </div>
                      <ChevronRight size={16} className="row-chevron" />
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Accepted Payments Strip */}
              <div className="mobile-sheet-payment-chips">
                <span className="pay-chip">MTN MoMo</span>
                <span className="pay-chip">Telecel Cash</span>
                <span className="pay-chip">AT Money</span>
                <span className="pay-chip">Bank Transfer</span>
              </div>
            </div>

            {/* Sheet Footer Sticky Quick Contact Bar */}
            <div className="mobile-sheet-dock-footer">
              <a 
                href={generalWhatsAppUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp sheet-wa-cta"
              >
                <WhatsAppIcon size={19} />
                <span>Chat on WhatsApp (Online Now)</span>
              </a>

              <div className="sheet-call-action-row">
                <a href="tel:0547537715" className="sheet-call-pill">
                  <Phone size={15} />
                  <span>Call Showroom: <strong>054 753 7715</strong></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
