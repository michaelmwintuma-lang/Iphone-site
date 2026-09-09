import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { STORE_CONFIG } from '../data/config';


export default function FloatingWhatsApp() {
  const floatUrl = STORE_CONFIG.makeWhatsAppLink(
    "Hello Paindem Smart Cells! 👋 I am browsing your iPhone website and have a question about the Pay Small Small scheme."
  );

  return (
    <aside aria-label="WhatsApp quick chat">
      <a 
        href={floatUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-wa-btn"
        aria-label="Chat with Paindem Smart Cells sales on WhatsApp"
      >
        <div className="wa-icon-box">
          <WhatsAppIcon size={24} />
          <span className="wa-online-dot"></span>
        </div>
        <span className="wa-label">Pay Small Small</span>
      </a>
    </aside>
  );
}
