/**
 * UCE Monitoring - Main JavaScript
 * Handles navigation, calculator, forms, and interactive elements
 */

(function() {
  'use strict';

  // ========================================
  // Smooth Navigation & Active Links
  // ========================================
  function initNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    // Intersection Observer for active link highlighting
    const observerOptions = {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`nav a[href="#${id}"]`);

        if (link) {
          if (entry.isIntersecting) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Logo click - scroll to top
    const logo = document.querySelector('.nav-brand');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navToggle && navLinksContainer) {
      navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
      });

      // Close mobile nav on link click
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navLinksContainer.classList.remove('active');
        });
      });
    }
  }

  // ========================================
  // Price Calculator (RON/year)
  // ========================================
  function initCalculator() {
    const form = document.getElementById('calc-form');
    const output = document.getElementById('calc-output');

    if (!form || !output) return;

    function calculate() {
      const tipSelect = form.querySelector('[name="tip"]');
      const supInput = form.querySelector('[name="sup"]');
      const instrCheckbox = form.querySelector('[name="instr"]');

      if (!tipSelect || !supInput || !instrCheckbox) return;

      const tip = tipSelect.value;
      const sup = parseFloat(supInput.value || '0');
      const instrumentare = instrCheckbox.checked;

      // Base prices in RON/year (2025 launch promo)
      let basePrice = 0;
      switch(tip) {
        case 'bloc': basePrice = 3990; break;
        case 'casa': basePrice = 2990; break;
        case 'hala': basePrice = 5490; break;
        case 'birouri': basePrice = 4490; break;
        default: basePrice = 3990;
      }

      // Surface adjustment: +15% per 100 sq meters
      const surfaceFactor = Math.ceil(sup / 100) * 0.15;
      let total = Math.round(basePrice * (1 + surfaceFactor));

      // Add instrumentation cost if checked
      if (instrumentare) {
        total += 1500; // Basic instrumentation (1 session)
      }

      // Format number with Romanian locale
      const formattedPrice = new Intl.NumberFormat('ro-RO').format(total);

      output.innerHTML = `
        <div class="calc-result">
          <strong>Estimare:</strong> ~${formattedPrice} lei/an + TVA
          <div style="font-size: 14px; font-weight: 400; margin-top: 8px; opacity: 0.8;">
            Include 1 vizită & raport scurt
          </div>
        </div>
      `;
    }

    // Calculate on input change
    form.addEventListener('input', calculate);

    // Initial calculation
    calculate();
  }

  // ========================================
  // Contact Form (mailto)
  // ========================================
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Add submitted class for validation styling
      form.classList.add('submitted');

      // Check validity
      if (!form.checkValidity()) {
        // Find first invalid field and focus it
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      const formData = new FormData(form);
      const nume = formData.get('nume') || '';
      const email = formData.get('email') || '';
      const telefon = formData.get('telefon') || '';
      const subiect = (formData.get('subiect') || 'Solicitare UCE') + ' – ' + nume;
      const mesaj = formData.get('mesaj') || '';

      // Build mailto URL
      const body = `Nume: ${nume}%0AEmail: ${email}%0ATelefon: ${telefon}%0A%0AMesaj:%0A${encodeURIComponent(mesaj)}`;
      const mailtoUrl = `mailto:ionescu.lupeanu.silviu@gmail.com?subject=${encodeURIComponent(subiect)}&body=${body}`;

      // Open mail client
      window.location.href = mailtoUrl;

      // Show status message
      if (status) {
        status.textContent = 'S-a deschis clientul de e-mail pentru trimitere. Dacă nu se deschide, scrie-ne direct la ionescu.lupeanu.silviu@gmail.com.';
        status.style.color = 'var(--emerald)';
      }
    });
  }

  // ========================================
  // Floating Action Buttons
  // ========================================
  function initFloatingButtons() {
    // WhatsApp button
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');

    whatsappButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const phone = (btn.getAttribute('data-phone') || '+40700000000').replace(/\D/g, '');
        const message = encodeURIComponent('Salut! Vreau ofertă pentru UCE (P130-2025).');
        const url = `https://wa.me/${phone}?text=${message}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    });
  }

  // ========================================
  // Lazy Load Images
  // ========================================
  function initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => img.classList.add('loaded'));
    }
  }

  // ========================================
  // Scroll to Top
  // ========================================
  function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');

    if (scrollBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          scrollBtn.style.display = 'flex';
        } else {
          scrollBtn.style.display = 'none';
        }
      });

      scrollBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // ========================================
  // Form Validation Enhancement
  // ========================================
  function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('input[required], textarea[required]');

      inputs.forEach(input => {
        // Remove submitted class when user starts typing in invalid field
        input.addEventListener('input', function() {
          if (form.classList.contains('submitted') && input.validity.valid) {
            // Check if all fields are valid
            const allValid = Array.from(inputs).every(inp => inp.validity.valid);
            if (allValid) {
              form.classList.remove('submitted');
            }
          }
        });

        // Show native validation message on blur
        input.addEventListener('blur', function() {
          if (form.classList.contains('submitted') && !input.validity.valid) {
            input.reportValidity();
          }
        });
      });
    });
  }

  // ========================================
  // Initialize Performance Monitoring
  // ========================================
  function logPerformance() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
          }
        }, 0);
      });
    }
  }

  // ========================================
  // Initialize All
  // ========================================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    initNavigation();
    initCalculator();
    initContactForm();
    initFloatingButtons();
    initLazyLoad();
    initScrollToTop();
    initFormValidation();

    // Performance monitoring (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      logPerformance();
    }
  }

  // Start initialization
  init();

})();
