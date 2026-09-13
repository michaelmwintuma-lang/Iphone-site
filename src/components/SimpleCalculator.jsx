import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { IPHONES, calculateInstallment, formatGHS, formatGHSExact } from '../data/phones';
import { STORE_CONFIG } from '../data/config';
import PaymentSchedule from './PaymentSchedule';
import ReserveModal from './ReserveModal';
import { Calculator, Smartphone, Calendar, Truck, ShieldCheck, MapPin } from 'lucide-react';

export default function SimpleCalculator({ hideHeader = false }) {
  const [selectedPhoneId, setSelectedPhoneId] = useState('iphone-15-128gb');
  const [customPrice, setCustomPrice] = useState(6200);
  const [depositPercent, setDepositPercent] = useState(40);
  const [frequency, setFrequency] = useState('weekly'); // 'daily', 'weekly', 'monthly'
  const [deliveryOption, setDeliveryOption] = useState('shop-pickup'); // 'shop-pickup' or 'nationwide-delivery'
  const [regionInput, setRegionInput] = useState('');
  const [reserveOpen, setReserveOpen] = useState(false);

  const handlePhoneSelect = (e) => {
    const id = e.target.value;
    setSelectedPhoneId(id);
    const found = IPHONES.find(p => p.id === id);
    if (found) {
      setCustomPrice(found.price);
      setDepositPercent(found.depositPercent || 40);
    }
  };

  const selectedPhone = IPHONES.find(p => p.id === selectedPhoneId) || IPHONES[0];
  const plan = calculateInstallment(customPrice, depositPercent, frequency);

  const deliveryText = deliveryOption === 'nationwide-delivery' 
    ? `Nationwide Delivery to: ${regionInput || 'My Region / City'}` 
    : 'In-person pickup at Circle showroom';

  const freqNoun = frequency === 'daily' ? 'daily' : frequency === 'monthly' ? 'monthly' : 'weekly';

  const freqLabel = frequency === 'daily' 
    ? 'Daily payments (84 days)' 
    : frequency === 'monthly' 
      ? 'Monthly payments (3 months)' 
      : 'Weekly payments (12 weeks)';

  const waMessage = `Hello Paindem Smart Cells! 👋\n\nI want to get the *${selectedPhone.name}* (${selectedPhone.storage}, ${selectedPhone.condition}) on your Buy Now, Pay Later scheme:\n\n• Cash Price: ${formatGHS(customPrice)}\n• Down Payment Today (${depositPercent}%): ${formatGHS(plan.deposit)}\n• Payment Speed: ${freqLabel}\n• Installment Amount: ${formatGHSExact(plan.installment)} ${frequency === 'daily' ? '/ day' : frequency === 'monthly' ? '/ month' : '/ week'}\n• Delivery Preference: ${deliveryText}\n\nI have my Ghana Card ready. Please confirm stock and guide me on payment (MoMo or Bank Transfer)!`;

  const waUrl = STORE_CONFIG.makeWhatsAppLink(waMessage);

  return (
    <section className="calculator-section" id="calculator">
      <div className="container">
        {!hideHeader && (
          <div className="section-head text-center">
            <div className="section-kicker">
              <Calculator size={15} /> Easy Price Calculator
            </div>
            <h2 className="section-title">See What You Pay Today & Daily/Weekly</h2>
            <p className="section-subtitle">
              The only thing you need is your Ghana Card and down payment. Pick a phone and choose whether you want to pay Daily, Weekly, or Monthly.
            </p>
          </div>
        )}

        <div className="calc-card">
          <div className="calc-form-side">
            {/* Step 1: Phone Selector */}
            <div className="calc-group">
              <label className="calc-label">
                <Smartphone size={16} className="label-icon" />
                <span>1. Select Your iPhone (UK Used or Brand New)</span>
              </label>
              <select 
                className="calc-select" 
                value={selectedPhoneId} 
                onChange={handlePhoneSelect}
              >
                {IPHONES.map(phone => (
                  <option key={phone.id} value={phone.id}>
                    {phone.name} ({phone.storage}) — {formatGHS(phone.price)} (Deposit: {formatGHS(phone.price * phone.depositPercent / 100)})
                  </option>
                ))}
              </select>
            </div>

            {/* Price slider & quick chips */}
            <div className="calc-group">
              <div className="calc-label-inline">
                <label className="calc-label">Price in Cedis (GH₵)</label>
                <span className="price-tag-highlight">{formatGHS(customPrice)}</span>
              </div>
              <input 
                type="range" 
                min="2400" 
                max="16500" 
                step="100" 
                value={customPrice} 
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="calc-slider"
              />
              <div className="calc-quick-chips">
                <button 
                  type="button" 
                  className={`chip-btn ${customPrice === 2400 ? 'active' : ''}`}
                  onClick={() => { setCustomPrice(2400); setSelectedPhoneId('iphone-11-64gb'); }}
                >
                  iPhone 11 (2.4k)
                </button>
                <button 
                  type="button" 
                  className={`chip-btn ${customPrice === 3100 ? 'active' : ''}`}
                  onClick={() => { setCustomPrice(3100); setSelectedPhoneId('iphone-12-128gb'); }}
                >
                  iPhone 12 (3.1k)
                </button>
                <button 
                  type="button" 
                  className={`chip-btn ${customPrice === 3900 ? 'active' : ''}`}
                  onClick={() => { setCustomPrice(3900); setSelectedPhoneId('iphone-13-128gb'); }}
                >
                  iPhone 13 (3.9k)
                </button>
                <button 
                  type="button" 
                  className={`chip-btn ${customPrice === 4500 ? 'active' : ''}`}
                  onClick={() => { setCustomPrice(4500); setSelectedPhoneId('iphone-14-128gb'); }}
                >
                  iPhone 14 (4.5k)
                </button>
                <button 
                  type="button" 
                  className={`chip-btn ${customPrice === 6200 ? 'active' : ''}`}
                  onClick={() => { setCustomPrice(6200); setSelectedPhoneId('iphone-15-128gb'); }}
                >
                  iPhone 15 (6.2k)
                </button>
                <button 
                  type="button" 
                  className={`chip-btn ${customPrice === 7700 ? 'active' : ''}`}
                  onClick={() => { setCustomPrice(7700); setSelectedPhoneId('iphone-16-128gb'); }}
                >
                  iPhone 16 (7.7k)
                </button>
                <button 
                  type="button" 
                  className={`chip-btn ${customPrice === 11500 ? 'active' : ''}`}
                  onClick={() => { setCustomPrice(11500); setSelectedPhoneId('iphone-16-pro-max-256gb'); }}
                >
                  16 Pro Max (11.5k)
                </button>
                <button 
                  type="button" 
                  className={`chip-btn ${customPrice === 16500 ? 'active' : ''}`}
                  onClick={() => { setCustomPrice(16500); setSelectedPhoneId('iphone-17-pro-max-256gb-sim'); }}
                >
                  17 Pro Max SIM (16.5k)
                </button>
              </div>
            </div>

            {/* Step 2: Deposit Tier */}
            <div className="calc-group">
              <label className="calc-label">2. Down Payment Tier</label>
              <div className="calc-toggle-pair">
                <button 
                  type="button"
                  className={`toggle-option ${depositPercent === 40 ? 'active' : ''}`}
                  onClick={() => setDepositPercent(40)}
                >
                  <strong>40% Down Payment</strong>
                  <span>UK Used & Standard Models</span>
                </button>
                <button 
                  type="button"
                  className={`toggle-option ${depositPercent === 60 ? 'active' : ''}`}
                  onClick={() => setDepositPercent(60)}
                >
                  <strong>60% Down Payment</strong>
                  <span>Brand New 16 & 17 Flagships</span>
                </button>
              </div>
            </div>

            {/* Step 3: Payment Frequency (Daily, Weekly, Monthly) */}
            <div className="calc-group">
              <label className="calc-label">
                <Calendar size={16} className="label-icon" />
                <span>3. Choose Your MoMo Payment Speed</span>
              </label>
              <div className="calc-toggle-triplet">
                <button 
                  type="button"
                  className={`toggle-option ${frequency === 'daily' ? 'active' : ''}`}
                  onClick={() => setFrequency('daily')}
                >
                  <strong>Daily MoMo</strong>
                  <span>{formatGHSExact(plan.daily)} / day (84 days)</span>
                </button>
                <button 
                  type="button"
                  className={`toggle-option ${frequency === 'weekly' ? 'active' : ''}`}
                  onClick={() => setFrequency('weekly')}
                >
                  <strong>Weekly MoMo</strong>
                  <span>{formatGHSExact(plan.weekly)} / wk (12 wks)</span>
                </button>
                <button 
                  type="button"
                  className={`toggle-option ${frequency === 'monthly' ? 'active' : ''}`}
                  onClick={() => setFrequency('monthly')}
                >
                  <strong>Monthly MoMo</strong>
                  <span>{formatGHSExact(plan.monthly)} / mo (3 mos)</span>
                </button>
              </div>
            </div>

            {/* Delivery or Shop Pickup */}
            <div className="calc-group">
              <label className="calc-label">
                <Truck size={16} className="label-icon" />
                <span>4. How Do You Want to Receive the Phone?</span>
              </label>
              <div className="calc-toggle-pair">
                <button 
                  type="button"
                  className={`toggle-option ${deliveryOption === 'shop-pickup' ? 'active' : ''}`}
                  onClick={() => setDeliveryOption('shop-pickup')}
                >
                  <strong>Pick Up at Shop</strong>
                  <span>KFC Circle, Accra</span>
                </button>
                <button 
                  type="button"
                  className={`toggle-option ${deliveryOption === 'nationwide-delivery' ? 'active' : ''}`}
                  onClick={() => setDeliveryOption('nationwide-delivery')}
                >
                  <strong>Nationwide Delivery</strong>
                  <span>Delivered to your region</span>
                </button>
              </div>
              {deliveryOption === 'nationwide-delivery' && (
                <div style={{ marginTop: '0.4rem' }}>
                  <input 
                    type="text" 
                    placeholder="Enter your city / region (e.g. Kumasi, Takoradi, Sunyani)..."
                    value={regionInput}
                    onChange={(e) => setRegionInput(e.target.value)}
                    className="calc-select"
                    style={{ fontSize: '0.88rem', padding: '0.65rem 0.9rem' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Output Side */}
          <div className="calc-summary-side">
            <div className="summary-header">
              <h3>Your Payment Breakdown</h3>
              <p>Simple math. No guarantor. No bank statement.</p>
            </div>

            <div className="summary-result-cards">
              {/* Down payment */}
              <div className="summary-box highlight-today">
                <div className="summary-label-row">
                  <span className="box-title">Down Payment Today</span>
                  <span className="box-tag">{depositPercent}% Down</span>
                </div>
                <div className="box-amount color-deposit">
                  {formatGHS(plan.deposit)}
                </div>
                <div className="box-note">
                  Pay this with your Ghana Card, and phone is yours today.
                </div>
              </div>

              {/* Installment */}
              <div className="summary-box highlight-weekly">
                <div className="summary-label-row">
                  <span className="box-title">
                    {frequency === 'daily' ? 'Daily Payment' : frequency === 'monthly' ? 'Monthly Payment' : 'Weekly Payment'}
                  </span>
                  <span className="box-tag">
                    {frequency === 'daily' ? '84 Days' : frequency === 'monthly' ? '3 Months' : '12 Weeks'}
                  </span>
                </div>
                <div className="box-amount color-weekly">
                  {formatGHSExact(plan.installment)}
                  <small style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                    {frequency === 'daily' ? '/ day' : frequency === 'monthly' ? '/ month' : '/ week'}
                  </small>
                </div>
                <div className="box-note">
                  Send directly via MTN MoMo (*170#), Telecel Cash, or AT.
                </div>
              </div>

              {/* Plan summary. Deliberately shows the shape of the plan — deposit,
                  instalment, how many — without a running grand total. */}
              <div className="summary-box summary-box-total">
                <div className="summary-label-row">
                  <span className="box-title">Your plan at a glance</span>
                </div>

                <div className="total-breakdown">
                  <div className="total-line">
                    <span>Cash price today</span>
                    <span>{formatGHS(customPrice)}</span>
                  </div>
                  <div className="total-line">
                    <span>Deposit ({depositPercent}%)</span>
                    <span>{formatGHS(plan.deposit)} <small style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.74rem' }}>{formatGHS(customPrice)} × {depositPercent}%</small></span>
                  </div>
                  <div className="total-line">
                    <span>Balance financed</span>
                    <span>{formatGHS(customPrice - plan.deposit)}</span>
                  </div>
                  <div className="total-line total-line-sum">
                    <span>
                      {plan.periods} × {freqNoun} payment{plan.periods > 1 ? 's' : ''}
                    </span>
                    <span>{formatGHSExact(plan.installment)}</span>
                  </div>
                </div>

                <div className="box-note">
                  Settle the balance early at any time and you stop paying the remaining
                  instalments — zero penalty.
                </div>
              </div>
            </div>

            {/* Dated schedule */}
            <PaymentSchedule
              plan={plan}
              phoneName={`${selectedPhone.name} (${selectedPhone.storage})`}
              compact
            />

            <div className="calc-cta-row">
              <button
                type="button"
                className="btn btn-primary calc-reserve-btn"
                onClick={() => setReserveOpen(true)}
              >
                <span>Reserve at this price</span>
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp calc-whatsapp-btn"
              >
                <WhatsAppIcon size={20} />
                <span>Get This Exact Plan on WhatsApp</span>
              </a>
            </div>

            <div className="calc-reassurance">
              <ShieldCheck size={16} className="text-cyan" />
              <span>Only Ghana Card + down payment needed. No guarantor.</span>
            </div>
          </div>
        </div>
      </div>

      <ReserveModal
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        phone={{ ...selectedPhone, price: customPrice, depositPercent }}
        plan={plan}
        frequency={frequency}
      />
    </section>
  );
}
