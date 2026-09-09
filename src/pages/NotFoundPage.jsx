import React from 'react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { Link } from 'react-router-dom';
import { STORE_CONFIG } from '../data/config';
import { Smartphone, Calculator, Home } from 'lucide-react';

/**
 * Previously any unknown route silently redirected to "/", which hides broken links from
 * the client and looks like the site swallowed the click.
 */
export default function NotFoundPage() {
  const waUrl = STORE_CONFIG.makeWhatsAppLink(
    "Hello Paindem Smart Cells! 👋 I was looking for something on your website and couldn't find it. Can you help?"
  );

  return (
    <div className="notfound-page">
      <div className="container notfound-inner">
        <div className="notfound-code" aria-hidden="true">404</div>
        <h1 className="notfound-title">We couldn't find that page</h1>
        <p className="notfound-desc">
          The link may be old or mistyped. Everything is still here — pick up from one of
          these, or just message us and we'll point you to the right phone.
        </p>

        <div className="notfound-actions">
          <Link to="/all-iphones" className="btn btn-primary btn-large">
            <Smartphone size={18} />
            <span>Browse all iPhones</span>
          </Link>
          <Link to="/calculator" className="btn btn-secondary">
            <Calculator size={16} />
            <span>Price calculator</span>
          </Link>
          <Link to="/" className="btn btn-secondary">
            <Home size={16} />
            <span>Home</span>
          </Link>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp notfound-wa"
        >
          <WhatsAppIcon size={18} />
          <span>Ask us on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
