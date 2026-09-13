import React, { useEffect, useRef, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { STORE_CONFIG } from '../data/config';
import { formatGHS, formatGHSExact } from '../data/phones';
import { X, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const REGIONS = [
  'Greater Accra', 'Ashanti (Kumasi)', 'Western (Takoradi)', 'Central (Cape Coast)',
  'Eastern (Koforidua)', 'Volta (Ho)', 'Northern (Tamale)', 'Bono (Sunyani)',
  'Upper East', 'Upper West', 'Ahafo', 'Bono East', 'Oti', 'Savannah',
  'North East', 'Western North'
];

const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const FORM_KEY = import.meta.env.VITE_FORM_KEY;

/**
 * Captures the lead BEFORE handing off to WhatsApp. Previously every CTA was a wa.me link,
 * so a visitor who didn't tap through left no trace — the shop had no idea they existed.
 *
 * The WhatsApp handoff still happens either way: if the form endpoint is unconfigured or
 * fails, we never block the customer, we just lose the copy.
 */
export default function ReserveModal({ open, onClose, phone, plan, frequency }) {
  const [name, setName] = useState('');
  const [momo, setMomo] = useState('');
  const [region, setRegion] = useState(REGIONS[0]);
  const [fulfilment, setFulfilment] = useState('pickup');
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

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

  if (!open || !phone || !plan) return null;

  const unit = frequency === 'daily' ? '/ day' : frequency === 'monthly' ? '/ month' : '/ week';

  const waMessage =
    `Hello Paindem Smart Cells! 👋\n\n` +
    `My name is ${name || '(name)'} and I want to reserve the *${phone.name}* (${phone.storage}).\n\n` +
    `• Cash price: ${formatGHS(phone.price)}\n` +
    `• Deposit (${phone.depositPercent}%): ${formatGHS(plan.deposit)}\n` +
    `• Then ${formatGHSExact(plan.installment)} ${unit}\n` +
    `• Phone / MoMo number: ${momo || '(number)'}\n` +
    `• ${fulfilment === 'pickup' ? 'Pickup at Circle showroom' : `Delivery to ${region}`}\n\n` +
    `I have my Ghana Card ready. Please confirm stock and guide me on payment (MoMo or Bank Transfer).`;

  const waUrl = STORE_CONFIG.makeWhatsAppLink(waMessage);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Honeypot — bots fill hidden fields, humans don't.
    if (e.target.company?.value) return;

    if (!name.trim() || momo.replace(/\D/g, '').length < 9) {
      setError('Please enter your name and a valid phone / MoMo number.');
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
            subject: `New reservation: ${phone.name} (${phone.storage})`,
            from_name: 'Paindem Website',
            name,
            momo_number: momo,
            model: `${phone.name} ${phone.storage} — ${phone.condition}`,
            cash_price: formatGHS(phone.price),
            deposit: formatGHS(plan.deposit),
            instalment: `${formatGHSExact(plan.installment)} ${unit}`,
            fulfilment: fulfilment === 'pickup' ? 'Circle showroom pickup' : `Delivery to ${region}`
          })
        });
      } catch {
        // Never block the customer on our own logging.
      }
    }

    // Analytics hook — no-ops until the client adds GA4 / Meta Pixel.
    window.dataLayer?.push({
      event: 'reserve_submit',
      model: phone.name,
      storage: phone.storage,
      deposit: plan.deposit,
      frequency
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
            <CheckCircle2 size={44} className="text-green" />
            <h3>Reservation sent</h3>
            <p>
              We've saved your details and opened WhatsApp so you can confirm with a sales rep.
              If WhatsApp didn't open, tap below.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon size={18} />
              <span>Open WhatsApp</span>
            </a>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="reserve-head">
              <h3 id="reserve-title">Reserve your {phone.name}</h3>
              <p>Takes 20 seconds. We'll hold it and confirm on WhatsApp.</p>
            </div>

            <div className="reserve-summary">
              <img src={phone.image} alt="" className="reserve-thumb" loading="lazy" />
              <div className="reserve-summary-nums">
                <div>
                  <span>Deposit today</span>
                  <strong className="color-deposit">{formatGHS(plan.deposit)}</strong>
                </div>
                <div>
                  <span>Then {unit}</span>
                  <strong className="color-weekly">{formatGHSExact(plan.installment)}</strong>
                </div>
                <div>
                  <span>Payments</span>
                  <strong>{plan.periods}</strong>
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

              <label className="reserve-field">
                <span>Your name</span>
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
                <span>Phone / MoMo number (For MoMo or Bank Transfer)</span>
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

              <div className="reserve-field">
                <span>How do you want it?</span>
                <div className="reserve-toggle-row">
                  <button
                    type="button"
                    className={`reserve-toggle ${fulfilment === 'pickup' ? 'active' : ''}`}
                    onClick={() => setFulfilment('pickup')}
                  >
                    Pick up at Circle
                  </button>
                  <button
                    type="button"
                    className={`reserve-toggle ${fulfilment === 'delivery' ? 'active' : ''}`}
                    onClick={() => setFulfilment('delivery')}
                  >
                    Deliver to me
                  </button>
                </div>
              </div>

              {fulfilment === 'delivery' && (
                <label className="reserve-field">
                  <span>Your region</span>
                  <select value={region} onChange={e => setRegion(e.target.value)}>
                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </label>
              )}

              {error && <p className="reserve-error">{error}</p>}

              <button
                type="submit"
                className="btn btn-whatsapp reserve-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <><Loader2 size={18} className="reserve-spinner" /><span>Sending…</span></>
                ) : (
                  <><WhatsAppIcon size={18} /><span>Reserve & confirm on WhatsApp</span></>
                )}
              </button>

              <p className="reserve-privacy">
                <ShieldCheck size={14} className="text-cyan" />
                <span>
                  Only your name and MoMo number. No Ghana Card details online — those are
                  verified in person or directly with a rep.
                </span>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
