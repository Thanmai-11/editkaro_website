# EditKaro.in

> **We Edit. You Grow.**  
> A social media marketing & video editing agency — built as a fully responsive, multi-page static website.

🔗 **Live Site:** [thanmai-11.github.io/editkaro_website](https://thanmai-11.github.io/editkaro_website/)

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services, process, testimonials, email collector, CTA |
| Portfolio | `pages/portfolio.html` | Masonry grid with 9-category filter & lightbox video player |
| About Us | `pages/about.html` | Story, mission/vision, values, team cards |
| Contact Us | `pages/contact.html` | Contact form, FAQ accordion, social links |

---

## Features

- **Fully responsive** — mobile-first CSS, hamburger nav, fluid grids
- **Portfolio filter** — 9 categories with live card count + URL deep-linking (`?cat=gaming`)
- **Lightbox** — YouTube embed with keyboard navigation and focus management
- **Contact & email forms** — client-side validation, Google Sheets integration via Apps Script
- **SEO** — semantic HTML5, unique meta tags, Open Graph, lazy-loaded images
- **Accessible** — `aria-*` attributes, visible focus rings, `prefers-reduced-motion` support
- **Zero dependencies** — no frameworks, no build step

---

## File Structure

```
editkaro_website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── pages/
│   ├── portfolio.html
│   ├── about.html
│   └── contact.html
└── .nojekyll
```

---

## Google Sheets Setup (optional)

To activate the contact and email forms:

1. Create a new Google Sheet
2. **Extensions → Apps Script** → paste:

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

3. **Deploy → New deployment → Web app**  
   - Execute as: Me  
   - Who has access: Anyone  
4. Copy the Web App URL and replace `EMAIL_SHEET_URL` / `CONTACT_SHEET_URL` in `js/main.js`

---

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat&logo=github&logoColor=white)

---

*VaultofCodes Major Project — Thanmai, MIT MAHE*
