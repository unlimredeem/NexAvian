const themeToggle = document.getElementById("themeToggle");
const joinForm = document.getElementById("joinForm");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const confirmation = document.getElementById("confirmation");
const agreeWhatsapp = document.getElementById("agreeWhatsapp");
const agreePayment = document.getElementById("agreePayment");
let currentJoinId = null;


themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});


document.getElementById("year").textContent = new Date().getFullYear();

function showConfirmation(msg, duration = 5000, isError = false) {
  if (isError) {
    const old = document.querySelector(".floating-alert");
    if (old) old.remove();

    const popup = document.createElement("div");
    popup.textContent = msg;
    popup.classList.add("floating-alert");
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "-400px"; // slide from right
    popup.style.background = "#ff4d4f";
    popup.style.color = "#fff";
    popup.style.padding = "14px 20px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    popup.style.fontWeight = "600";
    popup.style.fontSize = "15px";
    popup.style.zIndex = "9999";
    popup.style.transition = "right 0.4s ease, opacity 0.4s ease";
    popup.style.opacity = "0";

    document.body.appendChild(popup);

    // Slide in
    setTimeout(() => {
      popup.style.right = "20px";
      popup.style.opacity = "1";
    }, 50);

    // Slide out
    setTimeout(() => {
      popup.style.right = "-400px";
      popup.style.opacity = "0";
      setTimeout(() => popup.remove(), 400);
    }, duration);
  }
  else {
    confirmation.textContent = msg;
    confirmation.style.background = "#1db954";
    confirmation.classList.add("show");
    setTimeout(() => {
      confirmation.classList.remove("show");
      confirmation.textContent = "";
    }, duration);
  }
}


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


joinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = joinForm.name.value.trim();
  const email = joinForm.email.value.trim();
  const skills = joinForm.skills.value.trim();
  const gender = joinForm.gender.value;
  const dob = joinForm.dob.value;
  const phone = joinForm.phone.value.trim();

  if (!agreeWhatsapp.checked || !agreePayment.checked) {
    showConfirmation("⚠️ Please check both boxes!", 5000, true);
    return;
  }

  if (!name || !email || !skills || !gender || !dob || !phone) {
    showConfirmation("❌ Please fill all fields!", 5000, true);
    return;
  }

  if (!checkPhoneNumber(phone)) {
    showConfirmation("❌ Please enter a valid phone number!", 5000, true);
    return;
  }

  if (isUserAlreadyJoined(email, phone)) {
    showConfirmation("⚠️ You have already submitted the form with this email or phone number! Contact us by joining our WhatsApp community. Thank you!", 5000, true);
    return;
  }

  const fileInput = document.getElementById("file");
  const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20 MB
  let totalSize = 0;

  if (fileInput && fileInput.files.length > 0) {
    for (const file of fileInput.files) totalSize += file.size;
  }

  if (totalSize > MAX_TOTAL_SIZE) {
    showConfirmation(
      "❌ Total file size cannot exceed 20 MB. We will contact you then you can send us the file or video, you want to send.",
      7000,
      true
    );
    return;
  }

  const formData = new FormData(joinForm);

  try {
    const res = await fetch("/api/join", { method: "POST", body: formData });
    const data = await res.json();

    if (data.status === "success") {
      currentJoinId = data.joinId;
      joinForm.style.display = "none";
      otpSection.style.display = "block";

      const warningElement = document.createElement("p");
      warningElement.innerText = "Can't find it? Be sure to check your Spam or Junk folder.";
      warningElement.style.marginTop = "10px";
      warningElement.style.fontSize = "0.9em";
      warningElement.style.color = "#888";
      otpSection.appendChild(warningElement);

      showConfirmation(`✅ OTP sent to ${email} for Join ID: ${data.joinId}.`);
      saveUser(email, phone);
    } else {
      showConfirmation(`⚠️ ${data.message}`, 5000, true);
    }
  } catch {
    showConfirmation("❌ Something went wrong. Please try again later.", 5000, true);
  }
});


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

verifyOtpBtn.addEventListener("click", async () => {
  const otp = otpInput.value.trim();

  if (!otp) {
    showConfirmation("⚠️ Please enter OTP!", 5000, true);
    otpInput.style.border = "2px solid #ff4d4f";
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
      showConfirmation("🎉 OTP verified successfully! Redirecting...");
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
