import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

const FAQ_DATA = [
  {
    q: "What do I need to buy an iPhone on Buy Now, Pay Later?",
    a: "The ONLY thing you need is your valid Ghana Card and your down payment (40% or 60%). No guarantor, no payslips, no employer letter, and no bank vetting are required. You can pay your deposit and installments via Mobile Money or Bank Transfer."
  },
  {
    q: "Do you deliver outside Accra to other regions in Ghana?",
    a: "Yes, we deliver nationwide across all 16 regions of Ghana (Kumasi, Takoradi, Tamale, Sunyani, Cape Coast, Ho, Koforidua, Bolgatanga, and more). Send a photo of your Ghana Card and your down payment via WhatsApp. We safely package and dispatch your phone via secure courier or VIP/STC parcel with immediate waybill details."
  },
  {
    q: "Can I pay daily instead of weekly, and do you take bank transfer?",
    a: "Yes! You get to select the payment speed that works best for your pocket: Daily, Weekly, or Monthly. We accept all Ghanaian Mobile Money networks (MTN MoMo *170#, Telecel Cash *110#, AT Money) as well as direct Bank Transfer from all Ghana commercial banks and rural banks."
  },
  {
    q: "Are the phones UK used or brand new?",
    a: "Most of our phones in stock are premium Clean UK Used (Grade A+) iPhones with tested 85%+ original Apple battery health, clean iCloud, factory unlocked for all Ghanaian networks, and our 6-month written shop warranty. However, we also have Brand New (factory sealed in original box) iPhones in stock! For current pricing, color availability, down payment terms, and orders for Brand New iPhones, please contact our team directly via WhatsApp so we can confirm current sealed shipment inventory."
  },
  {
    q: "How much is the initial down payment and how is it calculated?",
    a: "The down payment is calculated as a clear percentage of the cash price: 40% for Clean UK Used iPhones (iPhone 11 through 15 Series) and 60% for Brand New factory-sealed flagships (iPhone 16 and 17 Pro Series). For example: On an iPhone 15 listed at GH₵ 6,200, the 40% deposit is exactly GH₵ 6,200 × 0.40 = GH₵ 2,480. You pay this GH₵ 2,480 today with your Ghana Card and take the phone home immediately. The remaining GH₵ 3,720 is spread comfortably over daily, weekly, or monthly installments."
  },
  {
    q: "Can I pay off my remaining balance early?",
    a: "Yes, 100%! If you get money ahead of time and want to clear your balance, you can pay it all off early with ZERO penalty or surcharge."
  },
  {
    q: "What warranty comes with the phone?",
    a: "Every single phone comes with our official 6-Month Shop Warranty. If a hardware defect, camera issue, or screen problem develops through normal use, walk into our Circle shop or contact us and we fix or replace it."
  },
  {
    q: "What is the legal framework behind the purchase?",
    a: "All installment purchases are structured under Ghana's Hire Purchase Act, 1974 (NRCD 292). You are fully protected under Ghanaian consumer law, and full legal ownership passes to you once the last installment is paid."
  }
];

export default function Faq({ hideHeader = false }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleQuestion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        {!hideHeader && (
          <div className="section-head text-center">
            <div className="section-kicker">
              <HelpCircle size={15} /> Clear Questions & Answers
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about Ghana Card verification, nationwide delivery, and payment options.
            </p>
          </div>
        )}

        <div className="faq-accordion-list">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-card ${isOpen ? 'active' : ''}`}>
                <h3 className="faq-question-heading">
                  <button
                    type="button"
                    id={`faq-q-${idx}`}
                    className="faq-question-btn"
                    onClick={() => toggleQuestion(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${idx}`}
                  >
                    <span className="faq-question-text">{item.q}</span>
                    <ChevronDown size={20} className={`faq-arrow ${isOpen ? 'rotate' : ''}`} />
                  </button>
                </h3>

                {/* Kept mounted and hidden rather than unmounted, so browser find-in-page
                    and search engines can still reach the answers. */}
                <div
                  id={`faq-a-${idx}`}
                  role="region"
                  aria-labelledby={`faq-q-${idx}`}
                  className="faq-answer-body"
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-legal-box">
          <ShieldCheck size={20} className="text-cyan" />
          <span>
            <strong>Hire Purchase Act 1974 (NRCD 292):</strong> Transactions comply strictly with Ghanaian consumer credit regulations. Data Protection Act, 2012 (Act 843) compliant.
          </span>
        </div>
      </div>
    </section>
  );
}
