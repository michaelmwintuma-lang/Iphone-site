import React, { useEffect, useMemo, useState } from 'react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  getPhoneBySlug,
  getVariants,
  getRelatedPhones,
  calculateInstallment,
  formatGHS,
  formatGHSExact
} from '../data/phones';
import { STORE_CONFIG } from '../data/config';
import PaymentSchedule from '../components/PaymentSchedule';
import ReserveModal from '../components/ReserveModal';
import PhoneImage from '../components/PhoneImage';
import Reveal from '../components/Reveal';
import { ChevronRight, ShieldCheck, BatteryCharging, Smartphone, Truck, CheckCircle2, Sparkles, ArrowRight, Store, CreditCard } from 'lucide-react';

const FREQUENCIES = [
  { key: 'daily', label: 'Daily', unit: '/ day', short: '/day', note: '84 days' },
  { key: 'weekly', label: 'Weekly', unit: '/ week', short: '/wk', note: '12 weeks' },
  { key: 'monthly', label: 'Monthly', unit: '/ month', short: '/mo', note: '3 months' }
];

export default function ProductPage() {
  const { slug } = useParams();
  const phone = getPhoneBySlug(slug);

  const [frequency, setFrequency] = useState('weekly');
  const [reserveOpen, setReserveOpen] = useState(false);

  // Scroll to top when moving between storage variants of the same family.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const variants = useMemo(() => (phone ? getVariants(phone) : []), [phone]);
  const related = useMemo(() => (phone ? getRelatedPhones(phone, 4) : []), [phone]);
  const plan = useMemo(
    () => (phone ? calculateInstallment(phone.price, phone.depositPercent, frequency) : null),
    [phone, frequency]
  );

  if (!phone) return <Navigate to="/404" replace />;

  const orderMessage =
    `Hello Paindem Smart Cells! 👋\n\n` +
    `I want the *${phone.name}* (${phone.storage}, ${phone.condition}).\n\n` +
    `• Cash price: ${formatGHS(phone.price)}\n` +
    `• Deposit (${phone.depositPercent}%): ${formatGHS(plan.deposit)}\n` +
    `• Then ${formatGHSExact(plan.installment)} ${FREQUENCIES.find(f => f.key === frequency).unit}\n` +
    `I have my Ghana Card and deposit ready. Circle pickup or delivery to my region?`;

  const orderUrl = STORE_CONFIG.makeWhatsAppLink(orderMessage);

  return (
    <div className="product-page">
      {/* Breadcrumbs */}
      <div className="container">
        <div className="breadcrumbs product-breadcrumbs">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <Link to="/all-iphones" className="breadcrumb-link">All iPhones</Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{phone.name}</span>
        </div>
      </div>

      {/* Main product block */}
      <section className="product-hero">
        <div className="container">
          <div className="product-hero-grid">
            {/* Image stage */}
            <div className="product-stage">
              <div className="product-stage-glow" aria-hidden="true"></div>
              <PhoneImage
                src={phone.image}
                alt={`${phone.name} in ${phone.color}`}
                className="product-stage-img"
                width={420}
                loading="eager"
                fetchPriority="high"
              />
              <div className="product-stage-badges">
                <span className={`badge-condition ${phone.isNew ? 'is-new' : 'is-used'}`}>
                  {phone.isNew ? '★ Brand New (Sealed)' : '✓ Clean UK Used (Grade A+)'}
                </span>
              </div>
            </div>

            {/* Buy panel */}
            <div className="product-buy-panel">
              <h1 className="product-h1">{phone.name}</h1>
              <p className="product-lede">{phone.shortNote}</p>

              <div className="product-spec-chips">
                <span className="spec-pill">
                  <BatteryCharging size={13} className="spec-icon" /> {phone.battery}
                </span>
                <span className="spec-pill">
                  <Smartphone size={13} className="spec-icon" /> {phone.screen}
                </span>
                <span className="spec-pill">
                  <ShieldCheck size={13} className="spec-icon text-cyan" /> 6 Mo. Warranty
                </span>
                <span className="spec-pill">
                  <CheckCircle2 size={13} className="spec-icon text-green" /> Factory Unlocked
                </span>
              </div>

              {/* Storage variants */}
              {variants.length > 1 && (
                <div className="product-variant-block">
                  <span className="product-variant-label">Storage</span>
                  <div className="product-variant-row">
                    {variants.map(v => (
                      <Link
                        key={v.id}
                        to={`/iphone/${v.slug}`}
                        className={`product-variant-btn ${v.id === phone.id ? 'active' : ''}`}
                      >
                        <strong>{v.storage}</strong>
                        <span>{formatGHS(v.price)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="product-price-block">
                <div className="product-cash-row">
                  <span>Cash price</span>
                  <strong>{formatGHS(phone.price)}</strong>
                </div>

                <div className="product-freq-row" role="group" aria-label="Payment frequency">
                  {FREQUENCIES.map(f => (
                    <button
                      key={f.key}
                      type="button"
                      className={`product-freq-btn ${frequency === f.key ? 'active' : ''}`}
                      onClick={() => setFrequency(f.key)}
                    >
                      <strong>{f.label}</strong>
                      <span>{f.note}</span>
                    </button>
                  ))}
                </div>

                <div className="product-plan-grid">
                  <div className="product-plan-cell">
                    <span className="product-plan-label">
                      Deposit today ({phone.depositPercent}%)
                    </span>
                    <span className="product-plan-value color-deposit">
                      {formatGHS(plan.deposit)}
                    </span>
                  </div>
                  <div className="product-plan-cell">
                    <span className="product-plan-label">
                      Then {FREQUENCIES.find(f => f.key === frequency).unit}
                    </span>
                    <span className="product-plan-value color-weekly">
                      {formatGHSExact(plan.installment)}
                    </span>
                  </div>
                </div>

                <div className="product-total-disclosure">
                  <div className="product-total-row">
                    <span>Payments</span>
                    <strong>
                      {plan.periods} ×{' '}
                      {FREQUENCIES.find(f => f.key === frequency).label.toLowerCase()}
                    </strong>
                  </div>
                  <p className="product-total-note">
                    Settle the balance early at any time and you stop paying the remaining
                    instalments — no penalty.
                  </p>
                </div>
              </div>

              <div className="product-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-large product-reserve-btn"
                  onClick={() => setReserveOpen(true)}
                >
                  <CreditCard size={18} />
                  <span>Reserve this iPhone</span>
                </button>
                <a
                  href={orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp product-wa-btn"
                >
                  <WhatsAppIcon size={18} />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              <div className="product-assurances">
                <span><Store size={14} /> Circle showroom pickup</span>
                <span><Truck size={14} /> Delivery to all 16 regions</span>
                <span><ShieldCheck size={14} /> 6-month shop warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment schedule */}
      <section className="product-schedule-section">
        <div className="container">
          <Reveal>
            <PaymentSchedule plan={plan} phoneName={`${phone.name} (${phone.storage})`} />
          </Reveal>
        </div>
      </section>

      {/* Spec detail */}
      <section className="product-specs-section">
        <div className="container">
          <Reveal>
            <h2 className="section-title text-center">Device details</h2>
            <div className="product-specs-table">
              {[
                ['Model', phone.name],
                ['Condition', phone.condition],
                ['Storage', phone.storage],
                ['Colour', phone.color],
                ['Battery health', phone.battery],
                ['Display', phone.screen],
                ['Network', 'Factory unlocked — MTN, Telecel, AT'],
                ['Warranty', phone.isNew
                  ? '6-month shop warranty + Apple international warranty'
                  : '6-month shop warranty']
              ].map(([label, value]) => (
                <div className="product-spec-row" key={label}>
                  <span className="product-spec-key">{label}</span>
                  <span className="product-spec-val">{value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="product-related-section">
          <div className="container">
            <div className="section-head-between">
              <div>
                <div className="section-kicker">
                  <Sparkles size={15} className="inline-icon" /> Others also took home
                </div>
                <h2 className="section-title">Similar iPhones on Pay Small Small</h2>
              </div>
              <Link to="/all-iphones" className="btn btn-secondary view-all-btn">
                <span>View all</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="product-related-grid">
              {related.map(p => {
                const rPlan = calculateInstallment(p.price, p.depositPercent, 'weekly');
                return (
                  <Link to={`/iphone/${p.slug}`} key={p.id} className="related-card">
                    <PhoneImage
                      src={p.image}
                      alt={p.name}
                      width={120}
                      className="related-card-img"
                    />
                    <div className="related-card-body">
                      <h4>{p.name}</h4>
                      <span className="related-card-deposit">
                        {formatGHS(rPlan.deposit)} deposit
                      </span>
                      <span className="related-card-weekly">
                        then {formatGHSExact(rPlan.weekly)}/week
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile buy bar */}
      <div className="product-sticky-bar">
        <div className="sticky-bar-info">
          <span className="sticky-bar-name">{phone.name}</span>
          <span className="sticky-bar-price">
            {`${formatGHS(plan.deposit)} down · ${formatGHSExact(plan.installment)}${FREQUENCIES.find(f => f.key === frequency).short}`}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-primary sticky-bar-btn"
          onClick={() => setReserveOpen(true)}
        >
          Reserve
        </button>
      </div>

      <ReserveModal
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        phone={phone}
        plan={plan}
        frequency={frequency}
      />
    </div>
  );
}
