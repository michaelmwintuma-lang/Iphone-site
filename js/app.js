/**
 * iDeal Ghana - Core Application Logic
 * Implements BNPL pricing engine, interactive calculator, catalog filtering,
 * trade-in valuation, FAQ accordion, and WhatsApp deep-link generation.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initPricingEngine();
  initHeroPreview();
  initCalculator();
  initCatalog();
  initTradeInEstimator();
  initFaqAccordion();
  initFloatingWhatsApp();
  initScrollAnimations();
});

/**
 * 1. Master Pricing Engine (Single Source of Truth)
 */
function calculateInstallment(price, depositPercent, frequency) {
  const percent = Number(depositPercent) || CONFIG.bnpl.standardDepositPercent;
  const deposit = Math.round(price * (percent / 100));
  const balance = Math.max(0, price - deposit);
  
  const weeklyInstallment = Math.ceil(balance / CONFIG.bnpl.weeksDuration);
  const monthlyInstallment = Math.ceil(balance / CONFIG.bnpl.monthsDuration);
  
  const isWeekly = frequency === "weekly";
  const installmentAmount = isWeekly ? weeklyInstallment : monthlyInstallment;
  const frequencyUnit = isWeekly ? "week" : "month";
  const durationLabel = isWeekly ? `${CONFIG.bnpl.weeksDuration} Weeks` : `${CONFIG.bnpl.monthsDuration} Months`;

  return {
    price,
    depositPercent: percent,
    deposit,
    balance,
    weeklyInstallment,
    monthlyInstallment,
    installmentAmount,
    frequency: isWeekly ? "weekly" : "monthly",
    frequencyUnit,
    durationLabel
  };
}

/**
 * Helper to build wa.me deep links safely
 */
function generateWhatsAppUrl(message) {
  const cleanPhone = CONFIG.business.whatsappRaw.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Format GHS Currency
 */
function formatGHS(amount) {
  return `GH₵ ${Number(amount).toLocaleString()}`;
}

/**
 * 2. Sticky Glass Navbar & Mobile Drawer
 */
function initNavbar() {
  const navbar = document.getElementById("mainNavbar");
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-link");

  // Sticky Glass on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  // Mobile drawer toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen);
      mobileToggle.classList.toggle("active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Bind WhatsApp Direct consultation button
  const navWhatsAppBtns = document.querySelectorAll(".nav-whatsapp-btn");
  navWhatsAppBtns.forEach(btn => {
    btn.href = generateWhatsAppUrl(CONFIG.templates.generalInquiry);
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });
}

/**
 * 3. Hero Quick Math Teaser Card
 */
function initHeroPreview() {
  const heroModel = IPHONE_CATALOG.find(m => m.id === "iphone-16-pro-max") || IPHONE_CATALOG[0];
  const plan = calculateInstallment(heroModel.price, heroModel.depositTier, "weekly");

  const depositEl = document.getElementById("heroDepositAmount");
  const weeklyEl = document.getElementById("heroWeeklyAmount");
  const totalEl = document.getElementById("heroTotalAmount");
  const ctaBtn = document.getElementById("heroWhatsAppCta");

  if (depositEl) depositEl.textContent = formatGHS(plan.deposit);
  if (weeklyEl) weeklyEl.textContent = formatGHS(plan.weeklyInstallment);
  if (totalEl) totalEl.textContent = formatGHS(heroModel.price);

  if (ctaBtn) {
    const heroMsg = CONFIG.templates.catalogOrder(heroModel, plan);
    ctaBtn.href = generateWhatsAppUrl(heroMsg);
  }
}

/**
 * 4. Interactive BNPL Installment Calculator
 */
function initCalculator() {
  const priceSlider = document.getElementById("calcPriceSlider");
  const priceDisplay = document.getElementById("calcPriceDisplay");
  const deposit40Btn = document.getElementById("depositTier40");
  const deposit60Btn = document.getElementById("depositTier60");
  const freqWeeklyBtn = document.getElementById("freqWeekly");
  const freqMonthlyBtn = document.getElementById("freqMonthly");

  // Output elements
  const depositResult = document.getElementById("calcDepositResult");
  const depositPercentResult = document.getElementById("calcDepositPercentResult");
  const balanceResult = document.getElementById("calcBalanceResult");
  const installmentResult = document.getElementById("calcInstallmentResult");
  const installmentUnitResult = document.getElementById("calcInstallmentUnitResult");
  const termResult = document.getElementById("calcTermResult");
  const waCtaBtn = document.getElementById("calcWhatsAppCta");
  const presetChips = document.querySelectorAll(".calc-preset-chip");

  if (!priceSlider) return;

  let currentPrice = Number(priceSlider.value) || 15000;
  let currentDepositPercent = 40;
  let currentFrequency = "weekly";

  function updateCalcUI() {
    const plan = calculateInstallment(currentPrice, currentDepositPercent, currentFrequency);

    priceDisplay.textContent = formatGHS(currentPrice);
    depositResult.textContent = formatGHS(plan.deposit);
    depositPercentResult.textContent = `(${currentDepositPercent}% Deposit)`;
    balanceResult.textContent = formatGHS(plan.balance);
    installmentResult.textContent = formatGHS(plan.installmentAmount);
    installmentUnitResult.textContent = currentFrequency === "weekly" ? "/ week" : "/ month";
    termResult.textContent = currentFrequency === "weekly" ? "12 weekly payments via MoMo" : "3 monthly payments via MoMo";

    // Build dynamic WhatsApp link
    const msg = CONFIG.templates.calculatorInquiry(
      currentPrice,
      currentDepositPercent,
      currentFrequency,
      plan.deposit,
      plan.balance,
      plan.installmentAmount
    );
    waCtaBtn.href = generateWhatsAppUrl(msg);
  }

  priceSlider.addEventListener("input", (e) => {
    currentPrice = Number(e.target.value);
    updateCalcUI();
  });

  // Preset quick chips
  presetChips.forEach(chip => {
    chip.addEventListener("click", () => {
      presetChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const val = Number(chip.dataset.price);
      currentPrice = val;
      priceSlider.value = val;
      updateCalcUI();
    });
  });

  // Deposit Tiers (40% vs 60%)
  if (deposit40Btn && deposit60Btn) {
    deposit40Btn.addEventListener("click", () => {
      currentDepositPercent = 40;
      deposit40Btn.classList.add("active");
      deposit60Btn.classList.remove("active");
      updateCalcUI();
    });

    deposit60Btn.addEventListener("click", () => {
      currentDepositPercent = 60;
      deposit60Btn.classList.add("active");
      deposit40Btn.classList.remove("active");
      updateCalcUI();
    });
  }

  // Frequency Switch (Weekly vs Monthly)
  if (freqWeeklyBtn && freqMonthlyBtn) {
    freqWeeklyBtn.addEventListener("click", () => {
      currentFrequency = "weekly";
      freqWeeklyBtn.classList.add("active");
      freqMonthlyBtn.classList.remove("active");
      updateCalcUI();
    });

    freqMonthlyBtn.addEventListener("click", () => {
      currentFrequency = "monthly";
      freqMonthlyBtn.classList.add("active");
      freqWeeklyBtn.classList.remove("active");
      updateCalcUI();
    });
  }

  // Initial calculation
  updateCalcUI();
}

/**
 * 5. Dynamic Phone Visual Generator (CSS / SVG)
 * Hand-crafted vector mockups with realistic camera modules, dynamic island/notch,
 * gloss reflection, and colored titanium finishes.
 * Also supports graceful fallback to <img> when images are supplied by the user.
 */
function renderPhoneVisual(phone) {
  const isTriple = phone.cameras === 3;
  const isDual = phone.cameras === 2;
  const isSingle = phone.cameras === 1;

  // Lenses SVG markup
  let cameraLensesHtml = "";
  if (isTriple) {
    cameraLensesHtml = `
      <div class="cam-island triple">
        <div class="cam-lens lens-1"><div class="lens-glass"></div></div>
        <div class="cam-lens lens-2"><div class="lens-glass"></div></div>
        <div class="cam-lens lens-3"><div class="lens-glass"></div></div>
        <div class="cam-flash"></div>
        <div class="cam-lidar"></div>
      </div>
    `;
  } else if (isDual) {
    cameraLensesHtml = `
      <div class="cam-island dual">
        <div class="cam-lens lens-1"><div class="lens-glass"></div></div>
        <div class="cam-lens lens-2"><div class="lens-glass"></div></div>
        <div class="cam-flash"></div>
      </div>
    `;
  } else {
    cameraLensesHtml = `
      <div class="cam-island single">
        <div class="cam-lens lens-1"><div class="lens-glass"></div></div>
        <div class="cam-flash"></div>
      </div>
    `;
  }

  const topCutout = phone.hasDynamicIsland 
    ? `<div class="mockup-dynamic-island"><span class="di-cam"></span></div>`
    : `<div class="mockup-notch"></div>`;

  return `
    <div class="phone-mockup-wrapper" style="--device-accent: ${phone.colorHex};">
      <!-- Background ambient glow -->
      <div class="mockup-ambient-glow"></div>
      
      <!-- Actual image if available, with graceful fallback -->
      <div class="phone-visual-card">
        <img 
          src="${phone.image}" 
          alt="${phone.name} ${phone.colorName}"
          class="phone-actual-img" 
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />

        <!-- Pure CSS/SVG Handcrafted Phone Mockup -->
        <div class="css-phone-chassis" style="display: flex;">
          <div class="phone-outer-frame">
            <div class="phone-inner-screen">
              ${topCutout}
              <div class="screen-content">
                <div class="screen-wallpaper">
                  <div class="wp-gradient"></div>
                  <div class="wp-glow"></div>
                  <div class="wp-model-tag">${phone.series === 'SE' ? 'iPhone SE' : 'iPhone ' + phone.series}</div>
                </div>
              </div>
              <div class="screen-glare"></div>
            </div>
          </div>
          ${cameraLensesHtml}
        </div>
      </div>
    </div>
  `;
}

/**
 * 6. iPhone Product Catalog with Real-time Filters & Sort
 */
function initCatalog() {
  const grid = document.getElementById("catalogGrid");
  const filterChips = document.querySelectorAll(".catalog-filter-chip");
  const searchInput = document.getElementById("catalogSearchInput");
  const sortSelect = document.getElementById("catalogSortSelect");
  const resultsCount = document.getElementById("catalogResultsCount");

  if (!grid) return;

  let activeFilter = "all";
  let searchQuery = "";
  let currentSort = "featured";

  function filterAndSortCatalog() {
    return IPHONE_CATALOG.filter(phone => {
      // Filter logic
      let matchesFilter = true;
      if (activeFilter === "17") matchesFilter = phone.series === "17";
      else if (activeFilter === "16") matchesFilter = phone.series === "16";
      else if (activeFilter === "15") matchesFilter = phone.series === "15";
      else if (activeFilter === "14") matchesFilter = phone.series === "14";
      else if (activeFilter === "legacy") matchesFilter = ["13", "12", "11", "SE"].includes(phone.series);
      else if (activeFilter === "brand-new") matchesFilter = phone.condition.includes("Brand New");
      else if (activeFilter === "gently-used") matchesFilter = phone.condition.includes("Gently Used");

      // Search logic
      const searchTerms = `${phone.name} ${phone.storage} ${phone.condition} ${phone.colorName}`.toLowerCase();
      const matchesSearch = searchQuery === "" || searchTerms.includes(searchQuery.toLowerCase().trim());

      return matchesFilter && matchesSearch;
    }).sort((a, b) => {
      if (currentSort === "price-low") return a.price - b.price;
      if (currentSort === "price-high") return b.price - a.price;
      if (currentSort === "deposit-low") {
        const depA = Math.round(a.price * (a.depositTier / 100));
        const depB = Math.round(b.price * (b.depositTier / 100));
        return depA - depB;
      }
      return 0; // default order
    });
  }

  function renderCatalogCards() {
    const items = filterAndSortCatalog();
    if (resultsCount) {
      resultsCount.textContent = `Showing ${items.length} iPhone models`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="catalog-empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No iPhones found matching your search</h3>
          <p>Try clearing filters or search for another model like "iPhone 15", "128GB", or "Pro Max".</p>
          <button class="btn btn-outline" id="resetCatalogFilters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("resetCatalogFilters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          activeFilter = "all";
          searchQuery = "";
          searchInput.value = "";
          filterChips.forEach(c => c.classList.toggle("active", c.dataset.filter === "all"));
          renderCatalogCards();
        });
      }
      return;
    }

    grid.innerHTML = items.map(phone => {
      const plan = calculateInstallment(phone.price, phone.depositTier, "weekly");
      const orderMsg = CONFIG.templates.catalogOrder(phone, plan);
      const waUrl = generateWhatsAppUrl(orderMsg);

      const isNew = phone.condition.includes("Brand New");

      return `
        <article class="phone-card" data-id="${phone.id}" data-series="${phone.series}">
          <!-- Top Badges -->
          <div class="card-badges-row">
            <span class="badge ${isNew ? 'badge-new' : 'badge-used'}">
              ${isNew ? '✦ Brand New' : '✓ Grade A+ Certified'}
            </span>
            ${phone.isZeroInterest ? '<span class="badge badge-zero-interest">0% Interest</span>' : ''}
            ${phone.isFlagship ? '<span class="badge badge-flagship">Flagship</span>' : ''}
          </div>

          <!-- Handcrafted Visual Display -->
          <div class="card-visual-area">
            ${renderPhoneVisual(phone)}
            <div class="card-color-chip" title="${phone.colorName}">
              <span class="color-dot" style="background: ${phone.colorHex};"></span>
              <span class="color-label">${phone.colorName}</span>
            </div>
          </div>

          <!-- Specs & Title -->
          <div class="card-info-area">
            <div class="card-title-row">
              <h3 class="card-device-name">${phone.name}</h3>
              <span class="card-storage-pill">${phone.storage}</span>
            </div>

            <div class="card-meta-chips">
              <span class="meta-chip">🔋 ${phone.batteryHealth}</span>
              <span class="meta-chip">⚡ ${phone.chipset}</span>
              <span class="meta-chip">🛡️ 6 Mo. Warranty</span>
            </div>

            <!-- Price Breakdown Box -->
            <div class="card-pricing-box">
              <div class="price-cash-row">
                <span class="price-label">Full Outright Price:</span>
                <span class="price-cash-val">${formatGHS(phone.price)}</span>
              </div>

              <div class="bnpl-calc-pill">
                <div class="bnpl-col">
                  <span class="bnpl-mini-label">${phone.depositTier}% Deposit</span>
                  <span class="bnpl-amount deposit-val">${formatGHS(plan.deposit)}</span>
                </div>
                <div class="bnpl-divider"></div>
                <div class="bnpl-col">
                  <span class="bnpl-mini-label">12 Weekly</span>
                  <span class="bnpl-amount weekly-val">${formatGHS(plan.weeklyInstallment)}<small>/wk</small></span>
                </div>
                <div class="bnpl-divider"></div>
                <div class="bnpl-col">
                  <span class="bnpl-mini-label">3 Monthly</span>
                  <span class="bnpl-amount monthly-val">${formatGHS(plan.monthlyInstallment)}<small>/mo</small></span>
                </div>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="card-action-row">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-card">
                <svg class="wa-btn-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.813h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.765-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.748 0-3.388-.45-4.818-1.238l-7.182 1.884 1.921-7.018c-.859-1.488-1.352-3.216-1.352-5.059 0-5.514 4.486-10 10-10s10 4.486 10 10z"/>
                </svg>
                <span>Pay Small Small via WhatsApp</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // Filter click handlers
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter;
      renderCatalogCards();
    });
  });

  // Search input handler with debounce
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchQuery = e.target.value;
        renderCatalogCards();
      }, 200);
    });
  }

  // Sort select handler
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderCatalogCards();
    });
  }

  // Initial render
  renderCatalogCards();
}

/**
 * 7. Interactive Trade-In Value Estimator
 */
function initTradeInEstimator() {
  const modelSelect = document.getElementById("tradeInModelSelect");
  const storageSelect = document.getElementById("tradeInStorageSelect");
  const conditionRadios = document.querySelectorAll("input[name='tradeInCondition']");
  const targetModelSelect = document.getElementById("tradeInTargetModel");

  const creditDisplay = document.getElementById("tradeInCreditDisplay");
  const netDepositDisplay = document.getElementById("tradeInNetDepositDisplay");
  const tradeInWaBtn = document.getElementById("tradeInWhatsAppBtn");

  if (!modelSelect || !creditDisplay) return;

  // Populate trade-in model options
  modelSelect.innerHTML = TRADE_IN_DEVICES.map(item => `
    <option value="${item.model}" data-base="${item.baseVal}">${item.model} (Up to GH₵ ${item.baseVal.toLocaleString()})</option>
  `).join("");

  // Populate target upgrade options from IPHONE_CATALOG
  if (targetModelSelect) {
    targetModelSelect.innerHTML = IPHONE_CATALOG.map(phone => `
      <option value="${phone.name}" data-price="${phone.price}" data-tier="${phone.depositTier}">
        ${phone.name} (${phone.storage}) — ${formatGHS(phone.price)}
      </option>
    `).join("");
  }

  function calculateTradeIn() {
    const selectedOption = modelSelect.options[modelSelect.selectedIndex];
    const baseVal = Number(selectedOption.dataset.base) || 3000;
    const modelName = selectedOption.value;

    const storageMultiplier = Number(storageSelect.value) || 1.0;
    
    let conditionMultiplier = 1.0;
    let conditionLabel = "Flawless / Pristine";
    conditionRadios.forEach(radio => {
      if (radio.checked) {
        conditionMultiplier = Number(radio.value);
        conditionLabel = radio.dataset.label;
      }
    });

    const estimatedCredit = Math.round(baseVal * storageMultiplier * conditionMultiplier);
    creditDisplay.textContent = formatGHS(estimatedCredit);

    // Calculate effect on target upgrade deposit
    const targetOption = targetModelSelect.options[targetModelSelect.selectedIndex];
    const targetPrice = Number(targetOption.dataset.price) || 15000;
    const targetTier = Number(targetOption.dataset.tier) || 40;
    const standardDeposit = Math.round(targetPrice * (targetTier / 100));

    // Remaining cash deposit needed
    const netDeposit = Math.max(0, standardDeposit - estimatedCredit);
    netDepositDisplay.textContent = formatGHS(netDeposit);

    // Dynamic WhatsApp CTA
    const tradeInMsg = CONFIG.templates.tradeIn(
      modelName,
      storageSelect.options[storageSelect.selectedIndex].text,
      conditionLabel,
      estimatedCredit,
      targetOption.value
    );
    tradeInWaBtn.href = generateWhatsAppUrl(tradeInMsg);
  }

  modelSelect.addEventListener("change", calculateTradeIn);
  storageSelect.addEventListener("change", calculateTradeIn);
  targetModelSelect.addEventListener("change", calculateTradeIn);
  conditionRadios.forEach(r => r.addEventListener("change", calculateTradeIn));

  // Initial calculation
  calculateTradeIn();
}

/**
 * 8. FAQ Accordion (Single-Open State)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all others (single-open behavior)
      faqItems.forEach(otherItem => {
        otherItem.classList.remove("active");
        const otherBtn = otherItem.querySelector(".faq-question");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * 9. Persistent Floating WhatsApp Action
 */
function initFloatingWhatsApp() {
  const floatBtn = document.getElementById("floatingWhatsAppBtn");
  if (!floatBtn) return;

  floatBtn.href = generateWhatsAppUrl(CONFIG.templates.generalInquiry);
  floatBtn.target = "_blank";
  floatBtn.rel = "noopener noreferrer";
}

/**
 * 10. Restrained Scroll Reveal Animations
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

function initPricingEngine() {
  // Global pricing helper exposed for console inspection if needed
  window.iDealPricing = {
    calculate: calculateInstallment,
    config: CONFIG
  };
}
