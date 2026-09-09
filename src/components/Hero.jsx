import React, { useEffect, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Link } from 'react-router-dom';
import { STORE_CONFIG } from '../data/config';
import { formatGHS } from '../data/phones';
import PhoneImage from './PhoneImage';
import { useCountUp } from '../hooks/useInView';
import { Check, CheckCircle2, ArrowRight, Shield, Truck, Sparkles } from 'lucide-react';

/** Devices the hero cycles through. */
const HERO_DEVICES = [
  { src: '/phones/iphone-16-pro-max.png', alt: 'iPhone 16 Pro Max at Paindem Smart Cells' },
  { src: '/phones/iphone-17-pro.png', alt: 'iPhone 17 Pro at Paindem Smart Cells' },
  { src: '/phones/iphone-15-pro-max.png', alt: 'iPhone 15 Pro Max at Paindem Smart Cells' }
];

/**
 * Slow crossfade through three flagships. Holds on the first device for anyone who has
 * asked for reduced motion.
 */
function HeroDevice() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => setIndex(i => (i + 1) % HERO_DEVICES.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-device-stack">
      {HERO_DEVICES.map((device, i) => (
        <PhoneImage
          key={device.src}
          src={device.src}
          alt={i === index ? device.alt : ''}
          className={`hero-device-image ${i === index ? 'is-active' : ''}`}
          width={420}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : undefined}
          aria-hidden={i === index ? undefined : 'true'}
        />
      ))}
    </div>
  );
}

/** Stat that counts up the first time the strip scrolls into view. */
function HeroStat({ value, suffix = '', label }) {
  const [ref, current] = useCountUp(value);
  return (
    <div className="hero-stat-col" ref={ref}>
      <div className="hero-stat-number">{current}{suffix}</div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const exampleModel = "iPhone 15 (128GB UK Used)";
  const exampleDeposit = 2480; // 40% from official sheet
  const exampleWeekly = 465;  // from official sheet
  const exampleDaily = 67;    // 465 / 7

  const heroWhatsAppUrl = STORE_CONFIG.makeWhatsAppLink(
    `Hello Paindem Smart Cells! 👋 I saw the ${exampleModel} on your Pay Small Small scheme (${formatGHS(exampleDeposit)} down payment). I have my Ghana Card and want it delivered / picked up.`
  );

  // Ticker content. Emoji flags read as clip-art on a retail site, so the regions
  // carry a small marker instead and the payment rails are named plainly.
  const tickerItems = [
    'Greater Accra — KFC Circle showroom',
    'Ashanti — Kumasi dispatch',
    'Western — Takoradi',
    'Central — Cape Coast',
    'Eastern — Koforidua',
    'Northern — Tamale',
    'Volta — Ho',
    'Bono — Sunyani',
    'MTN Mobile Money  *170#',
    'Telecel Cash  *110#',
    'AT Money  *110#',
    '6-month written shop warranty',
    '15-minute Ghana Card verification',
    'Factory unlocked, clean IMEI'
  ];

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-container">
            <div className="hero-text-col">
              <div className="hero-kicker">
                <img src="/logo.jpg" alt="Paindem Smart Cells" className="hero-kicker-logo" />
                <span>Ghana Card Hire-Purchase • Pay Small Small</span>
              </div>

              <h1 className="hero-heading">
                Your dream iPhone.<br />
                <span className="hero-gradient-text">Pay small small.</span>
              </h1>

              <div className="hero-slogan-row">
                <span className="hero-slogan-rule" aria-hidden="true"></span>
                <span className="hero-slogan-text">{STORE_CONFIG.slogan}</span>
              </div>

              <p className="hero-subheading">
                Walk in with your <strong>Ghana Card</strong> and a <strong>40% deposit</strong>.
                Walk out with the phone. Spread the balance <strong>daily, weekly or monthly</strong>{' '}
                on Mobile Money.
              </p>

              {/* Compact proof chips. These replaced a paragraph box — same promise,
                  a fraction of the vertical space, and it scans in one glance. */}
              <ul className="hero-proof-chips">
                <li><Check size={13} /> No guarantor</li>
                <li><Check size={13} /> No payslip</li>
                <li><Check size={13} /> No bank statement</li>
                <li><Check size={13} /> 15-min approval</li>
              </ul>

              <div className="hero-action-buttons">
                <Link to="/calculator" className="btn-pill btn-pill-gold">
                  <span>Calculate MoMo Installment</span>
                  <ArrowRight size={17} />
                </Link>
                <Link to="/all-iphones" className="btn-pill btn-pill-glass">
                  <span>Explore 38+ Models</span>
                </Link>
              </div>

              {/* Quick Real Math Card */}
              <div className="hero-example-card">
                <div className="example-card-header">
                  <div className="example-card-title">Live Example: {exampleModel}</div>
                  <span className="badge-promo"><Sparkles size={11} /> Clean UK Import</span>
                </div>
                <div className="example-math-row">
                  <div className="math-pill">
                    <span className="math-label">Deposit Today</span>
                    <span className="math-number color-deposit">{formatGHS(exampleDeposit)}</span>
                  </div>
                  <div className="math-divider">+</div>
                  <div className="math-pill">
                    <span className="math-label">Daily MoMo (84d)</span>
                    <span className="math-number color-weekly">{formatGHS(exampleDaily)} / day</span>
                  </div>
                  <div className="math-divider">or</div>
                  <div className="math-pill">
                    <span className="math-label">Weekly MoMo (12w)</span>
                    <span className="math-number color-weekly">{formatGHS(exampleWeekly)} / wk</span>
                  </div>
                </div>
                <a 
                  href={heroWhatsAppUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp hero-whatsapp-quick"
                >
                  <WhatsAppIcon size={17} />
                  <span>Order on WhatsApp for Instant Pickup or Dispatch</span>
                </a>
              </div>
            </div>

            {/* Real Product Photography Stage with Devbox Glassmorphism Transaction Badges */}
            <div className="hero-image-col">
              <div className="hero-image-backdrop"></div>
              
              <div className="hero-device-wrapper">
                <HeroDevice />

                {/* Floating Glassmorphism Transaction Badge 1 (Top Left) */}
                <div className="hero-glass-card hero-glass-card-top">
                  <div className="glass-card-header">
                    <span className="glass-badge-status">
                      <span className="glass-pulse-dot"></span>
                      Order Approved
                    </span>
                    <span className="glass-card-time">Just now</span>
                  </div>
                  <div className="glass-card-amount">GH₵ 2,480.00</div>
                  <div className="glass-card-subtitle">iPhone 16 Pro Max · 40% Deposit</div>
                  <div className="glass-pill-tag">
                    <CheckCircle2 size={12} /> Ghana Card Verified ✓
                  </div>
                </div>

                {/* Floating Glassmorphism Transaction Badge 2 (Bottom Right) */}
                <div className="hero-glass-card hero-glass-card-bottom">
                  <div className="glass-card-header">
                    <span className="glass-badge-status" style={{ color: '#38bdf8' }}>
                      <Truck size={13} />
                      VIP Dispatch
                    </span>
                    <span className="glass-card-time">Live</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                    En Route to Kumasi
                  </div>
                  <div className="glass-card-subtitle">MTN MoMo (*170#) · Tracked</div>
                  <div className="glass-pill-tag" style={{ background: 'rgba(52, 211, 153, 0.16)', borderColor: 'rgba(52, 211, 153, 0.3)', color: '#34d399' }}>
                    <Shield size={12} /> 6-Month Warranty
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Devbox-inspired Hairline Divided Stats Strip */}
          <div className="hero-stats-strip">
            <HeroStat value={40} suffix="%" label="Minimum Down Payment" />
            <HeroStat value={16} label="Regions Delivered Nationwide" />
            <HeroStat value={0} label="Guarantors or Payslips Needed" />
          </div>
        </div>
      </section>

      {/* Devbox-inspired Infinite Region & Network Marquee Ticker */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx} className="marquee-item">
              <span className="marquee-dot"></span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
