// ==========================================
// MATRIX/TRON CYBER AESTHETIC - SCRIPT.JS
// ==========================================

// CUSTOM CURSOR
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let cursorVisible = true;

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  follower.style.opacity = '0';
  cursorVisible = false;
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  follower.style.opacity = '1';
  cursorVisible = true;
});

// Single unified mousemove handler
let mouseTargetX = 0, mouseTargetY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorVisible) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
  mouseTargetX = (e.clientX - window.innerWidth / 2) * 0.05;
  mouseTargetY = (e.clientY - window.innerHeight / 2) * 0.05;
});

// Smooth follower animation with visibility check
function animateFollower() {
  if (cursorVisible) {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, [role="button"], .clickable, input, textarea, select, label');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    follower.style.width = '50px';
    follower.style.height = '50px';
    follower.style.borderColor = 'var(--accent-pink)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    follower.style.width = '40px';
    follower.style.height = '40px';
    follower.style.borderColor = 'var(--accent-cyan)';
  });
});

// ==========================================
// HERO CANVAS - PARTICLE SPHERE
// ==========================================
const heroCanvas = document.getElementById('heroCanvas');
const heroCtx = heroCanvas.getContext('2d');

heroCanvas.width = window.innerWidth;
heroCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  heroCanvas.width = window.innerWidth;
  heroCanvas.height = window.innerHeight;
});

// Particle Sphere
const particles = [];
const particleCount = 150;
let hue = 0;
let rotationX = 0;
let rotationY = 0;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = 150 + Math.random() * 100;

    this.x = radius * Math.sin(phi) * Math.cos(theta);
    this.y = radius * Math.sin(phi) * Math.sin(theta);
    this.z = radius * Math.cos(phi);
    this.radius = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.speedZ = (Math.random() - 0.5) * 0.5;
    this.hue = Math.random() * 60; // cyan to green range
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.z += this.speedZ;

    const maxDist = 200;
    const dist = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    if (dist > maxDist) {
      this.speedX *= -1;
      this.speedY *= -1;
      this.speedZ *= -1;
    }
  }

  draw(ctx, centerX, centerY) {
    const scale = 600 / (600 + this.z);
    const x2D = this.x * scale + centerX;
    const y2D = this.y * scale + centerY;
    const size = this.radius * scale;

    ctx.beginPath();
    ctx.arc(x2D, y2D, size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${170 + this.hue}, 100%, 60%, ${scale})`;
    ctx.fill();

    // Glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = `hsla(${170 + this.hue}, 100%, 60%, ${scale})`;
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateHero() {
  heroCtx.fillStyle = 'rgba(5, 5, 16, 0.3)';
  heroCtx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);

  const centerX = heroCanvas.width / 2;
  const centerY = heroCanvas.height / 2;

  // Smooth mouse rotation
  rotationX += (mouseTargetY - rotationX) * 0.05;
  rotationY += (mouseTargetX - rotationY) * 0.05;

  particles.forEach(p => {
    p.update();
    p.draw(heroCtx, centerX, centerY);
  });

  requestAnimationFrame(animateHero);
}
animateHero();

// ==========================================
// HERO BUTTONS SCROLL
// ==========================================
document.querySelector(".cyber-btn.primary").onclick = () => {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
};

document.querySelector(".cyber-btn.secondary").onclick = () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
};

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-value');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    updateCounter();
  });
}

// ==========================================
// SKILL BARS ANIMATION
// ==========================================
function animateSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const progress = fill.getAttribute('data-progress');
    fill.style.width = progress + '%';
  });
}

function animateSystemBars() {
  const systemFills = document.querySelectorAll('.system-fill');
  systemFills.forEach(fill => {
    const progress = fill.getAttribute('data-progress');
    fill.style.width = progress + '%';
  });
}

// ==========================================
// PROJECT CANVAS ANIMATIONS
// ==========================================
const projectCanvases = document.querySelectorAll('.project-canvas');

projectCanvases.forEach(canvas => {
  const ctx = canvas.getContext('2d');
  const effect = canvas.getAttribute('data-effect');

  canvas.width = 400;
  canvas.height = 180;

  if (effect === 'neural') {
    animateNeural(ctx, canvas.width, canvas.height);
  } else if (effect === 'bars') {
    animateBars(ctx, canvas.width, canvas.height);
  } else if (effect === 'hex') {
    animateHex(ctx, canvas.width, canvas.height);
  }
});

function animateNeural(ctx, w, h) {
  const nodes = [];
  const nodeCount = 12;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 10, 20, 0.15)';
    ctx.fillRect(0, 0, w, h);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 245, 255, ${1 - dist / 100})`;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > w) node.vx *= -1;
      if (node.y < 0 || node.y > h) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00f5ff';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

function animateBars(ctx, w, h) {
  const bars = [];
  const barCount = 12;

  for (let i = 0; i < barCount; i++) {
    bars.push({
      height: Math.random() * 100 + 20,
      targetHeight: Math.random() * 100 + 20,
      x: (i / barCount) * w + 15
    });
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 10, 20, 0.15)';
    ctx.fillRect(0, 0, w, h);

    bars.forEach((bar, i) => {
      // Smooth height transition
      bar.height += (bar.targetHeight - bar.height) * 0.05;

      // Randomly change target
      if (Math.random() < 0.02) {
        bar.targetHeight = Math.random() * 100 + 20;
      }

      const barWidth = (w / barCount) - 10;
      const y = h - bar.height;

      // Glow gradient
      const gradient = ctx.createLinearGradient(0, y, 0, h);
      gradient.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 245, 255, 0.3)');

      ctx.fillStyle = gradient;
      ctx.fillRect(bar.x, y, barWidth, bar.height);

      // Top glow
      ctx.beginPath();
      ctx.arc(bar.x + barWidth / 2, y, barWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 0, 255, 0.6)';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

function animateHex(ctx, w, h) {
  const hexSize = 20;
  const hexes = [];

  const cols = Math.ceil(w / (hexSize * 1.5)) + 1;
  const rows = Math.ceil(h / (hexSize * 1.732)) + 1;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * hexSize * 1.5;
      const y = row * hexSize * 1.732 + (col % 2 ? hexSize * 0.866 : 0);
      hexes.push({ x, y, glow: Math.random() });
    }
  }

  function drawHex(x, y, size, alpha) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
    ctx.strokeStyle = `rgba(0, 255, 136, ${alpha + 0.3})`;
    ctx.stroke();
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 10, 20, 0.15)';
    ctx.fillRect(0, 0, w, h);

    hexes.forEach(hex => {
      hex.glow += (Math.random() - 0.5) * 0.1;
      hex.glow = Math.max(0, Math.min(1, hex.glow));

      drawHex(hex.x, hex.y, hexSize * 0.8, hex.glow * 0.5);
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('skill-card')) {
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          const progress = fill.getAttribute('data-progress');
          fill.style.width = progress + '%';
        }
      }
      if (entry.target.classList.contains('system-card')) {
        const fill = entry.target.querySelector('.system-fill');
        if (fill) {
          const progress = fill.getAttribute('data-progress');
          fill.style.width = progress + '%';
        }
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
document.querySelectorAll('.system-card').forEach(card => observer.observe(card));

// ==========================================
// TERMINAL
// ==========================================
const input = document.getElementById('commandInput');
const output = document.getElementById('output');

function print(text) {
  output.innerHTML += `<div>${text}</div>`;
  output.scrollTop = output.scrollHeight;
}

print("<span style='color: #ff00ff'>╔══════════════════════════════════════════╗</span>");
print("<span style='color: #ff00ff'>║</span>  DEV DIPESH TERMINAL v2.0           <span style='color: #ff00ff'>║</span>");
print("<span style='color: #ff00ff'>╚══════════════════════════════════════════╝</span>");
print("<span style='color: #00ff88'>System initialized...</span>");
print("<span style='color: #00ff88'>Type 'help' to see available commands.</span>");
print("");

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const cmd = input.value.trim().toLowerCase();
    print(`<span style='color: #00f5ff'>dev@portfolio:~$</span> ${cmd}`);
    handleCommand(cmd);
    input.value = '';
  }
});

function handleCommand(cmd) {
  switch (cmd) {
    case 'help':
      print("<span style='color: #ff6b00'>Commands:</span> about, skills, projects, contact, whoami, clear");
      print("<span style='color: #ff6b00'>Extras:</span> neofetch, matrix");
      break;
    case 'about':
      print("<span style='color: #00ff88'>CSE Student building scalable web systems & AI-powered apps.</span>");
      print("<span style='color: #00ff88'>Location: India | Status: Open to Opportunities</span>");
      break;
    case 'skills':
      print("<span style='color: #00ff88'>[FRONTEND]</span> HTML, CSS, JavaScript, React");
      print("<span style='color: #00ff88'>[BACKEND]</span> Node.js, APIs, Firebase");
      print("<span style='color: #00ff88'>[AI]</span> AI Basics, Prompt Engineering");
      break;
    case 'projects':
      print("<span style='color: #00ff88'>1. Weather Genius AI - Status: LIVE</span>");
      print("<span style='color: #00ff88'>2. Bio Generator - Status: LIVE</span>");
      print("<span style='color: #00ff88'>3. NeuroCalc Pro - Status: DEV</span>");
      break;
    case 'contact':
      print("<span style='color: #00f5ff'>Email:</span> dipesh.girase12@gmail.com");
      break;
    case 'whoami':
      print("<span style='color: #ff00ff'>dipesh@devdipesh</span>");
      print("<span style='color: #ff00ff'>uid=1000(dipesh) gid=1000(dipesh)</span>");
      print("<span style='color: #ff00ff'>groups=1000(dipesh),4(adm),27(sudo)</span>");
      break;
    case 'neofetch':
      print("<span style='color: #00f5ff'>       .:::</span>    <span style='color: #ff00ff'>dipesh@devdipesh</span>");
      print("<span style='color: #00f5ff'>     .:::::</span>    <span style='color: #00f5ff'>----------------</span>");
      print("<span style='color: #00f5ff'>   .:::::::</span>    <span style='color: #00ff88'>OS: PortfolioBSD</span>");
      print("<span style='color: #00f5ff'> .:::::::::</span>    <span style='color: #ff6b00'>Host: DevDipesh</span>");
      print("<span style='color: #00f5ff'>.::::::::::.</span>   <span style='color: #ff00ff'>Shell: zsh</span>");
      print("<span style='color: #00f5ff'> :::::::::::.</span>  <span style='color: #00f5ff'>Terminal: CyberTerm</span>");
      print(`<span style='color: #00f5ff'>  .::::::::::.</span>  <span style='color: #00ff88'>CPU: Brain@2.0GHz</span>`);
      print(`<span style='color: #00f5ff'>   .::::.::::.</span>  <span style='color: #ff6b00'>Memory: 100% CODE</span>`);
      print(`<span style='color: #00f5ff'>    .::::.:::</span>   <span style='color: #ff00ff'>Uptime: 24 years</span>`);
      print(`<span style='color: #00f5ff'>     .::::.:</span>    `);
      break;
    case 'matrix':
      print("<span style='color: #00ff88'>Wake up, Neo...</span>");
      print("<span style='color: #00ff88'>The Matrix has you...</span>");
      print("<span style='color: #00ff88'>Follow the white rabbit.</span>");
      print("<span style='color: #ff00ff'>      \\   |   /</span>");
      print("<span style='color: #ff00ff'>       .---.</span>");
      print("<span style='color: #ff00ff'>  -----|   |-----</span>");
      print("<span style='color: #ff00ff'>       '---'</span>");
      print("<span style='color: #00ff88'>   /   |   \\</span>");
      break;
    case 'clear':
      output.innerHTML = '';
      break;
    default:
      print(`<span style='color: #ff0040'>Command not found: ${cmd}</span>`);
      print(`<span style='color: #ff0040'>Type 'help' for available commands</span>`);
  }
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.glitch');

  parallaxElements.forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
});

// Initialize animations immediately (script is at end of body, DOM is ready)
animateCounters();
animateSkillBars();
animateSystemBars();
animateCertStats();

// ==========================================
// FLOATING AI CHATBOT
// ==========================================
const chatToggle = document.getElementById('chatToggle');
const chatPopup = document.getElementById('chatPopup');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Developer info for chatbot responses
const botInfo = {
  name: 'Dipesh Girase',
  role: 'Computer Science Engineering Student',
  skills: 'HTML, CSS, JavaScript, Node.js, AI basics, GitHub',
  interests: 'Full-stack development, AI, web apps',
  goal: 'Become a professional software engineer',
  projects: [
    { name: 'Weather Genius AI', status: 'Live' },
    { name: 'Bio Generator', status: 'Live' },
    { name: 'NeuroCalc Pro', status: 'Dev' }
  ],
  contact: 'dipesh.girase12@gmail.com'
};

// Bot responses
function getBotResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('skill') || msg.includes('tech') || msg.includes('know')) {
    return `Dipesh works with ${botInfo.skills}. He's particularly strong in frontend and is diving into AI.`;
  }

  if (msg.includes('project') || msg.includes('portfolio') || msg.includes('work')) {
    const projects = botInfo.projects.map(p => `${p.name} (${p.status})`). join(', ');
    return `His projects: ${projects}. The Weather AI and Portfolio are live!`;
  }

  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
    return `You can reach Dipesh at ${botInfo.contact}. He's open to opportunities!`;
  }

  if (msg.includes('about') || msg.includes('who') || msg.includes('him')) {
    return `${botInfo.name} is a ${botInfo.role}. He's passionate about ${botInfo.interests} and aims to ${botInfo.goal}.`;
  }

  if (msg.includes('experience') || msg.includes('year')) {
    return `He's still studying, but has hands-on experience building real projects like the Weather AI app.`;
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `Hey! I'm Dipesh's AI assistant. Ask me about his skills, projects, or how to contact him.`;
  }

  return `I don't have that info, but you can ask about his skills, projects, or contact details. I love helping!`;
}

// Toggle chat popup
chatToggle.addEventListener('click', () => {
  chatPopup.classList.toggle('active');
  if (chatPopup.classList.contains('active')) {
    chatInput.focus();
  }
});

chatClose.addEventListener('click', () => {
  chatPopup.classList.remove('active');
});

// Send message
function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = message;
  chatMessages.appendChild(userMsg);

  // Clear input
  chatInput.value = '';

  // Auto-scroll
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Bot response (with slight delay for realism)
  setTimeout(() => {
    const response = getBotResponse(message);
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    botMsg.textContent = response;
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 400);
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Initial greeting
setTimeout(() => {
  const greeting = document.createElement('div');
  greeting.className = 'message bot';
  greeting.textContent = "Hey! I'm here to help. Ask me about Dipesh's skills, projects, or contact info.";
  chatMessages.appendChild(greeting);
}, 1000);

// ==========================================
// PROFILE SIDEBAR
// ==========================================
const profileBtn = document.getElementById('profileBtn');
const profileSidebar = document.getElementById('profileSidebar');
const profileOverlay = document.getElementById('profileOverlay');
const sidebarClose = document.getElementById('sidebarClose');

function openProfileSidebar() {
  profileSidebar.classList.add('active');
  profileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProfileSidebar() {
  profileSidebar.classList.remove('active');
  profileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

profileBtn.addEventListener('click', openProfileSidebar);
sidebarClose.addEventListener('click', closeProfileSidebar);
profileOverlay.addEventListener('click', closeProfileSidebar);

// ==========================================
// ACHIEVEMENTS TABS
// ==========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');

    // Remove active from all
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // Add active to clicked
    btn.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');

    // Animate skill bars if skills tab
    if (tab === 'skills') {
      setTimeout(animateAchievementSkills, 100);
    }
  });
});

// Animate achievement skill bars
function animateAchievementSkills() {
  const fills = document.querySelectorAll('.skill-progress-fill');
  fills.forEach(fill => {
    const progress = fill.getAttribute('data-progress');
    fill.style.width = progress + '%';
  });
}

// Initial animation observer for achievements
const achievementObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-progress-fill');
      fills.forEach(fill => {
        const progress = fill.getAttribute('data-progress');
        fill.style.width = progress + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-item').forEach(item => achievementObserver.observe(item));

// ==========================================
// DOCUMENT MODAL
// ==========================================
const docModalOverlay = document.getElementById('docModalOverlay');
const docModalClose = document.getElementById('docModalClose');
const resumeModalBtn = document.getElementById('resumeModalBtn');

function openDocModal() {
  docModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDocModal() {
  docModalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

resumeModalBtn.addEventListener('click', openDocModal);
docModalClose.addEventListener('click', closeDocModal);

docModalOverlay.addEventListener('click', (e) => {
  if (e.target === docModalOverlay) {
    closeDocModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && docModalOverlay.classList.contains('active')) {
    closeDocModal();
  }
});

// ==========================================
// PREMIUM CERTIFICATION SHOWCASE
// ==========================================

// Certificate Data
const certificateData = {
  'product-management': {
    title: 'Product Management Certification',
    issuer: 'LaunchEd Global (in collaboration with Accelerey)',
    date: 'March 2026',
    category: 'Product Management',
    description: 'Successfully completed Product Management training covering product strategy, market research, customer-centric design, roadmap planning, and business decision-making.',
    skills: ['Product Management', 'Product Strategy', 'Market Research', 'Business Analysis'],
    image: 'assets/certificates/product-management.jpeg',
    credentialLink: '#'
  },
  'prompt-engineering': {
    title: 'Prompt Engineering Certification',
    issuer: 'LaunchEd Global (in collaboration with Accelerey)',
    date: 'March 2026',
    category: 'AI',
    description: 'Completed Prompt Engineering training focused on AI communication, Large Language Models, Generative AI workflows, and advanced prompt design techniques.',
    skills: ['Prompt Engineering', 'Artificial Intelligence', 'Generative AI', 'LLM Applications'],
    image: 'assets/certificates/prompt-engineering.jpeg',
    credentialLink: '#'
  },
  'foundational-retail': {
    title: 'Foundational Skills Program – Retail',
    issuer: 'Intel Technology India Private Limited / Skill India Digital Hub',
    date: 'June 2025',
    category: 'Professional Development',
    description: 'Completed foundational training covering workplace skills, communication, customer engagement, retail operations, and professional development.',
    skills: ['Communication Skills', 'Customer Service', 'Retail Operations', 'Workplace Readiness'],
    image: 'assets/certificates/foundational-skills.jpeg',
    credentialLink: '#'
  },
  'ai-for-all': {
    title: 'AI for All',
    issuer: 'Intel Technology India Private Limited / Skill India Digital Hub',
    date: 'June 2025',
    category: 'AI',
    description: 'Successfully completed AI for All, gaining foundational knowledge of Artificial Intelligence, machine learning concepts, AI applications, and ethical AI practices.',
    skills: ['Artificial Intelligence', 'Machine Learning Fundamentals', 'AI Ethics', 'AI Applications'],
    image: 'assets/certificates/ai-for-all.jpeg',
    credentialLink: '#'
  },
  'ai-tools-workshop': {
    title: 'AI Tools Workshop',
    issuer: 'United Latino Students Association',
    date: 'August 2025',
    category: 'Workshop',
    description: 'Participated in an AI Tools Workshop focused on practical AI applications, automation tools, productivity systems, and modern AI workflows.',
    skills: ['AI Tools', 'Automation', 'Productivity', 'Digital Workflows'],
    image: 'assets/certificates/ai-tools-workshop.jpeg',
    credentialLink: '#'
  },
  'deloitte-technology': {
    title: 'Deloitte Australia - Technology Job Simulation',
    issuer: 'Deloitte / Forage',
    date: 'June 2026',
    category: 'Professional Development',
    description: 'Completed Deloitte Australia Technology Job Simulation through Forage, gaining hands-on experience in technology consulting, client communication, and problem-solving in a professional services environment.',
    skills: ['Technology Consulting', 'Client Communication', 'Problem Solving', 'Professional Services'],
    image: 'assets/certificates/deloitte-technology-job-simulation.jpg',
    credentialLink: '#'
  },
  'ey-techathon-6.0': {
    title: 'Certificate of Participation in Round 1: Executive Summary Submission of EY Techathon 6.0',
    issuer: 'EY',
    date: 'June 2026',
    category: 'Workshop',
    description: 'Participated in Round 1 of EY Techathon 6.0, submitting an executive summary for a technology-driven business challenge, demonstrating innovation and strategic thinking.',
    skills: ['Innovation', 'Strategic Thinking', 'Business Analysis', 'Presentation'],
    image: 'assets/certificates/ey-techathon-6.0.jpg',
    credentialLink: '#'
  }
};

// Elements
const certModalOverlay = document.getElementById('certModalOverlay');
const certModalClose = document.getElementById('certModalClose');
const certModalImage = document.getElementById('certModalImage');
const certModalCategory = document.getElementById('certModalCategory');
const certModalTitle = document.getElementById('certModalTitle');
const certModalIssuer = document.getElementById('certModalIssuer');
const certModalDate = document.getElementById('certModalDate');
const certModalDescription = document.getElementById('certModalDescription');
const certModalSkills = document.getElementById('certModalSkills');
const certModalViewBtn = document.getElementById('certModalViewBtn');
const certModalCredentialBtn = document.getElementById('certModalCredentialBtn');

const certSearchInput = document.getElementById('certSearchInput');
const certSortSelect = document.getElementById('certSortSelect');
const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
const premiumCertCards = document.querySelectorAll('.premium-cert-card');
const certNoResults = document.getElementById('certNoResults');
// Animate certification stats counters
function animateCertStats() {
  const certStatsValues = document.querySelectorAll('.cert-stat-value');
  if (!certStatsValues || certStatsValues.length === 0) return;

  certStatsValues.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    if (target) {
      stat.textContent = target + '+';
    }
  });
}

// Certificate modal functions
function openCertModal(certId) {
  const cert = certificateData[certId];
  if (!cert) {
    console.error('Certificate not found:', certId);
    alert('Certificate not found. Please try again.');
    return;
  }

  // Re-query elements each time to ensure they exist
  const certModalOverlay = document.getElementById('certModalOverlay');
  const certModalImage = document.getElementById('certModalImage');
  const certModalCategory = document.getElementById('certModalCategory');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalIssuer = document.getElementById('certModalIssuer');
  const certModalDate = document.getElementById('certModalDate');
  const certModalDescription = document.getElementById('certModalDescription');
  const certModalSkills = document.getElementById('certModalSkills');
  const certModalViewBtn = document.getElementById('certModalViewBtn');
  const certModalCredentialBtn = document.getElementById('certModalCredentialBtn');

  if (!certModalOverlay) {
    console.error('certModalOverlay element not found');
    alert('Modal system error. Please refresh the page.');
    return;
  }

  certModalImage.src = cert.image;
  certModalImage.onerror = function() {
    this.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;align-items:center;justify-content:center"><text x="50%" y="45%" text-anchor="middle" fill="#00f5ff" font-family="monospace" font-size="14">Certificate Preview</text><text x="50%" y="55%" text-anchor="middle" fill="#888" font-family="monospace" font-size="10">Coming Soon</text></svg>');
  };
  certModalCategory.textContent = cert.category;
  certModalTitle.textContent = cert.title;
  certModalIssuer.textContent = cert.issuer;
  certModalDate.textContent = cert.date;
  certModalDescription.textContent = cert.description;

  certModalSkills.innerHTML = cert.skills.map(skill =>
    `<span class="premium-cert-skill-tag">${skill}</span>`
  ).join('');

  // Use a placeholder since actual certificate images may not exist
  const placeholderSvg = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background:linear-gradient(135deg,#1a1a2e,#16213e)"><text x="50%" y="45%" text-anchor="middle" fill="#00f5ff" font-family="monospace" font-size="16">' + cert.title.substring(0,20) + '</text><text x="50%" y="55%" text-anchor="middle" fill="#888" font-family="monospace" font-size="12">' + cert.issuer.substring(0,25) + '</text></svg>')}`;

  certModalViewBtn.onclick = () => window.open(cert.image || placeholderSvg, '_blank');
  certModalCredentialBtn.onclick = () => window.open(cert.credentialLink, '_blank');

  certModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Event listeners for view certificate buttons
document.querySelectorAll('.view-cert-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const certId = btn.getAttribute('data-cert');
    console.log('Button clicked, certId:', certId);
    console.log('certModalOverlay exists:', !!certModalOverlay);
    console.log('certificateData[certId]:', certificateData[certId]);
    if (certModalOverlay) {
      openCertModal(certId);
    }
  });
});

// Modal close events
if (certModalClose) {
  certModalClose.addEventListener('click', closeCertModal);
}
if (certModalOverlay) {
  certModalOverlay.addEventListener('click', (e) => {
    if (e.target === certModalOverlay) {
      closeCertModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModalOverlay.classList.contains('active')) {
    closeCertModal();
  }
});

// Search functionality
certSearchInput.addEventListener('input', filterCertifications);

function filterCertifications() {
  const searchTerm = certSearchInput.value.toLowerCase().trim();
  const activeFilter = document.querySelector('.cert-filter-btn.active').getAttribute('data-filter');
  const sortValue = certSortSelect.value;

  let visibleCards = [];

  premiumCertCards.forEach(card => {
    const title = card.querySelector('.premium-cert-title').textContent.toLowerCase();
    const issuer = card.querySelector('.premium-cert-issuer') ? card.querySelector('.premium-cert-issuer').textContent.toLowerCase() : '';
    const org = card.querySelector('.premium-cert-org') ? card.querySelector('.premium-cert-org').textContent.toLowerCase() : '';
    const category = card.getAttribute('data-category');

    const matchesSearch = searchTerm === '' ||
      title.includes(searchTerm) ||
      issuer.includes(searchTerm) ||
      org.includes(searchTerm);

    const matchesFilter = activeFilter === 'all' ||
      category === activeFilter ||
      (activeFilter === 'professional' && category === 'professional');

    if (matchesSearch && matchesFilter) {
      card.classList.remove('hidden');
      visibleCards.push(card);
    } else {
      card.classList.add('hidden');
    }
  });

  // Sort cards
  if (sortValue === 'newest') {
    visibleCards.sort((a, b) => b.getAttribute('data-date').localeCompare(a.getAttribute('data-date')));
  } else if (sortValue === 'oldest') {
    visibleCards.sort((a, b) => a.getAttribute('data-date').localeCompare(b.getAttribute('data-date')));
  } else if (sortValue === 'az') {
    visibleCards.sort((a, b) => a.querySelector('.premium-cert-title').textContent.localeCompare(b.querySelector('.premium-cert-title').textContent));
  } else if (sortValue === 'za') {
    visibleCards.sort((a, b) => b.querySelector('.premium-cert-title').textContent.localeCompare(a.querySelector('.premium-cert-title').textContent));
  }

  // Reorder in DOM
  const grid = document.getElementById('premiumCertsGrid');
  visibleCards.forEach(card => grid.appendChild(card));

  // Show/hide no results message
  certNoResults.style.display = visibleCards.length === 0 ? 'block' : 'none';
}

// Filter button click handlers
certFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    certFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCertifications();
  });
});

// Sort change handler
certSortSelect.addEventListener('change', filterCertifications);

// Also trigger on tab switch
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    if (tab === 'certifications') {
      animateCertStats();
    }
  });
});

// ==========================================
// CONTACT FORM - WHATSAPP INTEGRATION
// ==========================================
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Validation
    if (!name || !email || !message) {
      contactStatus.textContent = 'Please fill in all fields.';
      contactStatus.classList.add('show');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      contactStatus.textContent = 'Please enter a valid email address.';
      contactStatus.classList.add('show');
      return;
    }

    // Show redirecting status
    contactStatus.textContent = 'Redirecting to WhatsApp...';
    contactStatus.classList.add('show', 'redirecting');

    // Format WhatsApp message
    const formattedMessage = `Hello Dipesh,

Name: ${name}

Email: ${email}

Message:
${message}

I visited your portfolio website and would like to connect with you.`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(formattedMessage);

    // WhatsApp URL
    const whatsappURL = `https://wa.me/917218090993?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      contactStatus.classList.remove('redirecting');
    }, 500);
  });
}

// ==========================================
// THEME TOGGLE (LIGHT/DARK MODE)
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  updateThemeIcon(true);
} else {
  updateThemeIcon(false);
}

function updateThemeIcon(isLight) {
  if (isLight) {
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  } else {
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  }
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  updateThemeIcon(isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});