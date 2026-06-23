/* ============================================================
   EditKaro.in — Shared JS (nav, marquee, reveal)
   ============================================================ */

/* ── Mark active nav link ─────────────────────────────────── */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.classList.add('active');
  });
})();

/* ── Mobile hamburger ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}

/* ── Nav shadow on scroll ─────────────────────────────────── */
const navEl = document.getElementById('nav');
if (navEl) {
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Scroll reveal ────────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Marquee builder ──────────────────────────────────────── */
function buildMarquee(trackId, items) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const frag = document.createDocumentFragment();
  [...items, ...items].forEach((t, i) => {
    const el = document.createElement('span');
    el.className = 'marquee-item' + (i % 3 === 1 ? ' accent' : '');
    el.textContent = t + ' ·';
    frag.appendChild(el);
  });
  track.appendChild(frag);
}

/* ── Google Sheets form helper ────────────────────────────── */
/*
  HOW TO WIRE A FORM TO GOOGLE SHEETS
  ──────────────────────────────────────────────────────────────
  1. Create a new Google Sheet.
  2. Extensions → Apps Script → paste this code:

      function doPost(e) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const data  = JSON.parse(e.postData.contents);
        const row   = Object.values(data);
        row.unshift(new Date().toISOString());
        sheet.appendRow(row);
        return ContentService
          .createTextOutput(JSON.stringify({ result: 'success' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

  3. Deploy → New deployment → Web app
       Execute as: Me
       Who has access: Anyone
  4. Copy the Web App URL and paste it as the `action` value below.
  ──────────────────────────────────────────────────────────────
*/
async function submitToSheets(formEl, action, statusEl) {
  const data = {};
  new FormData(formEl).forEach((val, key) => data[key] = val);
  statusEl.className = 'form-status';
  statusEl.textContent = 'Sending…';
  statusEl.style.display = 'block';
  try {
    await fetch(action, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    statusEl.className = 'form-status success';
    statusEl.textContent = '✓ Sent! We\'ll be in touch shortly.';
    formEl.reset();
  } catch (err) {
    statusEl.className = 'form-status error';
    statusEl.textContent = '✗ Something went wrong. Please email us directly at hello@editkaro.in';
  }
}
