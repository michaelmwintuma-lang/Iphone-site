import React, { useMemo, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Link } from 'react-router-dom';
import { IPHONES, calculateInstallment, formatGHS, formatGHSExact } from '../data/phones';
import { STORE_CONFIG } from '../data/config';
import PhoneImage from './PhoneImage';
import { Wallet, ArrowRight, Search, TrendingUp } from 'lucide-react';

/**
 * The catalog asks "which phone?" — but a customer who knows they can spare GH₵ 60 a day
 * doesn't know which phone that buys. This flips the question: enter what you can pay,
 * see what you can take home.
 */

const CADENCES = {
  daily: { label: 'per day', min: 20, max: 400, step: 5, default: 60, noun: 'day' },
  weekly: { label: 'per week', min: 100, max: 2500, step: 25, default: 400, noun: 'week' },
  monthly: { label: 'per month', min: 500, max: 9000, step: 100, default: 1500, noun: 'month' }
};

export default function AffordabilityFinder({ compact = false }) {
  const [frequency, setFrequency] = useState('daily');
  const [budget, setBudget] = useState(CADENCES.daily.default);

  const cadence = CADENCES[frequency];

  const switchFrequency = next => {
    setFrequency(next);
    setBudget(CADENCES[next].default);
  };

  const { affordable, nextUp } = useMemo(() => {
    const priced = IPHONES.map(phone => ({
      phone,
      plan: calculateInstallment(phone.price, phone.depositPercent, frequency)
    }));

    const within = priced
      .filter(({ plan }) => plan.installment <= budget)
      .sort((a, b) => b.phone.price - a.phone.price);

    // If nothing fits, show the single cheapest option so the screen is never a dead end.
    const above = priced
      .filter(({ plan }) => plan.installment > budget)
      .sort((a, b) => a.plan.installment - b.plan.installment)[0];

    return { affordable: within, nextUp: above };
  }, [frequency, budget]);

  const best = affordable[0];

  return (
    <section className={`afford-section ${compact ? 'afford-compact' : ''}`} id="what-can-i-afford">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-kicker">
            <Wallet size={15} className="inline-icon" /> Start From Your Pocket, Not The Price Tag
          </div>
          <h2 className="section-title">What can I afford?</h2>
          <p className="section-subtitle">
            Tell us what you can comfortably pay. We'll show you every iPhone you can take
            home today — deposit and all.
          </p>
        </div>

        <div className="afford-panel">
          <div className="afford-controls">
            <div className="afford-freq-row" role="group" aria-label="Payment frequency">
              {Object.entries(CADENCES).map(([key, cfg]) => (
                <button
                  key={key}
                  type="button"
                  className={`afford-freq-btn ${frequency === key ? 'active' : ''}`}
                  onClick={() => switchFrequency(key)}
                >
                  {cfg.label}
                </button>
              ))}
            </div>

            <div className="afford-budget-display">
              <span className="afford-budget-prefix">I can pay</span>
              <span className="afford-budget-amount">{formatGHS(budget)}</span>
              <span className="afford-budget-suffix">{cadence.label}</span>
            </div>

            <input
              type="range"
              className="calc-slider afford-slider"
              min={cadence.min}
              max={cadence.max}
              step={cadence.step}
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              aria-label={`Budget ${cadence.label}`}
            />

            <div className="afford-slider-ends">
              <span>{formatGHS(cadence.min)}</span>
              <span>{formatGHS(cadence.max)}+</span>
            </div>

            <div className="afford-result-line">
              {affordable.length > 0 ? (
                <>
                  <TrendingUp size={17} className="text-green" />
                  <span>
                    <strong>{affordable.length}</strong> of {IPHONES.length} iPhones fit that
                    budget. Best one you can get:{' '}
                    <strong className="text-cyan">{best.phone.name}</strong>
                  </span>
                </>
              ) : (
                <>
                  <Search size={17} className="text-gold" />
                  <span>
                    Nothing at {formatGHS(budget)} {cadence.label} yet — the cheapest plan is{' '}
                    <strong className="text-cyan">
                      {formatGHSExact(nextUp.plan.installment)} per {cadence.noun}
                    </strong>{' '}
                    for the {nextUp.phone.name}.
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          {affordable.length > 0 ? (
            <div className="afford-results-grid">
              {affordable.slice(0, compact ? 6 : 12).map(({ phone, plan }, idx) => (
                <Link
                  to={`/iphone/${phone.slug}`}
                  key={phone.id}
                  className={`afford-result-card ${idx === 0 ? 'is-best' : ''}`}
                >
                  {idx === 0 && <span className="afford-best-flag">Best you can get</span>}
                  <PhoneImage
                    src={phone.image}
                    alt={phone.name}
                    className="afford-card-img"
                    width={120}
                  />
                  <div className="afford-card-body">
                    <h4 className="afford-card-name">{phone.name}</h4>
                    <p className="afford-card-cond">
                      {phone.isNew ? 'Brand New (Sealed)' : 'Clean UK Used (Grade A+)'}
                    </p>
                    <div className="afford-card-nums">
                      <div className="afford-num">
                        <span className="afford-num-label">Deposit today</span>
                        <strong className="color-deposit">{formatGHS(plan.deposit)}</strong>
                      </div>
                      <div className="afford-num">
                        <span className="afford-num-label">Then per {cadence.noun}</span>
                        <strong className="color-weekly">{formatGHSExact(plan.installment)}</strong>
                      </div>
                    </div>
                    <span className="afford-card-link">
                      See full plan <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="afford-empty">
              <PhoneImage
                src={nextUp.phone.image}
                alt={nextUp.phone.name}
                className="afford-empty-img"
                width={110}
              />
              <div>
                <h4>Closest option: {nextUp.phone.name}</h4>
                <p>
                  {formatGHS(nextUp.plan.deposit)} deposit, then{' '}
                  {formatGHSExact(nextUp.plan.installment)} per {cadence.noun}. Nudge the
                  slider up slightly, or chat with us about a bigger deposit to bring the
                  instalment down.
                </p>
                <a
                  href={STORE_CONFIG.makeWhatsAppLink(
                    `Hello Paindem Smart Cells! 👋 I can afford about ${formatGHS(budget)} ${cadence.label}. Which iPhone can I take home on that budget?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <WhatsAppIcon size={17} />
                  <span>Ask what fits my budget</span>
                </a>
              </div>
            </div>
          )}

          {affordable.length > (compact ? 6 : 12) && (
            <div className="text-center afford-more">
              <Link to="/all-iphones" className="btn btn-secondary">
                <span>See all {affordable.length} that fit your budget</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
