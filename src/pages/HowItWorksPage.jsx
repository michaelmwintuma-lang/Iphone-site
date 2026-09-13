import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import HowItWorks from '../components/HowItWorks';
import { HelpCircle, Truck, ShieldCheck, ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="how-it-works-page">
      <PageHeader
        kicker="Hire Purchase & Installment Guide"
        icon={HelpCircle}
        title="How It Works: Buy Now, Pay Later Scheme"
        description="Pick your dream iPhone, submit your Ghana Card, make your down payment, and spread the balance over Daily, Weekly, or Monthly Mobile Money or Bank Transfer payments."
      />

      {/* Main How It Works Component */}
      <HowItWorks hideHeader={true} />

      {/* Dedicated Nationwide Delivery Detailed Breakdown */}
      <section className="delivery-guide-section">
        <div className="container">
          <div className="section-head text-center">
            <div className="section-kicker">
              <Truck size={15} className="inline-icon" /> Regional Logistics
            </div>
            <h2 className="section-title">How Nationwide Delivery Works in Ghana</h2>
            <p className="section-subtitle">
              Don't stay in Accra? No problem. We deliver safely to all 16 administrative regions of Ghana.
            </p>
          </div>

          <div className="delivery-steps-grid">
            <div className="delivery-step-card">
              <div className="step-number-badge">1</div>
              <h4>Select Phone & Send Details</h4>
              <p>
                Choose your iPhone and send a photo of your valid Ghana Card plus your active Mobile Money or phone number via WhatsApp.
              </p>
            </div>

            <div className="delivery-step-card">
              <div className="step-number-badge">2</div>
              <h4>Pay Down Payment (MoMo / Bank Transfer)</h4>
              <p>
                Make your 40% or 60% down payment directly to our official business accounts (MTN MoMo, Telecel Cash, AT Money, or Bank Transfer). You receive an instant digital hire-purchase receipt.
              </p>
            </div>

            <div className="delivery-step-card">
              <div className="step-number-badge">3</div>
              <h4>Same-Day Dispatch with Tracking</h4>
              <p>
                For Accra/Tema: Same-day dispatched via dispatch rider directly to your doorstep.
                For regions (Kumasi, Takoradi, Tamale, Sunyani, etc.): Dispatched via VIP Parcel, STC Courier, or FedEx with phone tracking code and driver details.
              </p>
            </div>

            <div className="delivery-step-card">
              <div className="step-number-badge">4</div>
              <h4>Inspect & Start Daily/Weekly MoMo</h4>
              <p>
                Receive and inspect your phone. Complete your scheduled Daily, Weekly, or Monthly payments with zero early-settlement penalty.
              </p>
            </div>
          </div>

          <div className="delivery-banner-cta">
            <div className="banner-text">
              <h3>Ready to calculate your exact installments?</h3>
              <p>Find out what your Daily, Weekly, or Monthly payment will be before placing an order.</p>
            </div>
            <div className="banner-btns">
              <Link to="/calculator" className="btn btn-primary">
                <Calculator size={16} />
                <span>Open Price Calculator</span>
              </Link>
              <Link to="/all-iphones" className="btn btn-secondary">
                <span>View All iPhones</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
