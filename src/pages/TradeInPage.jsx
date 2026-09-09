import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import TradeInEstimator from '../components/TradeInEstimator';
import { RefreshCw, Check, ArrowRight, Shield } from 'lucide-react';

export default function TradeInPage() {
  return (
    <div className="trade-in-page-view">
      <PageHeader
        kicker="Instant Device Valuation"
        icon={RefreshCw}
        title="Trade-In Your Current iPhone"
        description="Swap your current iPhone for an upgrade. We appraise your old device and apply its value directly against the down payment of your new phone."
      />

      {/* Main Trade-In Estimator */}
      <TradeInEstimator hideHeader={true} />

      {/* How to Prepare for Trade-In */}
      <section className="trade-in-prep-section">
        <div className="container">
          <div className="prep-card">
            <h3 className="prep-title">How to Prepare Your Old iPhone for Trade-In</h3>
            <div className="prep-steps-grid">
              <div className="prep-step">
                <span className="step-num">1</span>
                <div>
                  <h4>Backup Your Data</h4>
                  <p>Back up all your WhatsApp chats, photos, and contacts to iCloud or a computer before visiting or sending the phone.</p>
                </div>
              </div>

              <div className="prep-step">
                <span className="step-num">2</span>
                <div>
                  <h4>Sign Out of Apple ID / Find My</h4>
                  <p>Turn off "Find My iPhone" in Settings. Devices locked with an active iCloud cannot be accepted for trade-in.</p>
                </div>
              </div>

              <div className="prep-step">
                <span className="step-num">3</span>
                <div>
                  <h4>Bring Valid Ghana Card</h4>
                  <p>Bring or send your valid Ghana Card for verification and contract signing under the Hire Purchase Act.</p>
                </div>
              </div>
            </div>

            <div className="prep-bottom-action">
              <Link to="/all-iphones" className="btn btn-primary">
                <span>Browse New & UK Used iPhones to Upgrade To</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
