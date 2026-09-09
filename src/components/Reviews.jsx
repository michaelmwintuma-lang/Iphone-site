import React from 'react';
import { Star, CheckCircle, MapPin } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Kwame Addo",
    location: "East Legon, Accra",
    device: "iPhone 15 Pro Max (256GB)",
    comment: "Needed the 15 Pro Max for my video editing and photography gig. Paying almost GH₵ 16,000 outright would have hurt my working capital. With Paindem Smart Cells, I paid 40% deposit and took the phone home that afternoon. Weekly MTN MoMo payments are super convenient.",
    initials: "KA"
  },
  {
    id: 2,
    name: "Esi Appiah",
    location: "Circle, Accra",
    device: "iPhone 14 (128GB)",
    comment: "Walked directly into their shop on Circle opposite the Vodafone Office. Traded in my old iPhone 11 and got a great valuation that covered most of my deposit for an iPhone 14. They gave me a stamped 6-month warranty receipt. 100% genuine shop.",
    initials: "EA"
  },
  {
    id: 3,
    name: "Michael Osei",
    location: "Legon Campus / Spintex",
    device: "iPhone 13 (128GB)",
    comment: "As a university student, saving up 6,000 cedis at once is tough. Their Pay Small Small scheme let me pay GH₵ 2,360 today and spread the rest over 12 weekly MoMo payments. No guarantor needed, just my Ghana Card.",
    initials: "MO"
  }
];

export default function Reviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-kicker">Real Customer Experiences</div>
          <h2 className="section-title">What People in Accra Are Saying</h2>
          <p className="section-subtitle">
            Honest feedback from professionals, creators, and students who bought their iPhones through our installment scheme.
          </p>
        </div>

        <div className="reviews-grid">
          {REVIEWS_DATA.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" />
                ))}
              </div>

              <p className="review-text">"{review.comment}"</p>

              <div className="review-author-row">
                <div className="author-avatar">{review.initials}</div>
                <div className="author-details">
                  <div className="author-name">
                    <strong>{review.name}</strong>
                    <CheckCircle size={14} className="verified-badge" />
                  </div>
                  <div className="author-meta">
                    <MapPin size={12} /> {review.location} • <span className="text-cyan">{review.device}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
