// === MATRIX RAIN (SAFE & OPTIMIZED) ===
const canvas = document.getElementById('matrix');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let columns, drops = [];
  const fontSize = 14;
  const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;
    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  init();
  setInterval(draw, 35);
  window.addEventListener('resize', init);
}

// === ANIMATIONS ===
setTimeout(() => document.getElementById('terminal')?.classList.add('reveal'), 800);
setTimeout(() => document.querySelector('.bio')?.classList.add('reveal'), 2000);
setTimeout(() => document.getElementById('challengeCards')?.classList.add('reveal'), 2800);

// === THEME TOGGLE ===
document.getElementById('themeToggle')?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
});

// Apply saved theme on load
if (localStorage.theme === 'light' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  document.documentElement.classList.add('light');
}

// === CHALLENGES DATA ===
const challenges = [
  {title:"Reverse Metadata Part 1", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData1.html", flag:"MASONCC{images_can_hide_more_than_pixels}", type:"misc"},
  {title:"Reverse Metadata Part 2", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData2.html", flag:"PCTF{hidden_in_plain_sight_but_not_really}", type:"misc"},
  {title:"Connection Tester", file:"CTF/PatriotCTF2025/Web/ConnectionTester.html", flag:"PCTF{C0nnection_t3st3d_and_pwned}", type:"web"},
  {title:"Feedback Fallout", file:"CTF/PatriotCTF2025/Web/FeedbackFallout.html", flag:"PCTF{SQLI_is_still_king_in_2025}", type:"web"},
  {title:"Secure Auth", file:"CTF/PatriotCTF2025/Web/SecureAuth.html", flag:"PCTF{cant_touch_this_jwt}", type:"web"},
  {title:"Trust Fall", file:"CTF/PatriotCTF2025/Web/TrustFall.html", flag:"PCTF{auth_bypass_never_fails}", type:"web"},
  {title:"Trust Vault", file:"CTF/PatriotCTF2025/Web/TrustVault.html", flag:"FLAG{py7h0n_pickl3_is_d4nger0us}", type:"web"},
];

// Update solve counter
document.getElementById("solveCounter").textContent = challenges.length + " SOLVED";

let currentFilter = "all";
let searchQuery = "";

// XSS-safe text escaping
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Highlight search matches
function highlightText(text, query) {
  if (!query.trim()) return escapeHtml(text);
  const regex = new RegExp(`(${query.trim()})`, 'gi');
  return escapeHtml(text).replace(regex, '<span class="highlight">$1</span>');
}

function renderChallenges() {
  const container = document.getElementById("challengeCards");
  const emptyState = document.getElementById("emptyState");

  let filtered = challenges;

  // Apply category filter
  if (currentFilter !== "all") {
    filtered = filtered.filter(c => c.type === currentFilter);
  }

  // Apply search query
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.flag.toLowerCase().includes(q)
    );
  }

  container.innerHTML = "";
  emptyState.style.display = filtered.length === 0 ? "block" : "none";

  filtered.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="category-tag tag-${c.type}">${c.type.toUpperCase()}</div>
      <h3>${highlightText(c.title, searchQuery)}</h3>
      <p class="flag">Flag: <code>${highlightText(c.flag, searchQuery)}</code></p>
      <span style="opacity:0.7">Click for writeup</span>
    `;
    card.onclick = () => location.href = c.file;
    container.appendChild(card);
  });
}

// === SEARCH BAR ===
document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderChallenges();
});

// === TABS ===
document.querySelectorAll('#challengeTabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#challengeTabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.cat;
    renderChallenges();
  });
});

// === CTF MODAL ===
const ctfs = [
  { name: "PatriotCTF 2025", link: "CTF/PatriotCTF2025/patriotctf2025.html", solves: "7+", status: "Ended", color: "#8b949e" }
];

const grid = document.getElementById("ctfGrid");
if (grid) {
  grid.innerHTML = ctfs.map(c => `
    <div class="ctf-card" onclick="location.href='${c.link}'">
      <h3>${c.name}</h3>
      <p>${c.solves} solves</p>
      <p style="color:${c.color};font-weight:bold">${c.status}</p>
    </div>
  `).join('');
}

document.getElementById('ctfToggle')?.addEventListener('click', () => {
  document.getElementById('ctfModal')?.classList.add('open');
});

document.querySelector('.close-modal')?.addEventListener('click', () => {
  document.getElementById('ctfModal')?.classList.remove('open');
});

document.getElementById('ctfModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'ctfModal') document.getElementById('ctfModal').classList.remove('open');
});

// === INITIAL RENDER ===
renderChallenges();
