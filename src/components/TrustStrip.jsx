import React from 'react';
import { CreditCard, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

export default function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-grid">
          <div className="trust-box">
            <div className="trust-icon-wrap">
              <CreditCard size={24} className="icon-cyan" />
            </div>
            <div className="trust-text">
              <h4>Ghana Card Verification</h4>
              <p>Just bring your original Ghana Card. No payslips, no bank loan, no guarantor.</p>
            </div>
          </div>

          <div className="trust-box">
            <div className="trust-icon-wrap">
              <CheckCircle size={24} className="icon-green" />
            </div>
            <div className="trust-text">
              <h4>100% Original Apple</h4>
              <p>Clean IMEI, factory unlocked for all Ghanaian networks, and original Apple batteries.</p>
            </div>
          </div>

          <div className="trust-box">
            <div className="trust-icon-wrap">
              <ShieldCheck size={24} className="icon-gold" />
            </div>
            <div className="trust-text">
              <h4>6-Month Real Warranty</h4>
              <p>If something develops a factory defect, walk into our Circle shop and we handle it.</p>
            </div>
          </div>

          <div className="trust-box">
            <div className="trust-icon-wrap">
              <Zap size={24} className="icon-purple" />
            </div>
            <div className="trust-text">
              <h4>Pay Off Early for Free</h4>
              <p>Have extra cash next month? Pay off your balance early anytime with zero penalties.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
