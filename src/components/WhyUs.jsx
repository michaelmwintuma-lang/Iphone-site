import React from 'react';
import { ShieldCheck, MapPin, Banknote, Calendar, CheckCircle2, Sparkles, Truck, Fingerprint } from 'lucide-react';

export default function WhyUs() {
  return (
    <section className="bento-section" id="why-us">
      <div className="container">
        {/* Bento Section Header */}
        <div className="bento-header-wrapper">
          <div className="bento-header-left">
            <div className="bento-kicker">
              <Sparkles size={14} />
              <span>Payment Freedom Built for Ghana</span>
            </div>
            <h2 className="bento-main-title">
              Designed for Ghanaian workers,<br />
              creators &amp; business owners.
            </h2>
          </div>
          <p className="bento-header-desc">
            No bank bureaucracy. No awkward calls to your employer. Genuine Apple iPhones backed by
            physical shop warranties, flexible MoMo installments, and nationwide delivery.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="bento-grid">

          {/* Card: 0 Guarantors */}
          <div className="bento-card bento-card--glow-cyan">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number bento-stat--cyan">0</span>
                <span className="bento-stat-label">Guarantors Needed</span>
              </div>
              <div className="bento-card-art bento-art--cyan" aria-hidden="true">
                <Fingerprint size={52} strokeWidth={1.2} />
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Only Ghana Card &amp; down payment.</h3>
              <p className="bento-card-desc">
                No salary slips, no bank statements, no employer approvals. Simple 15-minute
                verification so you walk home with your phone.
              </p>
            </div>
          </div>

          {/* Card: 3 Speeds */}
          <div className="bento-card bento-card--glow-gold">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number bento-stat--gold">3</span>
                <span className="bento-stat-label">Flexible Speeds</span>
              </div>
              <div className="bento-card-art bento-art--gold" aria-hidden="true">
                <Calendar size={52} strokeWidth={1.2} />
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Daily, Weekly, or Monthly (MoMo &amp; Bank).</h3>
              <p className="bento-card-desc">
                Choose the payment cadence that matches how you earn. Automated prompt reminders,
                convenient MTN MoMo, Telecel Cash, and direct Bank Transfer acceptance.
              </p>
            </div>
          </div>

          {/* Card: 16 Regions */}
          <div className="bento-card bento-card--glow-green">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number bento-stat--green">16</span>
                <span className="bento-stat-label">Regions Covered</span>
              </div>
              <div className="bento-card-art bento-art--green" aria-hidden="true">
                <Truck size={52} strokeWidth={1.2} />
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Tracked nationwide VIP delivery.</h3>
              <p className="bento-card-desc">
                Can't make it to our Circle showroom? We package every iPhone with transit security
                and ship with instant waybill tracking directly to your town.
              </p>
            </div>
          </div>

          {/* Wide Card: 28-Point Diagnostic Seal */}
          <div className="bento-card bento-card-wide bento-card--glow-cyan">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number bento-stat--cyan">28-Pt</span>
                <span className="bento-stat-label">Hardware Tested</span>
              </div>
              <div className="bento-card-art bento-art--cyan" aria-hidden="true">
                <ShieldCheck size={52} strokeWidth={1.2} />
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Paindem 28-Point Diagnostic Seal &amp; 6-Month Warranty.</h3>
              <p className="bento-card-desc">
                Every iPhone undergoes our rigorous 28-point hardware lab inspection: TrueTone active,
                Face ID 100% operational, battery health 85%+ guaranteed, zero aftermarket LCDs, clean iCloud,
                and factory unlocked for all Ghana SIMs (MTN, Telecel, AT).
              </p>
            </div>
          </div>

          {/* Wide Card: GH₵ 0 Early Payoff */}
          <div className="bento-card bento-card-wide bento-card--glow-gold">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number bento-stat--gold">GH₵ 0</span>
                <span className="bento-stat-label">Early Payoff Surcharge</span>
              </div>
              <div className="bento-card-art bento-art--gold" aria-hidden="true">
                <Banknote size={52} strokeWidth={1.2} />
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Balanced books. Settle your balance anytime with zero penalty.</h3>
              <p className="bento-card-desc">
                Unlike informal money lenders or predatory microfinance apps that penalize early
                payments, you have 100% freedom to pay off early with zero extra charges. Compliant
                under Ghana's Hire Purchase Act, 1974.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
