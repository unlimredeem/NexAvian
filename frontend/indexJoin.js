const themeToggle = document.getElementById("themeToggle");
const joinForm = document.getElementById("joinForm");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const confirmation = document.getElementById("confirmation");
const agreeWhatsapp = document.getElementById("agreeWhatsapp");
const agreePayment = document.getElementById("agreePayment");
let currentJoinId = null;

// ---------- THEME TOGGLE ----------
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});

// ---------- YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- SHOW CONFIRMATION ----------
function showConfirmation(msg, duration = 5000, isError = false) {
  confirmation.textContent = msg;
  confirmation.style.background = isError ? "#ff4d4f" : "#1db954";
  confirmation.classList.add("show");
  setTimeout(() => {
    confirmation.classList.remove("show");
    confirmation.textContent = "";
  }, duration);
}

// ---------- PHONE CHECK ----------
function checkPhoneNumber(value) {
  return /^\d+$/.test(value.trim());
}

// ---------- LOCALSTORAGE HELPER ----------
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

// ---------- JOIN FORM SUBMIT ----------
joinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = joinForm.name.value.trim();
  const email = joinForm.email.value.trim();
  const skills = joinForm.skills.value.trim();
  const gender = joinForm.gender.value;
  const dob = joinForm.dob.value;
  const phone = joinForm.phone.value.trim();

  // Check required checkboxes
  if (!agreeWhatsapp.checked || !agreePayment.checked) {
    showConfirmation("⚠️ Please check both boxes to proceed!", 5000, true);
    return;
  }

  // Check required fields
  if (!name || !email || !skills || !gender || !dob || !phone) {
    showConfirmation("❌ Please fill all fields!", 5000, true);
    return;
  }

  // Validate phone number
  if (!checkPhoneNumber(phone)) {
    showConfirmation("❌ Please enter a valid phone number!", 5000, true);
    return;
  }

  // Check if user already joined
  if (isUserAlreadyJoined(email, phone)) {
    showConfirmation("⚠️ You have already submitted the form with this email or phone number!, Contact us by joining our community to talk to admin", 5000, true);
    return;
  }

  // Submit form
  const formData = new FormData(joinForm);
  try {
    const res = await fetch("http://localhost:5000/api/join", { method: "POST", body: formData });
    const data = await res.json();
    if (data.status === "success") {
      currentJoinId = data.joinId;
      joinForm.style.display = "none";
      otpSection.style.display = "block";
      showConfirmation(`✅ OTP sent to ${email} for Join ID: ${data.joinId}`, 5000);

      // Save user email and phone to localStorage
      saveUser(email, phone);
    } else {
      showConfirmation(`⚠️ ${data.message}`, 5000, true);
    }
  } catch {
    showConfirmation("❌ Something went wrong. Please try again later.", 5000, true);
  }
});

// ---------- OTP VERIFICATION ----------
verifyOtpBtn.addEventListener("click", async () => {
  const otp = otpInput.value.trim();
  if (!otp) {
    showConfirmation("⚠️ Please enter OTP!", 5000, true);
    otpInput.style.border = "5px solid #ff4d4f";
    return;
  }
  otpInput.style.border = "none";

  try {
    const verifyRes = await fetch("http://localhost:5000/api/join/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ joinId: currentJoinId, otp }),
    });
    const verifyData = await verifyRes.json();
    if (verifyData.status === "success") {
      sessionStorage.setItem("notification", "✅ Your join request has been submitted successfully!");
      showConfirmation("🎉 OTP verified successfully! Redirecting...", 3000);
      otpInput.style.border = "2px solid #1db954";
      setTimeout(() => window.location.href = "index.html", 2000);
    } else {
      showConfirmation("❌ Incorrect OTP. Please try again.", 5000, true);
      otpInput.style.border = "2px solid #ff4d4f";
    }
  } catch {
    showConfirmation("❌ Server error during OTP verification.", 5000, true);
    otpInput.style.border = "2px solid #ff4d4f";
  }
});
