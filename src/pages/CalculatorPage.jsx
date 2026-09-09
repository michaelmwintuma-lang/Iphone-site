import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SimpleCalculator from '../components/SimpleCalculator';
import AffordabilityFinder from '../components/AffordabilityFinder';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CalculatorPage() {
  return (
    <div className="calculator-page">
      <PageHeader
        kicker="Transparent Pricing Tool"
        icon={Calculator}
        title="iPhone Installment Price Calculator"
        description="Select any iPhone (iPhone 11 through 17 Pro Max) to see your exact down payment and choose your preferred MoMo frequency: Daily, Weekly, or Monthly."
      />

      {/* Reverse calculator: start from what the customer can pay */}
      <AffordabilityFinder />

      {/* Main Interactive Calculator */}
      <SimpleCalculator hideHeader={true} />

      {/* Calculator Perks Strip */}
      <section className="calculator-perks-section">
        <div className="container">
          <div className="calc-perks-grid">
            <div className="calc-perk-card">
              <div className="calc-perk-icon">
                <CheckCircle2 size={24} className="text-green" />
              </div>
              <div>
                <h4>Zero Hidden Charges</h4>
                <p>What you see is what you pay. No administrative charges, no file opening fee, and no surprise deductions.</p>
              </div>
            </div>

            <div className="calc-perk-card">
              <div className="calc-perk-icon">
                <CheckCircle2 size={24} className="text-cyan" />
              </div>
              <div>
                <h4>Early Settlement Savings</h4>
                <p>Pay off the balance whenever you receive bonus funds or business profits without any prepayment penalty.</p>
              </div>
            </div>

            <div className="calc-perk-card">
              <div className="calc-perk-icon">
                <ShieldCheck size={24} className="text-gold" />
              </div>
              <div>
                <h4>Hire Purchase Act Protection</h4>
                <p>Governed strictly under the Hire Purchase Act, 1974 (NRCD 292) for complete consumer safety in Ghana.</p>
              </div>
            </div>
          </div>

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/all-iphones" className="btn btn-secondary">
              <span>Browse All Available iPhones (UK Used & Brand New)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
