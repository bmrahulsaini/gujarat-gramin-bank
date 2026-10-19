# Gujarat Gramin Bank (GGB) — Official Website Portal

Modern single-page banking portal for **Gujarat Gramin Bank (GGB)** (ગુજરાત ગ્રામીણ બેંક), the premier Regional Rural Bank of Gujarat formed by the amalgamation of Baroda Gujarat Gramin Bank (BGGB) and Saurashtra Gramin Bank (SGB) under the Government of India's "One State, One RRB" initiative.

Sponsored by **Bank of Baroda**, with sovereign ownership:
- Government of India: 50%
- Bank of Baroda: 35%
- Government of Gujarat: 15%

---

## 1. Quick Start & Local Setup

### Running with XAMPP / WAMP (Recommended)
This portal is built for Apache with `.htaccess` support.

1. Ensure the project is located inside your Apache root:
   ```
   d:/xampp/htdocs/gujarat-bank/
   ```
2. Open the **XAMPP Control Panel** and start **Apache**.
3. Open your browser and navigate to:
   ```
   http://localhost/gujarat-bank/
   ```

### Running with Built-in PHP Server (Testing)
If testing without Apache:
```bash
cd d:/xampp/htdocs/gujarat-bank
php -S localhost:8000
```
Then visit: `http://localhost:8000/`

---

## 2. Architecture & Design Principles

- **Zero External Dependencies / No CDNs:** Every single vendor library (Bootstrap 5.3.3, Bootstrap Icons 1.11.3) and web fonts (Plus Jakarta Sans, Noto Sans Gujarati, Noto Sans Devanagari) are stored locally in `assets/vendor/` and `assets/fonts/`.
- **Single Page HTML Content:** All banking sections (ticker, hero, quick actions, products, stats, interest rates, interactive calculators, government schemes, mobile app showcase, testimonials, branch locator, safe banking guidelines, FAQ, and CTA band) are written out in semantic HTML in `index.php`.
- **PHP Includes:** Only two includes are used:
  - `includes/header.php` — `<head>`, SEO meta tags, JSON-LD schema, local CSS files, skip link, topbar, and sticky navbar with mobile offcanvas menu.
  - `includes/footer.php` — Bank footer, DICGC badge, floating quick-help panel, and deferred JavaScript scripts.
- **Bilingual Experience:** Built-in instant language switcher (English, Gujarati, Hindi) via `data-i18n` dictionary in `assets/js/main.js` without any external translation APIs.
- **Financial Calculators:** Interactive Loan EMI and Fixed Deposit (FD) calculators with live SVG donut chart visualizations and Indian number formatting (`₹1,00,000`).
- **Accessibility:** WCAG AA compliant contrast, text resizing (A- / A / A+), high contrast toggle, keyboard navigability, and `prefers-reduced-motion` compliance.

---

## 3. How to Customise / Edit Details

### Updating Bank Contact Information
- **Central Call Centre Phone Number:** Edit in `includes/header.php` (topbar), `includes/footer.php`, and `assets/js/main.js` (`i18nDictionary`).
- **Head Office Address:** Edit in `includes/footer.php` and `index.php` (Head Office Banner under Branch Locator section).
- **Official Email:** Edit `contact@ggb.bank.in` in `includes/footer.php` and `index.php`.

### Updating Deposit & Loan Rates
- Open `index.php` and search for `<!-- ===== 8. INTEREST RATES SECTION ===== -->` to update rate percentages and terms.
- Default calculator rates can be adjusted in `assets/js/main.js` inside `initCalculators()`.

### Swapping in the Official RRB Logo
If the official national RRB vector file is provided:
1. Replace `assets/images/logo/ggb-logo.svg` with your official logo.
2. Replace `assets/images/logo/ggb-logo-white.svg` with the white variant for dark backgrounds.
3. Replace `assets/images/logo/ggb-icon.svg` with the square emblem mark.

### Enabling Search Engine Indexing (Going Live)
When launching on the public domain (`ggb.bank.in`):
1. In `includes/header.php`:
   ```html
   <!-- Change from: -->
   <meta name="robots" content="noindex, nofollow">
   <!-- To: -->
   <meta name="robots" content="index, follow">
   ```
2. In `robots.txt`:
   ```txt
   # Change from:
   Disallow: /
   # To:
   Disallow:
   Sitemap: https://ggb.bank.in/sitemap.xml
   ```

---

## 4. Folder Structure Overview

```
gujarat-bank/
├── assets/
│   ├── css/
│   │   ├── fonts.css               # Local @font-face rules
│   │   └── style.css               # Design tokens, variables & all styles
│   ├── fonts/
│   │   ├── noto-sans-devanagari/   # WOFF2 files (400, 600)
│   │   ├── noto-sans-gujarati/     # WOFF2 files (400, 600)
│   │   └── plus-jakarta-sans/      # WOFF2 files (400, 500, 600, 700, 800)
│   ├── images/
│   │   ├── app/                    # Phone mockup, QR code, app badges
│   │   ├── favicon/                # Complete favicon set (16, 32, 180, 192, 512, ico)
│   │   ├── hero/                   # 3 WebP hero slides
│   │   ├── logo/                   # SVG logo, white logo, icon emblem
│   │   ├── misc/                   # Gujarat branch map, OG image, DICGC badge
│   │   └── people/                 # Customer testimonial portraits
│   ├── js/
│   │   └── main.js                 # Sticky nav, a11y, i18n, calculators, locator
│   └── vendor/
│       ├── bootstrap/              # Local bootstrap.min.css & bootstrap.bundle.min.js
│       └── bootstrap-icons/        # Local bootstrap-icons.min.css & fonts/
├── includes/
│   ├── footer.php                  # Footer layout, floating help, scripts
│   └── header.php                  # Head, SEO, topbar, sticky navbar
├── .htaccess                       # Security headers, clean URLs, compression, caching
├── 404.php                         # Branded 404 error template
├── index.php                       # Master single-page banking portal
├── robots.txt                      # Search crawler policy
├── site.webmanifest                # PWA manifest
└── README.md                       # Documentation & guide
```

---

## 5. Security & Browser Headers

Configured in `.htaccess`:
- `Content-Security-Policy`: Self-contained (`default-src 'self'`)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Gzip/DEFLATE asset compression and 1-year browser caching for fonts, images, CSS, and JS.
