/**
 * GGB SAHAYAK - WEBSITE-ONLY CHAT ASSISTANT
 * Pure Vanilla JavaScript - No CDNs, no external libraries. The only network
 * calls this file ever makes are same-origin fetches of this site's OWN
 * other pages (and its sitemap.xml) to read their content - never a
 * database or third-party API.
 *
 * Everything the bot "knows" is read from #main-content/footer DOM (headings,
 * paragraphs, lists, address blocks, tables): the current page synchronously
 * at load time, plus every other same-site page discovered from the main nav
 * and sitemap.xml, fetched and merged in the background (see SECTION 3b) -
 * plus the branch directory object (`gujaratBranches`) already shipped in
 * main.js. Nothing is invented, and nothing is ever sent anywhere.
 *
 * Public API: window.GGBChatbot.answer(question) -> same payload the UI renders,
 * handy for console testing, e.g. GGBChatbot.answer("fd rates")
 */
(function () {
  'use strict';

  // Guard against this script being included twice.
  if (window.GGBChatbot) return;

  /* ============================================================================
     1. CONFIG - every tunable value lives here. Tweak wording/thresholds here,
        never hard-code answers elsewhere in this file.
     ============================================================================ */
  var CONFIG = {
    botName: 'GGB Sahayak',
    subtitle: 'Here to answer your banking questions',
    footerNote: 'Please confirm important details at your branch.',

    // Launcher / panel element ids (created at runtime, kept here so nothing
    // is a magic string scattered through the code).
    launcherId: 'btn-floating-chatbot',
    panelId: 'ggb-chat-panel',

    // First message shown when the panel opens for the very first time.
    welcomeMessage: "I'm GGB Sahayak. I can help with deposits, loans, " +
      'rates, branches and contact details.',

    // Quick-topic chips shown under the message area and on fallback replies.
    chips: [
      { label: 'Deposit rates', query: 'deposit interest rates' },
      { label: 'Loan rates', query: 'loan interest rates' },
      { label: 'Branches', query: 'branches' },
      { label: 'Chairman', query: 'who is the chairman' },
      { label: 'Board of directors', query: 'board of directors' },
      { label: 'Service charges', query: 'service charges' },
      { label: 'Contact us', query: 'contact us' }
    ],

    // Canned small-talk replies - matched only when the WHOLE message (after
    // trimming punctuation) is one of these, so "hi what are fd rates" still
    // falls through to the real search instead of being treated as a greeting.
    smallTalk: {
      greeting: {
        phrases: ['hi', 'hii', 'hiii', 'hello', 'hey', 'hlo', 'namaste', 'namaskar',
          'good morning', 'good afternoon', 'good evening'],
        reply: 'Hello. How can I help you with Gujarat Gramin Bank?'
      },
      thanks: {
        phrases: ['thanks', 'thank you', 'thanku', 'thx', 'dhanyavad', 'aabhar', 'ok thanks'],
        reply: "You're welcome. Let me know if you have another question about GGB."
      },
      bye: {
        phrases: ['bye', 'goodbye', 'bye bye', 'see you', 'tata', 'ok bye'],
        reply: 'Goodbye.'
      },
      about: {
        phrases: ['who are you', 'what are you', 'who r u', 'what is your name', 'tell me about yourself'],
        reply: "I'm " + 'GGB Sahayak' + ', an assistant for Gujarat Gramin Bank. ' +
          'I can help with deposits, loans, rates, branches and contact details.'
      }
    },

    // Fallback messages ONLY used if something goes wrong building the
    // friendly templated reply (see `templates` below, which normally
    // supplies the actual wording shown for these two cases).
    offTopicMessage: 'Sorry, that question is outside my scope.',
    notFoundMessage: "Sorry, I don't have that information.",

    // Fraction of a question's meaningful words that must exist on the site
    // (directly, via synonym, or via typo-correction) or it is treated as
    // off-topic. 0.5 = "under half" per spec; exactly half still passes.
    offTopicMinCoverage: 0.5,

    // Minimum BM25 score (see SEARCH section) for a result to be shown as a
    // real answer instead of the "couldn't find" fallback. Raise this if the
    // bot starts showing weakly-related sections; lower it if it is too shy.
    matchScoreThreshold: 0.65,

    // How many matching lines to show at most for one answer.
    maxAnswerLines: 8,

    // Extra weight given to a chunk's own heading words during scoring, so a
    // question containing the section/card title ranks that chunk higher.
    headingBoost: 1,

    // BM25 constants (standard defaults).
    bm25K1: 1.5,
    bm25B: 0.75,

    // Max Levenshtein edit distance tolerated when matching a typo against a
    // real word seen on the site. Shorter words get a tighter budget.
    maxTypoDistance: function (word) { return word.length <= 4 ? 1 : 2; },

    // Words stripped out before searching - English/Hinglish/Gujarati filler
    // plus the bank's own name, which would otherwise match almost anything.
    fillerWords: [
      // bank's own name / generic self-reference
      'bank', 'banks', 'banking', 'gujarat', 'gramin', 'ggb', 'website', 'site', 'page',
      // English question/filler words
      'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'am',
      'what', 'whats', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'much', 'many',
      'do', 'does', 'did', 'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might',
      'of', 'for', 'to', 'in', 'on', 'at', 'by', 'with', 'about', 'from', 'into', 'onto',
      'i', 'me', 'my', 'mine', 'we', 'us', 'our', 'you', 'your', 'yours', 'it', 'its', 'this', 'that', 'these', 'those',
      'please', 'tell', 'show', 'give', 'know', 'want', 'need', 'let', 'and', 'or', 'but', 'so', 'if', 'as',
      'there', 'here', 'any', 'some', 'all', 'just', 'also', 'etc',
      // too generic on this site to discriminate (account number, phone
      // number, IFSC number, branch number all use this word) - the real
      // intent is carried by the word next to it (phone/ifsc/toll-free etc.)
      'number', 'numbers',
      // Hinglish / Gujarati filler
      'kya', 'kyu', 'kyun', 'kaise', 'kaisa', 'kaisi', 'kab', 'kaun', 'kaunsa', 'kahan', 'kitna', 'kitni', 'kitne',
      'hai', 'hain', 'ho', 'hota', 'hoti', 'hoga', 'ka', 'ki', 'ke', 'ko', 'ku', 'ko', 'se', 'me', 'mein', 'par', 'pe',
      'che', 'chhe', 'shu', 'su', 'kai', 'kon', 'kyare', 'kevi', 'kevu', 'nu', 'ni', 'no'
    ],

    // Multi-word phrases rewritten to one token before splitting, so a phrase
    // based synonym (e.g. "toll free") is not lost when words are tokenised.
    phraseRewrites: [
      [/toll[\s-]*free/g, 'tollfree'],
      [/call\s*centre|call\s*center/g, 'phone']
    ],

    // Single-word synonyms applied AFTER stemming, so plural/typo forms still
    // map correctly (e.g. "directors" stems to "director" -> "board").
    synonyms: {
      fd: 'deposit', rd: 'deposit',
      interest: 'rate', roi: 'rate', byaj: 'rate', vyaj: 'rate', '%': 'rate', percent: 'rate',
      shakha: 'branch',
      director: 'board',
      mobile: 'phone', helpline: 'phone', tollfree: 'phone',
      fee: 'charge', penalty: 'charge',
      kisan: 'agri', kcc: 'agri', farmer: 'agri',
      housing: 'home'
    },

    // Curated off-topic trigger words - checked before the coverage ratio so
    // obviously unrelated (but partly "known-word") questions like "RBI repo
    // rate" are still rejected even if some of their words appear on the site.
    offTopicWords: [
      'weather', 'rain', 'temperature', 'climate',
      'cricket', 'ipl', 'football', 'soccer', 'match', 'score', 'tournament', 'olympics',
      'movie', 'movies', 'film', 'cinema', 'actor', 'actress', 'bollywood', 'bollywod',
      'song', 'music', 'album', 'singer',
      'repo', // RBI policy rate - distinct from GGB's own lending/deposit rates
      'capital', 'france', 'paris', 'country', 'president', 'minister', 'election', 'politics',
      'recipe', 'cook', 'cooking', 'food', 'restaurant',
      // NOT 'code' or 'program' - both have legitimate banking meanings here
      // (IFSC code, helpdesk code, govt. schemes/programs) - the unambiguous
      // gerund forms below are enough to still catch "write python code".
      'python', 'java', 'javascript', 'coding', 'programming', 'software', 'algorithm',
      'joke', 'riddle', 'horoscope', 'astrology', 'game', 'gaming'
    ],

    // Selectors whose entire subtree is excluded from the knowledge base:
    // navigation/scripts/forms (per spec), the chatbot's own UI, and widgets
    // that only ever show live/demo numbers rather than real site facts.
    ignoreSelectors: [
      'nav', 'script', 'style', 'noscript', 'form', 'svg',
      'select', 'option', 'input', 'textarea', 'label', 'button',
      '[data-kb-ignore]',
      '#' + 'ggb-chat-panel', '.ggb-chat-launcher-wrap',
      '#calculator', // interactive EMI/FD tool - only shows demo numbers, not published rates
      '#locator-result-card' // duplicate of gujaratBranches, injected only after user interaction
    ],

    // Multi-page knowledge base: other same-site pages are discovered from
    // the main nav + sitemap.xml, fetched in the background, and indexed
    // with the same #main-content logic as the current page.
    multiPage: {
      // Where to look for links to OTHER pages. Scoped to the primary nav
      // (desktop + mobile) so footer/body links don't turn every outbound
      // link on the page into a page to crawl.
      navLinkSelectors: '.ggb-navbar .navbar-nav a[href], #mobileNavOffcanvas .navbar-nav a[href]',
      // Site-wide list of pages, read if this file exists; a 404 is fine.
      sitemapPath: 'sitemap.xml',
      // sessionStorage key for the cached cross-page index (bump the suffix
      // if the cached chunk shape ever changes incompatibly).
      sessionStorageKey: 'ggbChatbotKbCache_v1',
      // Safety cap - never fetch more than this many extra pages per load.
      maxPages: 25,
      // Abort a single page fetch that hangs longer than this (ms).
      fetchTimeoutMs: 8000
    },

    // "Typing..." + word-by-word reveal timing. Ignored entirely when the
    // visitor's OS/browser requests prefers-reduced-motion - replies then
    // appear instantly, with no dots and no streaming.
    typingAnimation: {
      minTypingMs: 400,   // shortest the "typing..." dots are shown for
      maxTypingMs: 700,   // longest the "typing..." dots are shown for
      wordDelayMs: 25      // delay between each revealed word
    },

    // Friendly intro/outro sentences layered AROUND factual content that WAS
    // found - they never change or add facts, only wording. One of each
    // array is picked at random per reply. Only for successful answers
    // (rates/branches/contact/general); every "not found" / "out of scope"
    // case instead uses the single flat notFoundMessage/offTopicMessage
    // above, so a visitor always sees the exact same wording for the same
    // kind of rejection rather than several differently-worded variants.
    templates: {
      rates: {
        intros: [
          "Here is the rate information:",
          "Here is the current rate:",
          "Here is the rate detail:"
        ],
        outros: [
          "Rates are subject to change; confirm the current rate at your branch.",
          "This rate may be revised; please verify before proceeding.",
          "Confirm the current rate with your branch before deciding."
        ]
      },
      branches: {
        intros: [
          "Here is the branch information:",
          "Here is the branch detail:",
          "Here is what I found about branches:"
        ],
        outros: [
          "You can also use the branch locator above to search by district.",
          "A list of all branches is available via the locator above.",
          "Contact a branch directly for further details."
        ]
      },
      contact: {
        intros: [
          "Here is the contact information:",
          "Here are the contact details:",
          "Here is how to reach the bank:"
        ],
        outros: [
          "This is the most current contact information available.",
          "Contact the bank directly for further assistance.",
          "Further contact details are in the Contact section."
        ]
      },
      general: {
        intros: [
          "Here is what I found about that:",
          "Here is the relevant information:",
          "Here is the relevant detail:"
        ],
        outros: [
          "Let me know if you need more detail.",
          "You can ask about another topic.",
          "Let me know if you have another question."
        ]
      }
    },

    // Sentence templates for DIRECT, intent-based answers (SECTION 8) - e.g.
    // "head office phone number" composes exactly one sentence from a real
    // scraped fact, instead of showing the whole section. {placeholders}
    // are substituted with real values pulled from the page; wording here
    // is the only thing that is ever "written" - every value slotted in is
    // always copied straight from the site.
    answerPhrases: {
      phoneTollFree: 'You can reach us toll-free at {value}.',
      phone: 'The {context} phone number is {value}.',
      email: 'The {context} email is {value}.',
      address: 'The {context} address is {value}.',
      hours: 'Our {context} working hours are {value}.',
      countBranchesWithDistricts: 'Gujarat Gramin Bank has {branches} branches across {districts} districts.',
      countGeneric: '{label} is {value}.',
      rateSpecific: '{product} interest rate is {value}.',
      rateSpecificWithNote: '{product} interest rate is {value} ({note}).',
      ifsc: 'The IFSC code for {branch} is {value}.',
      branchSpecific: '{branch} ({district} district) - IFSC: {ifsc}, Phone: {phone}, Address: {address}.',
      notFoundWithAlt: "I don't have {thing}. You can reach the bank at {alt}.",
      notFoundPlain: "I don't have {thing}."
    }
  };

  /* ============================================================================
     2. TEXT NORMALISATION HELPERS
     ============================================================================ */

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Whether the visitor's OS/browser has asked for reduced motion - the
  // typing/word-reveal animation is skipped entirely when true.
  function prefersReducedMotion() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) {
      return false;
    }
  }

  // Lightweight plural stemmer - good enough for the vocabulary on this site.
  function stem(word) {
    if (word.length > 4 && /[a-z]ies$/.test(word)) return word.slice(0, -3) + 'y';
    if (/(ches|shes|xes|sses)$/.test(word)) return word.slice(0, -2);
    if (word.length > 3 && /[a-z]s$/.test(word) && !/ss$/.test(word)) return word.slice(0, -1);
    return word;
  }

  var FILLER_SET = {};
  CONFIG.fillerWords.forEach(function (w) { FILLER_SET[w] = true; });

  // word -> canonical form, after stemming, used for scoring/matching.
  function normalize(rawWord) {
    var w = rawWord.toLowerCase();
    var stemmed = /^[0-9]+$/.test(w) ? w : stem(w);
    return CONFIG.synonyms[stemmed] || CONFIG.synonyms[w] || stemmed;
  }

  function applyPhraseRewrites(text) {
    var out = text;
    CONFIG.phraseRewrites.forEach(function (pair) { out = out.replace(pair[0], pair[1]); });
    return out;
  }

  // Splits text into raw lowercase word tokens (numbers and "%" included).
  function splitWords(text) {
    var rewritten = applyPhraseRewrites(String(text).toLowerCase());
    return rewritten.match(/[a-z0-9]+|%/g) || [];
  }

  // Full pipeline used for BOTH page content and user questions, so both
  // sides collapse to the same canonical tokens.
  function tokenize(text) {
    var raw = splitWords(text);
    var out = [];
    raw.forEach(function (w) {
      if (FILLER_SET[w]) return;
      out.push(normalize(w));
    });
    return out;
  }

  // Levenshtein edit distance (iterative, small-input friendly).
  function editDistance(a, b) {
    if (a === b) return 0;
    var la = a.length, lb = b.length;
    if (!la) return lb;
    if (!lb) return la;
    var prev = new Array(lb + 1);
    var curr = new Array(lb + 1);
    for (var j = 0; j <= lb; j++) prev[j] = j;
    for (var i = 1; i <= la; i++) {
      curr[0] = i;
      for (j = 1; j <= lb; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      }
      var tmp = prev; prev = curr; curr = tmp;
    }
    return prev[lb];
  }

  /* ============================================================================
     3. KNOWLEDGE BASE BUILDER - reads the live page once at startup.
     ============================================================================ */

  var KB = {
    chunks: [],       // [{ text, sectionId, sectionTitle, heading, tag, pageUrl, pageTitle, pageKey }]
    rawVocab: {},      // raw lowercase words that literally appear on any indexed page
    sectionTitles: {}, // "pageUrl::sectionId" -> human-readable title (per-page, so two
                        // pages reusing the same section id don't collide)
    seenText: {}       // "pageUrl::lowercased text" -> true, so the exact same line is
                        // never indexed twice from the same page
  };

  // Normalises a (possibly relative) URL and strips any #hash, so the same
  // page reached two different ways (or with a different anchor) maps to one
  // cache/identity key. Returns null for a URL that can't be parsed.
  function normalizeUrl(href) {
    try {
      var u = new URL(href, document.baseURI);
      u.hash = '';
      return u.href;
    } catch (e) {
      return null;
    }
  }

  // Identity of the page this script is running on, and the "page context"
  // (url/title/document) every chunk from THIS page is tagged with. Other
  // pages get their own context built when they are fetched (see 3b below).
  var CURRENT_PAGE_URL = normalizeUrl(location.href) || location.href;
  var CURRENT_PAGE_CTX = { url: CURRENT_PAGE_URL, title: document.title || CURRENT_PAGE_URL, doc: document };

  function matchesIgnored(el) {
    for (var i = 0; i < CONFIG.ignoreSelectors.length; i++) {
      try {
        if (el.closest(CONFIG.ignoreSelectors[i])) return true;
      } catch (e) { /* invalid selector on old browsers - ignore safely */ }
    }
    return false;
  }

  function getDirectText(el) {
    var out = '';
    for (var i = 0; i < el.childNodes.length; i++) {
      var node = el.childNodes[i];
      if (node.nodeType === 3) out += ' ' + node.nodeValue;
    }
    return out.replace(/\s+/g, ' ').trim();
  }

  function humanizeId(id) {
    return id.replace(/[-_]+/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  // `doc` is the Document the landmark element belongs to - the live
  // `document` for the current page, or a detached DOMParser document for a
  // fetched page. aria-labelledby must be resolved against THAT document.
  function computeSectionTitle(landmarkEl, doc) {
    doc = doc || document;
    if (!landmarkEl) return 'Page';
    var labelledBy = landmarkEl.getAttribute('aria-labelledby');
    if (labelledBy) {
      var ids = labelledBy.split(/\s+/);
      for (var i = 0; i < ids.length; i++) {
        var labelEl = doc.getElementById(ids[i]);
        if (labelEl && labelEl.textContent.trim()) return labelEl.textContent.trim();
      }
    }
    var heading = landmarkEl.querySelector('h1, h2');
    if (heading && heading.textContent.trim()) return heading.textContent.trim();
    return landmarkEl.id ? humanizeId(landmarkEl.id) : 'Page';
  }

  // Registers one piece of text against the page it came from. `pageCtx`
  // defaults to the current page so every existing call site keeps working
  // unchanged; fetched pages pass their own { url, title, doc }.
  function addChunk(text, sectionEl, heading, tag, pageCtx) {
    pageCtx = pageCtx || CURRENT_PAGE_CTX;
    var clean = text.replace(/\s+/g, ' ').trim();
    if (!clean || clean.length < 2) return;
    // Icon/bullet-only noise ("• • • •", "-", "|") has no letters or digits at all.
    if (!/[a-z0-9]/i.test(clean)) return;
    // The exact same line, from the same page, is only ever indexed once.
    var dedupKey = pageCtx.url + '::' + clean.toLowerCase();
    if (KB.seenText[dedupKey]) return;
    KB.seenText[dedupKey] = true;
    var sectionId = sectionEl && sectionEl.id ? sectionEl.id : 'page';
    var pageKey = pageCtx.url + '::' + sectionId;
    if (!KB.sectionTitles[pageKey]) KB.sectionTitles[pageKey] = computeSectionTitle(sectionEl, pageCtx.doc);
    KB.chunks.push({
      text: clean,
      sectionId: sectionId,
      sectionTitle: KB.sectionTitles[pageKey],
      heading: heading || KB.sectionTitles[pageKey],
      tag: tag || 'text',
      pageUrl: pageCtx.url,
      pageTitle: pageCtx.title,
      pageKey: pageKey
    });
    splitWords(clean).forEach(function (w) { if (!FILLER_SET[w]) KB.rawVocab[w] = true; });
  }

  // Builds one fact string per <tr>, carrying a running category label from
  // any preceding full-width "category" row (a single cell spanning the row).
  function indexTable(table, sectionEl, heading, pageCtx) {
    var headerCells = [];
    var headerRow = table.querySelector('thead tr') || table.querySelector('tr');
    if (headerRow) {
      headerCells = Array.prototype.map.call(
        headerRow.querySelectorAll('th, td'),
        function (c) { return c.textContent.replace(/\s+/g, ' ').trim(); }
      );
    }
    var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr, tr'));
    var currentCategory = '';
    rows.forEach(function (row) {
      if (row === headerRow) return;
      var cells = Array.prototype.slice.call(row.querySelectorAll('th, td'));
      if (!cells.length) return;
      if (cells.length === 1) {
        // Full-width label row (category heading inside the table).
        currentCategory = cells[0].textContent.replace(/\s+/g, ' ').trim();
        return;
      }
      var parts = cells.map(function (cell, idx) {
        var label = headerCells[idx] || '';
        var val = cell.textContent.replace(/\s+/g, ' ').trim();
        return label ? (label + ': ' + val) : val;
      });
      var line = (currentCategory ? currentCategory + ' - ' : '') + parts.join(' · ');
      addChunk(line, sectionEl, heading, 'table-row', pageCtx);
      // Forward-compatible: no charges table exists on the site today, but
      // the moment one is added under a "charges"/"fee"-ish heading, each
      // row becomes a structured charge fact with no code changes needed.
      if (/charge|fee/i.test(heading || '') && sectionEl && sectionEl.id) {
        FACTS.charges.push({ text: line, context: cleanContextLabel(heading), sectionId: sectionEl.id });
      }
    });
  }

  // Walks `root` (the current page's #main-content/footer, or a fetched
  // page's #main-content) in document order, tagging every piece of text
  // with `pageCtx` so it is attributed to the right page.
  function buildFromDom(root, pageCtx) {
    if (!root) return;
    pageCtx = pageCtx || CURRENT_PAGE_CTX;
    var currentHeading = computeSectionTitle(root.closest('section[id], footer[id]') || root, pageCtx.doc);

    // Treat the root itself first, then walk every descendant in document order.
    function visit(el) {
      if (matchesIgnored(el)) return false; // false => do not descend into this subtree
      var tag = el.tagName.toLowerCase();

      if (/^h[1-6]$/.test(tag)) {
        var text = el.textContent.replace(/\s+/g, ' ').trim();
        if (text) currentHeading = text;
      }

      if (tag === 'table') {
        var sectionEl = el.closest('section[id], footer[id]') || root;
        indexTable(el, sectionEl, currentHeading, pageCtx);
        return false; // table handled as a whole, don't also walk its cells generically
      }

      // Stat counters show "0" (or a mid-animation number) in the DOM; the
      // real figure lives in data-target/data-suffix.
      if (el.classList && el.classList.contains('stats-number') && el.hasAttribute('data-target')) {
        var sectionEl2 = el.closest('section[id], footer[id]') || root;
        addChunk(el.getAttribute('data-target') + (el.getAttribute('data-suffix') || ''), sectionEl2, currentHeading, 'stat', pageCtx);
        return true;
      }

      var direct = getDirectText(el);
      if (direct) {
        var sectionEl3 = el.closest('section[id], footer[id]') || root;
        addChunk(direct, sectionEl3, currentHeading, tag, pageCtx);
      }
      return true;
    }

    // Manual document-order traversal (a plain TreeWalker has no way to skip
    // an entire ignored subtree while still visiting its later siblings).
    (function walk(el) {
      var keepGoing = visit(el);
      if (keepGoing === false) return;
      var child = el.firstElementChild;
      while (child) {
        walk(child);
        child = child.nextElementSibling;
      }
    })(root);
  }

  // Deliberate, commented exception to the "skip scripts" rule: the branch
  // directory (name/IFSC/address/phone) is real site content, but main.js
  // only renders it into the DOM after a visitor picks a district and clicks
  // Search. Reading the plain data object here still reflects only content
  // already shipped with the page - nothing is invented.
  function buildFromBranchData() {
    try {
      if (typeof gujaratBranches !== 'object' || !gujaratBranches) return;
      var branchesSection = document.getElementById('branches');
      var heading = computeSectionTitle(branchesSection, document);
      Object.keys(gujaratBranches).forEach(function (district) {
        var list = gujaratBranches[district];
        if (!Array.isArray(list)) return;
        list.forEach(function (branch) {
          var line = branch.name + ' (' + district + ' district) - Address: ' + branch.address +
            ' · IFSC: ' + branch.ifsc + ' · Phone: ' + branch.phone;
          addChunk(line, branchesSection, heading, 'branch');
        });
      });
    } catch (e) {
      // main.js data shape changed or is unavailable - branch facts are simply skipped.
    }
  }

  /* ============================================================================
     3c. STRUCTURED FACTS STORE
     A second, parallel pass over the SAME page (current page only - fetched
     other pages only get the generic KB.chunks/BM25 treatment from 3b) that
     pulls out clean, typed facts instead of free text: a phone number is a
     phone number, not just a chunk that happens to contain digits. SECTION 8
     (intent detection) looks these up directly to answer the exact thing
     asked; the generic KB.chunks/BM25 search is only a fallback for whatever
     this layer doesn't recognise.
     ============================================================================ */

  var FACTS = {
    phones: [],    // { number, context, sectionId }
    emails: [],    // { email, context, sectionId }
    addresses: [], // { text, context, sectionId }
    hours: [],     // { text, context, sectionId }
    people: [],    // { name, role, sectionId }
    stats: [],     // { number, label, sub, sectionId }
    rates: [],     // { product, category: 'deposit'|'loan', audience: 'general'|'senior', rateText, note, sectionId }
    charges: [],   // { text, context, sectionId }
    branches: []   // { name, district, ifsc, phone, address, sectionId }
  };

  // Indian landline ("0265-2361210"), toll-free ("1800-xxx-xxxx") or mobile
  // (10-digit) number, optionally with a +91 prefix. Matches must contain at
  // least 7 digits in total so short unrelated numbers (a year, a %) never
  // get mistaken for a phone number.
  var PHONE_REGEX = /(?:\+91[\s-]?)?(?:1800[\s-]?\d{2,3}[\s-]?\d{3,4}|\d{2,4}[\s-]\d{6,8}|\d{10})/g;
  var EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ig;

  function countDigits(s) { return (s.match(/\d/g) || []).length; }

  // "Gujarat Gramin Bank Head Office" -> "Head Office"; "Toll Free / Call
  // Centre:" -> "Toll Free / Call Centre". The bank's own name is already
  // treated as filler everywhere else in this file - contexts get the same
  // treatment so composed sentences read as "The Head Office phone..." per
  // spec, not "The Gujarat Gramin Bank Head Office phone...".
  function cleanContextLabel(label) {
    return String(label || '')
      .replace(/^(Gujarat Gramin Bank|GGB)\s+/i, '')
      .replace(/:\s*$/, '')
      .trim();
  }

  // Footer "Head Office & Support" column: one .footer-contact-item per
  // address/phone/email, each built around a tel:/mailto: link or a <strong>
  // name. Generic on purpose (keyed off the link type, not exact copy text).
  function extractFooterContactFacts(pageCtx) {
    var items = document.querySelectorAll('footer.ggb-footer .footer-contact-item');
    items.forEach(function (item) {
      var sectionId = 'footer-contact';
      var fullText = item.textContent.replace(/\s+/g, ' ').trim();
      var telLink = item.querySelector('a[href^="tel:"]');
      var mailLink = item.querySelector('a[href^="mailto:"]');
      if (telLink) {
        var num = telLink.textContent.replace(/\s+/g, ' ').trim();
        var label = cleanContextLabel(fullText.split(num)[0].replace(/:\s*$/, '')) || 'Contact';
        FACTS.phones.push({ number: num, context: label, sectionId: sectionId });
        var small = item.querySelector('small');
        if (small && small.textContent.trim()) {
          FACTS.hours.push({ text: small.textContent.replace(/\s+/g, ' ').trim(), context: label, sectionId: sectionId });
        }
      } else if (mailLink) {
        var email = mailLink.textContent.replace(/\s+/g, ' ').trim();
        var label2 = cleanContextLabel(fullText.replace(email, '').replace(/:\s*$/, '')) || 'Email';
        FACTS.emails.push({ email: email, context: label2, sectionId: sectionId });
      } else {
        var strong = item.querySelector('strong');
        var label3 = strong ? cleanContextLabel(strong.textContent) : 'Address';
        var addrText = strong ? fullText.replace(strong.textContent, '').trim() : fullText;
        if (addrText) FACTS.addresses.push({ text: addrText, context: label3 || 'Address', sectionId: sectionId });
      }
    });
  }

  // #branches .head-office-banner: heading + address paragraph + tel/mailto
  // action links, all clearly labelled "Head Office" by the card itself.
  function extractHeadOfficeBannerFacts(pageCtx) {
    var banner = document.querySelector('.head-office-banner');
    if (!banner) return;
    var sectionId = 'branches';
    var h3 = banner.querySelector('h3');
    var label = h3 ? cleanContextLabel(h3.textContent) : 'Head Office';
    var addrP = banner.querySelector('p');
    if (addrP && addrP.textContent.trim()) {
      FACTS.addresses.push({ text: addrP.textContent.replace(/\s+/g, ' ').trim(), context: label, sectionId: sectionId });
    }
    banner.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      FACTS.phones.push({ number: a.textContent.replace(/\s+/g, ' ').trim(), context: label, sectionId: sectionId });
    });
    banner.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      FACTS.emails.push({ email: a.textContent.replace(/\s+/g, ' ').trim(), context: label, sectionId: sectionId });
    });
  }

  // Broad safety net: scan the ALREADY-CLEANED chunks (post dedup/noise
  // filtering) for any phone/email the two targeted extractors above might
  // have missed (e.g. one mentioned inside an FAQ answer), tagged with that
  // chunk's own heading as context.
  function extractPhoneEmailFromChunks() {
    KB.chunks.forEach(function (chunk) {
      if (chunk.pageUrl !== CURRENT_PAGE_URL) return;
      var phoneMatches = chunk.text.match(PHONE_REGEX) || [];
      phoneMatches.forEach(function (m) {
        if (countDigits(m) < 7) return;
        FACTS.phones.push({ number: m.trim(), context: cleanContextLabel(chunk.heading), sectionId: chunk.sectionId });
      });
      var emailMatches = chunk.text.match(EMAIL_REGEX) || [];
      emailMatches.forEach(function (m) {
        FACTS.emails.push({ email: m, context: cleanContextLabel(chunk.heading), sectionId: chunk.sectionId });
      });
    });
  }

  // Forward-compatible, finds nothing on this site today (no Chairman/Board
  // content exists) but will pick up "Name - Chairman" / "Name, Director"
  // style text the moment any gets published, without code changes.
  var PEOPLE_ROLE_REGEX = /^([A-Z][a-zA-Z.'\s]{2,40}?)\s*[-–,]\s*(Chairman|Vice[- ]Chairman|Managing Director|Director|CEO|CGM|General Manager)\b/;
  function extractPeopleFromChunks() {
    KB.chunks.forEach(function (chunk) {
      if (chunk.pageUrl !== CURRENT_PAGE_URL) return;
      var m = chunk.text.match(PEOPLE_ROLE_REGEX);
      if (m) FACTS.people.push({ name: m[1].trim(), role: m[2].trim(), sectionId: chunk.sectionId });
    });
  }

  // #about .stats-card: each has a .stats-number[data-target] (the real
  // figure - its rendered text may still be mid count-up animation) plus a
  // .stats-label and .stats-sub giving the figure its meaning.
  function extractStatsFacts(pageCtx) {
    document.querySelectorAll('.stats-card').forEach(function (card) {
      var numEl = card.querySelector('.stats-number[data-target]');
      if (!numEl) return;
      var labelEl = card.querySelector('.stats-label');
      var subEl = card.querySelector('.stats-sub');
      FACTS.stats.push({
        number: numEl.getAttribute('data-target') + (numEl.getAttribute('data-suffix') || ''),
        label: labelEl ? labelEl.textContent.replace(/\s+/g, ' ').trim() : '',
        sub: subEl ? subEl.textContent.replace(/\s+/g, ' ').trim() : '',
        sectionId: 'about'
      });
    });
  }

  // #rates .rate-card: product name + headline % + unit text + note.
  function extractRateFacts(pageCtx) {
    document.querySelectorAll('#rates .rate-card').forEach(function (card) {
      var nameEl = card.querySelector('.rate-product-name');
      var valEl = card.querySelector('.rate-val');
      if (!nameEl || !valEl) return;
      var product = nameEl.textContent.replace(/\s+/g, ' ').trim();
      var unitEl = card.querySelector('.rate-unit');
      var noteEl = card.querySelector('.rate-note');
      FACTS.rates.push({
        product: product,
        category: /loan|kisan|credit card/i.test(product) ? 'loan' : 'deposit',
        audience: /senior/i.test(product) ? 'senior' : 'general',
        rateText: (valEl.textContent.trim() + ' ' + (unitEl ? unitEl.textContent.trim() : '')).trim(),
        note: noteEl ? noteEl.textContent.replace(/\s+/g, ' ').trim() : '',
        sectionId: 'rates'
      });
    });
  }

  // Same gujaratBranches object buildFromBranchData() already reads for the
  // generic chunk fallback - also kept here in structured form (name,
  // district, IFSC, phone, address) so branch/IFSC intents can look a
  // specific branch up directly instead of searching free text for it.
  function extractBranchFacts() {
    try {
      if (typeof gujaratBranches !== 'object' || !gujaratBranches) return;
      Object.keys(gujaratBranches).forEach(function (district) {
        var list = gujaratBranches[district];
        if (!Array.isArray(list)) return;
        list.forEach(function (branch) {
          FACTS.branches.push({
            name: branch.name, district: district, ifsc: branch.ifsc,
            phone: branch.phone, address: branch.address, sectionId: 'branches'
          });
        });
      });
    } catch (e) {
      // main.js data shape changed or is unavailable - skipped, same as buildFromBranchData().
    }
  }

  function buildFactsStore(pageCtx) {
    FACTS.phones = []; FACTS.emails = []; FACTS.addresses = []; FACTS.hours = [];
    FACTS.people = []; FACTS.stats = []; FACTS.rates = []; FACTS.charges = []; FACTS.branches = [];
    extractFooterContactFacts(pageCtx);
    extractHeadOfficeBannerFacts(pageCtx);
    extractPhoneEmailFromChunks();   // after the targeted extractors, as a safety net only
    extractPeopleFromChunks();
    extractStatsFacts(pageCtx);
    extractRateFacts(pageCtx);
    extractBranchFacts();
  }

  // Resets the KB and (re)builds it from ONLY the current page. Other pages'
  // chunks are merged in separately afterwards (from cache, then from the
  // background fetches) - see SECTION 3b.
  function buildCurrentPageKnowledge() {
    KB.chunks = [];
    KB.rawVocab = {};
    KB.sectionTitles = {};
    KB.seenText = {};
    buildFromDom(document.getElementById('main-content'), CURRENT_PAGE_CTX);
    buildFromDom(document.querySelector('footer.ggb-footer'), CURRENT_PAGE_CTX);
    buildFromBranchData();
    buildFactsStore(CURRENT_PAGE_CTX);
  }

  /* ============================================================================
     3b. MULTI-PAGE KNOWLEDGE BASE
     Discovers other same-site pages from the main nav + sitemap.xml, fetches
     each in the background and parses it with DOMParser (its <script> tags
     are never executed - only static markup is read), then indexes its
     #main-content with the exact same buildFromDom() logic as the current
     page. Every chunk is tagged with its page URL, so an answer that comes
     from another page links to "page.php#section" instead of "#section".
     Nothing here blocks the UI: the current page is searchable the moment
     buildCurrentPageKnowledge()+buildIndex() finish; other pages are merged
     in (and the index rebuilt) as each fetch resolves. A combined cache is
     kept in sessionStorage so a second page view in the same tab reuses
     already-fetched pages instead of re-fetching them.
     ============================================================================ */

  function isSkippableHref(href) {
    if (!href) return true;
    var trimmed = href.trim();
    if (!trimmed || trimmed.charAt(0) === '#') return true; // same-page anchor
    if (/^(mailto:|tel:|javascript:)/i.test(trimmed)) return true;
    if (/\.pdf(\?|#|$)/i.test(trimmed)) return true;
    return false;
  }

  // Candidate page URLs from the primary nav (desktop + mobile), skipping
  // external links, #anchors, mailto/tel, PDFs and the current page.
  function discoverNavPageUrls() {
    var found = {};
    var links;
    try {
      links = document.querySelectorAll(CONFIG.multiPage.navLinkSelectors);
    } catch (e) {
      return [];
    }
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (isSkippableHref(href)) return;
      var abs = normalizeUrl(href);
      if (!abs) return;
      try {
        if (new URL(abs).origin !== location.origin) return; // external site
      } catch (e) { return; }
      if (abs === CURRENT_PAGE_URL) return;
      found[abs] = true;
    });
    return Object.keys(found);
  }

  function fetchWithTimeout(url) {
    if (typeof AbortController === 'undefined') {
      return fetch(url, { credentials: 'same-origin' });
    }
    var controller = new AbortController();
    var timer = window.setTimeout(function () { controller.abort(); }, CONFIG.multiPage.fetchTimeoutMs);
    return fetch(url, { credentials: 'same-origin', signal: controller.signal }).then(
      function (res) { window.clearTimeout(timer); return res; },
      function (err) { window.clearTimeout(timer); throw err; }
    );
  }

  // Reads <url><loc> entries from sitemap.xml if that file exists. Any
  // failure (404, network error, malformed XML) resolves to an empty list -
  // a missing sitemap is expected, not an error.
  function discoverSitemapUrls() {
    var sitemapUrl = normalizeUrl(CONFIG.multiPage.sitemapPath);
    if (!sitemapUrl) return Promise.resolve([]);
    return fetchWithTimeout(sitemapUrl)
      .then(function (res) { return res.ok ? res.text() : ''; })
      .then(function (xmlText) {
        if (!xmlText) return [];
        var xml = new DOMParser().parseFromString(xmlText, 'application/xml');
        if (xml.querySelector('parsererror')) return [];
        var out = [];
        xml.querySelectorAll('url > loc').forEach(function (loc) {
          var abs = normalizeUrl(loc.textContent);
          if (abs && abs !== CURRENT_PAGE_URL) out.push(abs);
        });
        return out;
      })
      .catch(function () { return []; });
  }

  // Fetches one page and indexes its #main-content straight into the shared
  // KB (via the normal buildFromDom/addChunk path), tagged with that page's
  // own url/title. Returns the chunks just added, for caching. Any failure
  // (bad HTTP status, network error, timeout, or no #main-content on that
  // page) rejects and is meant to be swallowed by the caller - "skip
  // silently" per spec, never surfaced to the chat UI.
  function fetchAndIndexPage(url) {
    return fetchWithTimeout(url)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var root = doc.getElementById('main-content');
        if (!root) throw new Error('no #main-content on ' + url);
        var pageCtx = { url: url, title: (doc.title || url).trim(), doc: doc };
        var before = KB.chunks.length;
        buildFromDom(root, pageCtx);
        return KB.chunks.slice(before);
      });
  }

  function readKbCache() {
    try {
      var raw = window.sessionStorage.getItem(CONFIG.multiPage.sessionStorageKey);
      var parsed = raw ? JSON.parse(raw) : null;
      return (parsed && parsed.pages) ? parsed : { pages: {} };
    } catch (e) {
      return { pages: {} }; // sessionStorage unavailable (private mode, quota, etc.)
    }
  }

  function writeKbCache(cache) {
    try {
      window.sessionStorage.setItem(CONFIG.multiPage.sessionStorageKey, JSON.stringify(cache));
    } catch (e) {
      // Storage full or unavailable - caching is a nice-to-have, not required.
    }
  }

  // Replays previously-cached chunk objects (from sessionStorage) straight
  // into the live KB - no fetch, no DOM walk, just the same bookkeeping
  // addChunk() would have done.
  function mergeCachedChunks(chunks) {
    (chunks || []).forEach(function (chunk) {
      KB.chunks.push(chunk);
      splitWords(chunk.text).forEach(function (w) { if (!FILLER_SET[w]) KB.rawVocab[w] = true; });
    });
  }

  // Kicks off background discovery + fetching of every other page not
  // already cached this session. Never awaited by init() - the UI is already
  // usable before this is even called.
  function discoverAndIndexOtherPages(cache) {
    // Very old browsers without fetch()/DOMParser just stay in single-page
    // mode - the current page is already fully answerable without this.
    if (typeof fetch === 'undefined' || typeof DOMParser === 'undefined') return;
    var navUrls = discoverNavPageUrls();
    discoverSitemapUrls().then(function (sitemapUrls) {
      var all = {};
      navUrls.concat(sitemapUrls).forEach(function (u) { all[u] = true; });
      var toFetch = Object.keys(all)
        .filter(function (u) { return u !== CURRENT_PAGE_URL && !cache.pages[u]; })
        .slice(0, CONFIG.multiPage.maxPages);

      toFetch.forEach(function (url) {
        fetchAndIndexPage(url).then(function (newChunks) {
          cache.pages[url] = {
            chunks: newChunks,
            pageTitle: (newChunks[0] && newChunks[0].pageTitle) || url,
            fetchedAt: Date.now()
          };
          writeKbCache(cache);
          buildIndex(); // merged chunk is already in KB.chunks - just re-rank
        }).catch(function () {
          // Page failed to load or had no #main-content - skipped silently.
        });
      });
    });
  }

  /* ============================================================================
     4. SEARCH INDEX (BM25-style) - built once from KB.chunks.
     ============================================================================ */

  var INDEX = { docFreq: {}, chunkTokens: [], avgLen: 0, totalChunks: 0 };

  function buildIndex() {
    INDEX.docFreq = {};
    INDEX.chunkTokens = [];
    var totalLen = 0;

    KB.chunks.forEach(function (chunk) {
      var bodyTokens = tokenize(chunk.text);
      // A chunk that IS its own heading (a card title, FAQ question, etc. is
      // both the heading for later siblings AND a standalone chunk) must not
      // boost itself - the boost only exists to help OTHER chunks under that
      // heading, so it is skipped whenever heading === text.
      var isSelfHeading = chunk.heading && chunk.heading.trim() === chunk.text.trim();
      var headingTokens = isSelfHeading ? [] : tokenize(chunk.heading);

      var tf = {};
      bodyTokens.forEach(function (t) { tf[t] = (tf[t] || 0) + 1; });
      // Flat additive bonus per distinct heading word (not multiplied per
      // repeat), so heading length cannot inflate a chunk's BM25 length
      // normalisation the way re-concatenating it into the token list would.
      var distinctHeadingTokens = {};
      headingTokens.forEach(function (t) { distinctHeadingTokens[t] = true; });
      Object.keys(distinctHeadingTokens).forEach(function (t) {
        tf[t] = (tf[t] || 0) + CONFIG.headingBoost;
      });

      var seen = {};
      bodyTokens.concat(headingTokens).forEach(function (t) {
        if (!seen[t]) { seen[t] = true; INDEX.docFreq[t] = (INDEX.docFreq[t] || 0) + 1; }
      });

      var len = bodyTokens.length || 1;
      INDEX.chunkTokens.push({ tf: tf, len: len });
      totalLen += len;
    });

    INDEX.totalChunks = KB.chunks.length;
    INDEX.avgLen = INDEX.totalChunks ? (totalLen / INDEX.totalChunks) : 1;
  }

  function idf(token) {
    var n = INDEX.totalChunks;
    var df = INDEX.docFreq[token] || 0;
    return Math.log(1 + (n - df + 0.5) / (df + 0.5));
  }

  function bm25ScoreChunk(queryTokens, chunkIdx) {
    var doc = INDEX.chunkTokens[chunkIdx];
    if (!doc) return 0;
    var score = 0;
    var k1 = CONFIG.bm25K1, b = CONFIG.bm25B;
    queryTokens.forEach(function (t) {
      var f = doc.tf[t];
      if (!f) return;
      var denom = f + k1 * (1 - b + b * (doc.len / (INDEX.avgLen || 1)));
      score += idf(t) * ((f * (k1 + 1)) / denom);
    });
    return score;
  }

  function searchAll(queryTokens) {
    var results = [];
    for (var i = 0; i < KB.chunks.length; i++) {
      var score = bm25ScoreChunk(queryTokens, i);
      if (score > 0) results.push({ chunk: KB.chunks[i], score: score, idx: i });
    }
    results.sort(function (a, b) { return b.score - a.score; });
    return results;
  }

  /* ============================================================================
     5. WORD RECOGNITION (coverage + typo tolerance)
     ============================================================================ */

  function nearestVocabWord(word) {
    var maxDist = CONFIG.maxTypoDistance(word);
    var best = null, bestDist = maxDist + 1;
    for (var vocabWord in KB.rawVocab) {
      if (Math.abs(vocabWord.length - word.length) > maxDist) continue;
      var d = editDistance(word, vocabWord);
      if (d < bestDist) { bestDist = d; best = vocabWord; }
      if (bestDist === 0) break;
    }
    return bestDist <= maxDist ? best : null;
  }

  // Returns { known: boolean, correctedTo: string|null } for one raw word.
  function recognizeWord(rawWord) {
    if (KB.rawVocab[rawWord]) return { known: true, correctedTo: null };
    if (CONFIG.synonyms.hasOwnProperty(stem(rawWord)) || CONFIG.synonyms.hasOwnProperty(rawWord)) {
      return { known: true, correctedTo: null };
    }
    var corrected = nearestVocabWord(rawWord);
    if (corrected) return { known: true, correctedTo: corrected };
    return { known: false, correctedTo: null };
  }

  /* ============================================================================
     6. ANSWER CLASSIFICATION & RENDERING
     ============================================================================ */

  // Descriptor words that make a query "specific" to one product/row rather
  // than a general listing. If the query contains one, only chunks that also
  // contain it are shown; otherwise all rows in the matched section are shown.
  var SPECIFIC_DESCRIPTORS = [
    'gold', 'home', 'vehicle', 'car', 'education', 'personal', 'msme', 'agri',
    'senior', 'savings', 'current', 'deposit', 'loan'
  ];

  function cleanForSmallTalk(q) {
    return q.toLowerCase().trim().replace(/[!?.,]+$/, '');
  }

  function matchSmallTalk(question) {
    var cleaned = cleanForSmallTalk(question);
    var groups = CONFIG.smallTalk;
    for (var key in groups) {
      if (groups[key].phrases.indexOf(cleaned) !== -1) return groups[key].reply;
    }
    return null;
  }

  // Splits `text` into an ordered array of HTML-safe fragments - each one
  // either a run of whitespace, or a single word (escaped, and wrapped in
  // <mark> when it matches one of `matchedTokens`). Used both to build the
  // final static HTML (joined) and, by the UI, to stream the same words in
  // one at a time without re-deriving the highlighting logic twice.
  function highlightFragments(text, matchedTokens) {
    if (!text) return [];
    matchedTokens = matchedTokens || [];
    var words = text.split(/(\s+)/);
    return words.map(function (w) {
      if (/^\s+$/.test(w) || !w) return w;
      var bare = w.replace(/^[^a-z0-9%]+|[^a-z0-9%]+$/gi, '');
      var norm = bare ? normalize(bare.toLowerCase()) : '';
      var isMatch = norm && matchedTokens.indexOf(norm) !== -1;
      return isMatch ? '<mark>' + escapeHtml(w) + '</mark>' : escapeHtml(w);
    });
  }

  function highlight(text, matchedTokens) {
    return highlightFragments(text, matchedTokens).join('');
  }

  // Groups highlightFragments() output into one "step" per word (a word plus
  // any whitespace immediately after it), so the UI can reveal exactly one
  // step every `wordDelayMs` - i.e. one word at a time, per spec.
  function textToWordSteps(text, matchedTokens) {
    var frags = highlightFragments(text, matchedTokens);
    var steps = [];
    var i = 0;
    while (i < frags.length) {
      var piece = frags[i++];
      if (i < frags.length && /^\s+$/.test(frags[i])) { piece += frags[i]; i++; }
      if (piece) steps.push(piece);
    }
    return steps;
  }

  // Which of the 6 named content topics (if any) this query/answer is about.
  // Used purely to pick friendlier wording in CONFIG.templates - it never
  // changes what counts as a match or what facts are shown. `rawWords`
  // (optional) lets typo'd spellings of chairman/board still get their own
  // topic voice even though those two have no site vocabulary to correct
  // against (there's no "chairman" content to type-correct TOWARDS).
  function classifyTopic(queryTokens, sectionId, rawWords) {
    if (queryTokens.indexOf('chairman') !== -1) return 'chairman';
    if (queryTokens.indexOf('board') !== -1) return 'board';
    if (queryTokens.indexOf('charge') !== -1) return 'charges';
    if (rawWords) {
      for (var i = 0; i < rawWords.length; i++) {
        var w = rawWords[i];
        var maxDist = CONFIG.maxTypoDistance(w);
        if (editDistance(w, 'chairman') <= maxDist) return 'chairman';
        if (editDistance(w, 'board') <= maxDist || editDistance(w, 'director') <= maxDist) return 'board';
      }
    }
    if (sectionId === 'rates') return 'rates';
    if (sectionId === 'branches') return 'branches';
    if (sectionId === 'footer-contact') return 'contact';
    if (queryTokens.indexOf('branch') !== -1) return 'branches';
    if (queryTokens.indexOf('rate') !== -1 || queryTokens.indexOf('deposit') !== -1 || queryTokens.indexOf('loan') !== -1) return 'rates';
    if (queryTokens.indexOf('phone') !== -1) return 'contact';
    return null;
  }

  function buildChipsHtml() {
    return '<div class="ggb-chat-chips" role="group" aria-label="Suggested topics">' +
      CONFIG.chips.map(function (chip) {
        return '<button type="button" class="ggb-chat-chip" data-query="' + escapeHtml(chip.query) + '">' +
          escapeHtml(chip.label) + '</button>';
      }).join('') + '</div>';
  }

  function buildContactLinkHtml() {
    return '<p class="ggb-chat-link-line"><a href="#footer-contact" class="ggb-chat-jump" data-section="footer-contact">' +
      'Contact section &rarr;</a></p>';
  }

  // Short, readable label for a page a cross-page answer came from: its own
  // <title> if known, else the last path segment of its URL (e.g. "test.php").
  function pageLabel(pageUrl, pageTitle) {
    if (pageTitle) return pageTitle;
    try {
      var path = new URL(pageUrl).pathname;
      var last = path.split('/').filter(Boolean).pop();
      return last || pageUrl;
    } catch (e) {
      return pageUrl;
    }
  }

  // Renders a block array into one flat HTML string - used for the instant
  // (prefers-reduced-motion) path, the `.html` field, and console testing.
  // The animated UI (SECTION 7) plays the exact same `blocks` itself instead
  // of re-parsing this string, so both paths always render identically.
  function blocksToStaticHtml(blocks) {
    var out = '';
    var inList = false;
    function closeListIfOpen() { if (inList) { out += '</ul>'; inList = false; } }
    blocks.forEach(function (b) {
      if (b.type === 'ul-start') { closeListIfOpen(); out += '<ul class="' + b.className + '">'; inList = true; return; }
      if (b.type === 'li') { out += '<li>' + highlight(b.text, b.matchedTokens || []) + '</li>'; return; }
      closeListIfOpen();
      if (b.type === 'raw') { out += b.html; return; }
      if (b.type === 'text') {
        var inner = (b.matchedTokens && b.matchedTokens.length) ? highlight(b.text, b.matchedTokens) : escapeHtml(b.text);
        out += '<' + b.tag + (b.className ? ' class="' + b.className + '"' : '') + '>' + inner + (b.appendAfter || '') + '</' + b.tag + '>';
        return;
      }
    });
    closeListIfOpen();
    return out;
  }

  function textBlock(tag, className, text, matchedTokens, appendAfter) {
    return { type: 'text', tag: tag, className: className || null, text: text, matchedTokens: matchedTokens || [], appendAfter: appendAfter || '' };
  }

  /* ============================================================================
     6b. INTENT DETECTION & DIRECT ANSWER COMPOSITION
     Answers the EXACT thing asked, from the structured FACTS store (SECTION
     3c), instead of showing a whole section. Runs after the hard off-topic
     check (so "RBI repo rate" never reaches here) and before the generic
     BM25 section search - which stays as the fallback for whenever nothing
     here recognises the question (SECTION 5 of the task).
     ============================================================================ */

  function fillTemplate(tpl, vars) {
    var out = tpl.replace(/\{(\w+)\}/g, function (_, k) {
      return vars.hasOwnProperty(k) && vars[k] != null ? vars[k] : '';
    });
    // A value that already ends in a period (e.g. "p.a.") plus the
    // template's own closing "." would otherwise read "p.a..".
    return out.replace(/\.\.+$/, '.');
  }

  // "head office" / "customer care" / "toll free" - which labelled fact the
  // question is actually asking about, so "head office number" and "toll
  // free number" can resolve to different (or, here, the same) phone fact.
  function detectOfficeContext(rawLower) {
    if (/head\s*office/.test(rawLower)) return 'Head Office';
    if (/customer\s*care|grievance|complaint|nodal/.test(rawLower)) return 'Customer Care';
    if (/toll[\s-]?free|call\s*centre|call\s*center|helpline/.test(rawLower)) return 'Toll Free';
    return null;
  }

  // Finds the best-matching fact for a detail label by substring-matching
  // its words against each fact's `context`; with no detail, or no match,
  // just returns the first fact of that type (there is only ever one real
  // phone/email/address on this site anyway, so that is still correct).
  function pickBestFact(facts, detail) {
    if (!facts.length) return null;
    if (detail) {
      var words = detail.toLowerCase().split(/\s+/).filter(function (w) { return w.length > 2; });
      var match = facts.filter(function (f) {
        var ctx = (f.context || '').toLowerCase();
        return words.some(function (w) { return ctx.indexOf(w) !== -1; });
      })[0];
      if (match) return match;
    }
    return facts[0];
  }

  // 'branches' or 'districts' - which stat the question wants a count of.
  // Returns null (not 'branches') when the subject genuinely can't be told,
  // so an unrelated "how many ___" question falls through to section search
  // instead of being wrongly answered with the branch count.
  function detectCountDetail(queryTokens, rawLower) {
    if (queryTokens.indexOf('branch') !== -1) return 'branches';
    if (/district/.test(rawLower)) return 'districts';
    return null;
  }

  // A real district name mentioned in the question (checked against the
  // districts FACTS.branches actually has data for), e.g. "Vadodara".
  function detectDistrictDetail(rawLower) {
    var found = null;
    FACTS.branches.some(function (b) {
      if (rawLower.indexOf(b.district.toLowerCase()) !== -1) { found = b.district; return true; }
      return false;
    });
    return found;
  }

  // Fuzzy branch-name match: scores each branch by how many of ITS OWN name
  // words (minus the generic word "branch" itself, which every branch name
  // ends in and so carries no distinguishing signal) also appear in the
  // question. Returns null below a minimum overlap, so a bare "branches"
  // question never resolves to one arbitrary branch.
  function findBestBranchByName(queryTokens) {
    var best = null, bestScore = 0;
    FACTS.branches.forEach(function (b) {
      var nameTokens = tokenize(b.name).filter(function (t) { return t !== 'branch'; });
      var overlap = nameTokens.filter(function (t) { return queryTokens.indexOf(t) !== -1; }).length;
      if (overlap > bestScore) { bestScore = overlap; best = b; }
    });
    return bestScore >= 1 ? best : null;
  }

  // Appends a "View details" link and wraps everything into the same
  // { kind:'answer', blocks, html, ... } shape the UI already knows how to
  // render/animate - no separate rendering path needed for direct answers.
  function finishDirectAnswer(leadBlocks, sectionId) {
    var linkBlock = {
      type: 'raw',
      html: '<p class="ggb-chat-link-line"><a href="#' + escapeHtml(sectionId) + '" class="ggb-chat-jump" data-section="' +
        escapeHtml(sectionId) + '">View details &rarr;</a></p>'
    };
    var blocks = leadBlocks.concat([linkBlock]);
    var text = leadBlocks
      .filter(function (b) { return b.type === 'text' || b.type === 'li'; })
      .map(function (b) { return b.text; })
      .join(' ');
    return { kind: 'answer', text: text, html: blocksToStaticHtml(blocks), blocks: blocks, sectionId: sectionId, pageUrl: CURRENT_PAGE_URL };
  }

  // A recognised intent, but genuinely nothing to answer it with - names the
  // exact thing asked for (per spec), and offers the toll-free/head-office
  // phone as a concrete alternative when one is available. Never guesses.
  function directNotFound(thingLabel, altPhoneFact) {
    altPhoneFact = altPhoneFact === undefined ? pickBestFact(FACTS.phones, null) : altPhoneFact;
    var sentence = altPhoneFact
      ? fillTemplate(CONFIG.answerPhrases.notFoundWithAlt, { thing: thingLabel, alt: altPhoneFact.number })
      : fillTemplate(CONFIG.answerPhrases.notFoundPlain, { thing: thingLabel });
    var blocks = [textBlock('p', null, sentence), { type: 'raw', html: buildChipsHtml() }];
    return { kind: 'nomatch', text: sentence, html: blocksToStaticHtml(blocks), blocks: blocks };
  }

  // An intent IS recognised (chairman, board, charges...) but there is no
  // content for it on the site at all. Uses the single flat notFoundMessage
  // - same wording every time, so a visitor always recognises "not found"
  // regardless of what was asked, rather than several differently-worded
  // "friendly" variants that can read as inconsistent to someone with
  // limited English.
  function notFoundWithTopicVoice() {
    var blocks = [textBlock('p', null, CONFIG.notFoundMessage), { type: 'raw', html: buildChipsHtml() }];
    return { kind: 'nomatch', text: CONFIG.notFoundMessage, html: blocksToStaticHtml(blocks), blocks: blocks };
  }

  function answerPhoneIntent(detail) {
    var fact = pickBestFact(FACTS.phones, detail);
    if (!fact) return directNotFound('that phone number');
    var sentence;
    if (/toll/i.test(fact.context)) sentence = fillTemplate(CONFIG.answerPhrases.phoneTollFree, { value: fact.number });
    else if (detail) sentence = fillTemplate(CONFIG.answerPhrases.phone, { context: fact.context, value: fact.number });
    else sentence = 'Our phone number is ' + fact.number + '.';
    return finishDirectAnswer([textBlock('p', null, sentence)], fact.sectionId);
  }

  function answerEmailIntent(detail) {
    var fact = pickBestFact(FACTS.emails, detail);
    if (!fact) return directNotFound('that email address');
    var sentence = /email/i.test(fact.context)
      ? fact.context + ' is ' + fact.email + '.'
      : fillTemplate(CONFIG.answerPhrases.email, { context: fact.context, value: fact.email });
    return finishDirectAnswer([textBlock('p', null, sentence)], fact.sectionId);
  }

  function answerAddressIntent(detail) {
    var fact = pickBestFact(FACTS.addresses, detail);
    if (!fact) return directNotFound('that address');
    var sentence = detail
      ? fillTemplate(CONFIG.answerPhrases.address, { context: fact.context, value: fact.text })
      : 'Our address is ' + fact.text + '.';
    return finishDirectAnswer([textBlock('p', null, sentence)], fact.sectionId);
  }

  function answerHoursIntent(detail) {
    var fact = pickBestFact(FACTS.hours, detail);
    if (!fact) return directNotFound('our working hours');
    var sentence = detail
      ? fillTemplate(CONFIG.answerPhrases.hours, { context: fact.context, value: fact.text })
      : 'Our working hours are ' + fact.text + '.';
    return finishDirectAnswer([textBlock('p', null, sentence)], fact.sectionId);
  }

  function answerCountIntent(detail) {
    if (detail === 'districts') {
      var dStat = FACTS.stats.filter(function (s) { return /district/i.test(s.label); })[0];
      if (!dStat) return directNotFound('that number');
      var sentence1 = fillTemplate(CONFIG.answerPhrases.countGeneric, { label: dStat.label, value: dStat.number });
      return finishDirectAnswer([textBlock('p', null, sentence1)], dStat.sectionId);
    }
    if (detail === 'branches') {
      var bStat = FACTS.stats.filter(function (s) { return /branch/i.test(s.label); })[0];
      var distStat = FACTS.stats.filter(function (s) { return /district/i.test(s.label); })[0];
      if (bStat && distStat) {
        var sentence2 = fillTemplate(CONFIG.answerPhrases.countBranchesWithDistricts, { branches: bStat.number, districts: distStat.number });
        return finishDirectAnswer([textBlock('p', null, sentence2)], bStat.sectionId);
      }
      if (bStat) {
        var sentence3 = fillTemplate(CONFIG.answerPhrases.countGeneric, { label: bStat.label, value: bStat.number });
        return finishDirectAnswer([textBlock('p', null, sentence3)], bStat.sectionId);
      }
      if (FACTS.branches.length) {
        var sentence4 = 'Gujarat Gramin Bank has at least ' + FACTS.branches.length + ' branches.';
        return finishDirectAnswer([textBlock('p', null, sentence4)], 'branches');
      }
      return directNotFound('the branch count');
    }
    return null; // subject of the count genuinely unclear - let section search try
  }

  function answerWhoIntent(topicKey) {
    var roleRegex = topicKey === 'board' ? /director|board/i : /chairman/i;
    var person = FACTS.people.filter(function (p) { return roleRegex.test(p.role); })[0];
    if (person) {
      var sentence = person.name + ' is the ' + person.role + ' of Gujarat Gramin Bank.';
      return finishDirectAnswer([textBlock('p', null, sentence)], person.sectionId);
    }
    return notFoundWithTopicVoice();
  }

  function answerIfscIntent(queryTokens) {
    var branch = findBestBranchByName(queryTokens);
    if (!branch) return directNotFound('that branch’s IFSC code');
    var sentence = fillTemplate(CONFIG.answerPhrases.ifsc, { branch: branch.name, value: branch.ifsc });
    return finishDirectAnswer([textBlock('p', null, sentence)], branch.sectionId);
  }

  function answerBranchLookupIntent(rawLower, queryTokens) {
    var district = detectDistrictDetail(rawLower);
    if (district) {
      var inDistrict = FACTS.branches.filter(function (b) { return b.district === district; }).slice(0, 5);
      if (!inDistrict.length) return directNotFound('branches in ' + district);
      var lead1 = [textBlock('p', 'ggb-chat-answer-title', 'Branches in ' + district + ':')];
      lead1.push({ type: 'ul-start', className: 'ggb-chat-answer-list' });
      inDistrict.forEach(function (b) {
        lead1.push({ type: 'li', text: b.name + ' - IFSC: ' + b.ifsc + ', Phone: ' + b.phone, matchedTokens: [] });
      });
      return finishDirectAnswer(lead1, 'branches');
    }

    var branch = findBestBranchByName(queryTokens);
    if (branch) {
      var sentence = fillTemplate(CONFIG.answerPhrases.branchSpecific, {
        branch: branch.name, district: branch.district, ifsc: branch.ifsc, phone: branch.phone, address: branch.address
      });
      return finishDirectAnswer([textBlock('p', null, sentence)], branch.sectionId);
    }

    // No specific district/branch named - a clean curated sample (max 5)
    // instead of the old noisy "Select Branch / Find Branch Details" UI text.
    if (!FACTS.branches.length) return null;
    var lead2 = [textBlock('p', 'ggb-chat-answer-title', 'A few of our branches:')];
    lead2.push({ type: 'ul-start', className: 'ggb-chat-answer-list' });
    FACTS.branches.slice(0, 5).forEach(function (b) {
      lead2.push({ type: 'li', text: b.name + ' (' + b.district + ' district)', matchedTokens: [] });
    });
    return finishDirectAnswer(lead2, 'branches');
  }

  function answerRateIntent(category, queryTokens) {
    var candidates = FACTS.rates.filter(function (r) { return r.category === category; });
    if (!candidates.length) return null;

    var descriptors = queryTokens.filter(function (t) {
      return SPECIFIC_DESCRIPTORS.indexOf(t) !== -1 && t !== 'deposit' && t !== 'loan';
    });
    if (descriptors.length) {
      var narrowed = candidates.filter(function (r) {
        var pTokens = tokenize(r.product);
        return descriptors.every(function (d) { return pTokens.indexOf(d) !== -1 || (d === 'senior' && r.audience === 'senior'); });
      });
      if (narrowed.length) {
        var r = narrowed[0];
        var sentence = fillTemplate(CONFIG.answerPhrases.rateSpecific, { product: r.product, value: r.rateText });
        return finishDirectAnswer([textBlock('p', null, sentence)], r.sectionId);
      }
    }

    // General ("loan rates"/"deposit rates") - a direct list, max 5 rows.
    var lead = [textBlock('p', 'ggb-chat-answer-title', (category === 'loan' ? 'Loan' : 'Deposit') + ' interest rates:')];
    lead.push({ type: 'ul-start', className: 'ggb-chat-answer-list' });
    candidates.slice(0, 5).forEach(function (r) {
      lead.push({ type: 'li', text: r.product + ': ' + r.rateText, matchedTokens: [] });
    });
    return finishDirectAnswer(lead, 'rates');
  }

  function answerChargeIntent() {
    if (!FACTS.charges.length) return notFoundWithTopicVoice();
    var match = FACTS.charges[0];
    return finishDirectAnswer([textBlock('p', null, match.text)], match.sectionId);
  }

  var LOAN_TYPE_DESCRIPTORS = ['gold', 'home', 'vehicle', 'car', 'education', 'personal', 'msme', 'agri'];

  // Tries every recognised intent in priority order (most specific first)
  // and returns a ready-to-render answer result, or null when nothing here
  // recognises the question at all - the caller then falls back to the
  // generic BM25 section search exactly as before this feature existed.
  function detectAndComposeDirectAnswer(question, rawWords, queryTokens) {
    var rawLower = question.toLowerCase();

    if (/\bifsc\b/.test(rawLower)) return answerIfscIntent(queryTokens);

    if (/\bhow\s*many\b|\bhow\s*much\b|\bkitn[ei]\b|\bkitna\b/.test(rawLower)) {
      var countResult = answerCountIntent(detectCountDetail(queryTokens, rawLower));
      if (countResult) return countResult;
    }

    if (/\bwho\b|\bname\b|\bnaam\b/.test(rawLower)) {
      var whoTopic = classifyTopic(queryTokens, null, rawWords);
      if (whoTopic === 'chairman' || whoTopic === 'board') return answerWhoIntent(whoTopic);
    }

    if (/\baddress\b|\blocation\b|\bkahan\b/.test(rawLower)) {
      return answerAddressIntent(detectOfficeContext(rawLower));
    }

    if (/\btiming|\bhours?\b|\bopen\b|\bclos/.test(rawLower)) {
      return answerHoursIntent(detectOfficeContext(rawLower));
    }

    if (/\be-?mail\b/.test(rawLower)) {
      return answerEmailIntent(detectOfficeContext(rawLower));
    }

    if (/\bphone\b|\bmobile\b|\bnumber\b|\bhelpline\b|\btoll[\s-]?free\b|\bcall\b|\bcontact\b/.test(rawLower)) {
      return answerPhoneIntent(detectOfficeContext(rawLower));
    }

    if (queryTokens.indexOf('charge') !== -1) return answerChargeIntent();

    if (queryTokens.indexOf('rate') !== -1) {
      var wantsLoan = queryTokens.indexOf('loan') !== -1 ||
        queryTokens.some(function (t) { return LOAN_TYPE_DESCRIPTORS.indexOf(t) !== -1; });
      if (wantsLoan) {
        var loanResult = answerRateIntent('loan', queryTokens);
        if (loanResult) return loanResult;
      }
      var wantsDeposit = queryTokens.indexOf('deposit') !== -1 || queryTokens.indexOf('senior') !== -1 ||
        queryTokens.indexOf('savings') !== -1 || queryTokens.indexOf('current') !== -1;
      if (wantsDeposit) {
        var depositResult = answerRateIntent('deposit', queryTokens);
        if (depositResult) return depositResult;
      }
      // "rate" alone with no clear category - ambiguous, let section search try.
    }

    if (queryTokens.indexOf('branch') !== -1) {
      var branchResult = answerBranchLookupIntent(rawLower, queryTokens);
      if (branchResult) return branchResult;
    }

    return null;
  }

  // Core entry point. Returns { html, text, kind, blocks } - never throws.
  // `blocks` is what the animated UI plays word-by-word; `html`/`text` are
  // the same reply pre-rendered flat, for the reduced-motion path and for
  // console testing (e.g. GGBChatbot.answer("fd rates")).
  function answer(question) {
    try {
      return answerInternal(String(question || ''));
    } catch (e) {
      var blocks = [textBlock('p', null, CONFIG.notFoundMessage), { type: 'raw', html: buildChipsHtml() }];
      return { kind: 'error', text: CONFIG.notFoundMessage, html: blocksToStaticHtml(blocks), blocks: blocks };
    }
  }

  function answerInternal(question) {
    var trimmed = question.trim();
    if (!trimmed) {
      var emptyBlocks = [textBlock('p', null, 'Please type a question to get started.'), { type: 'raw', html: buildChipsHtml() }];
      return { kind: 'empty', text: 'Please type a question.', html: blocksToStaticHtml(emptyBlocks), blocks: emptyBlocks };
    }

    var smallTalkReply = matchSmallTalk(trimmed);
    if (smallTalkReply) {
      var stBlocks = [textBlock('p', null, smallTalkReply)];
      return { kind: 'smalltalk', text: smallTalkReply, html: blocksToStaticHtml(stBlocks), blocks: stBlocks };
    }

    var rawWords = splitWords(trimmed).filter(function (w) { return !FILLER_SET[w]; });

    if (!rawWords.length) {
      var unclearBlocks = [textBlock('p', null, CONFIG.notFoundMessage), { type: 'raw', html: buildChipsHtml() }];
      return { kind: 'unclear', text: CONFIG.notFoundMessage, html: blocksToStaticHtml(unclearBlocks), blocks: unclearBlocks };
    }

    // Tokenised early so topic classification (for template wording) can use
    // it below, even along branches that never reach the real search.
    var queryTokens = tokenize(trimmed);

    // Off-topic check 1: curated trigger words - always rejected outright,
    // before intent detection even runs, so e.g. "RBI repo rate" can never
    // be mistaken for a rates question just because "rate" is also in it.
    var hasOffTopicWord = rawWords.some(function (w) { return CONFIG.offTopicWords.indexOf(w) !== -1; });
    if (hasOffTopicWord) {
      var hardBlocks = [textBlock('p', null, CONFIG.offTopicMessage), { type: 'raw', html: buildChipsHtml() + buildContactLinkHtml() }];
      return { kind: 'offtopic', text: CONFIG.offTopicMessage, html: blocksToStaticHtml(hardBlocks), blocks: hardBlocks };
    }

    // SECTION 6b: answer the exact thing asked, from the structured FACTS
    // store, before ever falling back to a whole-section search.
    var directResult = detectAndComposeDirectAnswer(trimmed, rawWords, queryTokens);
    if (directResult) return directResult;

    var unknownWords = [];
    var knownCount = 0;
    rawWords.forEach(function (w) {
      var rec = recognizeWord(w);
      if (rec.known) knownCount++; else unknownWords.push(w);
    });
    var coverage = knownCount / rawWords.length;

    if (coverage < CONFIG.offTopicMinCoverage) {
      // Same flat message as any other off-topic rejection - a visitor
      // should always see identical wording for "can't answer that",
      // regardless of which words triggered it.
      var offTopicBlocks = [textBlock('p', null, CONFIG.offTopicMessage), { type: 'raw', html: buildChipsHtml() + buildContactLinkHtml() }];
      return { kind: 'offtopic', text: CONFIG.offTopicMessage, html: blocksToStaticHtml(offTopicBlocks), blocks: offTopicBlocks };
    }

    var results = searchAll(queryTokens);

    if (!results.length || results[0].score < CONFIG.matchScoreThreshold) {
      var nomatchBlocks = [textBlock('p', null, CONFIG.notFoundMessage), { type: 'raw', html: buildChipsHtml() }];
      return { kind: 'nomatch', text: CONFIG.notFoundMessage, html: blocksToStaticHtml(nomatchBlocks), blocks: nomatchBlocks };
    }

    var topChunk = results[0].chunk;
    var topSectionId = topChunk.sectionId;
    var sectionTitle = topChunk.sectionTitle;
    var topPageUrl = topChunk.pageUrl;
    var topPageTitle = topChunk.pageTitle;
    var topScore = results[0].score;

    var isSpecific = queryTokens.some(function (t) { return SPECIFIC_DESCRIPTORS.indexOf(t) !== -1; });

    // Grouped by page+section together (not section id alone) - two
    // different pages can legitimately reuse the same section id.
    var sameSectionResults = results.filter(function (r) { return r.chunk.pageKey === topChunk.pageKey; });

    var lines;
    if (isSpecific) {
      // Narrow to rows that also carry the specific descriptor(s) in the query.
      var descriptors = queryTokens.filter(function (t) { return SPECIFIC_DESCRIPTORS.indexOf(t) !== -1; });
      // Require EVERY descriptor the question used (not just any one of them),
      // so "gold loan rate" (gold AND loan) excludes "home loan" rows that
      // only satisfy the "loan" half.
      var narrowed = sameSectionResults.filter(function (r) {
        var chunkTokens = tokenize(r.chunk.text + ' ' + r.chunk.heading);
        return descriptors.every(function (d) { return chunkTokens.indexOf(d) !== -1; });
      });
      lines = (narrowed.length ? narrowed : sameSectionResults.slice(0, 1));
    } else {
      // General question: show every reasonably-scoring row from that section.
      lines = sameSectionResults.filter(function (r) { return r.score >= topScore * 0.35; });
    }

    lines = lines.slice(0, CONFIG.maxAnswerLines);

    // A chunk from another page links to "page.php#section" (a normal
    // navigation, letting the browser jump to the anchor on arrival);
    // a chunk from THIS page keeps the in-page smooth-scroll+highlight link.
    var isCrossPage = topPageUrl !== CURRENT_PAGE_URL;
    var jumpHref = isCrossPage ? (topPageUrl + '#' + topSectionId) : ('#' + topSectionId);
    var pageTagHtml = isCrossPage
      ? ' <span class="ggb-chat-page-tag">on ' + escapeHtml(pageLabel(topPageUrl, topPageTitle)) + '</span>'
      : '';
    var crossPageAttr = isCrossPage ? ' data-cross-page="1"' : '';

    var topic = classifyTopic(queryTokens, topSectionId) || 'general';
    var tpl = CONFIG.templates[topic] || CONFIG.templates.general;

    var blocks = [];
    if (unknownWords.length) {
      blocks.push(textBlock('p', 'ggb-chat-unknown-note',
        'I couldn’t find ‘' + unknownWords[0] + '’ - showing the closest match instead.'));
    }
    blocks.push(textBlock('p', 'ggb-chat-intro-line', pickRandom(tpl.intros)));
    blocks.push(textBlock('p', 'ggb-chat-answer-title', sectionTitle, [], pageTagHtml));
    blocks.push({ type: 'ul-start', className: 'ggb-chat-answer-list' });
    lines.forEach(function (r) {
      blocks.push({ type: 'li', text: r.chunk.text, matchedTokens: queryTokens });
    });
    blocks.push({
      type: 'raw',
      html: '<p class="ggb-chat-link-line"><a href="' + escapeHtml(jumpHref) + '" class="ggb-chat-jump" data-section="' +
        escapeHtml(topSectionId) + '"' + crossPageAttr + '>View details &rarr;</a></p>'
    });
    blocks.push(textBlock('p', 'ggb-chat-outro-line', pickRandom(tpl.outros)));

    return {
      kind: 'answer',
      text: lines.map(function (r) { return r.chunk.text; }).join(' / '),
      html: blocksToStaticHtml(blocks),
      blocks: blocks,
      sectionId: topSectionId,
      pageUrl: topPageUrl
    };
  }

  /* ============================================================================
     7. UI - launcher wiring + panel built and injected at runtime.
     ============================================================================ */

  var ui = {
    panel: null, messages: null, input: null, sendBtn: null, chipsRow: null,
    opened: false, greeted: false, busy: false, hasChatted: false
  };

  // The persistent chips row is a "nothing's happening yet" suggestion -
  // visible while idle (chat not yet started AND the input box is empty),
  // hidden as soon as the visitor starts typing a question, and hidden for
  // good once the first message has actually been sent.
  function updateChipsRowVisibility() {
    if (!ui.chipsRow) return;
    var isTyping = !!(ui.input && ui.input.value.trim());
    ui.chipsRow.hidden = ui.hasChatted || isTyping;
  }

  function buildPanelHtml() {
    return (
      '<div class="ggb-chat-header">' +
        '<div class="ggb-chat-header-text">' +
          '<span class="ggb-chat-title">' + escapeHtml(CONFIG.botName) + '</span>' +
          '<span class="ggb-chat-subtitle">' + escapeHtml(CONFIG.subtitle) + '</span>' +
        '</div>' +
        '<button type="button" class="ggb-chat-close" id="ggb-chat-close-btn" aria-label="Close chat">&times;</button>' +
      '</div>' +
      '<div class="ggb-chat-messages" id="ggb-chat-messages" role="log" aria-live="polite" aria-label="Chat conversation"></div>' +
      '<div class="ggb-chat-chips-row" id="ggb-chat-chips-row">' + buildChipsHtml() + '</div>' +
      '<form class="ggb-chat-input-row" id="ggb-chat-form">' +
        '<label for="ggb-chat-input" class="visually-hidden">Type your question</label>' +
        '<input type="text" id="ggb-chat-input" class="ggb-chat-input" placeholder="Ask about deposits, loans, branches..." autocomplete="off">' +
        '<button type="submit" class="ggb-chat-send" id="ggb-chat-send-btn" aria-label="Send question"><i class="bi bi-send-fill"></i></button>' +
      '</form>' +
      '<p class="ggb-chat-footnote">' + escapeHtml(CONFIG.footerNote) + '</p>'
    );
  }

  function scrollMessagesToEnd() {
    if (ui.messages) ui.messages.scrollTop = ui.messages.scrollHeight;
  }

  function appendMessage(role, html) {
    var row = document.createElement('div');
    row.className = 'ggb-chat-msg ggb-chat-msg-' + role;
    var bubble = document.createElement('div');
    bubble.className = 'ggb-chat-bubble';
    bubble.innerHTML = html;
    row.appendChild(bubble);
    ui.messages.appendChild(row);
    scrollMessagesToEnd();
    return row;
  }

  function appendUserMessage(text) {
    appendMessage('user', escapeHtml(text));
  }

  // Disables the text input, send button and every chip (current chips row
  // AND any chips rendered inside a reply) while a message is being typed
  // or streamed, so a visitor can't pile up overlapping requests.
  function setInputEnabled(enabled) {
    if (ui.input) ui.input.disabled = !enabled;
    if (ui.sendBtn) ui.sendBtn.disabled = !enabled;
    if (ui.panel) ui.panel.classList.toggle('ggb-chat-busy', !enabled);
  }

  function showTyping(callback) {
    var row = document.createElement('div');
    row.className = 'ggb-chat-msg ggb-chat-msg-bot ggb-chat-typing';
    row.innerHTML = '<div class="ggb-chat-bubble"><span class="ggb-chat-dot"></span><span class="ggb-chat-dot"></span><span class="ggb-chat-dot"></span></div>';
    ui.messages.appendChild(row);
    scrollMessagesToEnd();
    var cfg = CONFIG.typingAnimation;
    var delay = cfg.minTypingMs + Math.random() * (cfg.maxTypingMs - cfg.minTypingMs);
    window.setTimeout(function () {
      row.remove();
      callback();
    }, delay);
  }

  // Instant render - used when prefers-reduced-motion is set. Produces
  // exactly the same markup the animated player would have ended up with.
  function renderBotMessageStatic(result) {
    appendMessage('bot', result.html);
  }

  // Plays `result.blocks` into a new bot bubble: typing cursor + word-by-word
  // reveal for prose, one list item at a time for facts, honouring the exact
  // per-block HTML a static render would produce. Clicking the bubble at any
  // point jumps straight to the finished message. Calls `onComplete` once
  // the whole reply (or the instant skip-to-end) has been rendered.
  function renderBotMessageAnimated(result, onComplete) {
    var row = document.createElement('div');
    row.className = 'ggb-chat-msg ggb-chat-msg-bot';
    var bubble = document.createElement('div');
    bubble.className = 'ggb-chat-bubble';
    row.appendChild(bubble);
    ui.messages.appendChild(row);
    scrollMessagesToEnd();

    var blocks = result.blocks || [];
    var currentList = null;
    var skipped = false;
    var activeCancel = null;

    function onBubbleClick() {
      skipped = true;
      if (activeCancel) activeCancel();
    }
    bubble.addEventListener('click', onBubbleClick);

    function appendBlockStatic(block) {
      if (block.type === 'ul-start') {
        var ul = document.createElement('ul');
        ul.className = block.className;
        bubble.appendChild(ul);
        currentList = ul;
        return;
      }
      if (block.type === 'raw') { bubble.insertAdjacentHTML('beforeend', block.html); return; }
      if (block.type === 'li') {
        var li = document.createElement('li');
        li.innerHTML = highlight(block.text, block.matchedTokens || []);
        (currentList || bubble).appendChild(li);
        return;
      }
      var el = document.createElement(block.tag || 'p');
      if (block.className) el.className = block.className;
      var inner = (block.matchedTokens && block.matchedTokens.length) ? highlight(block.text, block.matchedTokens) : escapeHtml(block.text);
      el.innerHTML = inner + (block.appendAfter || '');
      bubble.appendChild(el);
    }

    // Reveals `text` into `el` one word at a time (already-highlighted, via
    // the same fragments blocksToStaticHtml() would use), with a blinking
    // cursor trailing the revealed text, scrolling to bottom on every word.
    function streamInto(el, text, matchedTokens, onDone) {
      var steps = textToWordSteps(text, matchedTokens);
      var idx = 0;
      var cursor = document.createElement('span');
      cursor.className = 'ggb-chat-cursor';
      el.appendChild(cursor);
      var timer = null;
      activeCancel = function () {
        window.clearTimeout(timer);
        cursor.remove();
        el.insertAdjacentHTML('beforeend', steps.slice(idx).join(''));
        activeCancel = null;
        onDone();
      };
      function tick() {
        if (idx >= steps.length) { cursor.remove(); activeCancel = null; onDone(); return; }
        cursor.insertAdjacentHTML('beforebegin', steps[idx]);
        idx++;
        scrollMessagesToEnd();
        timer = window.setTimeout(tick, CONFIG.typingAnimation.wordDelayMs);
      }
      tick();
    }

    var i = 0;
    function playNext() {
      if (skipped) {
        for (; i < blocks.length; i++) appendBlockStatic(blocks[i]);
        finish();
        return;
      }
      if (i >= blocks.length) { finish(); return; }
      var block = blocks[i++];

      if (block.type === 'ul-start') {
        var ul = document.createElement('ul');
        ul.className = block.className;
        bubble.appendChild(ul);
        currentList = ul;
        scrollMessagesToEnd();
        playNext();
        return;
      }
      if (block.type === 'raw') {
        bubble.insertAdjacentHTML('beforeend', block.html);
        scrollMessagesToEnd();
        playNext();
        return;
      }
      if (block.type === 'li') {
        // List items/rows appear one by one: each is its own streamed block.
        var li = document.createElement('li');
        (currentList || bubble).appendChild(li);
        streamInto(li, block.text, block.matchedTokens, playNext);
        return;
      }
      // block.type === 'text'
      var el = document.createElement(block.tag || 'p');
      if (block.className) el.className = block.className;
      bubble.appendChild(el);
      streamInto(el, block.text, block.matchedTokens, function () {
        if (block.appendAfter) el.insertAdjacentHTML('beforeend', block.appendAfter);
        playNext();
      });
    }

    function finish() {
      bubble.removeEventListener('click', onBubbleClick);
      scrollMessagesToEnd();
      onComplete();
    }

    playNext();
  }

  function jumpToSection(sectionId) {
    var target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.add('ggb-kb-highlight');
    window.setTimeout(function () { target.classList.remove('ggb-kb-highlight'); }, 2200);
  }

  function handleAsk(question) {
    if (ui.busy || !question.trim()) return;
    appendUserMessage(question);
    if (ui.input) ui.input.value = '';
    ui.hasChatted = true;
    updateChipsRowVisibility(); // chat has started now - hidden for good

    var result = answer(question);
    ui.busy = true;
    setInputEnabled(false);

    function done() {
      ui.busy = false;
      setInputEnabled(true);
      // Disabling the input during the reply blurs it (disabled elements
      // can't hold focus) - restore focus so the visitor can keep typing
      // without having to click the input again.
      if (ui.input) ui.input.focus();
    }

    if (prefersReducedMotion()) {
      renderBotMessageStatic(result);
      done();
      return;
    }

    showTyping(function () {
      renderBotMessageAnimated(result, done);
    });
  }

  function wirePanelEvents() {
    ui.messages = document.getElementById('ggb-chat-messages');
    ui.input = document.getElementById('ggb-chat-input');
    ui.sendBtn = document.getElementById('ggb-chat-send-btn');

    var closeBtn = document.getElementById('ggb-chat-close-btn');
    closeBtn.addEventListener('click', closePanel);

    var form = document.getElementById('ggb-chat-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleAsk(ui.input.value);
    });

    ui.chipsRow = document.getElementById('ggb-chat-chips-row');
    ui.chipsRow.addEventListener('click', function (e) {
      var btn = e.target.closest('.ggb-chat-chip');
      if (btn) handleAsk(btn.getAttribute('data-query'));
    });

    ui.input.addEventListener('input', updateChipsRowVisibility);
    updateChipsRowVisibility(); // idle at start: visible, nothing typed yet

    ui.messages.addEventListener('click', function (e) {
      var btn = e.target.closest('.ggb-chat-chip');
      if (btn) { handleAsk(btn.getAttribute('data-query')); return; }
      var link = e.target.closest('.ggb-chat-jump');
      if (link) {
        // A cross-page link ("test.php#section") is left alone - there is no
        // local element to scroll to, so the browser just navigates there
        // and jumps to the anchor natively once that page loads.
        if (link.hasAttribute('data-cross-page')) return;
        e.preventDefault();
        jumpToSection(link.getAttribute('data-section'));
      }
    });
  }

  function buildPanel() {
    var panel = document.createElement('div');
    panel.id = CONFIG.panelId;
    panel.className = 'ggb-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-label', CONFIG.botName + ' chat assistant');
    panel.innerHTML = buildPanelHtml();
    document.body.appendChild(panel);
    ui.panel = panel;
    wirePanelEvents();
  }

  function openPanel() {
    if (!ui.panel) buildPanel();
    ui.panel.classList.add('active');
    ui.opened = true;
    var launcher = document.getElementById(CONFIG.launcherId);
    if (launcher) launcher.setAttribute('aria-expanded', 'true');
    if (!ui.greeted) {
      ui.greeted = true;
      appendMessage('bot', escapeHtml(CONFIG.welcomeMessage));
      // The wave badge only needs to show until it's actually been noticed and used.
      var waveBadge = document.querySelector('.ggb-wave-badge');
      if (waveBadge) waveBadge.remove();
    }
    window.setTimeout(function () { if (ui.input) ui.input.focus(); }, 50);
  }

  function closePanel() {
    if (!ui.panel) return;
    ui.panel.classList.remove('active');
    ui.opened = false;
    var launcher = document.getElementById(CONFIG.launcherId);
    if (launcher) { launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); }
  }

  function togglePanel() {
    if (ui.opened) closePanel(); else openPanel();
  }

  function wireLauncher() {
    var launcher = document.getElementById(CONFIG.launcherId);
    if (!launcher) return;
    launcher.setAttribute('aria-expanded', 'false');
    // Attention cue: a waving-hand badge next to (not on) the bot icon,
    // until the visitor actually opens the chat once (removed in
    // openPanel()). Decorative only - never read by screen readers, never
    // blocks clicks on the button itself.
    var waveBadge = document.createElement('span');
    waveBadge.className = 'ggb-wave-badge';
    waveBadge.setAttribute('aria-hidden', 'true');
    waveBadge.textContent = '👋';
    launcher.appendChild(waveBadge);
    launcher.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePanel();
    });
  }

  function wireGlobalKeys() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ui.opened) closePanel();
    });
    document.addEventListener('click', function (e) {
      if (!ui.opened || !ui.panel) return;
      var launcher = document.getElementById(CONFIG.launcherId);
      if (!ui.panel.contains(e.target) && e.target !== launcher && !launcher.contains(e.target)) {
        closePanel();
      }
    });
  }

  function init() {
    // 1. Current page only, synchronous - the bot is fully answerable from
    //    this alone before anything else below even starts.
    buildCurrentPageKnowledge();

    // 2. Merge whatever other pages this tab already cached this session -
    //    instant, no network - then make this page's own content available
    //    to whichever page the visitor opens next.
    var cache = readKbCache();
    cache.pages = cache.pages || {};
    cache.pages[CURRENT_PAGE_URL] = {
      chunks: KB.chunks.slice(),
      pageTitle: document.title,
      fetchedAt: Date.now()
    };
    writeKbCache(cache);
    Object.keys(cache.pages).forEach(function (url) {
      if (url !== CURRENT_PAGE_URL) mergeCachedChunks(cache.pages[url].chunks);
    });

    buildIndex();
    wireLauncher();
    wireGlobalKeys();

    // 3. In the background: discover + fetch any pages not yet cached, and
    //    merge each in (rebuilding the index) as it arrives. Never awaited.
    discoverAndIndexOtherPages(cache);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.GGBChatbot = { answer: answer };
})();
