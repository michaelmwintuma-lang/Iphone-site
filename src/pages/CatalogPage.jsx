import React from 'react';
import PageHeader from '../components/PageHeader';
import Catalog from '../components/Catalog';
import { Smartphone, CheckCircle, ShieldCheck, BatteryCharging, Sparkles } from 'lucide-react';

export default function CatalogPage() {
  return (
    <div className="catalog-page-view">
      <PageHeader
        kicker="Full Inventory (38 Models in Stock)"
        icon={Smartphone}
        title="All iPhones: Clean UK Used & Brand New"
        description="Filter by model series, search storage or colors, and order via WhatsApp for same-day shop pickup at Circle or nationwide delivery."
      />

      {/* Main Catalog with 38 real models */}
      <Catalog hideHeader={true} />

      {/* Inventory Quality Guarantee Strip */}
      <section className="inventory-guarantee-section">
        <div className="container">
          <div className="guarantee-box">
            <h3 className="guarantee-title">Our 4-Point Device Quality Guarantee</h3>
            <div className="guarantee-grid">
              <div className="guarantee-card">
                <BatteryCharging size={24} className="text-green" />
                <h4>85%+ Battery Health</h4>
                <p>All UK Used units undergo Apple battery diagnostics. Never sold with degraded or third-party fake cells.</p>
              </div>

              <div className="guarantee-card">
                <CheckCircle size={24} className="text-cyan" />
                <h4>Clean iCloud & Factory Unlocked</h4>
                <p>Every phone is 100% clean, factory unlocked, and ready to accept MTN, Telecel, and AT SIM cards immediately.</p>
              </div>

              <div className="guarantee-card">
                <ShieldCheck size={24} className="text-gold" />
                <h4>6-Month Shop Warranty</h4>
                <p>Full technical and motherboard warranty. In the rare event of an internal defect, we repair or replace it free.</p>
              </div>

              <div className="guarantee-card">
                <Sparkles size={24} className="text-purple" />
                <h4>Brand New Units Sealed</h4>
                <p>Brand new models come in factory original sealed Apple boxes with 1-Year Apple International Warranty.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
