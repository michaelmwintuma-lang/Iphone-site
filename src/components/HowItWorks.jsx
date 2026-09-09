import React from 'react';
import { Smartphone, CreditCard, Truck, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function HowItWorks({ hideHeader = false }) {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        {!hideHeader && (
          <div className="section-head text-center">
            <div className="section-kicker">Simple & Transparent</div>
            <h2 className="section-title">How Pay Small Small Works</h2>
            <p className="section-subtitle">
              What makes us different: <strong>The only thing you need is your Ghana Card and your down payment</strong>. No guarantor, no payslips, no bank vetting.
            </p>
          </div>
        )}

        <div className="steps-row">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-badge">Step 01</div>
            <div className="step-icon-wrap">
              <Smartphone size={28} className="icon-cyan" />
            </div>
            <h3 className="step-title">Pick Your iPhone</h3>
            <p className="step-desc">
              Browse any model from iPhone 11 to 17 Pro Max. Most are <strong>Clean UK Used (Grade A+)</strong> with tested 85%+ original battery, plus Brand New units. Standard deposit is <strong>40%</strong> (60% on new flagships).
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-badge">Step 02</div>
            <div className="step-icon-wrap">
              <CreditCard size={28} className="icon-green" />
            </div>
            <h3 className="step-title">Send Your Ghana Card Details</h3>
            <p className="step-desc">
              No need to look for a guarantor or print company payslips. Send a clear photo of your <strong>Ghana Card</strong> and your active Mobile Money number via WhatsApp, or bring it to our Circle showroom. Approved in 15 minutes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-badge">Step 03</div>
            <div className="step-icon-wrap">
              <Truck size={28} className="icon-gold" />
            </div>
            <h3 className="step-title">Pay Deposit & Receive Phone</h3>
            <p className="step-desc">
              Pay your down payment via MoMo or cash. <strong>Walk out with your phone at Circle</strong> or <strong>have it dispatched nationwide to your region</strong>. You choose how you want to pay the balance: <strong>Daily, Weekly, or Monthly</strong>!
            </p>
          </div>
        </div>

        {/* What Makes Us Different Highlight Card */}
        <div className="differentiator-strip">
          <div className="diff-header">
            <CheckCircle2 size={20} className="text-green" />
            <h3>Why Paindem Smart Cells Is Different from Other Vendors</h3>
          </div>
          <div className="diff-grid">
            <div className="diff-item">
              <strong>✓ Only Ghana Card & Down Payment</strong>
              <p>We don't demand salary vouchers, bank printouts, or third-party guarantors.</p>
            </div>
            <div className="diff-item">
              <strong>✓ Daily, Weekly, or Monthly Freedom</strong>
              <p>Pick the exact payment schedule that matches when money enters your pocket.</p>
            </div>
            <div className="diff-item">
              <strong>✓ Delivery to All 16 Regions</strong>
              <p>Live in Kumasi, Takoradi, Tamale, or Sunyani? We deliver safely to you.</p>
            </div>
          </div>
        </div>

        {/* Accepted Payment Channels Strip */}
        <div className="momo-strip">
          <div className="momo-strip-label">
            <span>Accepted Payment Channels:</span>
          </div>
          <div className="momo-pill-group">
            <div className="momo-pill mtn">
              <span className="momo-dot"></span>
              <strong>MTN Mobile Money</strong> (*170#)
            </div>
            <div className="momo-pill telecel">
              <span className="momo-dot"></span>
              <strong>Telecel Cash</strong> (*110#)
            </div>
            <div className="momo-pill at">
              <span className="momo-dot"></span>
              <strong>AT Money</strong> (*110#)
            </div>
          </div>
        </div>

        {/* Legal disclosure note */}
        <div className="legal-strip">
          <ShieldAlert size={18} className="legal-icon" />
          <span>
            <strong>Legal Protection:</strong> Installment purchases are legal hire-purchase agreements governed under <strong>Ghana's Hire Purchase Act, 1974 (NRCD 292)</strong>. Ownership transfers to you upon final payment completion.
          </span>
        </div>
      </div>
    </section>
  );
}
