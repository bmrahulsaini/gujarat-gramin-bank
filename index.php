<?php
/**
 * GUJARAT GRAMIN BANK (GGB) - OFFICIAL PORTAL
 * Amalgamated Regional Rural Bank (Sponsored by Bank of Baroda)
 */
include __DIR__ . '/includes/header.php';
?>

<main id="main-content">

  <!-- ========================================================================
       3. NOTICE TICKER (Slim Scrolling Strip)
       ======================================================================== -->
  <div class="ggb-ticker" role="region" aria-label="Important Bank Announcements">
    <div class="container-custom">
      <div class="ticker-wrap">
        <div class="ticker-badge">
          <i class="bi bi-bell-fill"></i> Updates
        </div>
        <div class="ticker-content">
          <div class="ticker-items">
            <span class="ticker-item">
              <i class="bi bi-shield-fill-check"></i>
              <strong>Security Alert:</strong> GGB never asks for your OTP, PIN, CVV, or passwords via phone, SMS, or email. Never share confidential banking credentials.
            </span>
            <span class="ticker-item">
              <i class="bi bi-percent"></i>
              <strong>Special Term Deposit:</strong> Earn up to 7.85% p.a. for Senior Citizens across all 745+ branches. Valid for a limited period.
            </span>
            <span class="ticker-item">
              <i class="bi bi-phone"></i>
              <strong>Digital Banking:</strong> Download the upgraded GGB Connect App on Google Play and App Store for 24x7 instant UPI transfers in Gujarati and English.
            </span>
            <span class="ticker-item">
              <i class="bi bi-building"></i>
              <strong>One State, One RRB:</strong> Baroda Gujarat Gramin Bank and Saurashtra Gramin Bank stand united as Gujarat Gramin Bank from 1 May 2025.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================================
       4. HERO SECTION (Bootstrap Carousel with 3 Slides)
       ======================================================================== -->
  <section class="hero-section" id="hero" aria-label="Gujarat Gramin Bank Welcome Showcase">
    <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="6500">
      
      <!-- Indicators -->
      <div class="carousel-indicators carousel-indicators-custom container-custom">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1: Rural Agricultural Growth"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2: Rural Women Entrepreneurs"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3: Affordable Housing"></button>
      </div>

      <div class="carousel-inner">
        <!-- Slide 1: Farmer Family in Agricultural Field -->
        <div class="carousel-item active hero-carousel-item">
          <img src="assets/images/hero/hero-slide-1.webp" alt="Smiling Gujarati farmer family in agricultural field at sunset" class="hero-bg-img" width="1920" height="900" fetchpriority="high">
          <div class="hero-overlay"></div>
          
          <!-- Decorative SVG Leaf Flourish -->
          <svg class="hero-leaf-flourish" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <path d="M10 90 C30 70, 70 70, 90 10 C70 30, 70 70, 10 90 Z" fill="#34D399"/>
          </svg>

          <div class="container-custom">
            <div class="hero-content">
              <div class="hero-subtitle-tag" data-i18n="hero-tag">
                <i class="bi bi-patch-check-fill text-warning"></i> Amalgamated Regional Rural Bank
              </div>
              <h1 class="hero-title" data-i18n="hero-h1">
                Rooted in Gujarat. <br><span style="color: #34D399;">Growing with you.</span>
              </h1>
              <p class="hero-description" data-i18n="hero-desc">
                Serving 1 Crore+ customers across 34 districts of Gujarat with 745+ branches. A trusted partnership of Govt. of India (50%), Bank of Baroda (35%) & Govt. of Gujarat (15%).
              </p>
              
              <div class="hero-actions">
                <a href="#products-deposits" class="btn-ggb-accent" data-i18n="hero-cta-open">
                  <i class="bi bi-person-check-fill"></i> Open Savings Account
                </a>
                <a href="#products-loans" class="btn-ggb-outline-white" data-i18n="hero-cta-loan">
                  <i class="bi bi-cash-stack"></i> Apply for Loan
                </a>
              </div>

              <!-- Trust Chips -->
              <div class="hero-trust-chips">
                <span class="ggb-chip">
                  <i class="bi bi-shield-check text-warning"></i> DICGC Insured up to ₹5 Lakh
                </span>
                <span class="ggb-chip">
                  <i class="bi bi-bank text-info"></i> Sponsored by Bank of Baroda
                </span>
                <span class="ggb-chip">
                  <i class="bi bi-geo-alt-fill text-success"></i> 745+ Branches Across Gujarat
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2: Rural Woman Entrepreneur & Dairy Workshop -->
        <div class="carousel-item hero-carousel-item">
          <img src="assets/images/hero/hero-slide-2.webp" alt="Confident Gujarati rural woman entrepreneur at dairy workshop" class="hero-bg-img" width="1920" height="900" loading="eager">
          <div class="hero-overlay"></div>
          <div class="container-custom">
            <div class="hero-content">
              <div class="hero-subtitle-tag">
                <i class="bi bi-flower1 text-warning"></i> Women Empowerment & SHG Financing
              </div>
              <div class="hero-title" data-i18n="hero-h1-slide2">
                Empowering Gujarat's <br><span style="color: #34D399;">Rural Women & MSMEs</span>
              </div>
              <p class="hero-description" data-i18n="hero-desc-slide2">
                Empowering thousands of self-help groups, dairy cooperatives, and small businesses with collateral-free credit, fast digital sanctions, and dedicated rural banking support.
              </p>
              <div class="hero-actions">
                <a href="#products-agri" class="btn-ggb-accent">
                  <i class="bi bi-people-fill"></i> Explore SHG Loans
                </a>
                <a href="#calculator" class="btn-ggb-outline-white">
                  <i class="bi bi-calculator"></i> Calculate EMI
                </a>
              </div>
              <div class="hero-trust-chips">
                <span class="ggb-chip"><i class="bi bi-check-circle-fill text-success"></i> Collateral-Free Loans</span>
                <span class="ggb-chip"><i class="bi bi-percent text-warning"></i> Subsidized Interest Rates</span>
                <span class="ggb-chip"><i class="bi bi-award-fill text-info"></i> PM Mudra & Stand-Up India</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 3: Happy Family with Pucca Home -->
        <div class="carousel-item hero-carousel-item">
          <img src="assets/images/hero/hero-slide-3.webp" alt="Happy Gujarati family in front of new pucca home" class="hero-bg-img" width="1920" height="900" loading="eager">
          <div class="hero-overlay"></div>
          <div class="container-custom">
            <div class="hero-content">
              <div class="hero-subtitle-tag">
                <i class="bi bi-house-door-fill text-warning"></i> GGB Apna Ghar Home Loans
              </div>
              <div class="hero-title" data-i18n="hero-h1-slide3">
                Your Own Home in Gujarat, <br><span style="color: #34D399;">At Affordable Rates</span>
              </div>
              <p class="hero-description" data-i18n="hero-desc-slide3">
                Realize your dream of a pucca home in rural and semi-urban Gujarat with GGB Apna Ghar Housing Loans starting from 8.45% p.a. with zero prepayment charges.
              </p>
              <div class="hero-actions">
                <a href="#products-loans" class="btn-ggb-accent">
                  <i class="bi bi-house-heart-fill"></i> Apply for Home Loan
                </a>
                <a href="#rates" class="btn-ggb-outline-white">
                  <i class="bi bi-graph-up-arrow"></i> View Interest Rates
                </a>
              </div>
              <div class="hero-trust-chips">
                <span class="ggb-chip"><i class="bi bi-clock-fill text-success"></i> Quick 3-Day In-Principle Sanction</span>
                <span class="ggb-chip"><i class="bi bi-calendar3 text-info"></i> Repayment up to 30 Years</span>
                <span class="ggb-chip"><i class="bi bi-patch-check text-warning"></i> Subsidies under PMAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       5. QUICK ACTIONS (Glass Card Overlapping Hero Bottom)
       ======================================================================== -->
  <div class="container-custom quick-action-wrapper">
    <div class="quick-action-glass">
      <div class="quick-action-grid">
        <!-- 1. Open Account -->
        <a href="#products-deposits" class="quick-action-item">
          <div class="quick-action-icon">
            <i class="bi bi-person-plus-fill"></i>
          </div>
          <div class="quick-action-title" data-i18n="qa-open">Open Account</div>
          <div class="quick-action-sub">Savings & Current</div>
        </a>

        <!-- 2. Apply Loan -->
        <a href="#products-loans" class="quick-action-item">
          <div class="quick-action-icon">
            <i class="bi bi-cash-coin"></i>
          </div>
          <div class="quick-action-title" data-i18n="qa-loan">Apply Loan</div>
          <div class="quick-action-sub">Home, Gold, Agri</div>
        </a>

        <!-- 3. Pay EMI -->
        <a href="#calculator" class="quick-action-item">
          <div class="quick-action-icon">
            <i class="bi bi-wallet2"></i>
          </div>
          <div class="quick-action-title" data-i18n="qa-emi">Pay EMI</div>
          <div class="quick-action-sub">Quick Repayment</div>
        </a>

        <!-- 4. Locate Branch -->
        <a href="#branches" class="quick-action-item">
          <div class="quick-action-icon">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="quick-action-title" data-i18n="qa-locate">Locate Branch</div>
          <div class="quick-action-sub">745+ Locations</div>
        </a>

        <!-- 5. Interest Rates -->
        <a href="#rates" class="quick-action-item">
          <div class="quick-action-icon">
            <i class="bi bi-graph-up"></i>
          </div>
          <div class="quick-action-title" data-i18n="qa-rates">Interest Rates</div>
          <div class="quick-action-sub">FD, RD & Loans</div>
        </a>

        <!-- 6. Raise Complaint -->
        <a href="#faq" class="quick-action-item">
          <div class="quick-action-icon">
            <i class="bi bi-headset"></i>
          </div>
          <div class="quick-action-title" data-i18n="qa-complaint">Raise Complaint</div>
          <div class="quick-action-sub">Grievance Portal</div>
        </a>
      </div>
    </div>
  </div>

  <!-- ========================================================================
       6. PRODUCTS SECTION (Bootstrap Tabs: Deposits | Loans | Agri & Rural | Digital)
       ======================================================================== -->
  <section class="products-section section-padding pt-0" id="products" aria-labelledby="productsHeading">
    <div class="container-custom">
      <div class="section-header reveal-on-scroll">
        <span class="section-tag"><i class="bi bi-layers-fill"></i> Banking Solutions</span>
        <h2 id="productsHeading">Tailored Banking for Every Gujarati</h2>
        <p class="section-subtitle">
          Comprehensive banking products crafted to empower farmers, rural families, women entrepreneurs, and small businesses across Gujarat.
        </p>
      </div>

      <!-- Navigation Tabs -->
      <ul class="nav nav-tabs nav-tabs-products" id="productTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="tab-deposits-btn" data-bs-toggle="tab" data-bs-target="#products-deposits" type="button" role="tab" aria-controls="products-deposits" aria-selected="true">
            <i class="bi bi-piggy-bank"></i> Deposits & Savings
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tab-loans-btn" data-bs-toggle="tab" data-bs-target="#products-loans" type="button" role="tab" aria-controls="products-loans" aria-selected="false">
            <i class="bi bi-cash-stack"></i> Retail & MSME Loans
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tab-agri-btn" data-bs-toggle="tab" data-bs-target="#products-agri" type="button" role="tab" aria-controls="products-agri" aria-selected="false">
            <i class="bi bi-flower2"></i> Agri & Rural Finance
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tab-digital-btn" data-bs-toggle="tab" data-bs-target="#products-digital" type="button" role="tab" aria-controls="products-digital" aria-selected="false">
            <i class="bi bi-phone"></i> Digital Banking
          </button>
        </li>
      </ul>

      <!-- Tabs Content -->
      <div class="tab-content" id="productTabsContent">
        
        <!-- Tab 1: Deposits -->
        <div class="tab-pane fade show active" id="products-deposits" role="tabpanel" aria-labelledby="tab-deposits-btn">
          <div class="row g-4">
            <!-- 1. Savings Account -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-wallet2"></i></div>
                <h3 class="ggb-card__title">GGB Samruddhi Savings Account</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Daily interest calculation credited quarterly</li>
                  <li><i class="bi bi-check2-circle"></i> Zero minimum balance requirement for rural branches</li>
                  <li><i class="bi bi-check2-circle"></i> Free RuPay EMV chip debit card with accidental insurance</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">3.00% - 3.50% p.a.</span>
                </div>
              </div>
            </div>

            <!-- 2. Fixed Deposit -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <span class="ggb-card__badge">Popular</span>
                <div class="ggb-card__icon"><i class="bi bi-shield-lock"></i></div>
                <h3 class="ggb-card__title">GGB Shrestha Term Deposit (FD)</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> High returns up to 7.35% p.a. with compounding</li>
                  <li><i class="bi bi-check2-circle"></i> Flexible tenures from 7 days up to 10 years</li>
                  <li><i class="bi bi-check2-circle"></i> Up to 90% loan / overdraft facility against deposit</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#calculator" class="ggb-card__link">Calculate Return <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-success-subtle text-success border">Up to 7.35% p.a.</span>
                </div>
              </div>
            </div>

            <!-- 3. Recurring Deposit -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-arrow-repeat"></i></div>
                <h3 class="ggb-card__title">GGB Suvidha Recurring Deposit</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Build disciplined monthly savings starting from ₹100</li>
                  <li><i class="bi bi-check2-circle"></i> Guaranteed returns on maturity with quarterly compounding</li>
                  <li><i class="bi bi-check2-circle"></i> Standing instructions auto-debit from savings account</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-dark border">Flexible Monthly</span>
                </div>
              </div>
            </div>

            <!-- 4. Senior Citizen FD -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <span class="ggb-card__badge">+0.50% Extra</span>
                <div class="ggb-card__icon"><i class="bi bi-heart-pulse"></i></div>
                <h3 class="ggb-card__title">GGB Senior Citizen Privilege FD</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Additional 0.50% interest over standard rack rates</li>
                  <li><i class="bi bi-check2-circle"></i> Choice of monthly or quarterly interest payout</li>
                  <li><i class="bi bi-check2-circle"></i> Priority teller counter across all 745+ branches</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#rates" class="ggb-card__link">View Rates <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-warning-subtle text-warning-emphasis border">Up to 7.85% p.a.</span>
                </div>
              </div>
            </div>

            <!-- 5. Current Account -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-briefcase"></i></div>
                <h3 class="ggb-card__title">GGB Vyapar Current Account</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Designed for rural merchants, traders & cooperatives</li>
                  <li><i class="bi bi-check2-circle"></i> Free bulk NEFT / RTGS / IMPS digital transfers</li>
                  <li><i class="bi bi-check2-circle"></i> Soundbox QR payment settlement support included</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">High Limits</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: Loans -->
        <div class="tab-pane fade" id="products-loans" role="tabpanel" aria-labelledby="tab-loans-btn">
          <div class="row g-4">
            <!-- 1. Housing Loan -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-house"></i></div>
                <h3 class="ggb-card__title">GGB Apna Ghar Housing Loan</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Low interest rates starting from 8.45% p.a.</li>
                  <li><i class="bi bi-check2-circle"></i> Repayment tenure up to 30 years with zero prepayment fees</li>
                  <li><i class="bi bi-check2-circle"></i> Finance for home purchase, construction & renovation</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#calculator" class="ggb-card__link">Calculate EMI <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-success-subtle text-success border">From 8.45% p.a.</span>
                </div>
              </div>
            </div>

            <!-- 2. Vehicle Loan -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-car-front"></i></div>
                <h3 class="ggb-card__title">GGB Vahan Vehicle Loan</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Finance up to 90% of on-road vehicle cost</li>
                  <li><i class="bi bi-check2-circle"></i> Covers 2-wheelers, 4-wheelers, and commercial vehicles</li>
                  <li><i class="bi bi-check2-circle"></i> Minimal documentation and swift 48-hour approval</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#calculator" class="ggb-card__link">Apply Now <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">From 8.95% p.a.</span>
                </div>
              </div>
            </div>

            <!-- 3. Education Loan -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-mortarboard"></i></div>
                <h3 class="ggb-card__title">GGB Vidya Education Loan</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Comprehensive cover for tuition, hostel & equipment fees</li>
                  <li><i class="bi bi-check2-circle"></i> Studies in India & overseas with repayment holiday</li>
                  <li><i class="bi bi-check2-circle"></i> 0.50% concession for girl students across Gujarat</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">Concession Available</span>
                </div>
              </div>
            </div>

            <!-- 4. Gold Loan -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <span class="ggb-card__badge">15 Min Approval</span>
                <div class="ggb-card__icon"><i class="bi bi-gem"></i></div>
                <h3 class="ggb-card__title">GGB Swarna Gold Loan</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Instant disbursement against gold jewellery in 15 minutes</li>
                  <li><i class="bi bi-check2-circle"></i> High per-gram value & bank vault safety guarantee</li>
                  <li><i class="bi bi-check2-circle"></i> Attractive interest rate starting at 8.85% p.a.</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-warning-subtle text-warning-emphasis border">From 8.85% p.a.</span>
                </div>
              </div>
            </div>

            <!-- 5. Personal Loan -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-person-badge"></i></div>
                <h3 class="ggb-card__title">GGB Saral Personal Loan</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Quick collateral-free loans for salaried rural professionals</li>
                  <li><i class="bi bi-check2-circle"></i> Preferred terms for teachers, panchayat & govt. staff</li>
                  <li><i class="bi bi-check2-circle"></i> Loan amount up to ₹10 Lakh with flexible tenure</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#calculator" class="ggb-card__link">Calculate EMI <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">No Collateral</span>
                </div>
              </div>
            </div>

            <!-- 6. MSME / Business Loan -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-shop"></i></div>
                <h3 class="ggb-card__title">GGB Udyam MSME Loan</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Working capital & term loans for rural traders & artisans</li>
                  <li><i class="bi bi-check2-circle"></i> Covered under CGTMSE collateral guarantee scheme</li>
                  <li><i class="bi bi-check2-circle"></i> Finance up to ₹2 Crore for plant & machinery purchase</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-success-subtle text-success border">CGTMSE Covered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 3: Agri & Rural -->
        <div class="tab-pane fade" id="products-agri" role="tabpanel" aria-labelledby="tab-agri-btn">
          <div class="row g-4">
            <!-- 1. Kisan Credit Card -->
            <div class="col-lg-6 col-md-6">
              <div class="ggb-card">
                <span class="ggb-card__badge">Flagship Scheme</span>
                <div class="ggb-card__icon"><i class="bi bi-credit-card-2-front"></i></div>
                <h3 class="ggb-card__title">GGB Kisan Credit Card (KCC)</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Revolving credit limit for seeds, fertilizers, pesticides & cultivation costs</li>
                  <li><i class="bi bi-check2-circle"></i> Effective interest at only <strong>4.00% p.a.</strong> with prompt repayment subvention</li>
                  <li><i class="bi bi-check2-circle"></i> RuPay Kisan Card for easy ATM cash withdrawal and PoS purchases</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Apply at Branch <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-success text-white">Effective 4% p.a.</span>
                </div>
              </div>
            </div>

            <!-- 2. Tractor & Farm Equipment -->
            <div class="col-lg-6 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-gear-wide-connected"></i></div>
                <h3 class="ggb-card__title">GGB Krishi Yantra Tractor Loan</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Finance for new tractors, harvesters, threshers & drip irrigation kits</li>
                  <li><i class="bi bi-check2-circle"></i> Repayment linked directly to agricultural harvest seasons (half-yearly/yearly)</li>
                  <li><i class="bi bi-check2-circle"></i> Up to 85% of total machinery invoice value sanctioned swiftly</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">Harvest Linked</span>
                </div>
              </div>
            </div>

            <!-- 3. Dairy & Animal Husbandry -->
            <div class="col-lg-6 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-bucket"></i></div>
                <h3 class="ggb-card__title">GGB Kamdhenu Dairy Loan</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Finance for purchasing high-yield cows, buffaloes & fodder development</li>
                  <li><i class="bi bi-check2-circle"></i> Construction of cattle sheds, milking machinery & bulk milk coolers</li>
                  <li><i class="bi bi-check2-circle"></i> Subsidies available under National Livestock Mission (NLM)</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">NLM Subsidy</span>
                </div>
              </div>
            </div>

            <!-- 4. SHG / Women Entrepreneur Loans -->
            <div class="col-lg-6 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-people"></i></div>
                <h3 class="ggb-card__title">GGB Sakhi SHG & Women Loan</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Collateral-free group loans for women self-help groups (SHGs)</li>
                  <li><i class="bi bi-check2-circle"></i> Support for handicrafts, tailoring, food processing & dairy ventures</li>
                  <li><i class="bi bi-check2-circle"></i> Special interest subvention under Deendayal Antyodaya Yojana (DAY-NRLM)</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-success-subtle text-success border">Zero Collateral</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 4: Digital -->
        <div class="tab-pane fade" id="products-digital" role="tabpanel" aria-labelledby="tab-digital-btn">
          <div class="row g-4">
            <!-- 1. GGB Connect App -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <span class="ggb-card__badge">Bilingual</span>
                <div class="ggb-card__icon"><i class="bi bi-phone"></i></div>
                <h3 class="ggb-card__title">GGB Connect Mobile App</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Full bilingual experience in Gujarati and English</li>
                  <li><i class="bi bi-check2-circle"></i> 24x7 instant UPI payments, bill pay & FASTag recharge</li>
                  <li><i class="bi bi-check2-circle"></i> Open FD/RD accounts digitally in less than 2 minutes</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#app-promo" class="ggb-card__link">Download App <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-primary text-white">Android & iOS</span>
                </div>
              </div>
            </div>

            <!-- 2. UPI / BHIM -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-qr-code-scan"></i></div>
                <h3 class="ggb-card__title">GGB UPI / BHIM Banking</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Link your GGB account to BHIM, Google Pay, PhonePe & Paytm</li>
                  <li><i class="bi bi-check2-circle"></i> Instant real-time settlements with highest transaction security</li>
                  <li><i class="bi bi-check2-circle"></i> Dynamic merchant soundbox and QR code solutions</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#app-promo" class="ggb-card__link">Know More <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">Zero Charges</span>
                </div>
              </div>
            </div>

            <!-- 3. RuPay Debit Card -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-credit-card"></i></div>
                <h3 class="ggb-card__title">GGB RuPay Chip Debit Card</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Secure EMV chip with contactless tap-and-pay facility</li>
                  <li><i class="bi bi-check2-circle"></i> Free cash withdrawals at over 1,00,000 ATMs across India</li>
                  <li><i class="bi bi-check2-circle"></i> Complimentary ₹2 Lakh accidental insurance cover</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Apply Card <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">₹2L Insurance</span>
                </div>
              </div>
            </div>

            <!-- 4. IMPS / NEFT / RTGS -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-arrow-left-right"></i></div>
                <h3 class="ggb-card__title">IMPS / NEFT / RTGS Transfers</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Transfer funds 24x7x365 to any bank account in India</li>
                  <li><i class="bi bi-check2-circle"></i> High transaction limits for traders & agricultural mandates</li>
                  <li><i class="bi bi-check2-circle"></i> Real-time SMS and email confirmations instantly</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#app-promo" class="ggb-card__link">Transfer Now <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">24x7 Available</span>
                </div>
              </div>
            </div>

            <!-- 5. AEPS (Aadhaar Enabled) -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-fingerprint"></i></div>
                <h3 class="ggb-card__title">Aadhaar Banking (AEPS)</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Cash withdrawal & deposit via biometric thumb impression</li>
                  <li><i class="bi bi-check2-circle"></i> Available at 2,500+ Bank Mitras (BC Points) in rural Gujarat</li>
                  <li><i class="bi bi-check2-circle"></i> No debit card or smartphone required for doorstep banking</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="#branches" class="ggb-card__link">Locate BC Point <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-success-subtle text-success border">Biometric</span>
                </div>
              </div>
            </div>

            <!-- 6. Missed Call & SMS Alerts -->
            <div class="col-lg-4 col-md-6">
              <div class="ggb-card">
                <div class="ggb-card__icon"><i class="bi bi-chat-left-dots"></i></div>
                <h3 class="ggb-card__title">Missed Call Banking</h3>
                <ul class="ggb-card__features">
                  <li><i class="bi bi-check2-circle"></i> Give a missed call from registered number to check balance</li>
                  <li><i class="bi bi-check2-circle"></i> Mini-statement of last 5 transactions sent via SMS</li>
                  <li><i class="bi bi-check2-circle"></i> Completely free of charge, works on any basic feature phone</li>
                </ul>
                <div class="ggb-card__action">
                  <a href="tel:02652361210" class="ggb-card__link">Learn Numbers <i class="bi bi-arrow-right"></i></a>
                  <span class="badge bg-light text-primary border">Toll-Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================================================
       7. WHY GGB / STATS (Animated Counters & Value Points)
       ======================================================================== -->
  <section class="stats-section section-padding" id="about" aria-labelledby="statsHeading">
    <div class="container-custom">
      <div class="section-header reveal-on-scroll">
        <span class="section-tag" style="background: rgba(52, 211, 153, 0.2); color: #34D399;">
          <i class="bi bi-graph-up-arrow"></i> Scale & Strength
        </span>
        <h2 id="statsHeading" class="text-white" data-i18n="stats-h2">Why Gujarat Trusts GGB</h2>
        <p class="section-subtitle text-white-50">
          Formed by amalgamating Baroda Gujarat Gramin Bank and Saurashtra Gramin Bank under "One State, One RRB", we combine national backing with authentic local commitment.
        </p>
      </div>

      <!-- 4 Big Animated Counters -->
      <div class="row g-4 mb-5">
        <div class="col-lg-3 col-6">
          <div class="stats-card">
            <div class="stats-number" data-target="745" data-suffix="+">0</div>
            <div class="stats-label">Bank Branches</div>
            <div class="stats-sub">Deepest rural reach</div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="stats-card">
            <div class="stats-number" data-target="34" data-suffix="">0</div>
            <div class="stats-label">Districts Covered</div>
            <div class="stats-sub">100% of Gujarat state</div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="stats-card">
            <div class="stats-number" data-target="100" data-suffix="L+">0</div>
            <div class="stats-label">Happy Customers</div>
            <div class="stats-sub">1 Crore+ account holders</div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="stats-card">
            <div class="stats-number" data-target="50" data-suffix="+ Yrs">0</div>
            <div class="stats-label">Rural Legacy</div>
            <div class="stats-sub">Serving since 1976</div>
          </div>
        </div>
      </div>

      <!-- 4 Value Points -->
      <div class="row g-4">
        <div class="col-lg-3 col-md-6">
          <div class="value-card">
            <div class="value-icon"><i class="bi bi-geo-alt"></i></div>
            <h3 class="value-title">Rooted Locally</h3>
            <p class="value-desc">Every branch is managed by staff fluent in Gujarati who understand the agrarian rhythms, local dialects, and seasonal needs of the village community.</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="value-card">
            <div class="value-icon"><i class="bi bi-shield-check"></i></div>
            <h3 class="value-title">Government Backed</h3>
            <p class="value-desc">50% owned by Government of India, 35% by Bank of Baroda, and 15% by Government of Gujarat, ensuring unmatched financial stability and security.</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="value-card">
            <div class="value-icon"><i class="bi bi-lightning-charge"></i></div>
            <h3 class="value-title">Fast Loan Approval</h3>
            <p class="value-desc">Simplified rural documentation and on-ground field evaluation enable prompt loan sanction for tractors, crops, housing, and micro-enterprises.</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="value-card">
            <div class="value-icon"><i class="bi bi-translate"></i></div>
            <h3 class="value-title">Banking In Your Language</h3>
            <p class="value-desc">Complete digital passbooks, ATM interfaces, WhatsApp banking, and call centre support available in fluent Gujarati, Hindi, and English.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       8. INTEREST RATES SECTION
       ======================================================================== -->
  <section class="rates-section section-padding" id="rates" aria-labelledby="ratesHeading">
    <div class="container-custom">
      <div class="section-header reveal-on-scroll">
        <span class="section-tag"><i class="bi bi-percent"></i> Competitive Returns</span>
        <h2 id="ratesHeading">Transparent Interest Rates</h2>
        <p class="section-subtitle">
          Enjoy maximum returns on your hard-earned savings and accessible borrowing rates tailored for rural prosperity.
        </p>
      </div>

      <div class="row g-4">
        <!-- 1. Housing Loan -->
        <div class="col-lg-4 col-md-6">
          <div class="rate-card">
            <h3 class="rate-product-name"><i class="bi bi-house-door text-primary me-2"></i>Apna Ghar Home Loan</h3>
            <div class="rate-percentage-box">
              <span class="rate-val">8.45%</span>
              <span class="rate-unit">p.a. onwards</span>
            </div>
            <p class="rate-note">Processing fee concessions for rural construction. Up to 30 years repayment tenure.</p>
            <a href="#calculator" class="btn btn-sm btn-outline-primary rounded-pill">Calculate EMI</a>
          </div>
        </div>

        <!-- 2. Gold Loan -->
        <div class="col-lg-4 col-md-6">
          <div class="rate-card">
            <h3 class="rate-product-name"><i class="bi bi-gem text-warning me-2"></i>Swarna Gold Loan</h3>
            <div class="rate-percentage-box">
              <span class="rate-val">8.85%</span>
              <span class="rate-unit">p.a. onwards</span>
            </div>
            <p class="rate-note">Disbursed in 15 minutes at lowest interest against gold ornaments. Zero foreclosure fee.</p>
            <a href="#branches" class="btn btn-sm btn-outline-primary rounded-pill">Apply at Branch</a>
          </div>
        </div>

        <!-- 3. Fixed Deposit -->
        <div class="col-lg-4 col-md-6">
          <div class="rate-card featured-rate">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <h3 class="rate-product-name mb-0"><i class="bi bi-safe text-success me-2"></i>Fixed Deposit (FD)</h3>
              <span class="badge bg-success text-white">Popular</span>
            </div>
            <div class="rate-percentage-box">
              <span class="rate-val">7.35%</span>
              <span class="rate-unit">p.a. (2 to 3 Yrs)</span>
            </div>
            <p class="rate-note">Compounded quarterly for optimal wealth growth. Loan facility up to 90% available.</p>
            <a href="#calculator" class="btn btn-sm btn-ggb-accent rounded-pill">Calculate Growth</a>
          </div>
        </div>

        <!-- 4. Senior Citizen FD -->
        <div class="col-lg-4 col-md-6">
          <div class="rate-card">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <h3 class="rate-product-name mb-0"><i class="bi bi-heart-pulse text-danger me-2"></i>Senior Citizen FD</h3>
              <span class="badge bg-warning-subtle text-warning-emphasis">+0.50% Extra</span>
            </div>
            <div class="rate-percentage-box">
              <span class="rate-val" style="color: #B45309;">7.85%</span>
              <span class="rate-unit">p.a.</span>
            </div>
            <p class="rate-note">Special preferential interest rate for individuals aged 60 years and above.</p>
            <a href="#calculator" class="btn btn-sm btn-outline-primary rounded-pill">Explore Scheme</a>
          </div>
        </div>

        <!-- 5. Savings Account -->
        <div class="col-lg-4 col-md-6">
          <div class="rate-card">
            <h3 class="rate-product-name"><i class="bi bi-piggy-bank text-info me-2"></i>Savings Account</h3>
            <div class="rate-percentage-box">
              <span class="rate-val" style="color: var(--ggb-navy);">3.50%</span>
              <span class="rate-unit">p.a.</span>
            </div>
            <p class="rate-note">Calculated on daily end-of-day balances and credited straight to your account quarterly.</p>
            <a href="#products-deposits" class="btn btn-sm btn-outline-primary rounded-pill">Open Account</a>
          </div>
        </div>

        <!-- 6. Kisan Credit Card (Subvention) -->
        <div class="col-lg-4 col-md-6">
          <div class="rate-card">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <h3 class="rate-product-name mb-0"><i class="bi bi-flower2 text-success me-2"></i>Kisan Credit Card</h3>
              <span class="badge bg-success-subtle text-success">Subsidized</span>
            </div>
            <div class="rate-percentage-box">
              <span class="rate-val">4.00%</span>
              <span class="rate-unit">p.a. effective</span>
            </div>
            <p class="rate-note">Crop credit up to ₹3 Lakh with 3% prompt repayment incentive from Govt. of India.</p>
            <a href="#products-agri" class="btn btn-sm btn-outline-primary rounded-pill">View Eligibility</a>
          </div>
        </div>
      </div>

      <!-- Legal Disclaimer Note -->
      <div class="text-center mt-4">
        <p class="small text-muted mb-2">
          <i class="bi bi-info-circle-fill text-primary me-1"></i> Rates are subject to change. Rates updated as of 2026. Terms and conditions apply.
        </p>
        <a href="#branches" class="fw-bold text-decoration-underline text-navy">View full schedule of service charges & deposit rates &rarr;</a>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       9. CALCULATORS SECTION (EMI & FD Interactive Calculators)
       ======================================================================== -->
  <section class="calculator-section section-padding" id="calculator" aria-labelledby="calcHeading">
    <div class="container-custom">
      <div class="section-header reveal-on-scroll">
        <span class="section-tag"><i class="bi bi-calculator-fill"></i> Financial Planning</span>
        <h2 id="calcHeading" data-i18n="calc-h2">Plan Your Finances with Live Calculators</h2>
        <p class="section-subtitle">
          Estimate your monthly loan EMI or check your fixed deposit maturity value instantly with our simple live tool.
        </p>
      </div>

      <div class="calculator-card">
        <!-- Calculator Nav -->
        <div class="calc-nav" role="tablist">
          <button type="button" class="calc-nav-btn active" id="calc-tab-emi">
            <i class="bi bi-cash-stack fs-5"></i> Loan EMI Calculator
          </button>
          <button type="button" class="calc-nav-btn" id="calc-tab-fd">
            <i class="bi bi-graph-up fs-5"></i> Fixed Deposit (FD) Calculator
          </button>
        </div>

        <div class="calc-body">
          <!-- EMI Calculator Panel -->
          <div id="calc-panel-emi">
            <div class="row g-4 align-items-center">
              <div class="col-lg-7">
                <!-- Loan Amount Slider -->
                <div class="calc-slider-group">
                  <div class="calc-slider-header">
                    <label for="emi-amount" class="calc-slider-label">Loan Amount</label>
                    <span class="calc-slider-value-box" id="emi-amount-val">₹15,00,000</span>
                  </div>
                  <input type="range" class="custom-range" id="emi-amount" min="50000" max="10000000" step="25000" value="1500000">
                  <div class="d-flex justify-content-between text-muted small mt-1">
                    <span>₹50,000</span>
                    <span>₹1,00,00,000</span>
                  </div>
                </div>

                <!-- Interest Rate Slider -->
                <div class="calc-slider-group">
                  <div class="calc-slider-header">
                    <label for="emi-rate" class="calc-slider-label">Interest Rate (% p.a.)</label>
                    <span class="calc-slider-value-box" id="emi-rate-val">8.5%</span>
                  </div>
                  <input type="range" class="custom-range" id="emi-rate" min="7.0" max="15.0" step="0.1" value="8.5">
                  <div class="d-flex justify-content-between text-muted small mt-1">
                    <span>7.0%</span>
                    <span>15.0%</span>
                  </div>
                </div>

                <!-- Tenure Slider -->
                <div class="calc-slider-group mb-0">
                  <div class="calc-slider-header">
                    <label for="emi-tenure" class="calc-slider-label">Loan Tenure (Years)</label>
                    <span class="calc-slider-value-box" id="emi-tenure-val">15 Years</span>
                  </div>
                  <input type="range" class="custom-range" id="emi-tenure" min="1" max="30" step="1" value="15">
                  <div class="d-flex justify-content-between text-muted small mt-1">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              <!-- EMI Summary Card -->
              <div class="col-lg-5">
                <div class="calc-result-box">
                  <div class="calc-emi-highlight">
                    <div class="text-muted small fw-bold text-uppercase">Monthly EMI</div>
                    <div class="calc-emi-amount" id="emi-result-monthly">₹14,771</div>
                    <small class="text-success"><i class="bi bi-check-circle-fill"></i> Instant calculation</small>
                  </div>

                  <!-- Donut Chart Visualization -->
                  <div class="calc-donut-wrapper">
                    <svg class="donut-chart-svg" viewBox="0 0 100 100">
                      <!-- Background circle (Principal - Navy) -->
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#0B2D5B" stroke-width="14"/>
                      <!-- Progress circle (Interest - Green) -->
                      <circle id="emi-donut-interest-circle" cx="50" cy="50" r="40" fill="none" stroke="#1F8A4C" stroke-width="14" stroke-dasharray="251.3" stroke-dashoffset="120" stroke-linecap="round"/>
                    </svg>

                    <div class="donut-legend">
                      <div class="legend-item">
                        <span class="legend-dot" style="background: #0B2D5B;"></span>
                        <div>
                          <div class="text-muted small">Principal Amount</div>
                          <strong id="emi-result-principal">₹15,00,000</strong>
                        </div>
                      </div>
                      <div class="legend-item">
                        <span class="legend-dot" style="background: #1F8A4C;"></span>
                        <div>
                          <div class="text-muted small">Total Interest</div>
                          <strong id="emi-result-interest">₹11,58,780</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between pt-3 border-top mt-2">
                    <span class="text-muted small fw-bold">Total Amount Payable:</span>
                    <strong class="text-navy" id="emi-result-total">₹26,58,780</strong>
                  </div>

                  <div class="mt-3 text-center">
                    <a href="#products-loans" class="btn btn-sm btn-ggb-accent w-100">Apply for this Loan</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FD Calculator Panel -->
          <div id="calc-panel-fd" class="d-none">
            <div class="row g-4 align-items-center">
              <div class="col-lg-7">
                <!-- Investment Amount Slider -->
                <div class="calc-slider-group">
                  <div class="calc-slider-header">
                    <label for="fd-amount" class="calc-slider-label">Deposit Amount</label>
                    <span class="calc-slider-value-box" id="fd-amount-val">₹1,00,000</span>
                  </div>
                  <input type="range" class="custom-range" id="fd-amount" min="10000" max="2500000" step="5000" value="100000">
                  <div class="d-flex justify-content-between text-muted small mt-1">
                    <span>₹10,000</span>
                    <span>₹25,00,000</span>
                  </div>
                </div>

                <!-- Annual Interest Rate Slider -->
                <div class="calc-slider-group">
                  <div class="calc-slider-header">
                    <label for="fd-rate" class="calc-slider-label">Interest Rate (% p.a.)</label>
                    <span class="calc-slider-value-box" id="fd-rate-val">7.35%</span>
                  </div>
                  <input type="range" class="custom-range" id="fd-rate" min="5.0" max="9.0" step="0.05" value="7.35">
                  <div class="d-flex justify-content-between text-muted small mt-1">
                    <span>5.0%</span>
                    <span>9.0%</span>
                  </div>
                </div>

                <!-- Tenure Slider -->
                <div class="calc-slider-group">
                  <div class="calc-slider-header">
                    <label for="fd-tenure" class="calc-slider-label">Deposit Tenure (Years)</label>
                    <span class="calc-slider-value-box" id="fd-tenure-val">3 Years</span>
                  </div>
                  <input type="range" class="custom-range" id="fd-tenure" min="1" max="10" step="1" value="3">
                  <div class="d-flex justify-content-between text-muted small mt-1">
                    <span>1 Year</span>
                    <span>10 Years</span>
                  </div>
                </div>

                <!-- Senior Citizen Toggle -->
                <div class="form-check form-switch p-3 bg-light rounded-3 border">
                  <input class="form-check-input" type="checkbox" id="fd-senior">
                  <label class="form-check-label fw-bold text-navy" for="fd-senior">
                    Senior Citizen Depositor (+0.50% extra interest)
                  </label>
                </div>
              </div>

              <!-- FD Summary Card -->
              <div class="col-lg-5">
                <div class="calc-result-box">
                  <div class="calc-emi-highlight">
                    <div class="text-muted small fw-bold text-uppercase">Maturity Value</div>
                    <div class="calc-emi-amount text-success" id="fd-result-maturity">₹1,24,286</div>
                    <small class="text-muted"><i class="bi bi-arrow-repeat"></i> Quarterly Compounding</small>
                  </div>

                  <div class="calc-donut-wrapper">
                    <svg class="donut-chart-svg" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#0B2D5B" stroke-width="14"/>
                      <circle id="fd-donut-interest-circle" cx="50" cy="50" r="40" fill="none" stroke="#1F8A4C" stroke-width="14" stroke-dasharray="251.3" stroke-dashoffset="190" stroke-linecap="round"/>
                    </svg>

                    <div class="donut-legend">
                      <div class="legend-item">
                        <span class="legend-dot" style="background: #0B2D5B;"></span>
                        <div>
                          <div class="text-muted small">Total Deposit</div>
                          <strong id="fd-result-principal">₹1,00,000</strong>
                        </div>
                      </div>
                      <div class="legend-item">
                        <span class="legend-dot" style="background: #1F8A4C;"></span>
                        <div>
                          <div class="text-muted small">Total Interest</div>
                          <strong class="text-success" id="fd-result-interest">₹24,286</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-3 text-center">
                    <a href="#products-deposits" class="btn btn-sm btn-ggb-accent w-100">Open Fixed Deposit</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       10. GOVERNMENT SCHEMES SECTION
       ======================================================================== -->
  <section class="schemes-section section-padding" id="schemes" aria-labelledby="schemesHeading">
    <div class="container-custom">
      <div class="section-header reveal-on-scroll">
        <span class="section-tag"><i class="bi bi-award-fill"></i> Financial Inclusion</span>
        <h2 id="schemesHeading" data-i18n="schemes-h2">Government Social Security Schemes</h2>
        <p class="section-subtitle">
          Gujarat Gramin Bank actively implements all flagship Government of India and Government of Gujarat welfare programs at every branch.
        </p>
      </div>

      <div class="row g-4">
        <!-- 1. PMJDY -->
        <div class="col-lg-3 col-md-6">
          <div class="scheme-card">
            <div class="scheme-icon"><i class="bi bi-wallet-fill"></i></div>
            <h3 class="scheme-title">PM Jan Dhan Yojana (PMJDY)</h3>
            <p class="scheme-desc">Zero balance basic savings account with free RuPay debit card, ₹2 Lakh accidental insurance, and overdraft facility.</p>
            <a href="#branches" class="scheme-link">Enrol at Branch <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!-- 2. PMJJBY -->
        <div class="col-lg-3 col-md-6">
          <div class="scheme-card">
            <div class="scheme-icon"><i class="bi bi-shield-heart-fill"></i></div>
            <h3 class="scheme-title">PM Jeevan Jyoti Bima (PMJJBY)</h3>
            <p class="scheme-desc">Renewable life insurance cover of ₹2 Lakh for any cause of death at an affordable premium of only ₹436 per annum.</p>
            <a href="#branches" class="scheme-link">Enrol Scheme <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!-- 3. PMSBY -->
        <div class="col-lg-3 col-md-6">
          <div class="scheme-card">
            <div class="scheme-icon"><i class="bi bi-shield-fill-plus"></i></div>
            <h3 class="scheme-title">PM Suraksha Bima (PMSBY)</h3>
            <p class="scheme-desc">Accidental death and full disability insurance cover of ₹2 Lakh for an annual premium of just ₹20 per year.</p>
            <a href="#branches" class="scheme-link">Enrol Scheme <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!-- 4. APY -->
        <div class="col-lg-3 col-md-6">
          <div class="scheme-card">
            <div class="scheme-icon"><i class="bi bi-person-cane"></i></div>
            <h3 class="scheme-title">Atal Pension Yojana (APY)</h3>
            <p class="scheme-desc">Guaranteed monthly pension between ₹1,000 and ₹5,000 for unorganized workers upon reaching 60 years of age.</p>
            <a href="#branches" class="scheme-link">Enrol Scheme <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!-- 5. PM Mudra -->
        <div class="col-lg-3 col-md-6">
          <div class="scheme-card">
            <div class="scheme-icon"><i class="bi bi-briefcase-fill"></i></div>
            <h3 class="scheme-title">Pradhan Mantri Mudra Yojana</h3>
            <p class="scheme-desc">Collateral-free micro loans up to ₹10 Lakh across Shishu, Kishore, and Tarun categories for non-corporate small enterprises.</p>
            <a href="#products-loans" class="scheme-link">Apply Now <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!-- 6. Stand-Up India -->
        <div class="col-lg-3 col-md-6">
          <div class="scheme-card">
            <div class="scheme-icon"><i class="bi bi-rocket-takeoff-fill"></i></div>
            <h3 class="scheme-title">Stand-Up India Scheme</h3>
            <p class="scheme-desc">Bank loans between ₹10 Lakh and ₹1 Crore to SC/ST and Women entrepreneurs for setting up greenfield trading or manufacturing units.</p>
            <a href="#products-loans" class="scheme-link">Learn More <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!-- 7. PM-SVANidhi -->
        <div class="col-lg-3 col-md-6">
          <div class="scheme-card">
            <div class="scheme-icon"><i class="bi bi-cart-check-fill"></i></div>
            <h3 class="scheme-title">PM-SVANidhi for Vendors</h3>
            <p class="scheme-desc">Affordable working capital loans up to ₹50,000 for urban and rural street vendors with 7% interest subsidy on digital payback.</p>
            <a href="#branches" class="scheme-link">Apply Scheme <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <!-- 8. KCC Subvention -->
        <div class="col-lg-3 col-md-6">
          <div class="scheme-card">
            <div class="scheme-icon"><i class="bi bi-flower1"></i></div>
            <h3 class="scheme-title">KCC Interest Subvention</h3>
            <p class="scheme-desc">Government of India 2% interest subvention and 3% prompt repayment incentive for crop credit up to ₹3 Lakh, giving 4% net interest.</p>
            <a href="#products-agri" class="scheme-link">Check Details <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       11. GGB CONNECT APP PROMO SECTION
       ======================================================================== -->
  <section class="section-padding py-4" id="app-promo" aria-labelledby="appPromoHeading">
    <div class="container-custom">
      <div class="app-promo-section">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="app-promo-content">
              <span class="badge bg-light text-success fw-bold px-3 py-2 rounded-pill mb-3">
                <i class="bi bi-phone-fill me-1"></i> Official Mobile Application
              </span>
              <h2 id="appPromoHeading" class="text-white" data-i18n="app-h2">Bank on the Go with GGB Connect</h2>
              <p data-i18n="app-p" class="text-white">
                Experience seamless bilingual digital banking right from your smartphone. Transfer money, check Gujarati e-passbooks, pay utility bills, and manage fixed deposits instantly.
              </p>

              <ul class="app-feature-list">
                <li><i class="bi bi-check-circle-fill"></i> 24x7 Instant UPI & IMPS transfers to any bank account</li>
                <li><i class="bi bi-check-circle-fill"></i> Instant balance enquiry & bilingual Gujarati e-passbook</li>
                <li><i class="bi bi-check-circle-fill"></i> Open Term Deposits (FD/RD) online in under 2 minutes</li>
                <li><i class="bi bi-check-circle-fill"></i> Electricity bill payments, DTH recharge & FASTag top-up</li>
                <li><i class="bi bi-check-circle-fill"></i> Biometric fingerprint login & MPIN multi-factor security</li>
              </ul>

              <!-- Store Badges & QR Code -->
              <div class="d-flex align-items-center flex-wrap gap-3">
                <a href="https://play.google.com" target="_blank" rel="noopener">
                  <img src="assets/images/app/play-store-badge.svg" alt="Get GGB Connect on Google Play" width="160" height="48" loading="lazy">
                </a>
                <a href="https://apple.com" target="_blank" rel="noopener">
                  <img src="assets/images/app/app-store-badge.svg" alt="Download GGB Connect on the App Store" width="160" height="48" loading="lazy">
                </a>
              </div>

              <!-- QR Card -->
              <div class="app-qr-card">
                <img src="assets/images/app/qr-code.svg" alt="Scan to download GGB Connect app" class="app-qr-img" width="72" height="72" loading="lazy">
                <div class="app-qr-text">
                  <h5>Scan to Download</h5>
                  <p>Point your phone camera to install GGB Connect</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Phone Mockup -->
          <div class="col-lg-5">
            <div class="app-mockup-wrapper">
              <img src="assets/images/app/ggb-connect-mockup.webp" alt="GGB Connect Mobile Banking Application on Smartphone" class="app-mockup-img" width="500" height="667" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       12. CUSTOMER STORIES / TESTIMONIALS
       ======================================================================== -->
  <section class="testimonials-section section-padding" id="stories" aria-labelledby="testimonialsHeading">
    <div class="container-custom">
      <div class="section-header reveal-on-scroll">
        <span class="section-tag"><i class="bi bi-chat-heart-fill"></i> Rural Voices</span>
        <h2 id="testimonialsHeading">Voices of Prosperity Across Gujarat</h2>
        <p class="section-subtitle">
          Real stories of farmers, rural women entrepreneurs, and small business owners thriving with Gujarat Gramin Bank.
        </p>
      </div>

      <div class="row g-4">
        <!-- Story 1: Farmer Ramesh Patel -->
        <div class="col-lg-4 col-md-6">
          <div class="testimonial-card">
            <i class="bi bi-quote testimonial-quote-icon"></i>
            <div class="testimonial-stars">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
            </div>
            <p class="testimonial-text">
              "With GGB's Kisan Credit Card and tractor financing, I was able to modernize my farm yield. The branch staff in Anand treat me like family, explaining all loan terms patiently in Gujarati. I feel truly supported."
            </p>
            <div class="testimonial-author">
              <img src="assets/images/people/ramesh-patel.webp" alt="Ramesh Patel, Farmer from Anand" class="testimonial-avatar" width="60" height="60" loading="lazy">
              <div>
                <h3 class="author-name">Ramesh Patel</h3>
                <div class="author-village">Progressive Farmer &bull; Anand District</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Story 2: Bhavnaben Parmar -->
        <div class="col-lg-4 col-md-6">
          <div class="testimonial-card">
            <i class="bi bi-quote testimonial-quote-icon"></i>
            <div class="testimonial-stars">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
            </div>
            <p class="testimonial-text">
              "Our 12-woman self-help group received an instant loan with zero hassle. Today, our dairy cooperative delivers 500 litres of fresh milk daily. GGB made us financially independent and proud breadwinners."
            </p>
            <div class="testimonial-author">
              <img src="assets/images/people/bhavnaben-parmar.webp" alt="Bhavnaben Parmar, Dairy Entrepreneur from Mehsana" class="testimonial-avatar" width="60" height="60" loading="lazy">
              <div>
                <h3 class="author-name">Bhavnaben Parmar</h3>
                <div class="author-village">Dairy SHG Leader &bull; Mehsana District</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Story 3: Jignesh Shah -->
        <div class="col-lg-4 col-md-6">
          <div class="testimonial-card">
            <i class="bi bi-quote testimonial-quote-icon"></i>
            <div class="testimonial-stars">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
            </div>
            <p class="testimonial-text">
              "Setting up the GGB Vyapar account and soundbox QR terminal completely transformed my retail hardware business in Rajkot. Quick working capital credit allowed me to double inventory ahead of Diwali."
            </p>
            <div class="testimonial-author">
              <img src="assets/images/people/jignesh-shah.webp" alt="Jignesh Shah, Retail Store Owner from Rajkot" class="testimonial-avatar" width="60" height="60" loading="lazy">
              <div>
                <h3 class="author-name">Jignesh Shah</h3>
                <div class="author-village">Retail Store Owner &bull; Rajkot District</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       13. BRANCH LOCATOR SECTION
       ======================================================================== -->
  <section class="locator-section section-padding" id="branches" aria-labelledby="branchesHeading">
    <div class="container-custom">
      <div class="section-header reveal-on-scroll">
        <span class="section-tag"><i class="bi bi-geo-alt-fill"></i> Network Presence</span>
        <h2 id="branchesHeading">Find Your Nearest GGB Branch</h2>
        <p class="section-subtitle">
          Spanning 745+ branches across all 34 districts of Gujarat. Always close to your village and town.
        </p>
      </div>

      <div class="row g-4 align-items-stretch">
        <!-- Form Selector Card -->
        <div class="col-lg-6">
          <div class="locator-card h-100 d-flex flex-column justify-content-between">
            <div>
              <h3 class="fw-bold text-navy mb-3" style="color: var(--ggb-navy);">Branch & ATM Locator</h3>
              <p class="text-muted small mb-4">Select your district to locate branches, contact numbers, and working hours.</p>

              <div class="mb-3">
                <label for="locator-district-select" class="form-label fw-bold text-navy">Select District (Gujarat)</label>
                <select id="locator-district-select" class="form-select form-select-custom">
                  <option value="">-- Choose from 34 Districts --</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Amreli">Amreli</option>
                  <option value="Anand">Anand</option>
                  <option value="Aravalli">Aravalli</option>
                  <option value="Banaskantha">Banaskantha</option>
                  <option value="Bharuch">Bharuch</option>
                  <option value="Bhavnagar">Bhavnagar</option>
                  <option value="Botad">Botad</option>
                  <option value="Chhota Udaipur">Chhota Udaipur</option>
                  <option value="Dahod">Dahod</option>
                  <option value="Dang">Dang</option>
                  <option value="Devbhoomi Dwarka">Devbhoomi Dwarka</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                  <option value="Gir Somnath">Gir Somnath</option>
                  <option value="Jamnagar">Jamnagar</option>
                  <option value="Junagadh">Junagadh</option>
                  <option value="Kheda">Kheda</option>
                  <option value="Kutch">Kutch</option>
                  <option value="Mahisagar">Mahisagar</option>
                  <option value="Mehsana">Mehsana</option>
                  <option value="Morbi">Morbi</option>
                  <option value="Narmada">Narmada</option>
                  <option value="Navsari">Navsari</option>
                  <option value="Panchmahal">Panchmahal</option>
                  <option value="Patan">Patan</option>
                  <option value="Porbandar">Porbandar</option>
                  <option value="Rajkot">Rajkot</option>
                  <option value="Sabarkantha">Sabarkantha</option>
                  <option value="Surat">Surat</option>
                  <option value="Surendranagar">Surendranagar</option>
                  <option value="Tapi">Tapi</option>
                  <option value="Vadodara">Vadodara</option>
                  <option value="Valsad">Valsad</option>
                </select>
              </div>

              <div class="mb-4">
                <label for="locator-branch-select" class="form-label fw-bold text-navy">Select Branch</label>
                <select id="locator-branch-select" class="form-select form-select-custom" disabled>
                  <option value="">-- First Select District --</option>
                </select>
              </div>

              <button type="button" class="btn-ggb-accent w-100 justify-content-center" id="locator-search-btn">
                <i class="bi bi-search"></i> Find Branch Details
              </button>
            </div>

            <!-- Dynamic Result Card -->
            <div id="locator-result-card" class="mt-4">
              <div class="p-3 bg-white border rounded-3 text-center text-muted small">
                <i class="bi bi-compass fs-3 text-success d-block mb-1"></i>
                Select district above or click search to view branch details
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Map Preview Graphic -->
        <div class="col-lg-6">
          <div class="map-card-wrapper h-100">
            <img src="assets/images/misc/gujarat-branch-map.webp" alt="Map of Gujarat showing 745+ GGB Branches across 34 Districts" class="map-img" width="800" height="600" loading="lazy">
            <div class="map-badge-overlay">
              <div class="fw-bold text-success"><i class="bi bi-check2-circle"></i> 100% District Coverage</div>
              <small class="text-white-50">Saurashtra &bull; Kutch &bull; North &bull; Central &bull; South Gujarat</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Head Office Card Banner -->
      <div class="head-office-banner">
        <div>
          <span class="badge bg-primary text-white mb-2">Central Administrative Office</span>
          <h3 class="mb-1" style="color: var(--ggb-navy);">Gujarat Gramin Bank Head Office</h3>
          <p class="text-muted mb-0 small">
            <i class="bi bi-geo-alt-fill text-danger me-1"></i> "GGB Bhavan", Near Alkapuri, Vadodara - 390007, Gujarat, India
          </p>
        </div>
        <div class="head-office-actions">
          <a href="tel:02652361210" class="btn-ggb-outline btn-sm-custom">
            <i class="bi bi-telephone"></i> 0265-2361210
          </a>
          <a href="mailto:contact@ggb.bank.in" class="btn-ggb-primary btn-sm-custom">
            <i class="bi bi-envelope"></i> contact@ggb.bank.in
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       14. SAFE BANKING TIPS (Alert Banner with 4 Tips)
       ======================================================================== -->
  <section class="safe-banking-section section-padding" id="safe-banking" aria-labelledby="safeBankingHeading">
    <div class="container-custom">
      <div class="safe-banking-panel">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <div>
            <span class="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-2">
              <i class="bi bi-shield-exclamation me-1"></i> Customer Awareness
            </span>
            <h2 id="safeBankingHeading" class="mb-1">Safe & Secure Banking Guidelines</h2>
            <p class="text-muted small mb-0">Follow RBI and GGB security protocols to keep your finances safe from cyber fraudsters.</p>
          </div>
          <div class="cyber-helpline-wrapper">
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener" class="btn btn-danger fw-bold rounded-pill px-4 cyber-helpline-btn">
              <i class="bi bi-telephone-fill me-1"></i> National Cyber Helpline: 1930
            </a>
          </div>
        </div>

        <div class="row g-3">
          <!-- Tip 1 -->
          <div class="col-lg-3 col-md-6">
            <div class="safe-tip-card">
              <i class="bi bi-key-fill safe-tip-icon"></i>
              <h3 class="safe-tip-title">Never Share OTP or PIN</h3>
              <p class="safe-tip-desc">GGB officers will never ask for your card PIN, OTP, CVV, or internet banking password over call, SMS, or email.</p>
            </div>
          </div>

          <!-- Tip 2 -->
          <div class="col-lg-3 col-md-6">
            <div class="safe-tip-card">
              <i class="bi bi-camera-video-off-fill safe-tip-icon"></i>
              <h3 class="safe-tip-title">Beware of "Digital Arrest"</h3>
              <p class="safe-tip-desc">No law enforcement agency or bank conducts "digital arrest" via WhatsApp or Skype video calls asking to transfer money.</p>
            </div>
          </div>

          <!-- Tip 3 -->
          <div class="col-lg-3 col-md-6">
            <div class="safe-tip-card">
              <i class="bi bi-link-45deg safe-tip-icon"></i>
              <h3 class="safe-tip-title">Verify Official Links</h3>
              <p class="safe-tip-desc">Only download GGB Connect from official app stores. Always verify that URLs end in official domain <strong>.bank.in</strong>.</p>
            </div>
          </div>

          <!-- Tip 4 -->
          <div class="col-lg-3 col-md-6">
            <div class="safe-tip-card">
              <i class="bi bi-exclamation-triangle-fill safe-tip-icon"></i>
              <h3 class="safe-tip-title">Report Fraud Immediately</h3>
              <p class="safe-tip-desc">If you notice any unauthorized debit, immediately call GGB at 0265-2361210 or report to <strong>cybercrime.gov.in (1930)</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       15. FAQ SECTION (Bootstrap Accordion)
       ======================================================================== -->
  <section class="faq-section section-padding" id="faq" aria-labelledby="faqHeading">
    <div class="container-custom" style="max-width: 900px;">
      <div class="section-header reveal-on-scroll">
        <span class="section-tag"><i class="bi bi-question-circle-fill"></i> Help & Answers</span>
        <h2 id="faqHeading">Frequently Asked Questions</h2>
        <p class="section-subtitle">
          Got questions about our amalgamation, account services, or agricultural loans? Find clear answers below.
        </p>
      </div>

      <div class="accordion accordion-custom" id="faqAccordion">
        <!-- FAQ 1 -->
        <div class="accordion-item">
          <h3 class="accordion-header" id="faqHeading1">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1" aria-expanded="true" aria-controls="faqCollapse1">
              What does the amalgamation of BGGB and SGB mean for customers?
            </button>
          </h3>
          <div id="faqCollapse1" class="accordion-collapse collapse show" aria-labelledby="faqHeading1" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              On 1 May 2025, Baroda Gujarat Gramin Bank (BGGB) and Saurashtra Gramin Bank (SGB) were amalgamated by the Government of India under the "One State, One RRB" initiative to form <strong>Gujarat Gramin Bank (GGB)</strong>. Customers now enjoy a unified network of 745+ branches across all 34 districts of Gujarat, enhanced digital services through GGB Connect, and greater credit capabilities, backed by sponsor Bank of Baroda.
            </div>
          </div>
        </div>

        <!-- FAQ 2 -->
        <div class="accordion-item">
          <h3 class="accordion-header" id="faqHeading2">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse2" aria-expanded="false" aria-controls="faqCollapse2">
              Will my existing account number, cheque book, and IFSC code change?
            </button>
          </h3>
          <div id="faqCollapse2" class="accordion-collapse collapse" aria-labelledby="faqHeading2" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Existing account numbers, ATM debit cards, and existing cheque books continue to work normally during the transition period. If a revised IFSC code is assigned to your branch, official notifications are sent via SMS, and both old and new IFSC codes are routed seamlessly to prevent any transaction disruption.
            </div>
          </div>
        </div>

        <!-- FAQ 3 -->
        <div class="accordion-item">
          <h3 class="accordion-header" id="faqHeading3">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse3" aria-expanded="false" aria-controls="faqCollapse3">
              What documents are required to open a savings account with GGB?
            </button>
          </h3>
          <div id="faqCollapse3" class="accordion-collapse collapse" aria-labelledby="faqHeading3" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Opening an account is straightforward. You only need standard KYC documents: Proof of Identity (Aadhaar Card or Voter ID), Proof of Address, PAN Card (or Form 60 for agricultural applicants), and two passport-sized photographs. Accounts can also be initiated through our rural Bank Mitras using biometric e-KYC.
            </div>
          </div>
        </div>

        <!-- FAQ 4 -->
        <div class="accordion-item">
          <h3 class="accordion-header" id="faqHeading4">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse4" aria-expanded="false" aria-controls="faqCollapse4">
              How can farmers apply for the Kisan Credit Card (KCC) and subvention?
            </button>
          </h3>
          <div id="faqCollapse4" class="accordion-collapse collapse" aria-labelledby="faqHeading4" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Farmers with cultivable land in Gujarat can apply by submitting land ownership records (7/12 and 8-A utara) along with Aadhaar card and crop plan. Under the Government of India scheme, loans up to ₹3 Lakh receive a 2% interest subvention and 3% prompt repayment incentive, reducing the effective borrowing cost to just 4.00% p.a.
            </div>
          </div>
        </div>

        <!-- FAQ 5 -->
        <div class="accordion-item">
          <h3 class="accordion-header" id="faqHeading5">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse5" aria-expanded="false" aria-controls="faqCollapse5">
              How do I register and activate the GGB Connect mobile app?
            </button>
          </h3>
          <div id="faqCollapse5" class="accordion-collapse collapse" aria-labelledby="faqHeading5" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Download the <strong>GGB Connect</strong> app from Google Play Store or Apple App Store. Ensure your registered mobile SIM card is active in the smartphone. The app automatically verifies your SIM via SMS, allows you to set your secure 6-digit MPIN, and link your accounts instantly.
            </div>
          </div>
        </div>

        <!-- FAQ 6 -->
        <div class="accordion-item">
          <h3 class="accordion-header" id="faqHeading6">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse6" aria-expanded="false" aria-controls="faqCollapse6">
              What is the customer complaint and grievance redressal process?
            </button>
          </h3>
          <div id="faqCollapse6" class="accordion-collapse collapse" aria-labelledby="faqHeading6" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              We uphold the highest service standards. If you have an unresolved query, you can: (1) Speak with the Branch Manager, (2) Call our Central Call Centre at 0265-2361210, or (3) Escalate to our Principal Nodal Officer at Head Office Vadodara. In the rare event a complaint is not resolved within 30 days, customers may approach the RBI Integrated Ombudsman.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       16. CTA BAND ("Start your banking journey with GGB")
       ======================================================================== -->
  <section class="cta-band" aria-labelledby="ctaHeading">
    <div class="container-custom">
      <div class="reveal-on-scroll">
        <h2 id="ctaHeading" data-i18n="cta-h2">Start your banking journey with GGB today</h2>
        <p data-i18n="cta-p">
          Join over 1 Crore satisfied Gujaratis. Open a high-interest savings account or get swift agricultural and business credit at any of our 745+ branches.
        </p>
        <div class="d-flex justify-content-center flex-wrap gap-3">
          <a href="#products-deposits" class="btn-ggb-accent">
            <i class="bi bi-person-plus-fill"></i> Open Savings Account
          </a>
          <a href="#branches" class="btn-ggb-outline-white">
            <i class="bi bi-geo-alt-fill"></i> Locate Nearest Branch
          </a>
        </div>
      </div>
    </div>
  </section>

</main>

<?php
include __DIR__ . '/includes/footer.php';
?>
