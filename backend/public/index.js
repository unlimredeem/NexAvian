const body = document.body;
const toggle = document.getElementById('themeToggle');

(function initTheme() {
  const saved = localStorage.getItem('averian-theme');
  if (saved === 'light') { body.classList.add('light'); toggle.textContent = '🌙'; }
  else { body.classList.remove('light'); toggle.textContent = '☀️'; }
})();

let dis = document.getElementById("academyJoinBtn");
if (dis) { dis.addEventListener("click", () => alert("Sorry, this function isn't available right now.")); }

toggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light');
  toggle.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('averian-theme', isLight ? 'light' : 'dark');
});

const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });

document.querySelectorAll('.card,.pack,.usp-item,.step,.test,.dashboard .pack').forEach(el => { el.classList.add('hidden'); observer.observe(el); });

function showNotification(message, type = "success") {
  const note = document.createElement("div");
  note.textContent = message;
  note.style.position = "fixed";
  note.style.bottom = "20px";
  note.style.right = "20px";
  note.style.background = type === "error" ? "#ff4c4c" : "#1db954";
  note.style.color = "#fff";
  note.style.padding = "12px 20px";
  note.style.borderRadius = "8px";
  note.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
  note.style.fontSize = "15px";
  note.style.zIndex = "9999";
  note.style.opacity = "0";
  note.style.transition = "opacity 0.5s ease";
  document.body.appendChild(note);
  setTimeout(() => (note.style.opacity = "1"), 100);
  setTimeout(() => { note.style.opacity = "0"; setTimeout(() => note.remove(), 500); }, 5000);
}

const phone = '919654325224';
const message = 'Hello! I would like to order a package.';
const waBtn = document.getElementById('waBtn');
if (waBtn) { waBtn.addEventListener('click', () => { window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener'); }); }

const termBody = document.getElementById('termBody');
if (termBody) {
  const text = termBody.textContent.trim();
  termBody.textContent = '';
  let i = 0;
  const typer = setInterval(() => { termBody.textContent += text[i] || ''; i++; if (i >= text.length) clearInterval(typer); }, 28);
}
const closeButton = document.querySelector('.dot-red');
const fullscreenButton = document.querySelector('.dot-green');
const termBox = document.getElementById('terminalBox');
const bodyEl = document.body;

closeButton.addEventListener('click', () => {

  termBox.style.display = 'none';

  termBox.classList.remove('is-fullscreen');
  bodyEl.classList.remove('terminal-fullscreen-active');
});


fullscreenButton.addEventListener('click', () => {
  termBox.classList.toggle('is-fullscreen');
  bodyEl.classList.toggle('terminal-fullscreen-active');

  const terminalBox = document.getElementById('terminalBox');
  const termBody = document.getElementById('termBody');
  const termInput = document.getElementById('termInput');

  terminalBox.addEventListener('click', () => {
    termInput.focus();
  });

  // Handle the user's input
  termInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const command = termInput.value.trim();

      if (command) {
        const userCommandDiv = document.createElement('div');
        userCommandDiv.textContent = `> ${command}`;
        termBody.appendChild(userCommandDiv);
        const responseDiv = document.createElement('div');
        responseDiv.textContent = `> status: online, Press Green button to get back`;
        termBody.appendChild(responseDiv);
        termInput.value = '';
        termBody.scrollTop = termBody.scrollHeight;
      }
    }
  });

});

const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; initParticles(); });
  let particles = [];
  function initParticles() {
    particles = [];
    for (let i = 0; i < 120; i++) { particles.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + 1, dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3 }); }
  }
  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    for (let p of particles) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,234,255,0.2)'; ctx.fill(); p.x += p.dx; p.y += p.dy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; }
    requestAnimationFrame(drawParticles);
  }
  initParticles();
  drawParticles();
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
});

document.querySelectorAll('.card, .pack').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    card.style.transform = `rotateX(${dy * 5}deg) rotateY(${dx * 5}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0) rotateX(0) rotateY(0)'; });
});

document.querySelectorAll("#services, #packages").forEach(btn => { btn.addEventListener("click", () => { location.href = "order.html"; }); });

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const service = document.getElementById("contactService").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    if (!name || !email) { showNotification("⚠️ Name and Email are required!", "error"); return; }
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, service, message }) });
      const data = await res.json();
      if (data.status === "success") { contactForm.reset(); showNotification("✅ Your suggestion has been submitted successfully! Thank You for your suggestion, We will make changes."); }
      else { showNotification(data.message || "❌ Failed to submit suggestion", "error"); }
    } catch { showNotification("❌ Server error. Try again later.", "error"); }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const notif = sessionStorage.getItem("notification");
  if (notif) { showNotification(notif); sessionStorage.removeItem("notification"); }
});
