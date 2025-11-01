window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

const themeToggle = document.getElementById("themeToggle");
const joinForm = document.getElementById("joinForm");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const confirmation = document.getElementById("confirmation");
const agreeWhatsapp = document.getElementById("agreeWhatsapp");
const agreePayment = document.getElementById("agreePayment");
let currentJoinId = null;

function showNotification(msg, duration = 6000, isError = false) {
  const old = document.querySelector(".floating-alert");
  if (old) old.remove();

  const popup = document.createElement("div");
  popup.classList.add("floating-alert");
  popup.style.background = isError ? "var(--error)" : "var(--success)";
  popup.style.color = "#fff";
  
  const message = document.createElement("span");
  message.textContent = msg;
  
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&times;";
  closeBtn.classList.add("close-btn");
  
  popup.appendChild(message);
  popup.appendChild(closeBtn);
  document.body.appendChild(popup);

  const hidePopup = () => {
    popup.classList.add("hide");
    setTimeout(() => { if(popup) popup.remove() }, 400);
  };

  closeBtn.addEventListener("click", hidePopup);
  setTimeout(() => popup.classList.add("show"), 50);
  setTimeout(hidePopup, duration);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
  });
}

const yr = document.getElementById("year");
if(yr) yr.textContent = new Date().getFullYear();

function checkPhoneNumber(value) {
  return /^\d+$/.test(value.trim());
}

function getSavedUsers() {
  const saved = localStorage.getItem("joinedUsers");
  return saved ? JSON.parse(saved) : [];
}

function saveUser(email, phone) {
  const users = getSavedUsers();
  users.push({ email, phone });
  localStorage.setItem("joinedUsers", JSON.stringify(users));
}

function isUserAlreadyJoined(email, phone) {
  const users = getSavedUsers();
  return users.some(user => user.email === email || user.phone === phone);
}

if(joinForm) {
  joinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = joinForm.name.value.trim();
    const email = joinForm.email.value.trim();
    const skills = joinForm.skills.value.trim();
    const gender = joinForm.gender.value;
    const dob = joinForm.dob.value;
    const phone = joinForm.phone.value.trim();

    if (!agreeWhatsapp.checked || !agreePayment.checked) {
      showNotification("⚠️ Please check both boxes!", 5000, true);
      return;
    }

    if (!name || !email || !skills || !gender || !dob || !phone) {
      showNotification("❌ Please fill all fields!", 5000, true);
      return;
    }

    if (!checkPhoneNumber(phone)) {
      showNotification("❌ Please enter a valid phone number!", 5000, true);
      return;
    }

    if (isUserAlreadyJoined(email, phone)) {
      showNotification("⚠️ You have already submitted the form with this email or phone number!", 5000, true);
      return;
    }

    const fileInput = document.getElementById("file");
    const MAX_TOTAL_SIZE = 20 * 1024 * 1024;
    let totalSize = 0;

    if (fileInput && fileInput.files.length > 0) {
      for (const file of fileInput.files) totalSize += file.size;
    } else {
      showNotification("❌ Please upload your resume!", 5000, true);
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      showNotification("❌ Total file size cannot exceed 20 MB.", 7000, true);
      return;
    }

    const formData = new FormData(joinForm);

    try {
      const res = await fetch("/api/join", { method: "POST", body: formData });
      const data = await res.json();

      if (data.status === "success") {
        currentJoinId = data.joinId;
        joinForm.style.display = "none";
        otpSection.style.display = "flex";
        otpInput.focus();

        const warningElement = document.getElementById("otpWarning");
        if(warningElement) warningElement.innerText = "Can't find it? Be sure to check your Spam or Junk folder.";

        showNotification(`✅ OTP sent to ${email} for Join ID: ${data.joinId}.`);
        saveUser(email, phone);
      } else {
        showNotification(`⚠️ ${data.message}`, 5000, true);
      }
    } catch {
      showNotification("❌ Something went wrong. Please try again later.", 5000, true);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
});

if(verifyOtpBtn) {
  verifyOtpBtn.addEventListener("click", async () => {
    const otp = otpInput.value.trim();

    if (!otp) {
      showNotification("⚠️ Please enter OTP!", 5000, true);
      otpInput.style.border = "2px solid var(--error)";
      return;
    }

    otpInput.style.border = "none";

    try {
      const verifyRes = await fetch("/api/join/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ joinId: currentJoinId, otp })
      });

      const verifyData = await verifyRes.json();

      if (verifyData.status === "success") {
        sessionStorage.setItem("notification", "✅ Your join request has been submitted successfully!. We will contact you soon. Thank You for joining us.");
        showNotification("🎉 OTP verified successfully! Redirecting...");
        otpInput.style.border = "2px solid var(--success)";
        setTimeout(() => window.location.href = "index.html", 2000);
      } else {
        showNotification("❌ Incorrect OTP. Please try again.", 5000, true);
        otpInput.style.border = "2px solid var(--error)";
      }
    } catch {
      showNotification("❌ Server error during OTP verification.", 5000, true);
      otpInput.style.border = "2px solid var(--error)";
    }
  });
}


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