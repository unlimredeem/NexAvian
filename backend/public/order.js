// const toggleBtn = document.getElementById("themeToggle");
// toggleBtn.addEventListener("click", () => {
//   document.body.classList.toggle("light");
//   toggleBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
// });

// const orderForm = document.getElementById("orderForm");
// const otpSection = document.getElementById("otpSection");
// const verifyOtpBtn = document.getElementById("verifyOtpBtn");
// const otpInput = document.getElementById("otpInput");
// const confirmation = document.getElementById("confirmation");
// const agreeWhatsapp = document.getElementById("agreeWhatsapp");
// const agreePayment = document.getElementById("agreePayment");
// let currentOrderId = null;

// function checkNumber() {
//   const value = document.getElementById("phone").value.trim();
//   if (!/^\d+$/.test(value)) {
//     confirmation.style.background = "#ff4d4f";
//     confirmation.textContent = "❌ Please enter a valid phone number!";
//     confirmation.classList.add("show");
//     setTimeout(() => confirmation.classList.remove("show"), 3000);
//     return false;
//   }
//   return true;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const hamburger = document.getElementById('hamburger');
//     const navMenu = document.getElementById('navMenu');

//     if (hamburger && navMenu) {
//         hamburger.addEventListener('click', () => {
//             hamburger.classList.toggle('active');
//             navMenu.classList.toggle('active');
//         });
//     }
// });

// function showConfirmation(msg, duration = 6000, isError = false) {
//   confirmation.textContent = msg;
//   confirmation.style.background = isError ? "#ff4d4f" : "#1db954";
//   confirmation.classList.add("show");
//   setTimeout(() => { confirmation.classList.remove("show"); confirmation.textContent = ""; }, duration);
// }

// orderForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   if (!agreeWhatsapp.checked || !agreePayment.checked) { showConfirmation("⚠️ Please check both boxes to proceed with the order.", 5000, true); return; }
//   if (!checkNumber()) return;
//   const requiredFields = ["name", "email", "phone", "service", "details"];
//   for (let field of requiredFields) {
//     const input = document.getElementById(field);
//     if (!input.value.trim()) { showConfirmation(`⚠️ Field "${field}" is required!`, 5000, true); return; }
//   }
//   const formData = new FormData(orderForm);
//   try {
//     const res = await fetch("/api/order", { method: "POST", body: formData });
//     const data = await res.json();
//     if (data.status === "success") {
//       currentOrderId = data.orderId;
//       orderForm.style.display = "none";
//       otpSection.style.display = "block";

//       const warningElement = document.createElement("p");
//       warningElement.innerText = "Can't find it? Be sure to check your Spam or Junk folder.";
//       warningElement.style.marginTop = "10px";
//       warningElement.style.fontSize = "0.9em";
//       warningElement.style.color = "#888";
//       otpSection.appendChild(warningElement);
      
//       let email = document.getElementById("email");
//       showConfirmation(`✅ OTP sent to ${email.value} for Order ID: ${data.orderId}.`);
//     } else { showConfirmation(data.message || "❌ Something went wrong. Please try again.", 5000, true); }
//   } catch { showConfirmation("❌ Server error. Try again later.", 5000, true); }
// });

// verifyOtpBtn.addEventListener("click", async () => {
//   const otp = otpInput.value.trim();
//   if (!otp) { showConfirmation("⚠️ Please enter OTP!", 5000, true); otpInput.style.border = "2px solid #ff4d4f"; return; }
//   otpInput.style.border = "none";
//   try {
//     const verifyRes = await fetch("/api/order/verify-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: currentOrderId, otp }) });
//     const verifyData = await verifyRes.json();
//     if (verifyData.status === "success") {
//       sessionStorage.setItem("notification", "✅ Your order has been submitted successfully!");
//       showConfirmation("🎉 OTP verified successfully! Redirecting...", 3000);
//       otpInput.style.border = "2px solid #1db954";
//       setTimeout(() => window.location.href = "index.html", 2000);
//     } else {
//       // --- THIS IS THE UPDATED PART ---
//       confirmation.style.background = "#ff4d4f";
//       confirmation.textContent = "❌ Incorrect OTP. Please try again.";
//       confirmation.classList.add("show");
//       setTimeout(() => confirmation.classList.remove("show"), 3000);
      
//       otpInput.style.border = "2px solid #ff4d4f";
//       // -----------------------------
//     }
//   } catch {
//       confirmation.style.background = "#ff4d4f";
//       confirmation.textContent = "❌ Server error during OTP verification.";
//       confirmation.classList.add("show");
//       setTimeout(() => confirmation.classList.remove("show"), 3000);
//       otpInput.style.border = "2px solid #ff4d4f";
//   }
// });

// const toggleBtn = document.getElementById("themeToggle");
// toggleBtn.addEventListener("click", () => {
//   document.body.classList.toggle("light");
//   toggleBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
// });

// const orderForm = document.getElementById("orderForm");
// const otpSection = document.getElementById("otpSection");
// const verifyOtpBtn = document.getElementById("verifyOtpBtn");
// const otpInput = document.getElementById("otpInput");
// const confirmation = document.getElementById("confirmation");
// const agreeWhatsapp = document.getElementById("agreeWhatsapp");
// const agreePayment = document.getElementById("agreePayment");
// let currentOrderId = null;

// function checkNumber() {
//   const value = document.getElementById("phone").value.trim();
//   if (!/^\d+$/.test(value)) {
//     confirmation.style.background = "#ff4d4f";
//     confirmation.textContent = "❌ Please enter a valid phone number!";
//     confirmation.classList.add("show");
//     setTimeout(() => confirmation.classList.remove("show"), 3000);
//     return false;
//   }
//   return true;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const hamburger = document.getElementById('hamburger');
//     const navMenu = document.getElementById('navMenu');

//     if (hamburger && navMenu) {
//         hamburger.addEventListener('click', () => {
//             hamburger.classList.toggle('active');
//             navMenu.classList.toggle('active');
//         });
//     }
// });

// function showConfirmation(msg, duration = 6000, isError = false) {
//   confirmation.textContent = msg;
//   confirmation.style.background = isError ? "#ff4d4f" : "#1db954";
//   confirmation.classList.add("show");
//   setTimeout(() => { confirmation.classList.remove("show"); confirmation.textContent = ""; }, duration);
// }

// orderForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   if (!agreeWhatsapp.checked || !agreePayment.checked) { showConfirmation("⚠️ Please check both boxes to proceed with the order.", 5000, true); return; }
//   if (!checkNumber()) return;
//   const requiredFields = ["name", "email", "phone", "service", "details"];
//   for (let field of requiredFields) {
//     const input = document.getElementById(field);
//     if (!input.value.trim()) { showConfirmation(`⚠️ Field "${field}" is required!`, 5000, true); return; }
//   }

//   const fileInput = document.getElementById("files");
//   const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20 MB
//   let totalSize = 0;
//   if (fileInput && fileInput.files.length > 0) {
//     for (const file of fileInput.files) {
//         totalSize += file.size;
//     }
//   }
//   if (totalSize > MAX_TOTAL_SIZE) {
//     showConfirmation("❌ Total file size cannot exceed 20 MB.", 5000, true);
//     return;
//   }

//   const formData = new FormData(orderForm);
//   try {
//     const res = await fetch("/api/order", { method: "POST", body: formData });
//     const data = await res.json();
//     if (data.status === "success") {
//       currentOrderId = data.orderId;
//       orderForm.style.display = "none";
//       otpSection.style.display = "block";

//       const warningElement = document.createElement("p");
//       warningElement.innerText = "Can't find it? Be sure to check your Spam or Junk folder.";
//       warningElement.style.marginTop = "10px";
//       warningElement.style.fontSize = "0.9em";
//       warningElement.style.color = "#888";
//       otpSection.appendChild(warningElement);
      
//       let email = document.getElementById("email");
//       showConfirmation(`✅ OTP sent to ${email.value} for Order ID: ${data.orderId}.`);
//     } else { showConfirmation(data.message || "❌ Something went wrong. Please try again.", 5000, true); }
//   } catch { showConfirmation("❌ Server error. Try again later.", 5000, true); }
// });

// verifyOtpBtn.addEventListener("click", async () => {
//   const otp = otpInput.value.trim();
//   if (!otp) { showConfirmation("⚠️ Please enter OTP!", 5000, true); otpInput.style.border = "2px solid #ff4d4f"; return; }
//   otpInput.style.border = "none";
//   try {
//     const verifyRes = await fetch("/api/order/verify-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: currentOrderId, otp }) });
//     const verifyData = await verifyRes.json();
//     if (verifyData.status === "success") {
//       sessionStorage.setItem("notification", "✅ Your order has been submitted successfully!");
//       showConfirmation("🎉 OTP verified successfully! Redirecting...", 3000);
//       otpInput.style.border = "2px solid #1db954";
//       setTimeout(() => window.location.href = "index.html", 2000);
//     } else {
//       confirmation.style.background = "#ff4d4f";
//       confirmation.textContent = "❌ Incorrect OTP. Please try again.";
//       confirmation.classList.add("show");
//       setTimeout(() => confirmation.classList.remove("show"), 3000);
      
//       otpInput.style.border = "2px solid #ff4d4f";
//     }
//   } catch {
//       confirmation.style.background = "#ff4d4f";
//       confirmation.textContent = "❌ Server error during OTP verification.";
//       confirmation.classList.add("show");
//       setTimeout(() => confirmation.classList.remove("show"), 3000);
//       otpInput.style.border = "2px solid #ff4d4f";
//   }
// });
const orderForm = document.getElementById("orderForm");
const otpSection = document.getElementById("otpSection");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const otpInput = document.getElementById("otpInput");
const confirmation = document.getElementById("confirmation");
const agreeWhatsapp = document.getElementById("agreeWhatsapp");
const agreePayment = document.getElementById("agreePayment");
let currentOrderId = null;

function showConfirmation(msg, duration = 6000, isError = false) {
  const old = document.querySelector(".floating-alert");
  if (old) old.remove();
  const popup = document.createElement("div");
  popup.textContent = msg;
  popup.classList.add("floating-alert");
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "-400px";
  popup.style.background = isError ? "#ff4d4f" : "#1db954";
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
  setTimeout(() => {
    popup.style.right = "20px";
    popup.style.opacity = "1";
  }, 50);
  setTimeout(() => {
    popup.style.right = "-400px";
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 400);
  }, duration);
}

function checkNumber() {
  const value = document.getElementById("phone").value.trim();
  if (!/^\d+$/.test(value)) {
    showConfirmation("❌ Please enter a valid phone number!", 4000, true);
    return false;
  }
  return true;
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

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!agreeWhatsapp.checked || !agreePayment.checked) {
    showConfirmation("⚠️ Please check both boxes to proceed with the order.", 5000, true);
    return;
  }
  if (!checkNumber()) return;
  const requiredFields = ["name", "email", "phone", "service", "details"];
  for (let field of requiredFields) {
    const input = document.getElementById(field);
    if (!input.value.trim()) {
      showConfirmation(`⚠️ Field "${field}" is required!`, 5000, true);
      return;
    }
  }
  const fileInput = document.getElementById("files");
  const MAX_TOTAL_SIZE = 20 * 1024 * 1024;
  let totalSize = 0;
  if (fileInput && fileInput.files.length > 0) {
    for (const file of fileInput.files) totalSize += file.size;
  }
  if (totalSize > MAX_TOTAL_SIZE) {
    showConfirmation("❌ Total file size cannot exceed 20 MB.", 5000, true);
    return;
  }
  const formData = new FormData(orderForm);
  try {
    const res = await fetch("/api/order", { method: "POST", body: formData });
    const data = await res.json();
    if (data.status === "success") {
      currentOrderId = data.orderId;
      orderForm.style.display = "none";
      otpSection.style.display = "block";
      const email = document.getElementById("email").value;
      showConfirmation(`OTP has been sent to ${email}. Please check your inbox or spam folder.`);
    } else {
      showConfirmation(data.message || "❌ Something went wrong. Please try again.", 5000, true);
    }
  } catch {
    showConfirmation("❌ Server error. Try again later.", 5000, true);
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
    const verifyRes = await fetch("/api/order/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: currentOrderId, otp }),
    });
    const verifyData = await verifyRes.json();
    if (verifyData.status === "success") {
      sessionStorage.setItem("notification", "✅ Your order has been submitted successfully!. We will contact you soon. Thank You for ordering with us.");
      showConfirmation("🎉 OTP verified successfully! Redirecting...");
      otpInput.style.border = "2px solid #1db954";
      setTimeout(() => (window.location.href = "index.html"), 2000);
    } else {
      showConfirmation("❌ Incorrect OTP. Please try again.", 5000, true);
      otpInput.style.border = "2px solid #ff4d4f";
    }
  } catch {
    showConfirmation("❌ Server error during OTP verification.", 5000, true);
    otpInput.style.border = "2px solid #ff4d4f";
  }
});
