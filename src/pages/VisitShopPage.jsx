import React from 'react';
import PageHeader from '../components/PageHeader';
import ShowroomContact from '../components/ShowroomContact';
import { MapPin, Truck, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function VisitShopPage() {
  return (
    <div className="visit-shop-page-view">
      <PageHeader
        kicker="Circle Showroom & Nationwide Hub"
        icon={MapPin}
        title="Visit Our Shop or Order for Nationwide Delivery"
        description="Experience the devices in person at our Circle showroom in Accra — or have your phone securely delivered to your region anywhere in Ghana."
      />

      {/* Main Showroom & Map Component */}
      <ShowroomContact hideHeader={true} />

      {/* What to Expect When You Visit Our Shop */}
      <section className="in-shop-perks-section">
        <div className="container">
          <div className="section-head text-center">
            <div className="section-kicker">
              <Sparkles size={15} className="inline-icon" /> In-Store Experience
            </div>
            <h2 className="section-title">Why Walk Into Our Circle Showroom?</h2>
            <p className="section-subtitle">
              Located at KFC Circle, directly opposite the Vodafone Office.
            </p>
          </div>

          <div className="shop-perks-grid">
            <div className="shop-perk-card">
              <div className="perk-icon-wrap">
                <CheckCircle2 size={24} className="text-cyan" />
              </div>
              <h4>Hands-On Device Testing</h4>
              <p>Test the cameras, check True Tone, verify original battery health percentage, and inspect device cosmetics before signing.</p>
            </div>

            <div className="shop-perk-card">
              <div className="perk-icon-wrap">
                <ShieldCheck size={24} className="text-green" />
              </div>
              <h4>15-Minute Instant Verification</h4>
              <p>Bring your Ghana Card and deposit (MoMo or Cash). Our reps generate your official hire-purchase agreement in 15 minutes.</p>
            </div>

            <div className="shop-perk-card">
              <div className="perk-icon-wrap">
                <Truck size={24} className="text-gold" />
              </div>
              <h4>Free Setup & Accessories</h4>
              <p>Our technicians help transfer all your WhatsApp data and photos from your old phone, and install a free 9D screen guard.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
