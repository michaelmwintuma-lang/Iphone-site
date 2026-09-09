import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Link } from 'react-router-dom';
import { calculateInstallment, formatGHS, formatGHSExact } from '../data/phones';
import { STORE_CONFIG } from '../data/config';
import { X, GitCompare, ChevronUp, ChevronDown } from 'lucide-react';

const MAX_COMPARE = 3;

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [items, setItems] = useState([]);

  const value = useMemo(() => ({
    items,
    isCompared: id => items.some(p => p.id === id),
    isFull: items.length >= MAX_COMPARE,
    toggle: phone => setItems(prev => {
      if (prev.some(p => p.id === phone.id)) return prev.filter(p => p.id !== phone.id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, phone];
    }),
    remove: id => setItems(prev => prev.filter(p => p.id !== id)),
    clear: () => setItems([])
  }), [items]);

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used inside <CompareProvider>');
  return ctx;
}

const ROWS = [
  { label: 'Cash price', get: (p) => formatGHS(p.price) },
  { label: 'Deposit', get: (p, plan) => formatGHS(plan.deposit) },
  { label: 'Weekly', get: (p, plan) => `${formatGHSExact(plan.weekly)}/wk` },
  { label: 'Daily', get: (p, plan) => `${formatGHSExact(plan.daily)}/day` },
  { label: 'Storage', get: (p) => p.storage },
  { label: 'Battery', get: (p) => p.battery },
  { label: 'Screen', get: (p) => p.screen },
  { label: 'Condition', get: (p) => (p.isNew ? 'Brand New (Sealed)' : 'Clean UK Used (A+)') }
];

export default function CompareDrawer() {
  const { items, remove, clear } = useCompare();
  const [expanded, setExpanded] = useState(false);

  // The floating WhatsApp bubble sits bottom-right at a higher z-index and would print
  // straight over this drawer. Flag it on <body> so CSS can step it aside.
  useEffect(() => {
    document.body.classList.toggle('has-compare-drawer', items.length > 0);
    return () => document.body.classList.remove('has-compare-drawer');
  }, [items.length]);

  if (items.length === 0) return null;

  // Stays a slim bar until the customer asks to see the table. Auto-expanding covers the
  // very cards they are still picking from — and with one pick there is nothing to
  // compare against anyway.
  const showBody = expanded && items.length >= 2;

  const plans = items.map(p => calculateInstallment(p.price, p.depositPercent, 'weekly'));

  const waMessage =
    `Hello Paindem Smart Cells! 👋\n\nI'm comparing these iPhones and want advice:\n\n` +
    items.map((p, i) =>
      `• *${p.name}* (${p.storage}) — ${formatGHS(p.price)}, deposit ${formatGHS(plans[i].deposit)}, ${formatGHSExact(plans[i].weekly)}/week`
    ).join('\n') +
    `\n\nWhich one do you recommend, and what's in stock?`;

  return (
    <div className={`compare-drawer ${showBody ? '' : 'is-collapsed'}`}>
      <div className="compare-drawer-bar">
        {/* Thumbnails so the selection is visible without opening the table. */}
        <div className="compare-bar-thumbs">
          {items.map(p => (
            <span className="compare-bar-thumb" key={p.id}>
              <img src={p.image} alt={p.name} loading="lazy" />
              <button
                type="button"
                className="compare-bar-remove"
                onClick={() => remove(p.id)}
                aria-label={`Remove ${p.name} from comparison`}
              >
                <X size={11} />
              </button>
            </span>
          ))}
          {items.length < MAX_COMPARE && (
            <span className="compare-bar-slot">
              {items.length < 2 ? 'Pick 1 more' : '+'}
            </span>
          )}
        </div>

        <div className="compare-bar-actions">
          <button
            type="button"
            className="compare-toggle"
            onClick={() => setExpanded(e => !e)}
            aria-expanded={showBody}
            disabled={items.length < 2}
          >
            <GitCompare size={16} />
            <span>
              {items.length < 2 ? 'Add one more' : showBody ? 'Hide' : `Compare ${items.length}`}
            </span>
            {items.length >= 2 && (showBody ? <ChevronDown size={15} /> : <ChevronUp size={15} />)}
          </button>
          <button type="button" className="compare-clear" onClick={clear}>
            Clear
          </button>
        </div>
      </div>

      {showBody && (
        <div className="compare-drawer-body">
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col" className="compare-row-label">&nbsp;</th>
                  {/* Removal lives on the bar thumbnails above; a second × per column
                      just added clutter far from the thing it removes. */}
                  {items.map(p => (
                    <th scope="col" key={p.id} className="compare-head-cell">
                      <img src={p.image} alt="" className="compare-thumb" loading="lazy" />
                      <Link to={`/iphone/${p.slug}`} className="compare-name">{p.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(row => (
                  <tr key={row.label}>
                    <th scope="row" className="compare-row-label">{row.label}</th>
                    {items.map((p, i) => (
                      <td key={p.id} className="compare-cell">{row.get(p, plans[i])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <a
            href={STORE_CONFIG.makeWhatsAppLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp compare-wa-btn"
          >
            <WhatsAppIcon size={18} />
            <span>Ask which one suits me</span>
          </a>
        </div>
      )}
    </div>
  );
}
