import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Link } from 'react-router-dom';
import { STORE_CONFIG } from '../data/config';
import { calculateInstallment, formatGHS, formatGHSExact } from '../data/phones';
import { useCompare } from './CompareDrawer';
import PhoneImage from './PhoneImage';
import { BatteryCharging, ShieldCheck, Sparkles, Smartphone, GitCompare, ArrowRight } from 'lucide-react';

export default function ProductCard({ phone }) {
  const plan = calculateInstallment(phone.price, phone.depositPercent, 'weekly');
  const { isCompared, isFull, toggle } = useCompare();
  const compared = isCompared(phone.id);

  const orderMessage = `Hello Paindem Smart Cells! 👋\n\nI want to purchase the *${phone.name}* (${phone.storage}, ${phone.condition}) on your Pay Small Small scheme.\n\n• Cash price: ${formatGHS(phone.price)}\n• Down Payment (${phone.depositPercent}%): ${formatGHS(plan.deposit)}\n• Daily Option: ${formatGHSExact(plan.daily)} / day\n• Weekly Option: ${formatGHSExact(plan.weekly)} / week\n• Warranty: 6 Months Included\n\nI have my Ghana Card and down payment ready. Please advise on Circle pickup or nationwide delivery to my region!`;

  const orderUrl = STORE_CONFIG.makeWhatsAppLink(orderMessage);

  return (
    <article className="product-card">
      {/* Card Header Badges */}
      <div className="card-top-badges">
        <span className={`badge-condition ${phone.isNew ? 'is-new' : 'is-used'}`}>
          {phone.isNew ? '★ Brand New (Sealed)' : '✓ Clean UK Used (Grade A+)'}
        </span>
      </div>

      {/* Real Product Image Stage */}
      <Link to={`/iphone/${phone.slug}`} className="card-image-box" aria-label={`View ${phone.name}`}>
        <PhoneImage
          src={phone.image}
          alt={`${phone.name} in ${phone.color}`}
          className="product-real-img"
          width={240}
        />
        <div className="product-color-tag">
          <span className="color-swatch" style={{ backgroundColor: phone.colorHex }}></span>
          <span>{phone.color}</span>
        </div>

        {/* Compare toggle */}
        <button
          type="button"
          className={`card-compare-btn ${compared ? 'active' : ''}`}
          onClick={e => { e.preventDefault(); toggle(phone); }}
          disabled={!compared && isFull}
          title={
            compared ? 'Remove from comparison'
              : isFull ? 'You can compare up to 3 phones' : 'Add to comparison'
          }
          aria-pressed={compared}
        >
          <GitCompare size={14} />
          <span>{compared ? 'Comparing' : 'Compare'}</span>
        </button>
      </Link>

      {/* Card Content Area */}
      <div className="card-content">
        <div className="card-title-row">
          <h3 className="product-title">
            <Link to={`/iphone/${phone.slug}`} className="product-title-link">{phone.name}</Link>
          </h3>
          <span className="product-storage">{phone.storage}</span>
        </div>

        <p className="product-short-note">{phone.shortNote}</p>

        {/* Specs Pills */}
        <div className="card-specs-row">
          <span className="spec-pill">
            <BatteryCharging size={13} className="spec-icon" />
            {phone.battery}
          </span>
          <span className="spec-pill">
            <Smartphone size={13} className="spec-icon" />
            {phone.screen}
          </span>
          <span className="spec-pill">
            <ShieldCheck size={13} className="spec-icon text-cyan" />
            6 Mo. Warranty
          </span>
        </div>

        {/* Price & Installment Breakdown Box */}
        <div className="card-price-breakdown">
          <div className="outright-price-row">
            <span className="price-label">Cash price:</span>
            <span className="outright-price">{formatGHS(phone.price)}</span>
          </div>

          <div className="installment-chips-grid">
            <div className="inst-chip chip-deposit">
              <span className="inst-label">{phone.depositPercent}% Down Payment</span>
              <span className="inst-val">{formatGHS(plan.deposit)}</span>
            </div>
            <div className="inst-chip chip-weekly">
              <span className="inst-label">Weekly MoMo (or {formatGHSExact(plan.daily)}/day)</span>
              <span className="inst-val">{formatGHSExact(plan.weekly)}<small>/wk</small></span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions">
          <Link to={`/iphone/${phone.slug}`} className="btn btn-primary card-details-btn">
            <span>See full plan</span>
            <ArrowRight size={16} />
          </Link>
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp card-order-btn"
          >
            <WhatsAppIcon size={18} />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
