import React, { useMemo, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { STORE_CONFIG } from '../data/config';
import {
  buildSchedule,
  formatScheduleDate,
  formatGHS,
  formatGHSExact
} from '../data/phones';
import { CalendarDays, Printer, ChevronDown } from 'lucide-react';

/** Today in yyyy-mm-dd, for the date input's default + min. */
function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60 * 1000).toISOString().slice(0, 10);
}

/**
 * Dated repayment table for a given plan. Daily plans run to 84 rows, so they collapse
 * to the first 14 with a "show all" toggle — nobody scrolls 84 rows on a phone.
 */
export default function PaymentSchedule({ plan, phoneName, compact = false }) {
  const [startDate, setStartDate] = useState(todayISO());
  const [expanded, setExpanded] = useState(false);

  const rows = useMemo(
    () => buildSchedule(plan, new Date(`${startDate}T00:00:00`)),
    [plan, startDate]
  );

  const collapseAfter = plan.frequency === 'daily' ? 14 : rows.length;
  const visibleRows = expanded ? rows : rows.slice(0, collapseAfter);
  const hiddenCount = rows.length - visibleRows.length;

  const cadence =
    plan.frequency === 'daily' ? 'every day' :
    plan.frequency === 'monthly' ? 'every month' : 'every week';

  // Only the first 6 rows go into WhatsApp — a 84-line message gets truncated by the app.
  const scheduleLines = rows
    .slice(0, 6)
    .map(r => `${r.index}. ${formatScheduleDate(r.date)} — ${formatGHSExact(r.amount)}`)
    .join('\n');

  const waMessage =
    `Hello Paindem Smart Cells! 👋\n\n` +
    `Please confirm this payment schedule for the *${phoneName}*:\n\n` +
    `• Deposit today (${plan.depositPercent}%): ${formatGHS(plan.deposit)}\n` +
    `• Then ${formatGHSExact(plan.installment)} ${cadence}, ${plan.periods} times\n` +
    `• First payment: ${formatScheduleDate(rows[0].date)}\n` +
    `• Last payment: ${formatScheduleDate(rows[rows.length - 1].date)}\n` +
    `First few due dates:\n${scheduleLines}\n` +
    (rows.length > 6 ? `…and ${rows.length - 6} more.\n` : '') +
    `\nI have my Ghana Card ready. Please confirm stock and how to start.`;

  return (
    <div className={`schedule-card ${compact ? 'schedule-compact' : ''}`}>
      <div className="schedule-head">
        <div className="schedule-head-text">
          <h3 className="schedule-title">
            <CalendarDays size={18} className="text-cyan" />
            <span>Your exact payment dates</span>
          </h3>
          <p className="schedule-sub">
            {formatGHSExact(plan.installment)} {cadence} for {plan.periods}{' '}
            {plan.frequency === 'daily' ? 'days' : plan.frequency === 'monthly' ? 'months' : 'weeks'}.
          </p>
        </div>

        <label className="schedule-date-field">
          <span>Start from</span>
          <input
            type="date"
            value={startDate}
            min={todayISO()}
            onChange={e => setStartDate(e.target.value)}
            className="schedule-date-input"
          />
        </label>
      </div>

      <div className="schedule-table-wrap">
        <table className="schedule-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Due date</th>
              <th scope="col">Amount</th>
              <th scope="col" className="schedule-col-remaining">Left after</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map(row => (
              <tr key={row.index}>
                <td className="schedule-index">{row.index}</td>
                <td className="schedule-date">{formatScheduleDate(row.date)}</td>
                <td className="schedule-amount">{formatGHSExact(row.amount)}</td>
                <td className="schedule-col-remaining schedule-remaining">
                  {row.remaining === 0 ? (
                    <span className="schedule-paid-off">Paid off ✓</span>
                  ) : (
                    formatGHS(row.remaining)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          className="schedule-expand-btn"
          onClick={() => setExpanded(true)}
        >
          <ChevronDown size={16} />
          <span>Show all {rows.length} payment dates</span>
        </button>
      )}

      <div className="schedule-total-strip">
        <div className="schedule-total-item">
          <span className="schedule-total-label">Deposit today</span>
          <strong className="schedule-total-value color-deposit">{formatGHS(plan.deposit)}</strong>
        </div>
        <div className="schedule-total-item">
          <span className="schedule-total-label">Each payment</span>
          <strong className="schedule-total-value color-weekly">{formatGHSExact(plan.installment)}</strong>
        </div>
        <div className="schedule-total-item schedule-total-final">
          <span className="schedule-total-label">Number of payments</span>
          <strong className="schedule-total-value">{plan.periods}</strong>
        </div>
      </div>

      <div className="schedule-actions">
        <a
          href={STORE_CONFIG.makeWhatsAppLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp schedule-wa-btn"
        >
          <WhatsAppIcon size={18} />
          <span>Send this schedule to my WhatsApp</span>
        </a>
        <button
          type="button"
          className="btn btn-secondary schedule-print-btn"
          onClick={() => window.print()}
        >
          <Printer size={16} />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
}
