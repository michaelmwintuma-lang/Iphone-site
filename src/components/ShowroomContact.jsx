import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { STORE_CONFIG } from '../data/config';
import { MapPin, Phone, Clock, Mail, Navigation, Truck } from 'lucide-react';

export default function ShowroomContact({ hideHeader = false }) {
  const directWhatsAppUrl = STORE_CONFIG.makeWhatsAppLink(
    "Hello Paindem Smart Cells! 👋 I want to order an iPhone with Ghana Card down payment. Please confirm availability for shop pickup or delivery to my region."
  );

  return (
    <section className="showroom-section" id="showroom">
      <div className="container">
        {!hideHeader && (
          <div className="section-head text-center">
            <div className="section-kicker">
              <MapPin size={15} /> Visit Shop or Order Delivery
            </div>
            <h2 className="section-title">Visit Our Circle Shop or Order Nationwide</h2>
            <p className="section-subtitle">
              Walk into our Circle showroom in Accra, or have your phone delivered straight to your doorstep or region anywhere in Ghana.
            </p>
          </div>
        )}

        <div className="showroom-grid">
          {/* Details Card */}
          <div className="showroom-info-card">
            <div className="showroom-info-block">
              <div className="info-icon-wrapper">
                <MapPin size={22} className="text-cyan" />
              </div>
              <div>
                <h4>Accra Showroom Address</h4>
                <p className="address-text">{STORE_CONFIG.contact.address}</p>
                <p className="landmark-text">
                  <Navigation size={13} className="inline-icon text-cyan" /> {STORE_CONFIG.contact.landmark}
                </p>
              </div>
            </div>

            <div className="showroom-info-block">
              <div className="info-icon-wrapper">
                <Truck size={22} className="text-green" />
              </div>
              <div>
                <h4>Nationwide Delivery Service</h4>
                <p className="address-text">All 16 Regions in Ghana Covered</p>
                <p className="landmark-text">
                  Kumasi, Takoradi, Tamale, Cape Coast, Sunyani, Ho, Koforidua & more. Dispatched with tracking.
                </p>
              </div>
            </div>

            <div className="showroom-info-block">
              <div className="info-icon-wrapper">
                <Clock size={22} className="text-gold" />
              </div>
              <div>
                <h4>Opening Hours</h4>
                <p>{STORE_CONFIG.contact.hours.weekdays}</p>
                <p>{STORE_CONFIG.contact.hours.saturday}</p>
                <p className="text-green">{STORE_CONFIG.contact.hours.sunday}</p>
              </div>
            </div>

            <div className="showroom-info-block">
              <div className="info-icon-wrapper">
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>GH₵</span>
              </div>
              <div>
                <h4>Payment Channels Accepted</h4>
                <p className="address-text">MoMo &amp; Direct Bank Transfer</p>
                <p className="landmark-text">
                  MTN MoMo, Telecel Cash, AT Money, Bank Transfer (all Ghana banks), or in-shop cash/card.
                </p>
              </div>
            </div>

            <div className="showroom-info-block">
              <div className="info-icon-wrapper">
                <Phone size={22} className="text-green" />
              </div>
              <div>
                <h4>Phone & WhatsApp Line</h4>
                <p>
                  <a href="tel:0547537715" className="phone-link">054 753 7715</a> / <a href="tel:+233547537715" className="phone-link">+233 54 753 7715</a>
                </p>
                <p className="email-subtext">
                  <Mail size={13} className="inline-icon" /> {STORE_CONFIG.contact.email}
                </p>
              </div>
            </div>

            <a 
              href={directWhatsAppUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-whatsapp showroom-chat-btn"
            >
              <WhatsAppIcon size={20} />
              <span>Chat Direct with Sales Rep</span>
            </a>
          </div>

          {/* Embedded Google Map with Circle Directions Card */}
          <div className="showroom-map-card">
            <div className="map-overlay-badge">
              <div className="map-badge-main">
                <div className="map-pin-pulse"></div>
                <div>
                  <strong>KFC Circle, Accra</strong>
                  <span>Circle, Accra • Open Today 8:30 AM – 7:00 PM</span>
                </div>
              </div>
              <a 
                href="https://maps.google.com/?q=KFC+Circle+Accra+Ghana" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="map-directions-link"
              >
                Open in Google Maps ↗
              </a>
            </div>

            {/* Live Google Map of the Circle showroom */}
            <div className="map-canvas-visual">
              {/* Real embedded map. The previous hand-drawn SVG looked plausible but any
                  customer who knows Circle could tell it wasn't a real map.
                  Lazy-loaded so it costs nothing until scrolled into view. */}
              <iframe
                title="Paindem Smart Cells — KFC Circle, Accra — Opposite Vodafone Office"
                className="map-embed-frame"
                src="https://www.google.com/maps?q=KFC+Circle+Accra+Ghana&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>

              <div className="map-bottom-cta">
                <span>Directly opposite the Vodafone Office • Free parking on site</span>
                <a 
                  href="https://maps.google.com/?q=KFC+Circle+Accra+Ghana" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-map-full"
                >
                  <Navigation size={14} /> Get Turn-by-Turn Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
