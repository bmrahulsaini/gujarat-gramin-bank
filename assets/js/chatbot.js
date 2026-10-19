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
    subtitle: 'Answers from this website only',
    footerNote: 'Please confirm important details at your branch.',

    // Launcher / panel element ids (created at runtime, kept here so nothing
    // is a magic string scattered through the code).
    launcherId: 'btn-floating-chatbot',
    panelId: 'ggb-chat-panel',

    // First message shown when the panel opens for the very first time.
    welcomeMessage: "Namaste! I'm GGB Sahayak. Ask me about deposits, loans, " +
      'rates, branches or contact details - I only answer using information ' +
      'already on this website.',

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
        reply: 'Hello! How can I help you with Gujarat Gramin Bank today?'
      },
      thanks: {
        phrases: ['thanks', 'thank you', 'thanku', 'thx', 'dhanyavad', 'aabhar', 'ok thanks'],
        reply: "You're welcome! Is there anything else about GGB I can help with?"
      },
      bye: {
        phrases: ['bye', 'goodbye', 'bye bye', 'see you', 'tata', 'ok bye'],
        reply: 'Goodbye! Visit again if you have more questions about GGB.'
      },
      about: {
        phrases: ['who are you', 'what are you', 'who r u', 'what is your name', 'tell me about yourself'],
        reply: "I'm " + 'GGB Sahayak' + ', a website assistant that answers questions ' +
          'about Gujarat Gramin Bank using only the information published on this site.'
      }
    },

    // Message shown when the question is clearly unrelated to the bank, or
    // when fewer than half its meaningful words exist anywhere on the site.
    offTopicMessage: 'Sorry, that question is outside my scope.',

    // Message shown when the question is on-topic but nothing matches well enough.
    notFoundMessage: "Sorry, this query is out of scope.",

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
      'what', 'whats', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how',
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
      'nav', 'script', 'style', 'noscript', 'form', 'svg', 'select', 'option', 'input', 'textarea',
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
    sectionTitles: {}  // "pageUrl::sectionId" -> human-readable title (per-page, so two
                        // pages reusing the same section id don't collide)
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

  // Resets the KB and (re)builds it from ONLY the current page. Other pages'
  // chunks are merged in separately afterwards (from cache, then from the
  // background fetches) - see SECTION 3b.
  function buildCurrentPageKnowledge() {
    KB.chunks = [];
    KB.rawVocab = {};
    KB.sectionTitles = {};
    buildFromDom(document.getElementById('main-content'), CURRENT_PAGE_CTX);
    buildFromDom(document.querySelector('footer.ggb-footer'), CURRENT_PAGE_CTX);
    buildFromBranchData();
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

  function highlight(text, matchedTokens) {
    if (!matchedTokens.length) return escapeHtml(text);
    var words = text.split(/(\s+)/);
    return words.map(function (w) {
      if (/^\s+$/.test(w) || !w) return w;
      var bare = w.replace(/^[^a-z0-9%]+|[^a-z0-9%]+$/gi, '');
      var norm = bare ? normalize(bare.toLowerCase()) : '';
      var isMatch = norm && matchedTokens.indexOf(norm) !== -1;
      return isMatch ? '<mark>' + escapeHtml(w) + '</mark>' : escapeHtml(w);
    }).join('');
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

  // Core entry point. Returns { html, text, kind } - never throws.
  function answer(question) {
    try {
      return answerInternal(String(question || ''));
    } catch (e) {
      return { kind: 'error', text: CONFIG.notFoundMessage, html: escapeHtml(CONFIG.notFoundMessage) + buildChipsHtml() };
    }
  }

  function answerInternal(question) {
    var trimmed = question.trim();
    if (!trimmed) {
      return { kind: 'empty', text: 'Please type a question.', html: 'Please type a question to get started.' + buildChipsHtml() };
    }

    var smallTalkReply = matchSmallTalk(trimmed);
    if (smallTalkReply) {
      return { kind: 'smalltalk', text: smallTalkReply, html: escapeHtml(smallTalkReply) };
    }

    var rawWords = splitWords(trimmed).filter(function (w) { return !FILLER_SET[w]; });

    if (!rawWords.length) {
      return { kind: 'unclear', text: CONFIG.notFoundMessage, html: escapeHtml(CONFIG.notFoundMessage) + buildChipsHtml() };
    }

    // Off-topic check 1: curated trigger words (checked first, independent of coverage).
    var hasOffTopicWord = rawWords.some(function (w) { return CONFIG.offTopicWords.indexOf(w) !== -1; });

    var unknownWords = [];
    var knownCount = 0;
    rawWords.forEach(function (w) {
      var rec = recognizeWord(w);
      if (rec.known) knownCount++; else unknownWords.push(w);
    });
    var coverage = knownCount / rawWords.length;

    if (hasOffTopicWord || coverage < CONFIG.offTopicMinCoverage) {
      return {
        kind: 'offtopic',
        text: CONFIG.offTopicMessage,
        html: escapeHtml(CONFIG.offTopicMessage) + buildChipsHtml() + buildContactLinkHtml()
      };
    }

    var queryTokens = tokenize(trimmed);
    var results = searchAll(queryTokens);

    if (!results.length || results[0].score < CONFIG.matchScoreThreshold) {
      return {
        kind: 'nomatch',
        text: CONFIG.notFoundMessage,
        html: escapeHtml(CONFIG.notFoundMessage) + buildChipsHtml()
      };
    }

    var unknownNote = '';
    if (unknownWords.length) {
      unknownNote = '<p class="ggb-chat-unknown-note">I couldn\'t find ‘' +
        escapeHtml(unknownWords[0]) + '’ on this website - showing the closest match instead.</p>';
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

    var linesHtml = lines.map(function (r) {
      return '<li>' + highlight(r.chunk.text, queryTokens) + '</li>';
    }).join('');

    // A chunk from another page links to "page.php#section" (a normal
    // navigation, letting the browser jump to the anchor on arrival);
    // a chunk from THIS page keeps the in-page smooth-scroll+highlight link.
    var isCrossPage = topPageUrl !== CURRENT_PAGE_URL;
    var jumpHref = isCrossPage ? (topPageUrl + '#' + topSectionId) : ('#' + topSectionId);
    var pageTagHtml = isCrossPage
      ? ' <span class="ggb-chat-page-tag">on ' + escapeHtml(pageLabel(topPageUrl, topPageTitle)) + '</span>'
      : '';
    var crossPageAttr = isCrossPage ? ' data-cross-page="1"' : '';

    var html = unknownNote +
      '<p class="ggb-chat-answer-title">' + escapeHtml(sectionTitle) + pageTagHtml + '</p>' +
      '<ul class="ggb-chat-answer-list">' + linesHtml + '</ul>' +
      '<p class="ggb-chat-link-line"><a href="' + escapeHtml(jumpHref) + '" class="ggb-chat-jump" data-section="' +
      escapeHtml(topSectionId) + '"' + crossPageAttr + '>View on website &rarr;</a></p>';

    return {
      kind: 'answer',
      text: lines.map(function (r) { return r.chunk.text; }).join(' / '),
      html: html,
      sectionId: topSectionId,
      pageUrl: topPageUrl
    };
  }

  /* ============================================================================
     7. UI - launcher wiring + panel built and injected at runtime.
     ============================================================================ */

  var ui = { panel: null, messages: null, input: null, opened: false, greeted: false };

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
        '<button type="submit" class="ggb-chat-send" aria-label="Send question"><i class="bi bi-send-fill"></i></button>' +
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

  function showTyping(callback) {
    var row = document.createElement('div');
    row.className = 'ggb-chat-msg ggb-chat-msg-bot ggb-chat-typing';
    row.innerHTML = '<div class="ggb-chat-bubble"><span class="ggb-chat-dot"></span><span class="ggb-chat-dot"></span><span class="ggb-chat-dot"></span></div>';
    ui.messages.appendChild(row);
    scrollMessagesToEnd();
    window.setTimeout(function () {
      row.remove();
      callback();
    }, 550);
  }

  function jumpToSection(sectionId) {
    var target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.add('ggb-kb-highlight');
    window.setTimeout(function () { target.classList.remove('ggb-kb-highlight'); }, 2200);
  }

  function handleAsk(question) {
    if (!question.trim()) return;
    appendUserMessage(question);
    if (ui.input) ui.input.value = '';
    showTyping(function () {
      var result = answer(question);
      appendMessage('bot', result.html);
    });
  }

  function wirePanelEvents() {
    ui.messages = document.getElementById('ggb-chat-messages');
    ui.input = document.getElementById('ggb-chat-input');

    var closeBtn = document.getElementById('ggb-chat-close-btn');
    closeBtn.addEventListener('click', closePanel);

    var form = document.getElementById('ggb-chat-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleAsk(ui.input.value);
    });

    var chipsRow = document.getElementById('ggb-chat-chips-row');
    chipsRow.addEventListener('click', function (e) {
      var btn = e.target.closest('.ggb-chat-chip');
      if (btn) handleAsk(btn.getAttribute('data-query'));
    });

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
