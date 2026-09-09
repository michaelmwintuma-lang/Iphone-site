import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { TRADE_IN_DEVICES, IPHONES, formatGHS } from '../data/phones';
import { STORE_CONFIG } from '../data/config';
import { RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TradeInEstimator({ hideHeader = false }) {
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(4); // iPhone 14 Pro default
  const [storageMultiplier, setStorageMultiplier] = useState(1.0);
  const [conditionVal, setConditionVal] = useState(1.0);
  const [conditionLabel, setConditionLabel] = useState('Flawless (No scratches, 85%+ battery)');
  const [targetPhoneId, setTargetPhoneId] = useState('iphone-16-pro-max');

  const selectedDevice = TRADE_IN_DEVICES[selectedDeviceIndex] || TRADE_IN_DEVICES[0];
  const targetPhone = IPHONES.find(p => p.id === targetPhoneId) || IPHONES[0];

  // Estimated Trade-In Value
  const estimatedCredit = Math.round(selectedDevice.baseVal * storageMultiplier * conditionVal);

  // Standard Target Deposit
  const standardDeposit = Math.round(targetPhone.price * (targetPhone.depositPercent / 100));

  // Net deposit required after credit is subtracted
  const netDepositRequired = Math.max(0, standardDeposit - estimatedCredit);

  // Dynamic WhatsApp trade-in inquiry
  const tradeInMsg = `Hello Paindem Smart Cells! 👋\n\nI would like to trade in my current phone toward an upgrade:\n\n• Current Device: ${selectedDevice.model}\n• Condition: ${conditionLabel}\n• Estimated Credit: ${formatGHS(estimatedCredit)}\n• Desired Upgrade: ${targetPhone.name} (${targetPhone.storage})\n• Standard Deposit: ${formatGHS(standardDeposit)}\n• Net Cash Deposit After Trade-In: ${formatGHS(netDepositRequired)}\n\nPlease advise when I can bring this to your Circle showroom for quick physical appraisal!`;

  const tradeInUrl = STORE_CONFIG.makeWhatsAppLink(tradeInMsg);

  return (
    <section className="trade-in-section" id="trade-in">
      <div className="container">
        {!hideHeader && (
          <div className="section-head text-center">
            <div className="section-kicker">
              <RefreshCw size={14} /> Instant Trade-In Valuation
            </div>
            <h2 className="section-title">Trade In Your Old Phone for Deposit Credit</h2>
            <p className="section-subtitle">
              Got an older iPhone or flagship Samsung? Don't leave it in your drawer. Bring it in, and we apply its full appraisal value directly toward your new phone’s deposit.
            </p>
          </div>
        )}

        <div className="trade-in-wrapper">
          {/* Controls Form */}
          <div className="trade-in-form">
            <div className="form-item">
              <label className="form-label">What phone are you trading in?</label>
              <select 
                className="form-input-select"
                value={selectedDeviceIndex}
                onChange={(e) => setSelectedDeviceIndex(Number(e.target.value))}
              >
                {TRADE_IN_DEVICES.map((item, idx) => (
                  <option key={item.model} value={idx}>
                    {item.model} (Up to {formatGHS(item.baseVal)})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-item">
              <label className="form-label">Storage of your old phone</label>
              <select 
                className="form-input-select"
                value={storageMultiplier}
                onChange={(e) => setStorageMultiplier(Number(e.target.value))}
              >
                <option value={1.0}>64GB / 128GB Standard</option>
                <option value={1.15}>256GB (+15% Valuation)</option>
                <option value={1.3}>512GB / 1TB (+30% Valuation)</option>
              </select>
            </div>

            <div className="form-item">
              <label className="form-label">What is its physical condition?</label>
              <div className="condition-radios-grid">
                <label className={`condition-option ${conditionVal === 1.0 ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="phoneCondition" 
                    value={1.0}
                    checked={conditionVal === 1.0}
                    onChange={() => {
                      setConditionVal(1.0);
                      setConditionLabel('Flawless (No scratches, 85%+ battery)');
                    }}
                  />
                  <div>
                    <strong>Flawless / Like New</strong>
                    <span>No dents, clean screen, 85%+ battery</span>
                  </div>
                </label>

                <label className={`condition-option ${conditionVal === 0.82 ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="phoneCondition" 
                    value={0.82}
                    checked={conditionVal === 0.82}
                    onChange={() => {
                      setConditionVal(0.82);
                      setConditionLabel('Good (Minor daily scratches, functional)');
                    }}
                  />
                  <div>
                    <strong>Good Condition</strong>
                    <span>Normal pocket scuffs, everything works</span>
                  </div>
                </label>

                <label className={`condition-option ${conditionVal === 0.55 ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="phoneCondition" 
                    value={0.55}
                    checked={conditionVal === 0.55}
                    onChange={() => {
                      setConditionVal(0.55);
                      setConditionLabel('Fair (Cracked glass or worn)');
                    }}
                  />
                  <div>
                    <strong>Cracked / Minor Flaws</strong>
                    <span>Cracked back glass or weak battery</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-item">
              <label className="form-label">Which iPhone do you want to upgrade to?</label>
              <select 
                className="form-input-select"
                value={targetPhoneId}
                onChange={(e) => setTargetPhoneId(e.target.value)}
              >
                {IPHONES.map(phone => (
                  <option key={phone.id} value={phone.id}>
                    {phone.name} ({phone.storage}) — Outright {formatGHS(phone.price)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Appraisal Output Box */}
          <div className="trade-in-result-box">
            <div className="result-box-top">
              <span className="result-kicker">Instant Appraisal Estimate</span>
              <h3 className="result-heading">Your Trade-In Credit</h3>
            </div>

            <div className="appraisal-numbers">
              <div className="appraisal-row">
                <span className="appraisal-name">Old Device Trade-In Value:</span>
                <span className="appraisal-value color-gold">
                  {formatGHS(estimatedCredit)}
                </span>
              </div>

              <div className="appraisal-row">
                <span className="appraisal-name">Normal Deposit for {targetPhone.name}:</span>
                <span className="appraisal-value">
                  {formatGHS(standardDeposit)}
                </span>
              </div>

              <div className="appraisal-divider"></div>

              <div className="appraisal-row highlight-net">
                <div>
                  <span className="appraisal-name font-bold">Net Cash You Pay Today:</span>
                  <div className="net-subtext">After deducting your old phone's credit</div>
                </div>
                <span className="appraisal-value color-green">
                  {formatGHS(netDepositRequired)}
                </span>
              </div>
            </div>

            <a 
              href={tradeInUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp trade-in-cta-btn"
            >
              <WhatsAppIcon size={20} />
              <span>Submit Trade-In on WhatsApp</span>
            </a>

            <div className="appraisal-footer-note">
              <ShieldCheck size={16} className="text-cyan" />
              <span>Final evaluation happens physically in 5 minutes at our Circle showroom.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
