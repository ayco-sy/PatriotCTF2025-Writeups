    // Matrix rain (unchanged)
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    function draw() {
      ctx.fillStyle = 'rgba(13,17,23,0.05)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';
      drops.forEach((y,i) => {
        const text = chars[Math.floor(Math.random()*chars.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }
    setInterval(draw, 35);
    window.addEventListener('resize', () => {canvas.width = window.innerWidth; canvas.height = window.innerHeight});

    // Animations
    setTimeout(() => document.getElementById('terminal').classList.add('reveal'), 800);
    setTimeout(() => document.querySelector('.bio').classList.add('reveal'), 2000);
    setTimeout(() => document.getElementById('cards').classList.add('reveal'), 2800);

    // Challenges for PatriotCTF 2025
    const challenges = [
      {title:"Reverse Metadata Part 1",file:"Misc/Challenge1.html",flag:"PCTF{1_l0v3_unr3str1ct3d_f1l3_upl0ads}",type:"misc"},
      {title:"Reverse Metadata Part 2",file:"Misc/Challenge2.html",flag:"PCTF{l0gs_4r3_4_tr34sur3_tr0v3}",type:"misc"},
      // Add more here
    ];

    document.getElementById("total-solves").textContent = challenges.length + " SOLVED";

    const container = document.getElementById("cards");
    const tabs = document.querySelectorAll(".tab");

    function render(filter = "all") {
      container.innerHTML = "";
      const filtered = filter === "all" ? challenges : challenges.filter(c => c.type === filter);
      filtered.forEach(c => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <div class="category-tag tag-${c.type}">${c.type.toUpperCase()}</div>
          <h3>${c.title}</h3>
          <p class="flag">Flag: <code>${c.flag}</code></p>
          <span style="opacity:0.7">Click for full writeup</span>
        `;
        card.onclick = () => window.location = c.file;
        container.appendChild(card);
      });
    }

    tabs.forEach(t => t.onclick = () => {
      tabs.forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      render(t.dataset.cat);
    });

    if (localStorage.theme === "light" || (!localStorage.theme && window.matchMedia("(prefers-color-scheme: light)").matches))
      document.documentElement.classList.add("light");

    render();
