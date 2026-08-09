// ==========================================
// 2026 REDESIGN - BENTO GRID & INTERACTIONS
// Added on top of existing script.js.
// Safe: every enhancement degrades gracefully.
// ==========================================

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 0. ACTIVATE BENTO HERO (one-line revert: remove this line)
  // ----------------------------------------------------------
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.classList.add('bento-active');
  }

  // Defensive: if the inline head script didn't run, still gate reveals.
  if (!document.documentElement.classList.contains('js-enabled')) {
    document.documentElement.classList.add('js-enabled');
  }

  // ----------------------------------------------------------
  // 1. SCROLL-TRIGGERED REVEAL ANIMATIONS
  //    Gated behind .js-enabled. Safety timeout force-reveals
  //    everything so content is never permanently hidden.
  // ----------------------------------------------------------
  (function initScrollReveals() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('revealed'));
      return;
    }

    try {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => revealObserver.observe(el));

      // Safety net: force-reveal anything still hidden after 4s
      // (protects against observer edge cases, e.g. inside display:none)
      setTimeout(() => {
        revealElements.forEach(el => el.classList.add('revealed'));
      }, 4000);
    } catch (e) {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  })();

  // ----------------------------------------------------------
  // 2. BENTO HERO BUTTONS
  // ----------------------------------------------------------
  (function initHeroButtons() {
    const viewWorkBtn = document.getElementById('bentoViewWork');
    const contactBtn = document.getElementById('bentoContact');

    if (viewWorkBtn) {
      viewWorkBtn.addEventListener('click', () => {
        const projects = document.getElementById('projects');
        if (projects) projects.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (contactBtn) {
      contactBtn.addEventListener('click', () => {
        const contact = document.getElementById('contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
      });
    }
  })();

  // ----------------------------------------------------------
  // 3. CHAT QUICK-QUESTION CHIPS (Recruiter Mode)
  // ----------------------------------------------------------
  (function initChatChips() {
    const chips = document.querySelectorAll('.chat-quick-chip');
    const chatInput = document.getElementById('chatInput');
    const chatToggle = document.getElementById('chatToggle');
    const chatPopup = document.getElementById('chatPopup');
    const sendBtn = document.getElementById('chatSend');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        // Open chat if closed
        if (chatPopup && chatToggle && !chatPopup.classList.contains('active')) {
          chatToggle.click();
        }

        // Fill input and trigger the existing sendMessage
        if (chatInput && sendBtn) {
          chatInput.value = chip.textContent.trim();
          sendBtn.click();
          chatInput.focus();
        }
      });
    });
  })();

  // ----------------------------------------------------------
  // 4. CHAT TYPING INDICATOR
  //    The existing script.js appends the user message, then a
  //    bot message ~400ms later via setTimeout. We watch the
  //    message list and show/remove a typing bubble accordingly.
  // ----------------------------------------------------------
  (function initTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    function showTyping() {
      const typingEl = document.createElement('div');
      typingEl.className = 'message bot typing-message';
      typingEl.innerHTML = '<span class="chat-typing-indicator"><span></span><span></span><span></span></span>';
      chatMessages.appendChild(typingEl);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return typingEl;
    }

    let activeTyping = null;

    const observer = new MutationObserver(() => {
      // If a real bot message was appended after the typing bubble,
      // remove the typing indicator.
      if (activeTyping && activeTyping.parentNode) {
        const botMsgs = chatMessages.querySelectorAll('.message.bot:not(.typing-message)');
        if (botMsgs.length > 0) {
          const lastBot = botMsgs[botMsgs.length - 1];
          const typingIndex = Array.prototype.indexOf.call(chatMessages.children, activeTyping);
          const botIndex = Array.prototype.indexOf.call(chatMessages.children, lastBot);
          if (botIndex > typingIndex) {
            activeTyping.remove();
            activeTyping = null;
          }
        }
      }

      // Detect a new user message -> show typing indicator
      const lastUser = chatMessages.querySelector('.message.user:last-child');
      if (lastUser && !activeTyping && !lastUser.dataset.typingHandled) {
        lastUser.dataset.typingHandled = '1';
        activeTyping = showTyping();
      }
    });

    observer.observe(chatMessages, { childList: true, subtree: false });

    // Safety cleanup so a typing bubble never gets stuck
    setInterval(() => {
      if (activeTyping && activeTyping.parentNode) {
        const prev = activeTyping.previousElementSibling;
        if (prev && prev.classList.contains('user')) {
          activeTyping.remove();
          activeTyping = null;
        }
      }
    }, 5000);
  })();

  // ----------------------------------------------------------
  // 5. LIVE GITHUB STATS (graceful fallback to placeholders)
  // ----------------------------------------------------------
  (function initGitHubStats() {
    const els = {
      repos: document.getElementById('ghRepos'),
      stars: document.getElementById('ghStars'),
      followers: document.getElementById('ghFollowers'),
      following: document.getElementById('ghFollowing')
    };

    const hasAny = els.repos || els.stars || els.followers || els.following;
    if (!hasAny) return;

    const username = 'dipeshgirase12-ai';
    const setText = (el, value) => { if (el) el.textContent = value; };

    fetch('https://api.github.com/users/' + username)
      .then(res => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then(user => {
        setText(els.repos, user.public_repos != null ? user.public_repos : '-');
        setText(els.followers, user.followers != null ? user.followers : '-');
        setText(els.following, user.following != null ? user.following : '-');
      })
      .catch(() => {
        // Silent fallback - keep placeholders
        setText(els.repos, '-');
        setText(els.followers, '-');
        setText(els.following, '-');
      });

    // Total stars requires summing stargazers across repos
    fetch('https://api.github.com/users/' + username + '/repos?per_page=100&sort=updated')
      .then(res => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then(repos => {
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0;
        setText(els.stars, totalStars);
      })
      .catch(() => {
        setText(els.stars, '-');
      });
  })();

  // ----------------------------------------------------------
  // 6. BENTO HERO PARALLAX (lightweight)
  //    Uses translate3d so it doesn't fight the reveal transform.
  // ----------------------------------------------------------
  (function initBentoParallax() {
    const bentoHero = document.querySelector('.bento-hero');
    const heroMain = bentoHero ? bentoHero.querySelector('.bento-hero-main') : null;
    if (!bentoHero || !heroMain) return;

    // Wait for reveal to finish before enabling parallax
    setTimeout(() => {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight * 0.8) {
              heroMain.style.transform = 'translate3d(0, ' + (scrolled * 0.06) + 'px, 0)';
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }, 800);
  })();

})();