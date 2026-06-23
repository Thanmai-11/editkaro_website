# EditKaro.in — Project Report

**Student Submission | VaultofCodes Major Project**

---

## Overview

This report documents the development of the complete EditKaro.in website — a social media marketing and video editing agency — as required for the VaultofCodes Major Project assignment.

---

## Pages Delivered

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services, process, testimonials, email collector, CTA |
| Portfolio | `pages/portfolio.html` | Masonry grid with 9-category filter, lightbox video player |
| About Us | `pages/about.html` | Story, mission/vision, values, team cards |
| Contact Us | `pages/contact.html` | Contact form, FAQ accordion, social links |

---

## Key Features Implemented

### 1. Responsive Design
- Mobile-first CSS with breakpoints at 900px and 540px
- Hamburger menu with smooth open/close animation on mobile
- Masonry portfolio grid collapses from 3 → 2 → 1 columns on smaller screens
- All sections reflow gracefully at every viewport width

### 2. Portfolio Section (`pages/portfolio.html`)
- 24 placeholder project cards across 9 categories: Short Form, Long Form, Gaming, Football Edits, eCommerce Ads, Documentary, Color Grading, Anime, Ads
- Live JavaScript filter — clicking a category instantly shows/hides relevant cards with a live count
- URL parameter support: `portfolio.html?cat=gaming` deep-links to a category
- Lightbox modal with YouTube embed, keyboard navigation (Enter/Space to open, Escape to close), and focus management for accessibility
- `loading="lazy"` on all thumbnails for performance

### 3. Email Collector (`index.html` — `#newsletter`)
- Inline email subscription form with client-side validation
- Wired to `submitToSheets()` in `js/main.js` which POSTs JSON to a Google Apps Script Web App
- Clear setup instructions in `js/main.js` — replace `EMAIL_SHEET_URL` constant with the deployed Apps Script URL
- Development fallback: shows a friendly message if the URL hasn't been configured yet

### 4. Contact Form (`pages/contact.html`)
- Fields: Name, Email, Phone, Budget (select), Services (multi-select chips), Message
- Multi-select service chips with toggle interaction
- Client-side validation before submission
- Submits to Google Sheets via the same `submitToSheets()` helper
- Replace `CONTACT_SHEET_URL` constant with the deployed Apps Script URL

### 5. Google Sheets Integration
The Apps Script code to paste is documented in `js/main.js`:

```javascript
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
```

Deploy as: **Execute as Me | Who has access: Anyone**

### 6. SEO Best Practices
- Semantic HTML5 elements (`<nav>`, `<section>`, `<footer>`, `<main>`)
- Unique `<title>` and `<meta name="description">` on every page
- Open Graph tags on the home page
- `alt` attributes on all images
- Logical heading hierarchy (h1 → h2 → h3)
- `loading="lazy"` on all below-fold images

### 7. Performance
- Google Fonts loaded once via shared `<link>` in each page head
- Shared `css/style.css` and `js/main.js` — browser caches across page navigations
- Minimal dependencies — no external JS frameworks
- CSS animations respect `prefers-reduced-motion`

### 8. Accessibility
- Keyboard-navigable nav, portfolio items, lightbox, and FAQ accordion
- `aria-label`, `aria-expanded`, `aria-modal`, `aria-pressed` on interactive elements
- Focus management in the lightbox (focus enters lightbox on open, returns to trigger on close)
- Visible focus ring on all focusable elements

---

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| CORS on Google Sheets POST | Used `mode: 'no-cors'` — Apps Script responds but browser blocks reading; form success is inferred (standard pattern for Apps Script integrations) |
| Masonry layout without a JS library | CSS `columns` property — simple, performant, no dependency needed |
| Lightbox focus trap | Stored `lastFocused` before opening; moved focus to close button on open; restored focus on close |
| Mobile nav overlay | Fixed-position overlay injected below the 64px nav bar via CSS, toggled with a class |
| Active nav link | Short IIFE in `main.js` compares `location.pathname` to each link's `href` |
| Filter with URL params | `URLSearchParams` read on page load; matching button clicked programmatically |

---

## File Structure

```
editkaro/
├── index.html          ← Home page
├── css/
│   └── style.css       ← Shared styles (all pages import this)
├── js/
│   └── main.js         ← Shared JS: nav, marquee, reveal, Google Sheets helper
├── pages/
│   ├── portfolio.html  ← Portfolio with filter & lightbox
│   ├── about.html      ← About Us page
│   └── contact.html    ← Contact form & FAQ
└── REPORT.md           ← This file
```

---

## Deployment Instructions

### Netlify (Recommended)
1. Push this folder to a GitHub repository
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Set build command to (blank) and publish directory to `.`
4. Deploy — Netlify assigns a URL immediately

### GitHub Pages
1. Push to GitHub repo
2. Settings → Pages → Source: main branch, root folder
3. Site live at `https://<username>.github.io/<repo>`

### Vercel
1. `npm i -g vercel` then `vercel` in the project folder
2. Or connect GitHub repo at [vercel.com](https://vercel.com)

---

## Placeholder Assets

All thumbnails use [picsum.photos](https://picsum.photos) seeded URLs and all YouTube IDs are set to `dQw4w9WgXcQ`. Before going live:
- Replace each `thumb` value in `pages/portfolio.html` with the real poster frame URL
- Replace each `ytId` value with the real YouTube video ID
- Replace team avatar `src` attributes in `pages/about.html` with real team photos
- Update all social media links to real profile URLs
- Update contact email, phone, and location details

---

*Submitted by: Thanmai | VaultofCodes Major Project*
