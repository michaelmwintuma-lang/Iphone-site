import React from 'react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import PageHeader from '../components/PageHeader';
import Faq from '../components/Faq';
import { STORE_CONFIG } from '../data/config';
import { HelpCircle, Phone, Clock } from 'lucide-react';

export default function FaqPage() {
  const askRepWhatsAppUrl = STORE_CONFIG.makeWhatsAppLink(
    "Hello Paindem Smart Cells! 👋 I have a specific question about your installment terms and Ghana Card requirements. Could you assist me?"
  );

  return (
    <div className="faq-page-view">
      <PageHeader
        kicker="Answers to Common Questions"
        icon={HelpCircle}
        title="Frequently Asked Questions (FAQ)"
        description="Everything you need to know about the Ghana Card requirement, Daily/Weekly MoMo payments, nationwide delivery, and warranty."
      />

      {/* Main FAQ Accordion Component */}
      <Faq hideHeader={true} />

      {/* Direct Help Banner */}
      <section className="faq-support-banner-section">
        <div className="container">
          <div className="faq-support-box">
            <div className="support-info">
              <h3>Still Have Questions? Talk Directly to Our Team</h3>
              <p>
                Our customer service team at Circle is ready to help explain terms, check phone inventory, and calculate your exact payment breakdown.
              </p>
              <div className="support-chips">
                <span><Clock size={13} className="inline-icon" /> Mon–Sat: 8:30 AM – 7:00 PM</span>
                <span><Phone size={13} className="inline-icon" /> 054 753 7715</span>
              </div>
            </div>

            <div className="support-actions">
              <a 
                href={askRepWhatsAppUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp btn-large"
              >
                <WhatsAppIcon size={20} />
                <span>Chat with a Sales Rep on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
