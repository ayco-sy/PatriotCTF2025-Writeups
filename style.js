// style.js — shared beautiful theme for all writeups
document.addEventListener("DOMContentLoaded", () => {
  // Only run on .md pages (not on index.html)
  if (!window.location.pathname.includes(".md")) return;

  const style = document.createElement("style");
  style.textContent = `
    :root{--bg:#0d1117;--card:#161b22;--text:#f0f6fc;--accent:#58a6ff;--green:#3fb950}
    body{margin:0;background:var(--bg);color:var(--text);font-family:'Roboto Mono',monospace;line-height:1.7;padding:20px}
    .container{max-width:900px;margin:0 auto;background:var(--card);border-radius:16px;padding:40px;box-shadow:0 10px 40px rgba(0,0,0,0.6);border:1px solid #30363d}
    h1{font-family:'Orbitron',sans-serif;font-size:3rem;background:linear-gradient(90deg,#58a6ff,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center}
    h2{color:var(--accent);border-bottom:2px solid var(--accent);padding-bottom:8px}
    pre{background:#010409!important;padding:16px;border-radius:12px;border:1px solid #30363d;overflow-x:auto}
    code{background:#30363d;padding:2px 8px;border-radius:6px}
    a{color:var(--accent);text-decoration:none}
    a:hover{text-decoration:underline}
    .flag{color:var(--green);font-weight:bold}
    .back-btn{display:inline-block;margin:30px 0;padding:12px 24px;background:var(--accent);color:black;border-radius:50px;text-decoration:none;font-weight:bold}
    .back-btn:hover{transform:scale(1.05);transition:0.3s}
    @media (prefers-color-scheme:light){
      :root{--bg:#ffffff;--card:#f6f8fa;--text:#24292f;--accent:#0969da}
      pre{background:#f6f8fa!important}
    }
  `;
  document.head.appendChild(style);

  // Add fonts
  const font = document.createElement("link");
  font.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Roboto+Mono:wght@400;700&display=swap";
  font.rel = "stylesheet";
  document.head.appendChild(font);

  // Wrap content in beautiful container
  const wrapper = document.createElement("div");
  wrapper.className = "container";
  wrapper.innerHTML = `
    <a href="/" class="back-btn">← Back to Challenges</a>
    <h1>${document.title.split(" | ")[0] || "Writeup"}</h1>
    <div id="content"></div>
  `;
  document.body.innerHTML = "";
  document.body.appendChild(wrapper);
  document.getElementById("content").innerHTML = document.querySelector("article")?.innerHTML || "No content found";

  // Fix code blocks (GitHub sometimes wraps them weirdly)
  document.querySelectorAll("pre code").forEach(block => {
    block.parentNode.style.background = "var(--card)";
    block.parentNode.style.border = "1px solid #30363d";
  });
});
