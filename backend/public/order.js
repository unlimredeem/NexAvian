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
// // });
// const orderForm = document.getElementById("orderForm");
// const otpSection = document.getElementById("otpSection");
// const verifyOtpBtn = document.getElementById("verifyOtpBtn");
// const otpInput = document.getElementById("otpInput");
// const confirmation = document.getElementById("confirmation");
// const agreeWhatsapp = document.getElementById("agreeWhatsapp");
// const agreePayment = document.getElementById("agreePayment");
// let currentOrderId = null;
// const videoEdit = 100
// const ThumbnailDesign = 50
// const LogoDesign = 150
// const websiteDesign = 199
// const appdevlopment = 299
// const pptDesign = 129
// const aiservices = 299
// const chatbot = 299


// function showConfirmation(msg, duration = 6000, isError = false) {
//   const old = document.querySelector(".floating-alert");
//   if (old) old.remove();
//   const popup = document.createElement("div");
//   popup.textContent = msg;
//   popup.classList.add("floating-alert");
//   popup.style.position = "fixed";
//   popup.style.bottom = "20px";
//   popup.style.right = "-400px";
//   popup.style.background = isError ? "#ff4d4f" : "#1db954";
//   popup.style.color = "#fff";
//   popup.style.padding = "14px 20px";
//   popup.style.borderRadius = "10px";
//   popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
//   popup.style.fontWeight = "600";
//   popup.style.fontSize = "15px";
//   popup.style.zIndex = "9999";
//   popup.style.transition = "right 0.4s ease, opacity 0.4s ease";
//   popup.style.opacity = "0";
//   document.body.appendChild(popup);
//   setTimeout(() => {
//     popup.style.right = "20px";
//     popup.style.opacity = "1";
//   }, 50);
//   setTimeout(() => {
//     popup.style.right = "-400px";
//     popup.style.opacity = "0";
//     setTimeout(() => popup.remove(), 400);
//   }, duration);
// }

// function checkNumber() {
//   const value = document.getElementById("phone").value.trim();
//   if (!/^\d+$/.test(value)) {
//     showConfirmation("❌ Please enter a valid phone number!", 4000, true);
//     return false;
//   }
//   return true;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const hamburger = document.getElementById("hamburger");
//   const navMenu = document.getElementById("navMenu");
//   if (hamburger && navMenu) {
//     hamburger.addEventListener("click", () => {
//       hamburger.classList.toggle("active");
//       navMenu.classList.toggle("active");
//     });
//   }
// });

// orderForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   if (!agreeWhatsapp.checked || !agreePayment.checked) {
//     showConfirmation("⚠️ Please check both boxes to proceed with the order.", 5000, true);
//     return;
//   }
//   if (!checkNumber()) return;
//   const requiredFields = ["name", "email", "phone", "service", "details"];
//   for (let field of requiredFields) {
//     const input = document.getElementById(field);
//     if (!input.value.trim()) {
//       showConfirmation(`⚠️ Field "${field}" is required!`, 5000, true);
//       return;
//     }
//   }
//   const fileInput = document.getElementById("files");
//   const MAX_TOTAL_SIZE = 20 * 1024 * 1024;
//   let totalSize = 0;
//   if (fileInput && fileInput.files.length > 0) {
//     for (const file of fileInput.files) totalSize += file.size;
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
//       const email = document.getElementById("email").value;
//       showConfirmation(`OTP has been sent to ${email}. Please check your inbox or spam folder.`);
//     } else {
//       showConfirmation(data.message || "❌ Something went wrong. Please try again.", 5000, true);
//     }
//   } catch {
//     showConfirmation("❌ Server error. Try again later.", 5000, true);
//   }
// });

// function qrcode() {
//   const selectedOption = document.querySelector('input[name="paymentOption"]:checked').value;
//   const order = document.getElementById("orderdone");
//   const price = document.getElementById("price");
//   let serviceselect = document.getElementById("service");
//   let selectedIndex = serviceselect.selectedIndex;
//   if (selectedOption === "now") {
//     if (!selectedIndex) {
//       showConfirmation("❌ Please select a service to see the QR code.", 5000, true);
//     }
//     else {
//       let qr = document.querySelector(".payment-section");
//       qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=";
//       qr.style.display = "flex";
//       // console.log(selectedIndex);
//       if (selectedIndex == 1) {
//         showConfirmation("Our will contact you for membership and you will receive a person helper.");
//       }
//       else if (selectedIndex == 2) {
//         price.innerText = `Total ${videoEdit} and 10% advance payment is ${videoEdit - (videoEdit * 0.10)}. The amount to be paid via QR code is $${videoEdit - (videoEdit * 0.10)}.`;
//       }
//       else if (selectedIndex == 3) {
//         price.innerText = `Total ${ThumbnailDesign} and 10% advance payment is ${ThumbnailDesign - (ThumbnailDesign * 0.10)}. The amount to be paid via QR code is $${ThumbnailDesign - (ThumbnailDesign * 0.10)}.`;
//       }
//       else if (selectedIndex == 4) {
//         price.innerText = `Total ${aiservices} and 10% advance payment is ${aiservices - (aiservices * 0.10)}. The amount to be paid via QR code is $${aiservices - (LogoDesign * 0.10)}.`;
//       }
//       else if (selectedIndex == 5) {
//         price.innerText = `Total ${websiteDesign} and 10% advance payment is ${websiteDesign - (websiteDesign * 0.10)}. The amount to be paid via QR code is $${websiteDesign - (websiteDesign * 0.10)}.`;
//       }
//       else if (selectedIndex == 6) {
//         price.innerText = `Total ${appdevlopment} and 10% advance payment is ${appdevlopment - (appdevlopment * 0.10)}. The amount to be paid via QR code is $${appdevlopment - (appdevlopment * 0.10)}.`;
//       }
//       else if (selectedIndex == 7) {
//         price.innerText = `Total ${LogoDesign} and 10% advance payment is ${LogoDesign - (pptDesign * 0.10)}. The amount to be paid via QR code is $${LogoDesign - (pptDesign * 0.10)}.`;
//       }
//       else if (selectedIndex == 8) {
//         price.innerText = `Total ${pptDesign} and 10% advance payment is ${pptDesign - (pptDesign * 0.10)}. The amount to be paid via QR code is $${pptDesign - (pptDesign * 0.10)}.`;
//       }
//       else if (selectedIndex == 9) {
//         price.innerText = `Total ${chatbot} and 10% advance payment is ${chatbot - (chatbot * 0.10)}. The amount to be paid via QR code is $${chatbot - (chatbot * 0.10)}.`;
//       }
//       order.ariaDisabled = true;
//       order.innerText = "Confirm order after payment";
//     }
//   } else {
//     qr.addEventListener("click", () => {
//       showConfirmation("💡 You chose to pay later. Please be ready with the payment when our team contacts you." , 1000 , true);
//       const qr = document.querySelector(".payment-section");
//       qr.style.display = "none";
//       order.ariaDisabled = false;
//       order.innerText = "Confirm order";
//       order.style.display = "flex";
//       price.innerText = "";
//       order.addEventListener("click", () => {
//         showConfirmation("✅ Your order has been submitted successfully!. We will contact you soon. Thank You for ordering with us.", 2000, true);
//         setTimeout(() => {
//           window.location.href = "index.html";
//         }, 2000);
//       });
//     });
//   }
// }



// verifyOtpBtn.addEventListener("click", async () => {
//   const otp = otpInput.value.trim();
//   if (!otp) {
//     showConfirmation("⚠️ Please enter OTP!", 5000, true);
//     otpInput.style.border = "2px solid #ff4d4f";
//     return;
//   }
//   otpInput.style.border = "none";
//   try {
//     const verifyRes = await fetch("/api/order/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ orderId: currentOrderId, otp }),
//     });
//     const verifyData = await verifyRes.json();
//     if (verifyData.status === "success") {
//       sessionStorage.setItem("notification", "✅ Your order has been submitted successfully!. We will contact you soon. Thank You for ordering with us.");
//       showConfirmation("🎉 OTP verified successfully! Redirecting...");
//       otpInput.style.border = "2px solid #1db954";
//       setTimeout(() => {
//         otpSection.style.display = "none";
//         qrcode()
//       }, 1000);
//     } else {
//       showConfirmation("❌ Incorrect OTP. Please try again.", 5000, true);
//       otpInput.style.border = "2px solid #ff4d4f";
//     }
//   } catch {
//     showConfirmation("❌ Server error during OTP verification.", 5000, true);
//     otpInput.style.border = "2px solid #ff4d4f";
//   }
// });
//   let donebtn = document.getElementById('donebtn');
//   if (donebtn) {
//     donebtn.addEventListener('click', () => {
//       window.location.href = "index.html";
//     });
//   }

// // qrcode();

// const orderForm = document.getElementById("orderForm");
// const otpSection = document.getElementById("otpSection");
// const verifyOtpBtn = document.getElementById("verifyOtpBtn");
// const otpInput = document.getElementById("otpInput");
// const confirmation = document.getElementById("confirmation");
// const agreeWhatsapp = document.getElementById("agreeWhatsapp");
// const agreePayment = document.getElementById("agreePayment");
// let currentOrderId = null;
// const doneBtn = document.getElementById("donebtn");
// const paymentSection = document.querySelector(".payment-section");
// const toggleBtn = document.getElementById("themeToggle");

// const videoEdit = 100;
// const ThumbnailDesign = 50;
// const LogoDesign = 150;
// const websiteDesign = 199;
// const appdevlopment = 299;
// const pptDesign = 129;
// const aiservices = 299;
// const chatbot = 399;

// function showConfirmation(msg, duration = 6000, isError = false) {
//   const old = document.querySelector(".floating-alert");
//   if (old) old.remove();
//   const popup = document.createElement("div");
//   popup.textContent = msg;
//   popup.classList.add("floating-alert");
//   popup.style.position = "fixed";
//   popup.style.bottom = "20px";
//   popup.style.right = "-400px";
//   popup.style.background = isError ? "#ff4d4f" : "#1db954";
//   popup.style.color = "#fff";
//   popup.style.padding = "14px 20px";
//   popup.style.borderRadius = "10px";
//   popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
//   popup.style.fontWeight = "600";
//   popup.style.fontSize = "15px";
//   popup.style.zIndex = "9999";
//   popup.style.transition = "right 0.4s ease, opacity 0.4s ease";
//   popup.style.opacity = "0";
//   document.body.appendChild(popup);
//   setTimeout(() => {
//     popup.style.right = "20px";
//     popup.style.opacity = "1";
//   }, 50);
//   setTimeout(() => {
//     popup.style.right = "-400px";
//     popup.style.opacity = "0";
//     setTimeout(() => popup.remove(), 400);
//   }, duration);
// }

// function checkNumber() {
//   const value = document.getElementById("phone").value.trim();
//   const text = document.getElementById("text1");
//   if (!/^\d+$/.test(value)) {
//     if (text) text.innerHTML = '❌ Please enter a valid phone number!';
//     showConfirmation("❌ Please enter a valid phone number!", 4000, true);
//     return false;
//   }
//   if (text) text.innerHTML = '';
//   return true;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const hamburger = document.getElementById("hamburger");
//   const navMenu = document.getElementById("navMenu");
//   if (hamburger && navMenu) {
//     hamburger.addEventListener("click", () => {
//       hamburger.classList.toggle("active");
//       navMenu.classList.toggle("active");
//     });
//   }
// });

// if (toggleBtn) {
//   toggleBtn.addEventListener("click", () => {
//     document.body.classList.toggle("light");
//     toggleBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
//   });
// }

// orderForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   if (!agreeWhatsapp.checked || !agreePayment.checked) {
//     showConfirmation("⚠️ Please check both boxes to proceed with the order.", 5000, true);
//     return;
//   }
//   if (!checkNumber()) return;
//   const requiredFields = ["name", "email", "phone", "service", "details"];
//   for (let field of requiredFields) {
//     const input = document.getElementById(field);
//     if (!input.value.trim()) {
//       showConfirmation(`⚠️ Field "${field}" is required!`, 5000, true);
//       return;
//     }
//   }
//   const fileInput = document.getElementById("file");
//   const MAX_TOTAL_SIZE = 20 * 1024 * 1024;
//   let totalSize = 0;
//   if (fileInput && fileInput.files.length > 0) {
//     for (const file of fileInput.files) totalSize += file.size;
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
//       otpSection.style.display = "flex";
//       otpInput.focus();
//       const email = document.getElementById("email").value;
//       showConfirmation(`OTP has been sent to ${email}. Please check your inbox or spam folder.`);
//     } else {
//       showConfirmation(data.message || "❌ Something went wrong. Please try again.", 5000, true);
//     }
//   } catch {
//     showConfirmation("❌ Server error. Try again later.", 5000, true);
//   }
// });

// function getPaymentDetails() {
//   const serviceselect = document.getElementById("service");
//   const selectedIndex = serviceselect.selectedIndex;
//   const selectedOption = document.querySelector('input[name="paymentOption"]:checked').value;
//   const priceEl = document.getElementById("price");

//   const servicePriceMap = {
//     2: videoEdit,
//     3: ThumbnailDesign,
//     4: aiservices,
//     5: websiteDesign,
//     6: appdevlopment,
//     7: LogoDesign,
//     8: pptDesign,
//     9: chatbot
//   };
//   let basePrice = 0;
//   let advanceAmount = 0;

//   if (selectedIndex >= 2 && selectedIndex <= 9) {
//     basePrice = servicePriceMap[selectedIndex];
//     advanceAmount = basePrice * 0.10;
//   }

//   if (selectedOption === 'now') {
//     if (selectedIndex === 1) {
//       priceEl.innerText = `Membership selected. A team member will contact you for the final amount.`;
//       doneBtn.innerText = "Confirm Membership Inquiry";
//     } else if (basePrice > 0) {
//       priceEl.innerText = `Total: ₹${basePrice.toFixed(2)}. Advance: ₹${advanceAmount.toFixed(2)}.`;
//       doneBtn.innerText = "Pay Advance Now";
//     } else {
//       priceEl.innerText = "Please select a service.";
//       doneBtn.innerText = "Pay Advance Now";
//     }
//   } else {
//     priceEl.innerText = "You will pay the full amount on delivery.";
//     doneBtn.innerText = "Confirm Order (Pay on Delivery)";
//   }

//   return {
//     amount: advanceAmount,
//     basePrice: basePrice,
//     paymentOption: selectedOption,
//     isMembership: selectedIndex === 1
//   };
// }

// document.querySelectorAll('input[name="paymentOption"]').forEach(radio => {
//   radio.addEventListener('change', getPaymentDetails);
// });
// document.getElementById("service").addEventListener('change', getPaymentDetails);

// doneBtn.addEventListener("click", async () => {
//   const paymentDetails = getPaymentDetails();

//   if (paymentDetails.isMembership) {
//     showConfirmation("Membership selected! We will contact you shortly to finalize.", 7000);
//     setTimeout(() => window.location.href = "index.html", 2500);
//     return;
//   }

//   if (paymentDetails.basePrice === 0 && paymentDetails.paymentOption === 'now') {
//     showConfirmation("Please select a valid service to pay for.", 5000, true);
//     return;
//   }

//   try {
//     const res = await fetch("/api/payment/initiate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         orderId: currentOrderId,
//         amount: paymentDetails.amount,
//         paymentOption: paymentDetails.paymentOption
//       })
//     });
//     const data = await res.json();

//     if (data.status === "success") {
//       if (data.type === 'later') {
//         showConfirmation("✅ Order confirmed for Pay on Delivery. We will contact you soon!", 5000);
//         setTimeout(() => window.location.href = "index.html", 2000);
//       } else {
//         window.location.href = data.redirectUrl;
//       }
//     } else {
//       showConfirmation(data.message || "❌ Payment initiation failed.", 5000, true);
//     }
//   } catch (err) {
//     showConfirmation("❌ Server error. Could not start payment.", 5000, true);
//   }
// });

// verifyOtpBtn.addEventListener("click", async () => {
//   const otp = otpInput.value.trim();
//   if (!otp) {
//     showConfirmation("⚠️ Please enter OTP!", 5000, true);
//     otpInput.style.border = "2px solid #ff4d4f";
//     return;
//   }
//   otpInput.style.border = "none";
//   try {
//     const verifyRes = await fetch("/api/order/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ orderId: currentOrderId, otp }),
//     });
//     const verifyData = await verifyRes.json();
//     if (verifyData.status === "success") {
//       sessionStorage.setItem("notification", "✅ Your order has been submitted successfully!. We will contact you soon. Thank You for ordering with us.");
//       showConfirmation("🎉 OTP verified successfully! Proceeding to payment...");
//       otpInput.style.border = "2px solid #1db954";
//       setTimeout(() => {
//         otpSection.style.display = "none";
//         paymentSection.style.display = "flex";
//         document.getElementById("payNow").checked = true;
//         getPaymentDetails();
//       }, 1000);
//     } else {
//       showConfirmation("❌ Incorrect OTP. Please try again.", 5000, true);
//       otpInput.style.border = "2px solid #ff4d4f";
//     }
//   } catch {
//     showConfirmation("❌ Server error during OTP verification.", 5000, true);
//     otpInput.style.border = "2px solid #ff4d4f";
//   }
window.addEventListener('load', () => {
document.body.classList.add('loaded');
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

const orderForm = document.getElementById("orderForm");
const otpSection = document.getElementById("otpSection");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const otpInput = document.getElementById("otpInput");
const confirmation = document.getElementById("confirmation");
const agreeWhatsapp = document.getElementById("agreeWhatsapp");
const agreePayment = document.getElementById("agreePayment");
let currentOrderId = null;
const doneBtn = document.getElementById("donebtn");
const paymentSection = document.querySelector(".payment-section");
const toggleBtn = document.getElementById("themeToggle");
const qrCodeContainer = document.querySelector(".qr-code-container");
const priceEl = document.getElementById("price");

const videoEdit = 100;
const ThumbnailDesign = 50;
const LogoDesign = 150;
const websiteDesign = 199;
const appdevlopment = 299;
const pptDesign = 129;
const aiservices = 299;
const chatbot = 399;

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
    setTimeout(() => { if (popup) popup.remove() }, 400);
  };

  closeBtn.addEventListener("click", hidePopup);
  setTimeout(() => popup.classList.add("show"), 50);
  setTimeout(hidePopup, duration);
}

function checkNumber() {
  const value = document.getElementById("phone").value.trim();
  const text = document.getElementById("text1");
  if (!/^\d+$/.test(value)) {
    if (text) text.innerHTML = '❌ Please enter a valid phone number!';
    showNotification("❌ Please enter a valid phone number!", 4000, true);
    return false;
  }
  if (text) text.innerHTML = '';
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

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
  });
}

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!agreeWhatsapp.checked || !agreePayment.checked) {
    showNotification("⚠️ Please check both boxes to proceed with the order.", 5000, true);
    return;
  }
  if (!checkNumber()) return;
  const requiredFields = ["name", "email", "phone", "service", "details"];
  for (let field of requiredFields) {
    const input = document.getElementById(field);
    if (!input.value.trim()) {
      showNotification(`⚠️ Field "${field}" is required!`, 5000, true);
      return;
    }
  }
  const fileInput = document.getElementById("file");
  const MAX_TOTAL_SIZE = 20 * 1024 * 1024;
  let totalSize = 0;
  if (fileInput && fileInput.files.length > 0) {
    for (const file of fileInput.files) totalSize += file.size;
  }
  if (totalSize > MAX_TOTAL_SIZE) {
    showNotification("❌ Total file size cannot exceed 20 MB.", 5000, true);
    return;
  }
  const formData = new FormData(orderForm);
  try {
    const res = await fetch("/api/order", { method: "POST", body: formData });
    const data = await res.json();
    if (data.status === "success") {
      currentOrderId = data.orderId;
      orderForm.style.display = "none";
      otpSection.style.display = "flex";
      otpInput.focus();
      const email = document.getElementById("email").value;
      showNotification(`OTP has been sent to ${email}. Please check your inbox or spam folder.`);
    } else {
      showNotification(data.message || "❌ Something went wrong. Please try again.", 5000, true);
    }
  } catch {
    showConfirmation("❌ Server error. Try again later.", 5000, true);
  }
});

function updatePaymentUI() {
  const selectedOption = document.querySelector('input[name="paymentOption"]:checked').value;
  const serviceselect = document.getElementById("service");
  const selectedIndex = serviceselect.selectedIndex;

  const servicePriceMap = {
    2: videoEdit,
    3: ThumbnailDesign,
    4: aiservices,
    5: websiteDesign,
    6: appdevlopment,
    7: LogoDesign,
    8: pptDesign,
    9: chatbot
  };
  let basePrice = 0;
  let advanceAmount = 0;

  if (selectedIndex >= 2 && selectedIndex <= 9) {
    basePrice = servicePriceMap[selectedIndex];
    advanceAmount = basePrice * 0.10;
  }

  if (selectedOption === 'now') {
    qrCodeContainer.style.display = "block";
    doneBtn.innerText = "Confirm Advance Payment";

    if (selectedIndex === 1) {
      priceEl.innerText = `Membership selected. A team member will contact you for the final amount.`;
    } else if (basePrice > 0) {
      priceEl.innerText = `Total: ₹${basePrice.toFixed(2)}. Please pay 10% advance: ₹${advanceAmount.toFixed(2)}`;
    } else {
      priceEl.innerText = "Please select a service.";
    }
  } else {
    qrCodeContainer.style.display = "none";
    priceEl.innerText = "You will pay the full amount on delivery.";
    doneBtn.innerText = "Confirm Order (Pay on Delivery)";
  }
}

document.querySelectorAll('input[name="paymentOption"]').forEach(radio => {
  radio.addEventListener('change', updatePaymentUI);
});
document.getElementById("service").addEventListener('change', updatePaymentUI);

doneBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="paymentOption"]:checked').value;
  if (selectedOption === 'now') {
    showNotification("✅ Order confirmed! We will contact you soon for if you haven't done payment. Thnk you for ordering with us.", 7000);
  } else {
    showNotification("✅ Order confirmed for Pay on Delivery! We will contact you soon.", 5000);
  }

  setTimeout(() => {
    sessionStorage.setItem("notification", "✅ Your order is confirmed! We will be in touch shortly. We will conatct you in 5 minutes.");
    window.location.href = "index.html";
  }, 2500);
});

verifyOtpBtn.addEventListener("click", async () => {
  const otp = otpInput.value.trim();
  if (!otp) {
    showNotification("⚠️ Please enter OTP!", 5000, true);
    otpInput.style.border = "2px solid var(--error)";
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
      showNotification("🎉 OTP verified successfully! Please select your payment preference.");
      otpInput.style.border = "2px solid var(--success)";
      setTimeout(() => {
        otpSection.style.display = "none";
        paymentSection.style.display = "flex";
        document.getElementById("payNow").checked = true;
        updatePaymentUI();
      }, 1000);
    } else {
      showNotification("❌ Incorrect OTP. Please try again.", 5000, true);
      otpInput.style.border = "2px solid var(--error)";
    }
  } catch {
    showNotification("❌ Server error during OTP verification.", 5000, true);
    otpInput.style.border = "2px solid var(--error)";
  }
});