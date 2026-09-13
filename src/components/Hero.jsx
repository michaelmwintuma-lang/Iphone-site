import React, { useEffect, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Link } from 'react-router-dom';
import { STORE_CONFIG } from '../data/config';
import { formatGHS } from '../data/phones';
import PhoneImage from './PhoneImage';
import { useCountUp } from '../hooks/useInView';
import { ArrowRight, Sparkles } from 'lucide-react';

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
    `Hello Paindem Smart Cells! 👋 I saw the ${exampleModel} on your Buy Now, Pay Later scheme (${formatGHS(exampleDeposit)} down payment). I have my Ghana Card and want it delivered / picked up.`
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
    'Ghana Bank Transfer Accepted',
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
                <span>Ghana Card Hire-Purchase • Buy Now, Pay Later</span>
              </div>

              <h1 className="hero-heading">
                Your dream iPhone.<br />
                <span className="hero-gold-text">Buy Now, Pay Later.</span>
              </h1>

              <p className="hero-subheading">
                Walk in with your <strong>Ghana Card</strong> and a <strong>40% down payment</strong>.
                Walk out with your iPhone the same day. Spread the rest <strong>daily, weekly, or monthly</strong>{' '}
                on MTN MoMo, Telecel Cash, or Bank Transfer — no guarantors, no payslips, no employer vetting.
              </p>

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

            {/* Clean Flagship Product Showcase */}
            <div className="hero-image-col">
              <div className="hero-image-backdrop"></div>
              
              <div className="hero-device-wrapper">
                <HeroDevice />
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
