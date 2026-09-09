import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Link } from 'react-router-dom';
import { STORE_CONFIG } from '../data/config';
import { ShieldCheck, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand col */}
          <div className="footer-col-brand">
            <Link to="/" className="brand-logo footer-logo">
              <img src="/logo.jpg" alt="Paindem Smart Cells" className="brand-logo-img footer-logo-img" />
              <div className="brand-info">
                <div className="brand-title">PAINDEM <span className="brand-accent">SMART CELLS</span></div>
                <div className="brand-slogan">{STORE_CONFIG.slogan}</div>
              </div>
            </Link>
            <p className="footer-bio">
              Empowering Ghanaians to own original iPhones with dignity. 40% deposit, take home today, and pay the rest small small via Mobile Money.
            </p>
            <div className="footer-social-row">
              <span className="social-pill">Instagram: @paindemsmartcells</span>
              <span className="social-pill">TikTok: @paindemsmartcells</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-nav">
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/calculator">Price Calculator</Link></li>
              <li><Link to="/all-iphones">All iPhones (11 to 17 Pro)</Link></li>
              <li><Link to="/trade-in">Trade-In Estimator</Link></li>
              <li><Link to="/faq">Questions (FAQ)</Link></li>
              <li><Link to="/visit-shop">Visit Shop (Circle Location)</Link></li>
            </ul>
          </div>

          {/* MoMo Payment info */}
          <div className="footer-col">
            <h4>Payment Channels</h4>
            <ul className="footer-nav">
              <li>MTN Mobile Money (*170#)</li>
              <li>Telecel Cash (*110#)</li>
              <li>AT Money (*110#)</li>
              <li>In-Shop Cash / Card at Circle</li>
              <li>Zero Early-Payoff Penalty</li>
            </ul>
          </div>

          {/* Showroom info */}
          <div className="footer-col">
            <h4>Circle Showroom</h4>
            <div className="footer-contact-item">
              <MapPin size={16} className="text-cyan flex-shrink-0" />
              <span>KFC Circle, Accra — Opposite Vodafone Office</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="text-green flex-shrink-0" />
              <a href="tel:0547537715">054 753 7715</a>
            </div>
            <div className="footer-contact-item">
              <WhatsAppIcon size={16} className="text-green flex-shrink-0" />
              <span>WhatsApp Active 24/7</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {new Date().getFullYear()} Paindem Smart Cells. Hire-Purchase agreements compliant under Ghana's Hire Purchase Act, 1974 (NRCD 292).
          </div>
          <div className="footer-bottom-links">
            <Link to="/faq">Hire Purchase Terms</Link>
            <Link to="/faq">Ghana Card Privacy</Link>
            <Link to="/visit-shop">Store Directions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

