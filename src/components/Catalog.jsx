import React, { useState, useMemo } from 'react';
import { IPHONES, calculateInstallment, formatGHS } from '../data/phones';
import ProductCard from './ProductCard';
import WhatsAppIcon from './WhatsAppIcon';
import { STORE_CONFIG } from '../data/config';
import { Search, SlidersHorizontal, Sparkles, AlertCircle, Wallet } from 'lucide-react';

export default function Catalog({ hideHeader = false }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [maxDeposit, setMaxDeposit] = useState(10000); // GH₵ filter ceiling

  // Compute highest possible deposit in catalog for slider max
  const hardMax = useMemo(
    () => Math.max(...IPHONES.map(p => Math.round(p.price * (p.depositPercent / 100)))),
    []
  );

  const filteredPhones = useMemo(() => {
    return IPHONES.filter(phone => {
      let matchesFilter = true;
      if (activeFilter === 'uk-used') matchesFilter = !phone.isNew;
      else if (activeFilter === 'brand-new') matchesFilter = phone.isNew;
      else if (activeFilter === '17') matchesFilter = phone.series === '17';
      else if (activeFilter === '16') matchesFilter = phone.series === '16';
      else if (activeFilter === '15') matchesFilter = phone.series === '15';
      else if (activeFilter === '14') matchesFilter = phone.series === '14';
      else if (activeFilter === 'legacy') matchesFilter = ['13', '12', '11', 'SE'].includes(phone.series);

      const searchTerms = `${phone.name} ${phone.storage} ${phone.color} ${phone.condition}`.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' || searchTerms.includes(searchQuery.toLowerCase().trim());

      // Deposit budget filter
      const deposit = Math.round(phone.price * (phone.depositPercent / 100));
      const matchesBudget = deposit <= maxDeposit;

      return matchesFilter && matchesSearch && matchesBudget;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'deposit-asc') {
        const depA = Math.round(a.price * (a.depositPercent / 100));
        const depB = Math.round(b.price * (b.depositPercent / 100));
        return depA - depB;
      }
      return 0;
    });
  }, [activeFilter, searchQuery, sortBy, maxDeposit]);

  const depositBudgetActive = maxDeposit < hardMax;

  return (
    <section className="catalog-section" id="catalog">
      <div className="container">
        {!hideHeader && (
          <div className="section-head text-center">
            <div className="section-kicker">
              <Sparkles size={14} /> Full Apple Inventory (11 to 17 Pro)
            </div>
            <h2 className="section-title">All iPhones (UK Used &amp; Brand New)</h2>
            <p className="section-subtitle">
              Most of our phones in stock are tested <strong>Clean UK Used (Grade A+)</strong> with 85%+ original battery health and 6-month shop warranties. We also stock <strong>Brand New (factory sealed) iPhones</strong> — for details, available colors, and reservations on new phones, contact us directly on WhatsApp.
            </p>
          </div>
        )}

        {/* Toolbar: Filter Pills, Search Bar, Sort */}
        <div className="catalog-toolbar-wrapper">
          <div className="filter-pill-list">
            <button
              className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All iPhones ({IPHONES.length})
            </button>
            <button
              className={`filter-pill ${activeFilter === 'uk-used' ? 'active' : ''}`}
              onClick={() => setActiveFilter('uk-used')}
            >
              Clean UK Used (Grade A+)
            </button>
            <button
              className={`filter-pill ${activeFilter === 'brand-new' ? 'active' : ''}`}
              onClick={() => setActiveFilter('brand-new')}
            >
              Brand New (Sealed)
            </button>
            <button
              className={`filter-pill ${activeFilter === '17' ? 'active' : ''}`}
              onClick={() => setActiveFilter('17')}
            >
              iPhone 17
            </button>
            <button
              className={`filter-pill ${activeFilter === '16' ? 'active' : ''}`}
              onClick={() => setActiveFilter('16')}
            >
              iPhone 16
            </button>
            <button
              className={`filter-pill ${activeFilter === '15' ? 'active' : ''}`}
              onClick={() => setActiveFilter('15')}
            >
              iPhone 15
            </button>
            <button
              className={`filter-pill ${activeFilter === '14' ? 'active' : ''}`}
              onClick={() => setActiveFilter('14')}
            >
              iPhone 14
            </button>
            <button
              className={`filter-pill ${activeFilter === 'legacy' ? 'active' : ''}`}
              onClick={() => setActiveFilter('legacy')}
            >
              iPhone 13, 12, 11 &amp; SE
            </button>
          </div>

          <div className="search-sort-bar">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by model or storage (e.g. 15 Pro, 256GB)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="sort-box">
              <SlidersHorizontal size={16} className="sort-icon" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured / Best Value</option>
                <option value="price-asc">Price: Lowest First</option>
                <option value="price-desc">Price: Highest First</option>
                <option value="deposit-asc">Lowest Down Payment</option>
              </select>
            </div>
          </div>

          {/* Deposit budget slider */}
          <div className="catalog-budget-bar">
            <div className="budget-bar-label">
              <Wallet size={15} className="budget-bar-icon" />
              <span>
                Max deposit I can pay today:{' '}
                <strong className={depositBudgetActive ? 'text-cyan' : ''}>
                  {depositBudgetActive ? formatGHS(maxDeposit) : 'Any amount'}
                </strong>
              </span>
              {depositBudgetActive && (
                <button
                  type="button"
                  className="budget-clear-btn"
                  onClick={() => setMaxDeposit(hardMax)}
                >
                  Clear
                </button>
              )}
            </div>
            <input
              type="range"
              min={500}
              max={hardMax}
              step={100}
              value={maxDeposit}
              onChange={e => setMaxDeposit(Number(e.target.value))}
              className="calc-slider catalog-budget-slider"
              aria-label="Maximum deposit budget"
            />
            <div className="budget-slider-ends">
              <span>GH₵ 500</span>
              <span>{formatGHS(hardMax)}+</span>
            </div>
          </div>

          <div className="results-indicator">
            Showing <strong>{filteredPhones.length}</strong> available iPhones in stock
            (Ready for Circle pickup or nationwide delivery)
          </div>
        </div>

        {/* Brand New Advisory Banner when filtering by Brand New */}
        {activeFilter === 'brand-new' && (
          <div className="brand-new-catalog-card">
            <div className="bn-card-content">
              <div className="bn-card-badge">
                <Sparkles size={14} /> Brand New (Factory Sealed Box)
              </div>
              <h3 className="bn-card-title">Inquiring About Brand New iPhones?</h3>
              <p className="bn-card-desc">
                Most phones in our active stock are <strong>Clean UK Used (Grade A+)</strong>.
                We also stock and source <strong>Brand New (factory sealed in original box) iPhones</strong> with 1-Year official Apple warranties.
                Because shipment batches, colors, and down payment rates vary with current import cargo, <strong>contact our sales desk on WhatsApp</strong> for up-to-the-minute sealed inventory, color availability, and immediate reservations.
              </p>
            </div>
            <a
              href={STORE_CONFIG.makeWhatsAppLink(
                "Hello Paindem Smart Cells! 👋 I want to ask about your Brand New (Factory Sealed) iPhones on Buy Now, Pay Later. What sealed models and colors do you have in stock?"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp bn-card-btn"
            >
              <WhatsAppIcon size={18} />
              <span>Inquire for Brand New Details</span>
            </a>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredPhones.length > 0 ? (
          <div className="products-grid">
            {filteredPhones.map(phone => (
              <ProductCard key={phone.id} phone={phone} />
            ))}
          </div>
        ) : (
          <div className="empty-catalog-state">
            <AlertCircle size={40} className="empty-icon" />
            <h3>
              {searchQuery
                ? `No iPhones found matching "${searchQuery}"`
                : `No iPhones fit a deposit under ${formatGHS(maxDeposit)}`}
            </h3>
            <p>
              {searchQuery
                ? 'Try clearing your search or picking another filter category.'
                : 'Try nudging the deposit slider up, or pick a lower-cost model.'}
            </p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
                setMaxDeposit(hardMax);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
