// ============================================================
// HUD THEME — Dipesh Portfolio 2026
// Boot sequence, nav, spotlight, typewriter, counters,
// scroll reveal, achievements, contact, terminal, AI assistant
// ============================================================

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. BOOT SEQUENCE
  // ----------------------------------------------------------
  (function initBoot() {
    const boot = document.getElementById('boot');
    if (!boot) return;
    const log = document.getElementById('bootLog');
    const skip = document.getElementById('bootSkip');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = [
      '> INITIALIZING PORTFOLIO_OS...',
      '> LOADING MODULES [FRONTEND, BACKEND, AI_LAYER]...',
      '> ESTABLISHING SECURE CONNECTION...',
      '> WELCOME, GUEST. [OK]'
    ];
    function finish() {
      boot.classList.add('done');
      setTimeout(() => boot.remove(), 600);
    }
    if (reduced) { finish(); return; }
    let li = 0, ci = 0;
    function typeLine() {
      if (li >= lines.length) {
        boot.classList.add('filling');
        setTimeout(finish, 1600);
        return;
      }
      const full = lines[li];
      if (ci <= full.length) {
        log.textContent = lines.slice(0, li).join('\n') + (li > 0 ? '\n' : '') + full.slice(0, ci);
        ci++;
        setTimeout(typeLine, 14);
      } else {
        log.textContent += '  \u2713';
        li++; ci = 0;
        setTimeout(typeLine, 160);
      }
    }
    typeLine();
    skip.addEventListener('click', finish);
  })();

  // ----------------------------------------------------------
  // 2. NAV: clock, mobile toggle, active link
  // ----------------------------------------------------------
  (function initNav() {
    const clock = document.getElementById('navClock');
    if (clock) {
      function tick() {
        const d = new Date();
        clock.textContent = d.toLocaleTimeString('en-IN', {
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
      }
      tick(); setInterval(tick, 1000);
    }

    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        links.classList.toggle('open');
      });
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      }));
    }

    const navAnchors = document.querySelectorAll('.nav-link');
    const sections = [...navAnchors].map(a => document.querySelector(a.getAttribute('href')));
    if ('IntersectionObserver' in window && sections.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = '#' + e.target.id;
            navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(s => s && io.observe(s));
    }
  })();

  // ----------------------------------------------------------
  // 3. SPOTLIGHT (mouse-follow glow in hero)
  // ----------------------------------------------------------
  (function initSpotlight() {
    const hero = document.querySelector('.hero');
    const spot = document.getElementById('spotlight');
    if (!hero || !spot) return;
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      spot.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      spot.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  })();

  // ----------------------------------------------------------
  // 4. ROLE TYPEWRITER
  // ----------------------------------------------------------
  (function initTypewriter() {
    const el = document.getElementById('roleText');
    if (!el) return;
    const roles = ['AI ENGINEER', 'FULL STACK DEVELOPER', 'CYBER SECURITY ENTHUSIAST'];
    let r = 0, c = 0, deleting = false;
    function step() {
      const word = roles[r];
      el.textContent = deleting ? word.slice(0, c--) : word.slice(0, c++);
      let delay = deleting ? 35 : 70;
      if (!deleting && c === word.length + 1) { deleting = true; delay = 1400; }
      else if (deleting && c < 0) { deleting = false; r = (r + 1) % roles.length; c = 0; delay = 300; }
      setTimeout(step, delay);
    }
    step();
  })();

  // ----------------------------------------------------------
  // 5. COUNTERS
  // ----------------------------------------------------------
  (function initCounters() {
    const nodes = document.querySelectorAll('[data-count]');
    if (!nodes.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let cur = 0;
        const step = Math.max(1, Math.round(target / 40));
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = cur + suffix;
        }, 30);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    nodes.forEach(n => io.observe(n));
  })();

  // ----------------------------------------------------------
  // 6. SCROLL REVEAL
  // ----------------------------------------------------------
  (function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-stagger, .module-card, .bars-wrap');
    if (!targets.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.18 });
    targets.forEach(t => io.observe(t));
  })();

  // ----------------------------------------------------------
  // 7. ACHIEVEMENTS: skill bars, badges, certificate gallery
  // ----------------------------------------------------------
  (function initAchievements() {
    const barsList = document.getElementById('barsList');
    if (barsList) {
      const skills = [
        { label: 'HTML5', pct: 95 },
        { label: 'CSS3', pct: 90 },
        { label: 'JavaScript', pct: 85 },
        { label: 'Git & GitHub', pct: 80 },
        { label: 'Responsive Design', pct: 88 },
        { label: 'API Integration', pct: 75 },
        { label: 'UI/UX Design', pct: 70 },
        { label: 'AI Tools', pct: 65 }
      ];
      barsList.innerHTML = skills.map(s => `
        <div class="bar-row">
          <div class="bar-row-top"><b>${s.label}</b><span>${s.pct}%</span></div>
          <div class="bar-track" style="--pct:${s.pct}%"><span></span></div>
        </div>`).join('');
    }

    const certGrid = document.getElementById('certGrid');
    if (!certGrid) return;

    // LOCAL asset paths (no external dependency)
    const base = 'assets/certificates/';
    const certs = [
      { img: base + 'full-stack-certificate.jpg', view: base + 'full-stack-certificate.pdf', title: 'Full Stack Development Certificate', issuer: 'Full Stack Development', date: 'June 2026', sort: '2026-06', category: 'Professional Development' },
      { img: base + 'prompt-engineering.jpeg', view: base + 'prompt-engineering.jpeg', title: 'Prompt Engineering Certification', issuer: 'LaunchEd Global', date: 'March 2026', sort: '2026-03', category: 'AI' },
      { img: base + 'product-management.jpeg', view: base + 'product-management.jpeg', title: 'Product Management Certification', issuer: 'LaunchEd Global', date: 'March 2026', sort: '2026-03', category: 'Product Management' },
      { img: base + 'ai-for-all.jpeg', view: base + 'ai-for-all.jpeg', title: 'AI for All', issuer: 'Intel / Skill India', date: 'June 2025', sort: '2025-06', category: 'AI' },
      { img: base + 'ai-tools-workshop.jpeg', view: base + 'ai-tools-workshop.jpeg', title: 'AI Tools Workshop', issuer: 'ULSA', date: 'August 2025', sort: '2025-08', category: 'Workshop & Events' },
      { img: base + 'foundational-skills.jpeg', view: base + 'foundational-skills.jpeg', title: 'Foundational Skills Program – Retail', issuer: 'Intel / Skill India', date: 'June 2025', sort: '2025-06', category: 'Professional Development' },
      { img: base + 'deloitte-technology-job-simulation.jpg', view: base + 'deloitte-technology-job-simulation.pdf', title: 'Deloitte Australia – Technology Job Simulation', issuer: 'Deloitte / Forage', date: 'June 2026', sort: '2026-06', category: 'Professional Development' },
      { img: base + 'ey-techathon-6.0.jpg', view: base + 'ey-techathon-6.0.pdf', title: 'EY Techathon 6.0 – Round 1 Participation', issuer: 'EY', date: 'June 2026', sort: '2026-06', category: 'Workshop & Events' }
    ];

    const badgeWrap = document.getElementById('statBadges');
    if (badgeWrap) {
      const aiCount = certs.filter(c => c.category === 'AI').length;
      const pmCount = certs.filter(c => c.category === 'Product Management').length;
      const wCount = certs.filter(c => c.category === 'Workshop & Events').length;
      const badges = [
        { icon: '🏆', n: certs.length, label: 'TOTAL CERTIFICATIONS' },
        { icon: '🤖', n: aiCount, label: 'AI CERTIFICATIONS' },
        { icon: '📈', n: pmCount, label: 'PRODUCT & BUSINESS' },
        { icon: '💼', n: wCount, label: 'WORKSHOPS & EVENTS' }
      ];
      badgeWrap.innerHTML = badges.map(b => `
        <div class="panel stat-badge"><div class="icon">${b.icon}</div><b>${b.n}</b><span>${b.label}</span></div>`).join('');
    }

    const categories = ['All', ...Array.from(new Set(certs.map(c => c.category)))];
    const filterWrap = document.getElementById('certFilters');
    if (filterWrap) {
      filterWrap.innerHTML = categories.map((c, i) =>
        `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
    }

    let activeCat = 'All';
    let sortMode = 'newest';

    function render() {
      let list = certs.filter(c => activeCat === 'All' || c.category === activeCat);
      list.sort((a, b) => {
        if (sortMode === 'newest') return b.sort.localeCompare(a.sort);
        if (sortMode === 'oldest') return a.sort.localeCompare(b.sort);
        if (sortMode === 'az') return a.title.localeCompare(b.title);
        if (sortMode === 'za') return b.title.localeCompare(a.title);
        return 0;
      });
      if (!list.length) {
        certGrid.innerHTML = '<div class="cert-empty">No certifications found for this filter.</div>';
        return;
      }
      certGrid.innerHTML = list.map((c) => `
        <div class="panel hud cert-card" data-idx="${certs.indexOf(c)}">
          <div class="cert-img-wrap">
            <img src="${c.img}" alt="${c.title}" loading="lazy">
            <div class="cert-overlay">🔍 Click to Preview</div>
          </div>
          <div class="cert-body">
            <div class="cert-issuer-row"><span class="cert-issuer">${c.issuer}</span><span class="badge badge-verified">Verified</span></div>
            <div class="cert-title">${c.title}</div>
            <div class="cert-date">${c.date}</div>
          </div>
        </div>`).join('');
      certGrid.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => openLightbox(certs[+card.dataset.idx]));
      });
    }
    render();

    if (filterWrap) {
      filterWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        activeCat = btn.dataset.cat;
        filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
        render();
      });
    }
    const sortSelect = document.getElementById('certSort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        sortMode = e.target.value;
        render();
      });
    }

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    function openLightbox(c) {
      if (!lightbox) return;
      document.getElementById('lbImg').src = c.img;
      document.getElementById('lbImg').alt = c.title;
      document.getElementById('lbTitle').textContent = c.title;
      document.getElementById('lbIssuer').textContent = c.issuer + ' — ' + c.date;
      document.getElementById('lbView').href = c.view;
      document.getElementById('lbCred').href = c.view;
      lightbox.hidden = false;
    }
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target.closest('[data-close]')) lightbox.hidden = true;
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.hidden = true;
      });
    }
  })();

  // ----------------------------------------------------------
  // 8. CONTACT FORM (mailto fallback — works without backend)
  // ----------------------------------------------------------
  (function initContact() {
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cfName').value.trim();
      const email = document.getElementById('cfEmail').value.trim();
      const msg = document.getElementById('cfMsg').value.trim();
      if (!name || !email || !msg) return;
      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
      if (note) note.classList.add('show');
      window.location.href = `mailto:dipesh.girase12@gmail.com?subject=${subject}&body=${body}`;
      if (note) setTimeout(() => note.classList.remove('show'), 4000);
    });
  })();

  // ----------------------------------------------------------
  // 9. FOOTER TERMINAL TYPEWRITER
  // ----------------------------------------------------------
  (function initTerminal() {
    const out = document.getElementById('termOut');
    if (!out) return;
    const cmds = [
      'whoami  \u2192  Dipesh Girase — AI Engineer & Full-Stack Developer',
      'status  \u2192  Open to opportunities',
      'echo $NEXT_BUILD  \u2192  something new, coming soon'
    ];
    let i = 0, c = 0, del = false;
    function step() {
      const line = cmds[i];
      out.textContent = del ? line.slice(0, c--) : line.slice(0, c++);
      let delay = del ? 18 : 26;
      if (!del && c === line.length + 1) { del = true; delay = 2200; }
      else if (del && c < 0) { del = false; i = (i + 1) % cmds.length; c = 0; delay = 400; }
      setTimeout(step, delay);
    }
    step();
  })();

  // ----------------------------------------------------------
  // 10. AI ASSISTANT — securely connected to backend
  //     Calls /api/ask (Vercel serverless, key stays server-side).
  //     Falls back to local knowledge-base if API is unavailable,
  //     so the widget never breaks.
  // ----------------------------------------------------------
  (function initAIAssistant() {
    const fab = document.getElementById('fabToggle');
    const panel = document.getElementById('assistantPanel');
    const close = document.getElementById('fabClose');
    const bodyEl = document.getElementById('assistBody');
    const input = document.getElementById('assistInput');
    const send = document.getElementById('assistSend');
    if (!fab || !panel || !bodyEl || !input || !send) return;

    function toggle() { panel.classList.toggle('open'); }
    fab.addEventListener('click', toggle);
    close.addEventListener('click', toggle);

    // Local knowledge-base fallback (works offline / pre-deploy)
    function localReply(text) {
      const t = text.toLowerCase();
      if (t.includes('project')) return "Dipesh has shipped Weather Genius AI and Bio Generator (both live), plus NeuroCalc Pro (in dev). Scroll to the PROJECTS section for demos and code.";
      if (t.includes('skill') || t.includes('stack')) return "Core strengths: Frontend (React/Vue/TS), Backend (Node/Express/GraphQL), and a growing AI layer (prompt engineering, ML basics). Check the MODULES section.";
      if (t.includes('resume') || t.includes('cv')) return "You'll find both the resume and full CV in the RESUME section, with view and download options.";
      if (t.includes('contact') || t.includes('hire') || t.includes('email')) return "Best way in: the contact form above, email at dipesh.girase12@gmail.com, or WhatsApp directly.";
      return "I can point you to projects, skills, resume, or contact info. What would you like to know?";
    }

    function addMsg(text, who) {
      const div = document.createElement('div');
      div.className = 'msg ' + who;
      div.textContent = text;
      bodyEl.appendChild(div);
      bodyEl.scrollTop = bodyEl.scrollHeight;
      return div;
    }

    async function handleSend() {
      const val = input.value.trim();
      if (!val) return;
      addMsg(val, 'user');
      input.value = '';
      const pending = addMsg('\u2026', 'bot');
      try {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: val })
        });
        const data = await res.json();
        if (res.ok && data.answer) {
          pending.textContent = data.answer;
        } else {
          pending.textContent = localReply(val);
        }
      } catch (err) {
        // Backend not deployed yet (or offline) — fall back to local answers
        // so the widget still works. Once /api/ask.js is live with a real
        // ANTHROPIC_API_KEY, this fallback stops being needed.
        pending.textContent = localReply(val);
      }
      bodyEl.scrollTop = bodyEl.scrollHeight;
    }

    send.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
  })();

  // ----------------------------------------------------------
  // 11. BACK TO TOP
  // ----------------------------------------------------------
  (function initBackToTop() {
    const btn = document.getElementById('topBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 700);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  })();

})();
