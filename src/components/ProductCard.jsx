import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Link } from 'react-router-dom';
import { STORE_CONFIG } from '../data/config';
import { calculateInstallment, formatGHS, formatGHSExact } from '../data/phones';
import { getPhoneColorOptions, getPhoneDesign } from '../data/phone-colors';
import { useCompare } from './CompareDrawer';
import PhoneImage from './PhoneImage';
import { BatteryCharging, ShieldCheck, Sparkles, Smartphone, GitCompare, ArrowRight, Camera, CheckCircle2 } from 'lucide-react';

export default function ProductCard({ phone }) {
  const plan = calculateInstallment(phone.price, phone.depositPercent, 'weekly');
  const { isCompared, isFull, toggle } = useCompare();
  const compared = isCompared(phone.id);

  const colors = getPhoneColorOptions(phone);
  const design = getPhoneDesign(phone);
  const [selectedColor, setSelectedColor] = useState(colors[0] || { name: phone.color, hex: phone.colorHex });
  const [cardView, setCardView] = useState('back'); // 'back' | 'front'

  const orderMessage = phone.isNew
    ? `Hello Paindem Smart Cells! 👋\n\nI am contacting you regarding the *Brand New (Factory Sealed)* ${phone.name} (${phone.storage}, ${selectedColor.name}) on your Buy Now, Pay Later scheme.\n\n• Listed Price: ${formatGHS(phone.price)}\n• Estimated Down Payment (${phone.depositPercent}%): ${formatGHS(plan.deposit)}\n• Weekly Option: ${formatGHSExact(plan.weekly)} / week\n\nPlease let me know the current sealed stock availability, available colors, and pickup/delivery details!`
    : `Hello Paindem Smart Cells! 👋\n\nI want to purchase the *${phone.name}* (${phone.storage}, ${selectedColor.name}, ${phone.condition}) on your Buy Now, Pay Later scheme.\n\n• Cash price: ${formatGHS(phone.price)}\n• Down Payment (${phone.depositPercent}%): ${formatGHS(plan.deposit)}\n• Daily Option: ${formatGHSExact(plan.daily)} / day\n• Weekly Option: ${formatGHSExact(plan.weekly)} / week\n• Warranty: 6 Months Included\n\nI have my Ghana Card and down payment ready. Please advise on Circle pickup or nationwide delivery to my region!`;

  const orderUrl = STORE_CONFIG.makeWhatsAppLink(orderMessage);

  return (
    <article className="product-card">
      {/* Card Header Badges */}
      <div className="card-top-badges">
        <span className={`badge-condition ${phone.isNew ? 'is-new' : 'is-used'}`}>
          {phone.isNew ? '★ Brand New (Sealed)' : '✓ Clean UK Used (Grade A+)'}
        </span>
      </div>

      {/* Real Product Image Stage with Front/Back & Color Switch */}
      <Link to={`/iphone/${phone.slug}`} className="card-image-box" aria-label={`View ${phone.name}`}>
        {/* Quick Front/Back Toggle Pill */}
        <div className="card-view-quick-toggle" onClick={e => e.preventDefault()}>
          <button
            type="button"
            className={`card-view-btn ${cardView === 'back' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCardView('back'); }}
            title="View Back Chassis"
          >
            Back
          </button>
          <button
            type="button"
            className={`card-view-btn ${cardView === 'front' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCardView('front'); }}
            title="View Front Display"
          >
            Front
          </button>
        </div>

        {/* View Presentation */}
        {cardView === 'back' ? (
          <div className="card-back-view-wrap">
            <PhoneImage
              src={phone.image}
              alt={`${phone.name} in ${selectedColor.name}`}
              className="product-real-img"
              width={240}
            />
            <div
              className="card-color-ambient-glow"
              style={{ background: `radial-gradient(circle, ${selectedColor.hex}44 0%, transparent 70%)` }}
              aria-hidden="true"
            ></div>
          </div>
        ) : (
          <div className="card-front-mini-chassis" style={{ borderColor: selectedColor.railHex || '#444' }}>
            <div className="mini-screen" style={{ background: selectedColor.wallpaper || '#111' }}>
              {design.hasIsland ? (
                <div className="mini-island"></div>
              ) : (
                <div className="mini-notch"></div>
              )}
              <div className="mini-clock">09:41</div>
              <div className="mini-model-tag">{phone.name.replace('iPhone ', '')}</div>
              <div className="mini-home-bar"></div>
            </div>
          </div>
        )}

        {/* Interactive Color Swatches Strip */}
        <div className="card-color-swatches-strip" onClick={e => e.preventDefault()}>
          {colors.slice(0, 5).map(c => (
            <button
              key={c.id}
              type="button"
              className={`card-swatch-mini ${selectedColor.id === c.id ? 'active' : ''}`}
              style={{ backgroundColor: c.hex }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColor(c); }}
              title={`${c.name} - click to preview`}
            />
          ))}
          <span className="card-swatch-name">{selectedColor.name}</span>
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

        {/* Specs Row */}
        <div className="card-specs-row">
          <span className="spec-item">
            <BatteryCharging size={13} className="spec-icon" />
            {phone.battery}
          </span>
          <span className="spec-dot" aria-hidden="true">•</span>
          <span className="spec-item">
            <Smartphone size={13} className="spec-icon" />
            {phone.screen}
          </span>
          <span className="spec-dot" aria-hidden="true">•</span>
          <span className="spec-item">
            <ShieldCheck size={13} className="spec-icon text-green" />
            6 Mo. Warranty
          </span>
          <span className="spec-dot" aria-hidden="true">•</span>
          <span className="spec-item text-green" title="Paindem 28-Point Hardware Diagnostic Inspection Passed">
            <CheckCircle2 size={13} className="spec-icon" />
            28-Pt Certified
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
            <span>{phone.isNew ? 'WhatsApp for New Details' : 'Order on WhatsApp'}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
