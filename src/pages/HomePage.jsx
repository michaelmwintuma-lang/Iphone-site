import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import WhyUs from '../components/WhyUs';
import Reviews from '../components/Reviews';
import { IPHONES } from '../data/phones';
import ProductCard from '../components/ProductCard';
import AffordabilityFinder from '../components/AffordabilityFinder';
import Reveal from '../components/Reveal';
import {
  Sparkles, ArrowRight, ShieldCheck, Calculator,
  Smartphone, CreditCard, Truck
} from 'lucide-react';

export default function HomePage() {
  // Select 6 top popular models across budgets for featured showcase
  const featuredPhones = [
    IPHONES.find(p => p.id === 'iphone-15-128gb'),
    IPHONES.find(p => p.id === 'iphone-13-128gb'),
    IPHONES.find(p => p.id === 'iphone-16-pro-128gb'),
    IPHONES.find(p => p.id === 'iphone-14-pro-128gb'),
    IPHONES.find(p => p.id === 'iphone-11-128gb'),
    IPHONES.find(p => p.id === 'iphone-17-pro-max-256gb-sim')
  ].filter(Boolean);

  return (
    <div className="home-page-view">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 2b. Start from the customer's pocket, not the price tag */}
      <AffordabilityFinder compact />

      {/* 3. Featured iPhones Section */}
      <section className="featured-iphones-section">
        <div className="container">
          <div className="section-head-between">
            <div>
              <div className="section-kicker">
                <Sparkles size={15} className="inline-icon" /> Popular in Ghana Right Now
              </div>
              <h2 className="section-title">Trending iPhones (UK Used &amp; Brand New)</h2>
              <p className="section-subtitle">
                Tested with pristine 85%+ battery health and backed by a 6-month shop warranty. Delivered nationwide.
              </p>
            </div>
            <Link to="/all-iphones" className="btn btn-secondary view-all-btn">
              <span>View All {IPHONES.length} iPhones</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="products-grid">
            {featuredPhones.map((phone, i) => (
              <Reveal key={phone.id} delay={i * 70}>
                <ProductCard phone={phone} />
              </Reveal>
            ))}
          </div>

          <div className="text-center catalog-bottom-cta">
            <Link to="/all-iphones" className="btn btn-primary btn-large">
              <span>Explore Complete Catalog (iPhone 11 to 17 Pro Max)</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Compact 3-Step How It Works */}
      <section className="home-steps-section">
        <div className="container">
          <Reveal>
            <div className="home-steps-header">
              <div className="section-kicker">
                <ShieldCheck size={15} className="inline-icon" /> Only Ghana Card + Down Payment
              </div>
              <h2 className="home-steps-title">No Guarantor. No Payslip. Take Your Phone Today.</h2>
              <p className="home-steps-subtitle">
                Traditional loan apps demand payslips, employer letters, and multiple guarantors.
                At Paindem Smart Cells, you only need your valid Ghana Card and your deposit.
              </p>
            </div>

            <div className="home-steps-row">
              <div className="home-step-item">
                <div className="home-step-icon home-step-icon--cyan">
                  <Smartphone size={22} />
                </div>
                <div className="home-step-content">
                  <div className="home-step-num">Step 01</div>
                  <h4>Pick your iPhone</h4>
                  <p>Browse 38+ models. Most are Clean UK Used (Grade A+) with 85%+ battery.</p>
                </div>
              </div>

              <div className="home-step-connector" aria-hidden="true" />

              <div className="home-step-item">
                <div className="home-step-icon home-step-icon--gold">
                  <CreditCard size={22} />
                </div>
                <div className="home-step-content">
                  <div className="home-step-num">Step 02</div>
                  <h4>Ghana Card + 40% deposit</h4>
                  <p>Show your Ghana Card, pay your deposit. Approved in 15 minutes flat.</p>
                </div>
              </div>

              <div className="home-step-connector" aria-hidden="true" />

              <div className="home-step-item">
                <div className="home-step-icon home-step-icon--green">
                  <Truck size={22} />
                </div>
                <div className="home-step-content">
                  <div className="home-step-num">Step 03</div>
                  <h4>Walk out with your phone</h4>
                  <p>Pick up at Circle or get it delivered to your region. Pay the balance by MoMo.</p>
                </div>
              </div>
            </div>

            <div className="home-steps-actions">
              <Link to="/how-it-works" className="btn btn-primary">
                <span>See Full How It Works</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/calculator" className="btn btn-secondary">
                <Calculator size={16} />
                <span>Calculate Daily/Weekly MoMo</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Bento Grid — Why Choose Paindem */}
      <WhyUs />

      {/* 6. Authentic Reviews */}
      <Reviews />
    </div>
  );
}
