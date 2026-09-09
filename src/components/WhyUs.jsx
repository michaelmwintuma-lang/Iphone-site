import React from 'react';
import { ShieldCheck, MapPin, Wrench, Banknote, Calendar, CheckCircle2, Sparkles, Truck } from 'lucide-react';

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
              creators & business owners.
            </h2>
          </div>
          <p className="bento-header-desc">
            No bank bureaucracy. No awkward calls to your employer. Genuine Apple iPhones backed by physical shop warranties, flexible MoMo installments, and nationwide delivery.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="bento-grid">
          {/* Card 2: 1-Col Card (0 Guarantors) */}
          <div className="bento-card">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number">0</span>
                <span className="bento-stat-label">Guarantors Needed</span>
              </div>
              {/* Vector Line Art: Ghana Card ID badge */}
              <div className="bento-card-art" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <rect x="15" y="26" width="70" height="48" rx="8" stroke="currentColor" />
                  <circle cx="35" cy="46" r="9" fill="rgba(245, 166, 35, 0.2)" stroke="var(--accent-gold)" strokeWidth="1.5" />
                  <line x1="52" y1="40" x2="73" y2="40" stroke="currentColor" strokeWidth="1.8" />
                  <line x1="52" y1="48" x2="68" y2="48" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
                  <line x1="52" y1="56" x2="64" y2="56" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
                  <path d="M26 62 C26 56 30 55 35 55 C40 55 44 56 44 62" stroke="var(--accent-gold)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Only Ghana Card & down payment.</h3>
              <p className="bento-card-desc">
                No salary slips, no bank statements, no employer approvals. Simple 15-minute verification so you walk home with your phone.
              </p>
            </div>
          </div>

          {/* Card 3: 1-Col Card (3 Speeds) */}
          <div className="bento-card">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number">3</span>
                <span className="bento-stat-label">Flexible Speeds</span>
              </div>
              {/* Vector Line Art: Dynamic Speed / Cal */}
              <div className="bento-card-art" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <rect x="18" y="24" width="64" height="56" rx="8" stroke="currentColor" />
                  <line x1="18" y1="40" x2="82" y2="40" stroke="currentColor" />
                  <line x1="34" y1="16" x2="34" y2="28" stroke="var(--accent-gold)" strokeWidth="2" />
                  <line x1="66" y1="16" x2="66" y2="28" stroke="var(--accent-gold)" strokeWidth="2" />
                  <circle cx="34" cy="52" r="3" fill="currentColor" strokeWidth="0" />
                  <circle cx="50" cy="52" r="3" fill="currentColor" strokeWidth="0" />
                  <circle cx="66" cy="52" r="3" fill="var(--accent-gold)" strokeWidth="0" />
                  <circle cx="34" cy="66" r="3" fill="currentColor" strokeWidth="0" />
                  <circle cx="50" cy="66" r="3" fill="currentColor" strokeWidth="0" />
                  <circle cx="66" cy="66" r="3" fill="currentColor" strokeWidth="0" />
                </svg>
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Daily, Weekly, or Monthly on MoMo.</h3>
              <p className="bento-card-desc">
                Choose the payment cadence that matches how you earn. Automated prompt reminders, convenient MTN MoMo and Telecel Cash integration.
              </p>
            </div>
          </div>

          {/* Card 4: 1-Col Card (16 Regions) */}
          <div className="bento-card">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number">16</span>
                <span className="bento-stat-label">Regions Covered</span>
              </div>
              {/* Vector Line Art: Network Nodes (Devbox style) */}
              <div className="bento-card-art" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <circle cx="50" cy="50" r="8" fill="rgba(245, 166, 35, 0.25)" stroke="var(--accent-gold)" strokeWidth="2" />
                  <circle cx="22" cy="30" r="5" stroke="currentColor" />
                  <circle cx="78" cy="28" r="5" stroke="currentColor" />
                  <circle cx="82" cy="68" r="5" stroke="currentColor" />
                  <circle cx="25" cy="74" r="5" stroke="currentColor" />
                  <line x1="27" y1="33" x2="43" y2="46" stroke="currentColor" opacity="0.6" />
                  <line x1="73" y1="32" x2="56" y2="46" stroke="currentColor" opacity="0.6" />
                  <line x1="77" y1="65" x2="57" y2="54" stroke="currentColor" opacity="0.6" />
                  <line x1="30" y1="71" x2="44" y2="55" stroke="currentColor" opacity="0.6" />
                </svg>
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Tracked nationwide VIP delivery.</h3>
              <p className="bento-card-desc">
                Can't make it to our Circle showroom? We package every iPhone with transit security and ship with instant waybill tracking directly to your town.
              </p>
            </div>
          </div>

          {/* Card 1: 2-Col Wide Card (100% Genuine) */}
          <div className="bento-card bento-card-wide">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number">100%</span>
                <span className="bento-stat-label">Genuine & Tested</span>
              </div>
              {/* Devbox-style Vector Line Art: Shield & Certified Phone */}
              <div className="bento-card-art" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <rect x="25" y="15" width="50" height="70" rx="10" stroke="currentColor" />
                  <line x1="42" y1="23" x2="58" y2="23" strokeWidth="1.2" />
                  <circle cx="50" cy="74" r="3.5" fill="currentColor" strokeWidth="0" />
                  {/* Floating Shield */}
                  <path d="M50 35 L68 42 V58 C68 68 50 78 50 78 C50 78 32 68 32 58 V42 Z" fill="rgba(245, 166, 35, 0.15)" stroke="var(--accent-gold)" strokeWidth="1.8" />
                  <path d="M43 54 L48 59 L58 49" stroke="var(--accent-gold)" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Every iPhone backed by a signed 6-month shop warranty.</h3>
              <p className="bento-card-desc">
                Clean UK Used (Grade A+) and brand-new sealed units. Fully factory unlocked for MTN, Telecel, and AT with battery health 85%+ guaranteed and on-site testing at our KFC Circle shop.
              </p>
            </div>
          </div>

          {/* Card 5: 2-Col Wide Card (Balanced Books / Zero Penalty) */}
          <div className="bento-card bento-card-wide">
            <div className="bento-card-top">
              <div className="bento-stat-box">
                <span className="bento-stat-number">GH₵ 0</span>
                <span className="bento-stat-label">Early Payoff Surcharge</span>
              </div>
              {/* Devbox-style Vector Line Art: Balanced Scales */}
              <div className="bento-card-art" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" strokeWidth="2" />
                  <line x1="36" y1="82" x2="64" y2="82" stroke="currentColor" strokeWidth="2" />
                  <line x1="20" y1="30" x2="80" y2="30" stroke="var(--accent-gold)" strokeWidth="2" />
                  <circle cx="50" cy="30" r="3.5" fill="currentColor" strokeWidth="0" />
                  {/* Left Pan */}
                  <line x1="20" y1="30" x2="12" y2="52" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="20" y1="30" x2="28" y2="52" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M10 52 C10 60 30 60 30 52 Z" fill="rgba(245, 166, 35, 0.2)" stroke="var(--accent-gold)" strokeWidth="1.4" />
                  {/* Right Pan */}
                  <line x1="80" y1="30" x2="72" y2="52" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="80" y1="30" x2="88" y2="52" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M70 52 C70 60 90 60 90 52 Z" fill="rgba(245, 166, 35, 0.2)" stroke="var(--accent-gold)" strokeWidth="1.4" />
                </svg>
              </div>
            </div>
            <div className="bento-card-body">
              <h3 className="bento-card-title">Balanced books. Settle your balance anytime with zero penalty.</h3>
              <p className="bento-card-desc">
                Unlike informal money lenders or predatory microfinance apps that penalize early payments, you have 100% freedom to pay off early with zero extra charges. Compliant under Ghana's Hire Purchase Act, 1974.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
