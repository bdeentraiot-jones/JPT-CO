// ── NAVIGATION & PAGE ROUTING ──
const pageLinks = document.querySelectorAll('[data-page]');

function showPage(pageId) {
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  pageLinks.forEach(a => a.classList.toggle('active', a.dataset.page === pageId));
}

pageLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showPage(el.dataset.goto);
  });
});

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ── PARTICLES ──
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }, 25);
  });
}

// Trigger counters when home page visible
const homeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); homeObserver.disconnect(); } });
}, { threshold: 0.3 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) homeObserver.observe(statsEl);

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── GALLERY FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.4s ease both';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ── TAB NAVIGATION (Services) ──
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '✓ Message Sent! We\'ll be in touch soon.';
    btn.style.background = 'linear-gradient(135deg, #1AB5A3, #0d8a7c)';
    btn.style.color = 'white';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 4000);
  });
}

// ── MOBILE MENU ──
const hamburger = document.querySelector('.hamburger');
const mobileNavLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileNavLinks.style.display = mobileNavLinks.style.display === 'flex' ? 'none' : 'flex';
    mobileNavLinks.style.flexDirection = 'column';
    mobileNavLinks.style.position = 'absolute';
    mobileNavLinks.style.top = '75px';
    mobileNavLinks.style.left = '0';
    mobileNavLinks.style.right = '0';
    mobileNavLinks.style.background = 'rgba(10,22,40,0.98)';
    mobileNavLinks.style.padding = '20px';
    mobileNavLinks.style.gap = '4px';
  });
}

// ── ANIMATED TEXT ──
function typeWriter(el, text, speed = 60) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// Mark home as active by default
pageLinks.forEach(a => a.classList.toggle('active', a.dataset.page === 'home'));

const pageSections = Array.from(document.querySelectorAll('.page[id^="page-"]'));

function updateActiveNavOnScroll() {
  const nav = document.querySelector('nav');
  const navHeight = nav ? nav.offsetHeight : 75;
  const scrollMarker = window.scrollY + navHeight + 120;
  let currentPageId = 'home';

  pageSections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollMarker >= top && scrollMarker < bottom) {
      currentPageId = section.id.replace('page-', '');
    }
  });

  pageLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === currentPageId);
  });
}

window.addEventListener('scroll', updateActiveNavOnScroll);
window.addEventListener('resize', updateActiveNavOnScroll);
window.addEventListener('load', updateActiveNavOnScroll);
updateActiveNavOnScroll();

function applyBranchContentOverrides() {
  document.querySelectorAll('.stat-num').forEach(el => {
    if (el.dataset.count === '6') {
      el.dataset.count = '2';
      el.textContent = '2';
    }
  });

  const storyParagraphs = document.querySelectorAll('.story-text p');
  if (storyParagraphs[0]) {
    storyParagraphs[0].textContent = 'Founded in Chennai, JPT & Co began as a focused audit practice with a singular mission: to bring clarity, transparency and integrity to every financial statement we touched.';
  }

  document.querySelectorAll('.highlight-card').forEach(card => {
    const title = card.querySelector('.highlight-title');
    const desc = card.querySelector('.highlight-desc');
    if (title && title.textContent.includes('Multi-Branch')) {
      title.textContent = 'Two Branches';
      if (desc) desc.textContent = 'Serving clients from our Iyyappanthangal Main Branch and Kodambakkam Branch.';
    }
  });

  document.querySelectorAll('.timeline-item').forEach(item => {
    const year = item.querySelector('.timeline-year');
    const event = item.querySelector('.timeline-event');
    const desc = item.querySelector('.timeline-desc');
    if (!year || !event || !desc) return;

    if (year.textContent.trim() === '2005') {
      desc.textContent = 'Established in Chennai with a focus on statutory audit and tax consulting for local businesses.';
    }
    if (year.textContent.trim() === '2023') {
      year.textContent = '2026';
      event.textContent = 'Two Chennai Branches';
      desc.textContent = 'Successfully running two branches.';
    }
  });

  const branchHero = document.querySelector('#page-branches .page-hero p');
  if (branchHero) {
    branchHero.textContent = 'JPT & Co currently serves clients through two offices: Iyyappanthangal Main Branch and Kodambakkam Branch.';
  }

  const branchTitle = document.querySelector('#page-branches .page-hero .section-title');
  if (branchTitle) {
    branchTitle.innerHTML = 'Visit Our <span class="italic gold">Two Chennai Branches</span>';
  }

  const branchCards = document.querySelectorAll('#page-branches .branch-card');
  const branchData = [
    {
      type: 'Main Branch',
      typeClass: 'hq',
      name: 'JPT & CO - Auditors (Iyyappanthangal Main Branch)',
      location: 'Iyyappanthangal, Chennai',
      hours: 'Mon-Sat: 9:30 AM - 6:30 PM',
      cta: 'https://maps.google.com/?q=JPT+%26+CO+-+Auditors+Iyyappanthangal+Main+Branch'
    },
    {
      type: 'Branch Office',
      typeClass: 'branch',
      name: 'JPT & CO - Auditors (Kodambakkam Branch)',
      location: 'Kodambakkam, Chennai',
      hours: 'Mon-Sat: 9:30 AM - 6:30 PM',
      cta: 'https://maps.google.com/?q=JPT+%26+CO+-+Auditors+Kodambakkam+Branch'
    }
  ];

  branchCards.forEach((card, index) => {
    if (index > 1) {
      card.remove();
      return;
    }

    const data = branchData[index];
    const typeEl = card.querySelector('.branch-type');
    const nameEl = card.querySelector('.branch-name');
    const rows = card.querySelectorAll('.branch-info-row');
    const primaryBtn = card.querySelector('.branch-btn.primary');
    const secondaryBtn = card.querySelector('.branch-btn.secondary');

    if (typeEl) {
      typeEl.className = `branch-type ${data.typeClass}`;
      typeEl.textContent = data.type;
    }
    if (nameEl) nameEl.textContent = data.name;

    if (rows[0]) rows[0].querySelector('.branch-info-text').textContent = data.location;
    if (rows[1]) rows[1].querySelector('.branch-info-text').innerHTML = '<strong>+91 9940404063</strong>';
    if (rows[2]) rows[2].querySelector('.branch-info-text').textContent = data.hours;
    if (rows[3]) rows[3].querySelector('.branch-info-text').textContent = 'jptandco@gmail.com';
    if (rows[4]) rows[4].remove();

    if (primaryBtn) {
      primaryBtn.href = data.cta;
      primaryBtn.textContent = 'Get Directions';
    }
    if (secondaryBtn) {
      secondaryBtn.href = 'https://wa.me/919940404063';
      secondaryBtn.target = '_blank';
      secondaryBtn.textContent = 'WhatsApp';
    }
  });

  const galleryOfficeCaption = document.querySelector('.gallery-item[data-cat="office"] .gallery-caption');
  if (galleryOfficeCaption) {
    galleryOfficeCaption.innerHTML = 'Iyyappanthangal Main Branch <span>Main Office</span>';
  }

  const contactCards = document.querySelectorAll('#page-contact .contact-card');
  if (contactCards[0]) {
    contactCards[0].href = 'tel:+919940404063';
    const value = contactCards[0].querySelector('.contact-card-value');
    if (value) value.textContent = '+91 9940404063';
  }
  if (contactCards[1]) {
    contactCards[1].href = 'https://wa.me/919940404063';
    contactCards[1].target = '_blank';
    const value = contactCards[1].querySelector('.contact-card-value');
    if (value) value.textContent = '+91 9940404063';
  }
  if (contactCards[2]) {
    const value = contactCards[2].querySelector('.contact-card-value');
    if (value) value.textContent = 'Iyyappanthangal, Chennai';
  }
  if (contactCards[3]) {
    const value = contactCards[3].querySelector('.contact-card-value');
    if (value) value.textContent = 'Mon-Sat: 9:30 AM - 6:30 PM';
  }
  const emailCard = document.querySelector('#page-contact a[href^="mailto:"] .contact-card-value');
  if (emailCard) {
    emailCard.textContent = 'jptandco@gmail.com';
  }
  if (contactCards[2]) {
    const label = contactCards[2].querySelector('.contact-card-label');
    const value = contactCards[2].querySelector('.contact-card-value');
    if (label) label.textContent = 'Main Branch';
    if (value) value.textContent = 'Iyyappanthangal, Chennai';
  }

  const branchSelect = document.querySelector('#contactForm select:nth-of-type(2)');
  if (branchSelect) {
    branchSelect.innerHTML = `
      <option value="">-- Any Branch --</option>
      <option>Iyyappanthangal Main Branch</option>
      <option>Kodambakkam Branch</option>
    `;
  }

  document.querySelectorAll('iframe').forEach(frame => {
    if (frame.src.includes('Paraniputhur')) {
      frame.src = 'https://www.google.com/maps?q=Iyyappanthangal%20Chennai&output=embed';
    }
  });

  document.querySelectorAll('.footer-col a').forEach(link => {
    if (link.textContent.includes('Paraniputhur')) {
      link.textContent = 'Chennai: Iyyappanthangal and Kodambakkam';
    }
    if (link.href.startsWith('mailto:')) {
      link.href = 'mailto:jptandco@gmail.com';
      link.textContent = '✉️ jptandco@gmail.com';
    }
    if (link.href.startsWith('tel:')) {
      link.href = 'tel:+919940404063';
      link.textContent = '📞 +91 9940404063';
    }
  });

  document.querySelectorAll('.social-link').forEach(link => {
    if (link.title === 'WhatsApp') {
      link.href = 'https://wa.me/919940404063';
      link.target = '_blank';
    }
    if (link.title === 'Email') {
      link.href = 'mailto:jptandco@gmail.com';
    }
  });

  const footerLines = document.querySelectorAll('.footer-bottom p');
  if (footerLines[0]) {
    footerLines[0].innerHTML = '© 2026 <span>JPT & Co</span> — Auditors & Financial Consultants, Chennai.';
  }
  if (footerLines[1]) {
    footerLines[1].innerHTML = 'Crafted with love for <span>JPT & Co</span>';
  }
}

applyBranchContentOverrides();

function applyLocalGalleryPhotos() {
  const filterWrap = document.querySelector('#page-gallery .gallery-filter');
  const grid = document.querySelector('#page-gallery .gallery-grid');
  const photosConnect = document.querySelector('#page-gallery .photos-connect');
  if (!filterWrap || !grid) return;

  const photos = [
    { src: 'Photos/IMG-20220630-WA0010.jpg', alt: 'JPT branch photo 1', cat: 'branch', height: 280, title: 'JPT & CO', sub: 'Branch Photo' },
    { src: 'Photos/IMG-20220630-WA0013.jpg', alt: 'JPT office photo 2', cat: 'office', height: 200, title: 'Office View', sub: 'JPT & CO' },
    { src: 'Photos/IMG-20221216-WA0000.jpg', alt: 'JPT team photo 3', cat: 'team', height: 320, title: 'Team Moment', sub: 'JPT & CO' },
    { src: 'Photos/IMG-20250117-WA0002.jpg', alt: 'JPT branch photo 4', cat: 'branch', height: 240, title: 'Branch Activity', sub: 'JPT & CO' },
    { src: 'Photos/IMG_20220630_174603406_BURST000_COVER_COMP.jpg', alt: 'JPT office photo 5', cat: 'office', height: 220, title: 'Office Space', sub: 'JPT & CO' },
    { src: 'Photos/IMG_20250117_184922273_HDR_AE.jpg', alt: 'JPT branch photo 6', cat: 'branch', height: 260, title: 'Branch Front', sub: 'JPT & CO' },
    { src: 'Photos/IMG_20250117_204620842_HDR_AE.jpg', alt: 'JPT office photo 7', cat: 'office', height: 200, title: 'Workspace Detail', sub: 'JPT & CO' }
  ];

  filterWrap.innerHTML = `
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="branch">Branches</button>
    <button class="filter-btn" data-filter="office">Office</button>
    <button class="filter-btn" data-filter="team">Team</button>
  `;

  grid.innerHTML = photos.map(photo => `
    <div class="gallery-item reveal" data-cat="${photo.cat}">
      <img class="gallery-img" src="${photo.src}" alt="${photo.alt}" style="height:${photo.height}px;object-fit:cover;width:100%;" />
      <div class="gallery-overlay">
        <div class="gallery-caption">${photo.title} <span>${photo.sub}</span></div>
      </div>
    </div>
  `).join('');

  if (photosConnect) {
    photosConnect.remove();
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

applyLocalGalleryPhotos();
