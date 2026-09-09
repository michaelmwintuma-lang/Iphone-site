import React, { useState, useMemo } from 'react';
import { IPHONES } from '../data/phones';
import ProductCard from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';

export default function Catalog({ hideHeader = false }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

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

      return matchesFilter && matchesSearch;
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
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <section className="catalog-section" id="catalog">
      <div className="container">
        {!hideHeader && (
          <div className="section-head text-center">
            <div className="section-kicker">
              <Sparkles size={14} /> Full Apple Inventory (11 to 17 Pro)
            </div>
            <h2 className="section-title">All iPhones (UK Used & Brand New)</h2>
            <p className="section-subtitle">
              Most of our phones are premium <strong>Clean UK Used (Grade A+)</strong> tested for pristine battery and zero faults, plus <strong>Brand New sealed flagships</strong>. All eligible for nationwide delivery.
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
              iPhone 13, 12, 11 & SE
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

          <div className="results-indicator">
            Showing <strong>{filteredPhones.length}</strong> available iPhones in stock (Ready for Circle pickup or nationwide delivery)
          </div>
        </div>

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
            <h3>No iPhones found matching "{searchQuery}"</h3>
            <p>Try clearing your search or picking another filter category.</p>
            <button 
              className="btn btn-outline"
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
