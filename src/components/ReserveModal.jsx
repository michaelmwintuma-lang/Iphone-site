import React, { useEffect, useRef, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { STORE_CONFIG } from '../data/config';
import { formatGHS, formatGHSExact } from '../data/phones';
import { X, ShieldCheck, Loader2, CheckCircle2, Truck, Store, CreditCard, Banknote, MapPin, Sparkles } from 'lucide-react';

const REGIONS = [
  'Greater Accra', 'Ashanti (Kumasi)', 'Western (Takoradi)', 'Central (Cape Coast)',
  'Eastern (Koforidua)', 'Volta (Ho)', 'Northern (Tamale)', 'Bono (Sunyani)',
  'Upper East', 'Upper West', 'Ahafo', 'Bono East', 'Oti', 'Savannah',
  'North East', 'Western North'
];

const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const FORM_KEY = import.meta.env.VITE_FORM_KEY;

export default function ReserveModal({ open, onClose, phone, plan, frequency = 'weekly' }) {
  const [name, setName] = useState('');
  const [momo, setMomo] = useState('');
  
  // Payment Type: 'installment' | 'upfront'
  const [paymentType, setPaymentType] = useState('installment');
  
  // Deposit Plan (only 40% or 60% plans supported per Paindem official policy)
  const defaultDepositPercent = phone?.depositPercent === 60 ? 60 : 40;
  const [depositPercent, setDepositPercent] = useState(defaultDepositPercent);
  
  // Fulfilment: 'delivery' | 'pickup'
  const [fulfilment, setFulfilment] = useState('delivery');
  const [region, setRegion] = useState(REGIONS[0]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Sync default deposit when phone changes
  useEffect(() => {
    if (phone) {
      setDepositPercent(phone.depositPercent === 60 ? 60 : 40);
    }
  }, [phone]);

  // Close on Escape, lock background scroll, focus the first field.
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || !phone) return null;

  // Dynamic calculations based on payment type & deposit percent (40% vs 60%)
  const isUpfront = paymentType === 'upfront';
  const unit = frequency === 'daily' ? '/ day' : frequency === 'monthly' ? '/ month' : '/ week';
  
  let depositAmount = 0;
  let remainingBalance = 0;
  let installmentAmount = 0;
  let periods = frequency === 'daily' ? '84 Days' : frequency === 'monthly' ? '3 Months' : '12 Weeks';

  if (isUpfront) {
    depositAmount = phone.price;
    remainingBalance = 0;
    installmentAmount = 0;
    periods = 'Paid in Full';
  } else {
    depositAmount = Math.round(phone.price * (depositPercent / 100));
    remainingBalance = phone.price - depositAmount;
    if (frequency === 'daily') {
      installmentAmount = Math.round(remainingBalance / 84);
    } else if (frequency === 'monthly') {
      installmentAmount = Math.round(remainingBalance / 3);
    } else {
      installmentAmount = Math.round(remainingBalance / 12);
    }
  }

  // Composed WhatsApp Message
  const paymentSummaryText = isUpfront
    ? `• Payment Type: *Full Upfront Payment (100% Cash)*\n• Total Paid: ${formatGHS(phone.price)} (Zero ongoing installments)`
    : `• Payment Type: *Buy Now, Pay Later (${depositPercent}% Down Payment)*\n• Initial Deposit: ${formatGHS(depositAmount)}\n• Then: ${formatGHSExact(installmentAmount)} ${unit} (${periods})\n• Balance: ${formatGHS(remainingBalance)}`;

  const deliverySummaryText = fulfilment === 'delivery'
    ? `• Fulfilment: *Doorstep Express Delivery*\n• Region: ${region}\n• Delivery Address / Landmark: ${deliveryAddress || '(to be provided)'}`
    : `• Fulfilment: *Showroom Pickup (KFC Circle, Kwame Nkrumah Ave, Accra)*`;

  const waMessage =
    `Hello Paindem Smart Cells! 👋\n\n` +
    `My name is ${name || '(name)'} and I am submitting a reservation for the *${phone.name}* (${phone.storage}, ${phone.condition}).\n\n` +
    `${paymentSummaryText}\n` +
    `• MoMo / Contact: ${momo || '(number)'}\n` +
    `${deliverySummaryText}\n\n` +
    `I have my ${isUpfront ? 'payment ready for express delivery' : 'Ghana Card & down payment ready'}. Please confirm stock availability and payment instructions (MoMo or Bank Transfer)!`;

  const waUrl = STORE_CONFIG.makeWhatsAppLink(waMessage);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Honeypot
    if (e.target.company?.value) return;

    if (!name.trim() || momo.replace(/\D/g, '').length < 9) {
      setError('Please enter your full name and a valid phone / MoMo number.');
      return;
    }

    if (fulfilment === 'delivery' && !deliveryAddress.trim()) {
      setError('Please enter your delivery street address, town, or landmark.');
      return;
    }

    setStatus('sending');

    if (FORM_KEY) {
      try {
        await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: FORM_KEY,
            subject: `New reservation: ${phone.name} (${phone.storage}) - ${isUpfront ? 'Full Upfront' : `${depositPercent}% BNPL`}`,
            from_name: 'Paindem Website',
            name,
            momo_number: momo,
            model: `${phone.name} ${phone.storage} — ${phone.condition}`,
            payment_type: isUpfront ? 'Full Upfront Payment' : `Installment (${depositPercent}% Down)`,
            deposit: formatGHS(depositAmount),
            instalment: isUpfront ? 'N/A (Paid in Full)' : `${formatGHSExact(installmentAmount)} ${unit}`,
            fulfilment: fulfilment === 'pickup' ? 'Circle showroom pickup' : `Delivery to ${region} (${deliveryAddress})`
          })
        });
      } catch {
        // Never block customer on logging fail
      }
    }

    window.dataLayer?.push({
      event: 'reserve_submit',
      model: phone.name,
      storage: phone.storage,
      paymentType,
      depositPercent: isUpfront ? 100 : depositPercent,
      deposit: depositAmount,
      fulfilment
    });

    setStatus('done');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="reserve-overlay" onClick={onClose} role="presentation">
      <div
        className="reserve-modal"
        ref={dialogRef}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reserve-title"
      >
        <button type="button" className="reserve-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {status === 'done' ? (
          <div className="reserve-success">
            <CheckCircle2 size={46} className="text-green" />
            <h3>Reservation Details Saved</h3>
            <p>
              Your reservation for <strong>{phone.name}</strong> ({isUpfront ? 'Full Upfront' : `${depositPercent}% BNPL`})
              has been recorded. We've opened WhatsApp so our sales representative can finalize your delivery or pickup.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon size={18} />
              <span>Continue on WhatsApp</span>
            </a>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="reserve-head">
              <span className="reserve-eyebrow">
                <Sparkles size={12} className="text-gold" /> Official Reservation
              </span>
              <h3 id="reserve-title">Reserve {phone.name}</h3>
              <p>Choose your payment mode and whether you want it delivered or picked up.</p>
            </div>

            {/* Model Summary Badge */}
            <div className="reserve-summary">
              <img src={phone.image} alt={phone.name} className="reserve-thumb" loading="lazy" />
              <div className="reserve-summary-nums">
                <div>
                  <span>{isUpfront ? 'Full Cash Price' : `Deposit Today (${depositPercent}%)`}</span>
                  <strong className="color-deposit">{formatGHS(depositAmount)}</strong>
                </div>
                <div>
                  <span>{isUpfront ? 'Balance Remaining' : `Then ${unit}`}</span>
                  <strong className="color-weekly">{isUpfront ? 'GH₵ 0' : formatGHSExact(installmentAmount)}</strong>
                </div>
                <div>
                  <span>Term</span>
                  <strong>{periods}</strong>
                </div>
              </div>
            </div>

            <form className="reserve-form" onSubmit={handleSubmit}>
              {/* Honeypot */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="reserve-honeypot"
                aria-hidden="true"
              />

              {/* 1. PAYMENT METHOD SELECTION (Installment vs Upfront) */}
              <div className="reserve-field">
                <span className="field-label-bold">Payment Method</span>
                <div className="reserve-payment-toggle-grid">
                  <button
                    type="button"
                    className={`payment-choice-card ${paymentType === 'installment' ? 'active' : ''}`}
                    onClick={() => setPaymentType('installment')}
                  >
                    <div className="choice-header">
                      <CreditCard size={18} className="choice-icon" />
                      <strong>Buy Now, Pay Later</strong>
                    </div>
                    <p className="choice-sub">Pay 40% or 60% down payment and spread the rest</p>
                  </button>

                  <button
                    type="button"
                    className={`payment-choice-card ${paymentType === 'upfront' ? 'active' : ''}`}
                    onClick={() => setPaymentType('upfront')}
                  >
                    <div className="choice-header">
                      <Banknote size={18} className="choice-icon text-green" />
                      <strong>Full Upfront Payment</strong>
                    </div>
                    <p className="choice-sub">Pay 100% cash price outright • Priority instant dispatch</p>
                  </button>
                </div>
              </div>

              {/* 2. DOWN PAYMENT TIER SELECTION (ONLY 40% OR 60%) */}
              {paymentType === 'installment' && (
                <div className="reserve-field deposit-plan-field">
                  <div className="field-label-row">
                    <span className="field-label-bold">Select Your Down Payment Plan:</span>
                    <span className="plan-help-tag">Official Paindem Plans</span>
                  </div>

                  <div className="deposit-options-grid">
                    <button
                      type="button"
                      className={`deposit-plan-pill ${depositPercent === 40 ? 'active' : ''}`}
                      onClick={() => setDepositPercent(40)}
                    >
                      <div className="dp-pill-top">
                        <strong className="dp-percent">40% Down Payment</strong>
                        <span className="dp-amount">{formatGHS(Math.round(phone.price * 0.40))}</span>
                      </div>
                      <span className="dp-desc">Clean UK Used &amp; Standard Models (iPhone 11–15)</span>
                    </button>

                    <button
                      type="button"
                      className={`deposit-plan-pill ${depositPercent === 60 ? 'active' : ''}`}
                      onClick={() => setDepositPercent(60)}
                    >
                      <div className="dp-pill-top">
                        <strong className="dp-percent">60% Down Payment</strong>
                        <span className="dp-amount">{formatGHS(Math.round(phone.price * 0.60))}</span>
                      </div>
                      <span className="dp-desc">Brand New Sealed Flagships (iPhone 16 &amp; 17 Pro)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 3. FULFILMENT (Doorstep Delivery vs Circle Pickup) */}
              <div className="reserve-field">
                <span className="field-label-bold">Delivery or Pickup?</span>
                <div className="reserve-toggle-row">
                  <button
                    type="button"
                    className={`reserve-toggle ${fulfilment === 'delivery' ? 'active' : ''}`}
                    onClick={() => setFulfilment('delivery')}
                  >
                    <Truck size={15} />
                    <span>Get Delivered to Me</span>
                  </button>
                  <button
                    type="button"
                    className={`reserve-toggle ${fulfilment === 'pickup' ? 'active' : ''}`}
                    onClick={() => setFulfilment('pickup')}
                  >
                    <Store size={15} />
                    <span>Pick up at Circle Showroom</span>
                  </button>
                </div>
              </div>

              {/* Delivery Address Fields */}
              {fulfilment === 'delivery' && (
                <div className="delivery-details-box">
                  <label className="reserve-field">
                    <span>Select Region in Ghana</span>
                    <select value={region} onChange={e => setRegion(e.target.value)}>
                      {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </label>

                  <label className="reserve-field">
                    <span>Street Address / Town / Landmark *</span>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. East Legon, near American House or Osu Ring Road"
                      required
                    />
                  </label>
                </div>
              )}

              {/* Customer Contact Details */}
              <div className="contact-details-row">
                <label className="reserve-field">
                  <span>Your Full Name *</span>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Kwame Mensah"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="reserve-field">
                  <span>Phone / MoMo Number *</span>
                  <input
                    type="tel"
                    value={momo}
                    onChange={e => setMomo(e.target.value)}
                    placeholder="024 000 0000"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </label>
              </div>

              {error && <p className="reserve-error">{error}</p>}

              <button
                type="submit"
                className="btn btn-whatsapp reserve-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <><Loader2 size={18} className="reserve-spinner" /><span>Submitting Reservation…</span></>
                ) : (
                  <><WhatsAppIcon size={18} /><span>Confirm Reservation on WhatsApp</span></>
                )}
              </button>

              <div className="reserve-trust-bar">
                <ShieldCheck size={14} className="text-cyan" />
                <span>
                  {isUpfront
                    ? '100% Outright payment accepted via MoMo or Bank Transfer with instant priority delivery.'
                    : 'Ghana Card required for installment pickup or delivery. Accepted via MoMo or Bank Transfer.'}
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
