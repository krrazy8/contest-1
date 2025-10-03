# UCE Monitoring Website – Production Ready

Modern one-page website for UCE (urmărirea comportării în exploatare) services compliant with P130-2025.

## 🎨 Design & Tech

- **Color Palette:** Cream (#F9F4EC) + Emerald (#0E7B6B)
- **Tech Stack:** Vanilla HTML5, CSS3, JavaScript (no frameworks)
- **Responsive:** Mobile-first design, works on all devices
- **Performance:** Optimized assets, lazy loading, semantic markup
- **SEO:** Meta tags, OpenGraph, Twitter Cards, semantic HTML

## 📁 Project Structure

```
/
├── index.html              # Main page
├── favicon.ico             # Favicon (32x32)
├── assets/
│   ├── css/
│   │   └── style.css       # Main styles with CSS variables
│   ├── js/
│   │   └── main.js         # JavaScript (navigation, calculator, forms)
│   └── img/
│       ├── logo.jpg        # Logo (400x400, 38KB)
│       └── og-image.jpg    # Social preview (800x800)
└── README.md               # This guide
```

## 🚀 Quick Start

1. **Deploy files to web server** (Apache, Nginx, or any hosting)
2. **Update contact info** in `index.html` (email, phone)
3. **Test** calculator and forms
4. **Done!** Site works out of the box

### Local Preview

```bash
# With Python 3
python3 -m http.server 8000

# Or with PHP
php -S localhost:8000

# Open http://localhost:8000
```

## ✏️ How to Edit

### 1. Change Colors

Open `/assets/css/style.css` and modify CSS variables at the top:

```css
:root {
  --cream: #F9F4EC;           /* Background */
  --emerald: #0E7B6B;         /* Accent color */
  --emerald-dark: #0A5A4E;    /* Dark accent */
  --emerald-light: #E8F5F3;   /* Light accent */

  --text-primary: #0c2d2b;    /* Primary text */
  --text-secondary: #537471;  /* Secondary text */
  /* ... */
}
```

### 2. Change Text Content

Open `/index.html` and find the section you need:

- **Hero section:** line ~68
- **Services:** line ~89
- **Pricing:** line ~120
- **Contact:** line ~285

Example:
```html
<h1>Your new heading</h1>
<p>Your new text...</p>
```

### 3. Update Contact Information

In `index.html`, find and replace:

```html
<!-- Email (line ~289) -->
<a href="mailto:your-email@example.com">your-email@example.com</a>

<!-- Phone (lines ~290, ~337, ~343) -->
<a href="tel:+40XXXXXXXXX">+40 XXX XXX XXX</a>
data-phone="+40XXXXXXXXX"
```

**IMPORTANT:** Also update phone in:
- Floating buttons (lines 337, 343)
- Contact form handler in `/assets/js/main.js` (line ~302)

### 4. Change Calculator Prices

Open `/assets/js/main.js`, find `initCalculator()` function (line ~45):

```javascript
// Base prices in RON/year (line ~65)
switch(tip) {
  case 'bloc': basePrice = 3990; break;      // Change here
  case 'casa': basePrice = 2990; break;      // And here
  case 'hala': basePrice = 5490; break;      // And here
  case 'birouri': basePrice = 4490; break;   // And here
}

// Instrumentation cost (line ~74)
if (instrumentare) {
  total += 1500;  // Change this value
}
```

### 5. Change Logo

1. Replace `/assets/img/logo.jpg` with your logo
2. Recommended size: 400x400px (for retina)
3. Format: JPG or PNG, max 50KB

```bash
# Optimize new logo with ImageMagick
convert your-logo.png -resize 400x400 -quality 80 assets/img/logo.jpg
```

### 6. Add/Modify Sections

Copy section template from `index.html`:

```html
<section id="your-section" class="section container">
  <h2>Section Title</h2>

  <div class="grid grid-3">
    <div class="card">
      <h3>Card 1</h3>
      <p>Text...</p>
    </div>
    <!-- Add more cards -->
  </div>
</section>
```

Don't forget to add navigation link (line ~53):
```html
<a href="#your-section">Name</a>
```

### 7. Configure Floating Buttons

In `index.html`, find floating buttons section (line ~336):

```html
<!-- Phone -->
<a href="tel:+40XXXXXXXXX" class="fab">...</a>

<!-- WhatsApp -->
<button class="fab fab-whatsapp" data-whatsapp data-phone="+40XXXXXXXXX">...</button>
```

To change WhatsApp message text, open `/assets/js/main.js` (line ~129):

```javascript
const message = encodeURIComponent('Your message text');
```

## 🖼️ Adding Images

For better visuals, add images to sections:

1. **Place images** in `/assets/img/`
2. **Optimize** (recommended size: 800px width, <100KB)
3. **Add to HTML** with lazy loading:

```html
<div class="card">
  <img src="/assets/img/your-image.jpg"
       alt="Description"
       class="card-img"
       loading="lazy">
  <h3>Title</h3>
  <p>Text...</p>
</div>
```

### Royalty-free Image Sources:

- [Unsplash](https://unsplash.com/) – architecture, construction, engineering
- [Pexels](https://pexels.com/) – building inspection, blueprints
- [Pixabay](https://pixabay.com/) – infrastructure, industrial

Search queries: `architecture`, `building inspection`, `construction site`, `blueprint`, `engineering`, `infrastructure monitoring`

## 🎯 SEO & Metadata

### Update Meta Tags

In `index.html` (lines 4-27):

```html
<title>Your Title | Keyword</title>
<meta name="description" content="Your description up to 160 characters">
<meta property="og:title" content="Title for social media">
<meta property="og:image" content="https://your-domain.ro/assets/img/og-image.jpg">
```

### Create New OG Image

Recommended size: 1200x630px, max 300KB

```bash
# Create from logo
convert assets/img/logo.jpg -resize 1200x630 -background "#F9F4EC" -gravity center -extent 1200x630 assets/img/og-image.jpg
```

## 📊 Performance Checklist

- [x] CSS variables for easy customization
- [x] Optimized logo (38KB)
- [x] Lazy loading for images
- [x] Semantic HTML5
- [x] Mobile-first responsive design
- [x] Minimal dependencies (vanilla JS)
- [x] Floating buttons (tel + WhatsApp)
- [x] Calculator in RON/year
- [x] Contact form (mailto)

### Testing

1. **Google PageSpeed Insights:** https://pagespeed.web.dev/
2. **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
3. **Lighthouse:** In Chrome DevTools (F12 → Lighthouse)

**Target:** Score 90+ on all metrics

## 🔧 CSS Classes Reference

### Layout
- `.container` – max-width container with padding
- `.section` – section with vertical spacing
- `.grid` + `.grid-2` / `.grid-3` – responsive grid

### Components
- `.card` – card with hover effect
- `.btn` + `.btn-primary` / `.btn-secondary` – buttons
- `.badge` – badge (e.g., "P130-2025")
- `.alert` – red alert
- `.notice` – yellow notice

### Forms
- `.calc-wrapper` – calculator wrapper
- `.calc-form` – calculator form
- `.calc-result` – calculation result
- `.contact-form` – contact form
- `.form-grid` – form fields grid
- `.form-group` – field + label group

### Utilities
- `.mt-sm` / `.mt-md` / `.mt-lg` – margin-top
- `.mb-sm` / `.mb-md` / `.mb-lg` – margin-bottom
- `.text-center` – center alignment

## 🐛 Troubleshooting

### Calculator Not Working
- Check that `/assets/js/main.js` is loaded
- Open Console (F12) and check for errors
- Ensure element IDs match: `calc-form`, `calc-output`

### Styles Not Applied
- Check path to `/assets/css/style.css`
- Clear browser cache (Ctrl+Shift+R)
- Ensure style.css file exists

### Floating Buttons Not Showing
- Check z-index in CSS (should be 1000)
- Ensure `.floating-buttons` class exists in HTML
- Verify JavaScript is initialized

### Form Not Submitting
- Check email in `/assets/js/main.js` (line 302) is correct
- User must have configured email client
- Alternative: integrate FormSubmit.co or similar service

## 📝 License & Credits

- **Design & Code:** Custom build, production-ready
- **Logo:** Provided by client (Urmărire în Timp Construcții)
- **Icons:** Embedded SVG (phone, WhatsApp)
- **Fonts:** System fonts stack (no external dependencies)

## 💡 Optional Enhancements

### 1. Add Google Analytics

In `index.html` before `</head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Integrate Form with Service

Replace mailto with:
- [FormSubmit.co](https://formsubmit.co/) – free, no backend
- [Formspree](https://formspree.io/) – also good
- [Web3Forms](https://web3forms.com/) – no registration

### 3. Add PWA

Create `manifest.json` and service worker for offline mode.

### 4. Minify Resources

```bash
# CSS
npx csso assets/css/style.css -o assets/css/style.min.css

# JS
npx terser assets/js/main.js -o assets/js/main.min.js -c -m
```

## 📞 Support

For customization questions or bugs – submit an Issue or contact directly.

---

**Version:** 1.0
**Date:** October 2025
**Status:** Production Ready ✅
