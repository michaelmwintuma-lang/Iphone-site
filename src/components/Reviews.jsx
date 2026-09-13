import React, { useState } from 'react';
import { Star, MapPin, ChevronDown, Check } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Kwame Addo',
    location: 'East Legon, Accra',
    device: 'iPhone 15 Pro Max (256GB)',
    tag: 'Verified MoMo Plan',
    date: '3 days ago',
    comment:
      'I needed the 15 Pro Max for video editing and client shoots. Paying GH₵ 15,800 outright would have completely frozen my working capital. Paid 40% deposit and left the Circle shop that same afternoon. The weekly MTN MoMo schedule is super manageable.',
    initials: 'KA',
    stars: 5,
  },
  {
    id: 2,
    name: 'Esi Appiah',
    location: 'Circle, Accra',
    device: 'iPhone 14 (128GB)',
    tag: 'Circle Store Pickup',
    date: '1 week ago',
    comment:
      'Walked in and traded my old iPhone 11. Their technician inspected it in front of me and the valuation covered almost half my deposit on the 14. Left with a signed 6-month shop receipt and clean battery health.',
    initials: 'EA',
    stars: 5,
  },
  {
    id: 3,
    name: 'Michael Osei',
    location: 'Legon Campus, Accra',
    device: 'iPhone 13 (128GB)',
    tag: 'Student Verified',
    date: '2 weeks ago',
    comment:
      'Saving GH₵ 3,900 at once as a university student was difficult. Deposited GH₵ 1,560 and spread the rest over 12 weeks. Shop was busy around 2 PM so verification took about 25 minutes instead of 15, but staff were honest and the phone has been flawless.',
    initials: 'MO',
    stars: 4,
  },
  {
    id: 4,
    name: 'Abena Sarpong',
    location: 'Kumasi, Ashanti',
    device: 'iPhone 15 (128GB)',
    tag: 'VIP Parcel Delivery',
    date: '3 weeks ago',
    comment:
      'I was initially skeptical about sending money from Kumasi, but they sent the VIP parcel waybill number the same evening. Arrived securely packaged, IMEI unlocked for MTN, and battery was at 92%.',
    initials: 'AS',
    stars: 5,
  },
  {
    id: 5,
    name: 'Yaw Boateng',
    location: 'Spintex Road, Accra',
    device: 'iPhone 16 Pro (128GB)',
    tag: 'Early Payoff',
    date: '1 month ago',
    comment:
      'Needed a strong phone for logistics and map tracking. Picked the 60% plan and ended up clearing the balance in 2 months instead of 3. Zero penalty for paying early, which is rare with hire purchase in Ghana.',
    initials: 'YB',
    stars: 5,
  },
  {
    id: 6,
    name: 'Adwoa Mensah',
    location: 'Takoradi, Western Region',
    device: 'iPhone 12 (128GB)',
    tag: 'VIP Delivery',
    date: '2 months ago',
    comment:
      'My sister and I both got our phones through Paindem. They sent video proof of battery health and camera testing before dispatching via VIP bus. Received at the Takoradi station the next morning.',
    initials: 'AM',
    stars: 5,
  },
];

export default function Reviews() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? REVIEWS_DATA : REVIEWS_DATA.slice(0, 3);

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-kicker">Real Customer Experiences</div>
          <h2 className="section-title">What People in Accra &amp; Beyond Are Saying</h2>
          <p className="section-subtitle">
            Students, traders, nurses, drivers — verified customers who paid their deposit and
            picked up their phone.
          </p>
        </div>

        <div className="reviews-grid">
          {visible.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-card-top-meta">
                <div className="review-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.stars ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
                <span className="review-date">{review.date}</span>
              </div>

              <p className="review-text">"{review.comment}"</p>

              <div className="review-author-row">
                <div className="author-avatar">
                  {review.initials}
                </div>
                <div className="author-details">
                  <div className="author-name">
                    <strong>{review.name}</strong>
                    <span className="review-verified-badge">
                      <Check size={11} /> {review.tag}
                    </span>
                  </div>
                  <div className="author-meta">
                    <MapPin size={11} />
                    {review.location}
                    <span className="meta-sep">·</span>
                    <span className="author-device-name">{review.device}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!expanded && (
          <div className="reviews-show-more">
            <button
              type="button"
              className="btn btn-secondary reviews-more-btn"
              onClick={() => setExpanded(true)}
            >
              <span>Read {REVIEWS_DATA.length - 3} more</span>
              <ChevronDown size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
