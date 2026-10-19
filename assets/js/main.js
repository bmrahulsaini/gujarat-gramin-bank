/**
 * GUJARAT GRAMIN BANK (GGB) - MASTER JAVASCRIPT
 * Pure Vanilla JavaScript - No CDNs or External Libraries
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initA11yControls();
  initLanguageSwitcher();
  initScrollReveal();
  initStatCounters();
  initCalculators();
  initBranchLocator();
  initFloatingElements();
});

/* --------------------------------------------------------------------------
   1. STICKY NAVBAR & SMOOTH SCROLL
   -------------------------------------------------------------------------- */
function initStickyNavbar() {
  const navbar = document.querySelector('.ggb-navbar');
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // ScrollSpy active link
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Close offcanvas when link is clicked
  const offcanvasEl = document.getElementById('mobileNavOffcanvas');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (offcanvasEl && window.bootstrap) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (bsOffcanvas) bsOffcanvas.hide();
      }
    });
  });

  // Automatically activate corresponding tab and scroll smoothly when clicking product tab anchors
  document.querySelectorAll('a[href^="#products-"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetHash = anchor.getAttribute('href');
      const tabTrigger = document.querySelector(`[data-bs-target="${targetHash}"]`);
      if (tabTrigger && window.bootstrap) {
        const bsTab = bootstrap.Tab.getOrCreateInstance(tabTrigger);
        bsTab.show();
        const productsSec = document.getElementById('products');
        if (productsSec) {
          e.preventDefault();
          productsSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. ACCESSIBILITY CONTROLS (Font Size & High Contrast)
   -------------------------------------------------------------------------- */
function initA11yControls() {
  const root = document.documentElement;
  const body = document.body;

  // Font size buttons
  const btnSm = document.getElementById('btn-font-sm');
  const btnMd = document.getElementById('btn-font-md');
  const btnLg = document.getElementById('btn-font-lg');

  const savedSize = localStorage.getItem('ggb-font-size') || 'font-size-md';
  root.classList.add(savedSize);

  function setFontSize(cls) {
    root.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
    root.classList.add(cls);
    localStorage.setItem('ggb-font-size', cls);
  }

  btnSm?.addEventListener('click', () => setFontSize('font-size-sm'));
  btnMd?.addEventListener('click', () => setFontSize('font-size-md'));
  btnLg?.addEventListener('click', () => setFontSize('font-size-lg'));

  // High contrast toggle
  const contrastBtn = document.getElementById('btn-contrast-toggle');
  const savedContrast = localStorage.getItem('ggb-high-contrast') === 'true';

  if (savedContrast) {
    body.classList.add('high-contrast');
  }

  contrastBtn?.addEventListener('click', () => {
    body.classList.toggle('high-contrast');
    localStorage.setItem('ggb-high-contrast', body.classList.contains('high-contrast'));
  });
}

/* --------------------------------------------------------------------------
   3. LANGUAGE SWITCHER (English / Gujarati / Hindi)
   -------------------------------------------------------------------------- */
const i18nDictionary = {
  en: {
    'top-call': 'Head Office: 0265-2361210',
    'top-locate': 'Locate Branch',
    'nav-personal': 'Personal',
    'nav-agri': 'Agri & Rural',
    'nav-loans': 'Loans',
    'nav-deposits': 'Deposits',
    'nav-digital': 'Digital',
    'nav-schemes': 'Schemes',
    'nav-about': 'About GGB',
    'nav-contact': 'Contact',
    'nav-login': 'Login',
    'nav-open-acc': 'Open Account',
    'hero-tag': 'Amalgamated Regional Rural Bank',
    'hero-h1': 'Rooted in Gujarat. Growing with you.',
    'hero-desc': 'Serving 1 Crore+ customers across 34 districts of Gujarat with 745+ branches. A trusted partnership of Govt. of India, Bank of Baroda & Govt. of Gujarat.',
    'hero-cta-open': 'Open Savings Account',
    'hero-cta-loan': 'Apply for Loan',
    'hero-h1-slide2': 'Empowering Gujarat\'s Rural Women & Entrepreneurs',
    'hero-desc-slide2': 'Empowering thousands of self-help groups, dairy cooperatives, and small businesses with easy capital and financial independence.',
    'hero-h1-slide3': 'Your Own Home in Gujarat, with Affordable Rates',
    'hero-desc-slide3': 'Realize your dream of a pucca home in rural and semi-urban Gujarat with GGB Apna Ghar Housing Loans starting from 8.45% p.a.',
    'qa-open': 'Open Account',
    'qa-loan': 'Apply Loan',
    'qa-emi': 'Pay EMI',
    'qa-locate': 'Locate Branch',
    'qa-rates': 'Interest Rates',
    'qa-complaint': 'Raise Complaint',
    'stats-h2': 'Why Gujarat Trusts GGB',
    'calc-h2': 'Financial Calculators',
    'schemes-h2': 'Government Social Security Schemes',
    'app-h2': 'Bank on the Go with GGB Connect',
    'app-p': 'Experience seamless bilingual digital banking right from your smartphone. Simple, secure, and fast.',
    'cta-h2': 'Start your banking journey with GGB today',
    'cta-p': 'Join over 1 Crore satisfied Gujaratis. Open an account online or visit any of our 745+ branches across Gujarat.'
  },
  gu: {
    'top-call': 'મુખ્ય કચેરી: 0265-2361210',
    'top-locate': 'શાખા શોધો',
    'nav-personal': 'વ્યક્તિગત',
    'nav-agri': 'કૃષિ અને ગ્રામીણ',
    'nav-loans': 'ધિરાણ / લોન',
    'nav-deposits': 'થાપણો (FD/RD)',
    'nav-digital': 'ડિજિટલ બેંકિંગ',
    'nav-schemes': 'સરકારી યોજનાઓ',
    'nav-about': 'અમારા વિશે',
    'nav-contact': 'સંપર્ક',
    'nav-login': 'લોગિન',
    'nav-open-acc': 'ખાતું ખોલો',
    'hero-tag': 'ગુજરાતની પોતાની ગ્રામીણ બેંક',
    'hero-h1': 'ગુજરાતના મૂળમાંથી, તમારી સાથે વિકાસ.',
    'hero-desc': 'ગુજરાતના ૩૪ જિલ્લાઓમાં ૭૪૫+ શાખાઓ દ્વારા ૧ કરોડથી વધુ ગ્રાહકોની સેવામાં સમર્પિત. ભારત સરકાર, બેંક ઓફ બરોડા અને ગુજરાત સરકારનું વિશ્વસનીય ભાગીદારી.',
    'hero-cta-open': 'બચત ખાતું ખોલો',
    'hero-cta-loan': 'લોન માટે અરજી કરો',
    'hero-h1-slide2': 'ગુજરાતની ગ્રામીણ મહિલાઓ અને ઉદ્યોગસાહસિકોનું સશક્તિકરણ',
    'hero-desc-slide2': 'હજારો સ્વસહાય જૂથો, ડેરી મંડળીઓ અને નાના વેપારીઓને સરળ ધિરાણ પૂરું પાડી આત્મનિર્ભર બનાવીએ છીએ.',
    'hero-h1-slide3': 'પોતાના પાકા ઘરનું સ્વપ્ન હવે સાકાર, સરળ વ્યાજદરે',
    'hero-desc-slide3': 'જીજીબી આપણું ઘર આવાસ લોન વડે ગુજરાતના ગામડાઓ અને નગરોમાં તમારું સપનાનું ઘર બનાવો, વ્યાજદર માત્ર ૮.૪૫% થી શરૂ.',
    'qa-open': 'ખાતું ખોલો',
    'qa-loan': 'લોન અરજી',
    'qa-emi': 'EMI ગણો',
    'qa-locate': 'શાખા શોધો',
    'qa-rates': 'વ્યાજ દર',
    'qa-complaint': 'ફરિયાદ નોંધણી',
    'stats-h2': 'શા માટે ગુજરાત જીજીબી પર વિશ્વાસ મૂકે છે',
    'calc-h2': 'નાણાકીય કેલ્ક્યુલેટર',
    'schemes-h2': 'સરકારી સામાજિક સુરક્ષા યોજનાઓ',
    'app-h2': 'જીજીબી કનેક્ટ સાથે ગમે ત્યાં બેંકિંગ',
    'app-p': 'તમારા મોબાઈલ ફોન પર ગુજરાતી અને અંગ્રેજીમાં સરળ, સુરક્ષિત અને ઝડપી ડિજિટલ બેંકિંગનો અનુભવ કરો.',
    'cta-h2': 'આજે જ જીજીબી સાથે તમારી બેંકિંગ યાત્રા શરૂ કરો',
    'cta-p': 'ગુજરાતના ૧ કરોડથી વધુ સંતુષ્ટ ગ્રાહકો સાથે જોડાઓ. ૭૪૫+ શાખાઓમાંથી કોઈપણ નજીકની શાખાની મુલાકાત લો.'
  },
  hi: {
    'top-call': 'प्रधान कार्यालय: 0265-2361210',
    'top-locate': 'शाखा खोजें',
    'nav-personal': 'व्यक्तिगत',
    'nav-agri': 'कृषि एवं ग्रामीण',
    'nav-loans': 'ऋण / लोन',
    'nav-deposits': 'जमा योजनाएं',
    'nav-digital': 'डिजिटल बैंकिंग',
    'nav-schemes': 'सरकारी योजनाएं',
    'nav-about': 'हमारे बारे में',
    'nav-contact': 'संपर्क',
    'nav-login': 'लॉगिन',
    'nav-open-acc': 'खाता खोलें',
    'hero-tag': 'संयुक्त क्षेत्रीय ग्रामीण बैंक',
    'hero-h1': 'गुजरात की जड़ों से, आपके साथ विकास।',
    'hero-desc': 'गुजरात के 34 जिलों में 745+ शाखाओं के साथ 1 करोड़+ ग्राहकों की सेवा में। भारत सरकार, बैंक ऑफ बड़ौदा और गुजरात सरकार का विश्वसनीय उपक्रम।',
    'hero-cta-open': 'बचत खाता खोलें',
    'hero-cta-loan': 'ऋण हेतु आवेदन करें',
    'hero-h1-slide2': 'ग्रामीण महिलाओं और उद्यमियों का सशक्तिकरण',
    'hero-desc-slide2': 'स्वयं सहायता समूहों, दुग्ध समितियों और लघु व्यापारियों को आसान वित्तीय सहायता देकर आत्मनिर्भर बनाते हैं।',
    'hero-h1-slide3': 'सस्ते ब्याज दरों पर गुजरात में अपना खुद का पक्का घर',
    'hero-desc-slide3': 'जीजीबी अपना घर आवास ऋण के साथ ग्रामीण और अर्ध-शहरी गुजरात में अपने घर का सपना साकार करें।',
    'qa-open': 'खाता खोलें',
    'qa-loan': 'ऋण आवेदन',
    'qa-emi': 'ईएमआई गणना',
    'qa-locate': 'शाखा खोजें',
    'qa-rates': 'ब्याज दरें',
    'qa-complaint': 'शिकायत दर्ज करें',
    'stats-h2': 'गुजरात का जीजीबी पर अटूट विश्वास',
    'calc-h2': 'वित्तीय कैलकुलेटर',
    'schemes-h2': 'सरकारी सामाजिक सुरक्षा योजनाएं',
    'app-h2': 'जीजीबी कनेक्ट के साथ कहीं भी बैंकिंग',
    'app-p': 'अपने स्मार्टफोन पर सरल, सुरक्षित और तेज डिजिटल बैंकिंग का अनुभव करें।',
    'cta-h2': 'आज ही जीजीबी के साथ अपनी बैंकिंग यात्रा शुरू करें',
    'cta-p': '1 करोड़ से अधिक संतुष्ट ग्राहकों से जुड़ें। ऑनलाइन खाता खोलें या निकटतम शाखा में आएं।'
  }
};

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.btn-lang');
  let currentLang = localStorage.getItem('ggb-lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ggb-lang', lang);

    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    const dict = i18nDictionary[lang] || i18nDictionary.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Toggle font family for gujarati / hindi on html
    if (lang === 'gu') {
      document.body.style.fontFamily = "var(--font-gujarati)";
    } else if (lang === 'hi') {
      document.body.style.fontFamily = "var(--font-hindi)";
    } else {
      document.body.style.fontFamily = "var(--font-primary)";
    }
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  if (currentLang !== 'en') {
    applyLanguage(currentLang);
  }
}

/* --------------------------------------------------------------------------
   4. SCROLL REVEAL (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. ANIMATED STAT COUNTERS
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statsSection = document.getElementById('about');
  if (!statsSection) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      runCounters();
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);

  function runCounters() {
    document.querySelectorAll('.stats-number').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString('en-IN') + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
        }
      }, stepTime);
    });
  }
}

/* --------------------------------------------------------------------------
   6. FINANCIAL CALCULATORS (EMI & FD)
   -------------------------------------------------------------------------- */
function initCalculators() {
  // Tabs
  const tabEMI = document.getElementById('calc-tab-emi');
  const tabFD = document.getElementById('calc-tab-fd');
  const panelEMI = document.getElementById('calc-panel-emi');
  const panelFD = document.getElementById('calc-panel-fd');

  tabEMI?.addEventListener('click', () => {
    tabEMI.classList.add('active');
    tabFD?.classList.remove('active');
    panelEMI?.classList.remove('d-none');
    panelFD?.classList.add('d-none');
  });

  tabFD?.addEventListener('click', () => {
    tabFD.classList.add('active');
    tabEMI?.classList.remove('active');
    panelFD?.classList.remove('d-none');
    panelEMI?.classList.add('d-none');
  });

  // Indian Number Currency Formatter
  function formatINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  // --- EMI CALCULATOR ---
  const emiAmount = document.getElementById('emi-amount');
  const emiRate = document.getElementById('emi-rate');
  const emiTenure = document.getElementById('emi-tenure');

  const emiAmountVal = document.getElementById('emi-amount-val');
  const emiRateVal = document.getElementById('emi-rate-val');
  const emiTenureVal = document.getElementById('emi-tenure-val');

  const emiResultMonthly = document.getElementById('emi-result-monthly');
  const emiResultPrincipal = document.getElementById('emi-result-principal');
  const emiResultInterest = document.getElementById('emi-result-interest');
  const emiResultTotal = document.getElementById('emi-result-total');
  const emiDonutCircle = document.getElementById('emi-donut-interest-circle');

  function calculateEMI() {
    const P = parseFloat(emiAmount?.value || 1500000);
    const annualR = parseFloat(emiRate?.value || 8.5);
    const years = parseFloat(emiTenure?.value || 15);

    if (emiAmountVal) emiAmountVal.textContent = formatINR(P);
    if (emiRateVal) emiRateVal.textContent = annualR.toFixed(1) + '%';
    if (emiTenureVal) emiTenureVal.textContent = years + ' Years';

    const r = (annualR / 12) / 100;
    const n = years * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;

    if (emiResultMonthly) emiResultMonthly.textContent = formatINR(emi);
    if (emiResultPrincipal) emiResultPrincipal.textContent = formatINR(P);
    if (emiResultInterest) emiResultInterest.textContent = formatINR(totalInterest);
    if (emiResultTotal) emiResultTotal.textContent = formatINR(totalPayable);

    // Update Donut SVG Circle (circumference = 2 * PI * 40 = 251.3)
    if (emiDonutCircle) {
      const circ = 251.3;
      const interestRatio = totalInterest / totalPayable;
      const strokeOffset = circ * (1 - interestRatio);
      emiDonutCircle.style.strokeDashoffset = strokeOffset;
    }
  }

  [emiAmount, emiRate, emiTenure].forEach(input => {
    input?.addEventListener('input', calculateEMI);
  });

  calculateEMI();

  // --- FD CALCULATOR ---
  const fdAmount = document.getElementById('fd-amount');
  const fdRate = document.getElementById('fd-rate');
  const fdTenure = document.getElementById('fd-tenure');
  const fdSenior = document.getElementById('fd-senior');

  const fdAmountVal = document.getElementById('fd-amount-val');
  const fdRateVal = document.getElementById('fd-rate-val');
  const fdTenureVal = document.getElementById('fd-tenure-val');

  const fdResultMaturity = document.getElementById('fd-result-maturity');
  const fdResultPrincipal = document.getElementById('fd-result-principal');
  const fdResultInterest = document.getElementById('fd-result-interest');
  const fdDonutCircle = document.getElementById('fd-donut-interest-circle');

  function calculateFD() {
    const P = parseFloat(fdAmount?.value || 100000);
    let r = parseFloat(fdRate?.value || 7.35);
    const years = parseFloat(fdTenure?.value || 3);
    const isSenior = fdSenior?.checked;

    if (isSenior) r += 0.50;

    if (fdAmountVal) fdAmountVal.textContent = formatINR(P);
    if (fdRateVal) fdRateVal.textContent = r.toFixed(2) + '%';
    if (fdTenureVal) fdTenureVal.textContent = years + ' Years';

    // Quarterly compounding: A = P * (1 + r/400)^(4*t)
    const maturity = P * Math.pow(1 + (r / 400), 4 * years);
    const interestEarned = maturity - P;

    if (fdResultMaturity) fdResultMaturity.textContent = formatINR(maturity);
    if (fdResultPrincipal) fdResultPrincipal.textContent = formatINR(P);
    if (fdResultInterest) fdResultInterest.textContent = formatINR(interestEarned);

    if (fdDonutCircle) {
      const circ = 251.3;
      const interestRatio = interestEarned / maturity;
      const strokeOffset = circ * (1 - interestRatio);
      fdDonutCircle.style.strokeDashoffset = strokeOffset;
    }
  }

  [fdAmount, fdRate, fdTenure, fdSenior].forEach(input => {
    input?.addEventListener('input', calculateFD);
  });

  calculateFD();
}

/* --------------------------------------------------------------------------
   7. BRANCH LOCATOR DATA & FUNCTIONALITY
   -------------------------------------------------------------------------- */
const gujaratBranches = {
  'Ahmedabad': [
    { name: 'Sanand Branch', ifsc: 'BARB0GGBSAN', address: 'Near GIDC Gate No. 2, Sanand, Ahmedabad - 382110', phone: '0265-2361210' },
    { name: 'Dholka Main Branch', ifsc: 'BARB0GGBDHO', address: 'Station Road, Opp. APMC Market, Dholka - 387810', phone: '0265-2361210' },
    { name: 'Viramgam Rural Branch', ifsc: 'BARB0GGBVIR', address: 'Golwadi Gate, Viramgam, Ahmedabad - 382150', phone: '0265-2361210' }
  ],
  'Vadodara': [
    { name: 'Vadodara Head Office Branch', ifsc: 'BARB0GGBVAD', address: 'GGB Bhavan, Alkapuri, Vadodara - 390007', phone: '0265-2361210' },
    { name: 'Padra Agriculture Branch', ifsc: 'BARB0GGBPAD', address: 'Station Road, Padra, Vadodara - 391440', phone: '0265-2361210' },
    { name: 'Savli Branch', ifsc: 'BARB0GGBSAV', address: 'Main Bazar, Savli, Vadodara - 391770', phone: '0265-2361210' }
  ],
  'Surat': [
    { name: 'Bardoli Sugar Branch', ifsc: 'BARB0GGBBAR', address: 'Near Sardar Patel Smarak, Station Road, Bardoli - 394601', phone: '0265-2361210' },
    { name: 'Mandvi Rural Branch', ifsc: 'BARB0GGBMAN', address: 'Taluka Panchayat Road, Mandvi, Surat - 394160', phone: '0265-2361210' }
  ],
  'Rajkot': [
    { name: 'Gondal APMC Branch', ifsc: 'BARB0GGBGON', address: 'Marketing Yard Road, Gondal, Rajkot - 360311', phone: '0265-2361210' },
    { name: 'Jasdan Branch', ifsc: 'BARB0GGBJAS', address: 'Near Bus Stand, Jasdan, Rajkot - 360050', phone: '0265-2361210' }
  ],
  'Anand': [
    { name: 'Anand Main Agriculture Branch', ifsc: 'BARB0GGBANA', address: 'Station Road, Anand - 388001', phone: '0265-2361210' },
    { name: 'Khambhat Port Branch', ifsc: 'BARB0GGBKHA', address: 'Tower Bazar, Khambhat, Anand - 388620', phone: '0265-2361210' }
  ],
  'Mehsana': [
    { name: 'Mehsana Dairy Branch', ifsc: 'BARB0GGBMEH', address: 'Near Dudhsagar Dairy, Mehsana - 384002', phone: '0265-2361210' },
    { name: 'Kadi Industrial Branch', ifsc: 'BARB0GGBKAD', address: 'Chhatral-Kadi Road, Kadi - 382715', phone: '0265-2361210' }
  ],
  'Bhavnagar': [
    { name: 'Mahuva Agriculture Branch', ifsc: 'BARB0GGBMAH', address: 'Onion Yard Road, Mahuva, Bhavnagar - 364290', phone: '0265-2361210' },
    { name: 'Palitana Pilgrimage Branch', ifsc: 'BARB0GGBPAL', address: 'Taleti Road, Palitana, Bhavnagar - 364270', phone: '0265-2361210' }
  ],
  'Junagadh': [
    { name: 'Keshod Groundnut Branch', ifsc: 'BARB0GGBKES', address: 'Yard Gate, Keshod, Junagadh - 362220', phone: '0265-2361210' },
    { name: 'Visavadar Gir Branch', ifsc: 'BARB0GGBVIS', address: 'Main Bazar, Visavadar - 362130', phone: '0265-2361210' }
  ],
  'Kutch': [
    { name: 'Bhuj Heritage Branch', ifsc: 'BARB0GGBBHU', address: 'Station Road, Bhuj, Kutch - 370001', phone: '0265-2361210' },
    { name: 'Anjar Industrial Branch', ifsc: 'BARB0GGBANJ', address: 'Near Ganga Naka, Anjar, Kutch - 370110', phone: '0265-2361210' }
  ],
  'Patan': [
    { name: 'Patan Patola Branch', ifsc: 'BARB0GGBPAT', address: 'College Road, Patan - 384265', phone: '0265-2361210' },
    { name: 'Siddhpur Branch', ifsc: 'BARB0GGBSID', address: 'Bindu Sarovar Road, Siddhpur - 384151', phone: '0265-2361210' }
  ]
};

function initBranchLocator() {
  const districtSelect = document.getElementById('locator-district-select');
  const branchSelect = document.getElementById('locator-branch-select');
  const searchBtn = document.getElementById('locator-search-btn');
  const resultCard = document.getElementById('locator-result-card');

  if (!districtSelect || !branchSelect) return;

  function populateBranches(district) {
    branchSelect.innerHTML = '<option value="">-- Select Branch --</option>';
    const list = gujaratBranches[district] || [
      { name: `${district} Main Branch`, ifsc: `BARB0GGB${district.substring(0, 3).toUpperCase()}`, address: `Station Road, District Center, ${district} - Gujarat`, phone: '0265-2361210' }
    ];

    list.forEach((br, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = br.name;
      branchSelect.appendChild(opt);
    });
    branchSelect.disabled = false;
  }

  districtSelect.addEventListener('change', (e) => {
    const dist = e.target.value;
    if (dist) {
      populateBranches(dist);
    } else {
      branchSelect.innerHTML = '<option value="">-- First Select District --</option>';
      branchSelect.disabled = true;
    }
  });

  searchBtn?.addEventListener('click', () => {
    const dist = districtSelect.value;
    const branchIdx = branchSelect.value;

    if (!dist) {
      alert('Please select a District first.');
      return;
    }

    const list = gujaratBranches[dist] || [
      { name: `${dist} District Branch`, ifsc: `BARB0GGB${dist.substring(0, 3).toUpperCase()}`, address: `Main Road, Near Panchayat Office, ${dist} - Gujarat`, phone: '0265-2361210' }
    ];

    const branch = list[branchIdx] || list[0];

    if (resultCard) {
      resultCard.innerHTML = `
        <div class="card p-3 border-0 bg-white shadow-sm mt-3" style="border-radius: 12px; border-left: 4px solid var(--ggb-green) !important;">
          <h5 class="fw-bold text-navy mb-1" style="color: var(--ggb-navy);">${branch.name}</h5>
          <p class="text-muted small mb-2"><i class="bi bi-geo-alt-fill text-danger me-1"></i> ${branch.address}</p>
          <div class="d-flex flex-wrap gap-3 small">
            <span class="badge bg-light text-dark border"><i class="bi bi-bank me-1 text-primary"></i> IFSC: <strong>${branch.ifsc}</strong></span>
            <span class="badge bg-light text-dark border"><i class="bi bi-telephone-fill me-1 text-success"></i> Phone: <strong>${branch.phone}</strong></span>
            <span class="badge bg-light text-dark border"><i class="bi bi-clock me-1 text-warning"></i> 10:00 AM - 4:00 PM</span>
          </div>
          <div class="mt-3 d-flex flex-wrap gap-2">
            <a href="tel:${branch.phone.replace(/[^0-9]/g, '')}" class="btn btn-sm btn-ggb-accent">
              <i class="bi bi-telephone"></i> Call Branch
            </a>
            <a href="#footer-contact" class="btn btn-sm btn-outline-secondary">
              <i class="bi bi-envelope"></i> Send Enquiry
            </a>
          </div>
        </div>
      `;
    }
  });
}

/* --------------------------------------------------------------------------
   8. FLOATING ELEMENTS (Back-to-top & Help Panel)
   -------------------------------------------------------------------------- */
function initFloatingElements() {
  const topBtn = document.getElementById('btn-back-to-top');
  const helpBtn = document.getElementById('btn-floating-help');
  const helpPanel = document.getElementById('floating-help-panel');
  const closeHelp = document.getElementById('btn-close-help');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      topBtn?.classList.add('show');
    } else {
      topBtn?.classList.remove('show');
    }
  }, { passive: true });

  topBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  helpBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    helpPanel?.classList.toggle('active');
  });

  closeHelp?.addEventListener('click', () => {
    helpPanel?.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (helpPanel && !helpPanel.contains(e.target) && e.target !== helpBtn) {
      helpPanel.classList.remove('active');
    }
  });
}
