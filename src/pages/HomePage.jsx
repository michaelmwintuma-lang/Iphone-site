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
import { Sparkles, ArrowRight, ShieldCheck, Truck, Calculator, HelpCircle, MapPin } from 'lucide-react';

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
              <h2 className="section-title">Trending iPhones (UK Used & Brand New)</h2>
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

      {/* 4. Quick How-It-Works Teaser */}
      <section className="home-teaser-section">
        <div className="container">
          <Reveal className="home-teaser-card">
            <div className="teaser-content">
              <div className="section-kicker">
                <ShieldCheck size={15} className="inline-icon" /> Only Ghana Card + Down Payment
              </div>
              <h2 className="teaser-title">No Guarantor. No Payslip. Take Your Phone Today.</h2>
              <p className="teaser-desc">
                Traditional loan apps and bank schemes demand payslips, employer letters, and multiple guarantors. At Paindem Smart Cells, you only need your valid Ghana Card and your 40% or 60% down payment.
              </p>
              <div className="teaser-perks">
                <div className="perk-item">
                  <span className="perk-bullet">✓</span>
                  <span>15-minute quick verification</span>
                </div>
                <div className="perk-item">
                  <span className="perk-bullet">✓</span>
                  <span>Daily, Weekly, or Monthly MoMo payments</span>
                </div>
                <div className="perk-item">
                  <span className="perk-bullet">✓</span>
                  <span>Nationwide delivery to all 16 regions</span>
                </div>
              </div>
              <div className="teaser-actions">
                <Link to="/how-it-works" className="btn btn-primary">
                  <span>See How It Works</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/calculator" className="btn btn-secondary">
                  <Calculator size={16} />
                  <span>Calculate Daily/Weekly MoMo</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Bento Grid - Why Choose Paindem (Devbox Pattern) */}
      <WhyUs />

      {/* 6. Authentic Reviews */}
      <Reviews />

      {/* 6. Nationwide Delivery & Showroom Strip */}
      <section className="home-delivery-strip">
        <div className="container">
          <Reveal className="delivery-strip-box">
            <div className="delivery-strip-icon">
              <Truck size={36} className="text-cyan" />
            </div>
            <div className="delivery-strip-info">
              <h3>We Deliver to All 16 Regions of Ghana</h3>
              <p>
                Whether you are in Accra, Kumasi, Takoradi, Tamale, Sunyani, Cape Coast, or Ho, simply submit your Ghana Card details online and receive your phone with secure tracking.
              </p>
            </div>
            <div className="delivery-strip-actions">
              <Link to="/visit-shop" className="btn btn-primary">
                <MapPin size={16} />
                <span>Visit Shop or Order Delivery</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
