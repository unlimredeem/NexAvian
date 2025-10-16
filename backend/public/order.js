const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});

const orderForm = document.getElementById("orderForm");
const otpSection = document.getElementById("otpSection");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const otpInput = document.getElementById("otpInput");
const confirmation = document.getElementById("confirmation");
const agreeWhatsapp = document.getElementById("agreeWhatsapp");
const agreePayment = document.getElementById("agreePayment");
let currentOrderId = null;

function checkNumber() {
  const value = document.getElementById("phone").value.trim();
  if (!/^\d+$/.test(value)) {
    confirmation.style.background = "#ff4d4f";
    confirmation.textContent = "❌ Please enter a valid phone number!";
    confirmation.classList.add("show");
    setTimeout(() => confirmation.classList.remove("show"), 3000);
    return false;
  }
  return true;
}

function showConfirmation(msg, duration = 6000, isError = false) {
  confirmation.textContent = msg;
  confirmation.style.background = isError ? "#ff4d4f" : "#1db954";
  confirmation.classList.add("show");
  setTimeout(() => { confirmation.classList.remove("show"); confirmation.textContent = ""; }, duration);
}

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!agreeWhatsapp.checked || !agreePayment.checked) { showConfirmation("⚠️ Please check both boxes to proceed with the order.", 5000, true); return; }
  if (!checkNumber()) return;
  const requiredFields = ["name", "email", "phone", "service", "details"];
  for (let field of requiredFields) {
    const input = document.getElementById(field);
    if (!input.value.trim()) { showConfirmation(`⚠️ Field "${field}" is required!`, 5000, true); return; }
  }
  const formData = new FormData(orderForm);
  try {
    const res = await fetch("/api/order", { method: "POST", body: formData });
    const data = await res.json();
    if (data.status === "success") {
      currentOrderId = data.orderId;
      orderForm.style.display = "none";
      otpSection.style.display = "block";

      // --- ADDED THIS PART TO SHOW THE WARNING ---
      const warningElement = document.createElement("p");
      warningElement.innerText = "Please check your junk/spam folder for the OTP.";
      warningElement.style.marginTop = "10px";
      warningElement.style.fontSize = "0.9em";
      warningElement.style.color = "#888";
      otpSection.appendChild(warningElement);
      // ------------------------------------------
      
      let email = document.getElementById("email");
      showConfirmation(`✅ OTP sent to ${email.value} for Order ID: ${data.orderId}. Note: Check Junk Folder for otp`);
    } else { showConfirmation(data.message || "❌ Something went wrong. Please try again.", 5000, true); }
  } catch { showConfirmation("❌ Server error. Try again later.", 5000, true); }
});

verifyOtpBtn.addEventListener("click", async () => {
  const otp = otpInput.value.trim();
  if (!otp) { showConfirmation("⚠️ Please enter OTP!", 5000, true); otpInput.style.border = "2px solid #ff4d4f"; return; }
  otpInput.style.border = "none";
  try {
    const verifyRes = await fetch("/api/order/verify-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: currentOrderId, otp }) });
    const verifyData = await verifyRes.json();
    if (verifyData.status === "success") {
      sessionStorage.setItem("notification", "✅ Your order has been submitted successfully!");
      showConfirmation("🎉 OTP verified successfully! Redirecting...", 3000);
      otpInput.style.border = "2px solid #1db954";
      setTimeout(() => window.location.href = "index.html", 2000);
    } else { showConfirmation("❌ Incorrect OTP. Please try again.", 5000, true); otpInput.style.border = "2px solid #ff4d4f"; }
  } catch { showConfirmation("❌ Server error during OTP verification.", 5000, true); otpInput.style.border = "2px solid #ff4d4f"; }
});