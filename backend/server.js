// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const sgMail = require("@sendgrid/mail");

// require("dotenv").config();
// console.log("Loaded SendGrid Email:", process.env.SENDGRID_EMAIL); // Debug line

// const app = express();
// const PORT = process.env.PORT || 5000;

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const publicPath = path.join(__dirname, "public");
// app.use(express.static(publicPath));

// let orders = [];
// let joinRequests = [];
// let orderOtpStore = {};
// let joinOtpStore = {};

// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, `AVR-${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// async function sendEmail(to, subject, html) {
//   if (!to || to.length === 0) {
//     throw new Error("Recipient email is missing");
//   }
//   const msg = {
//     to,
//     from: {
//         email: process.env.SENDGRID_EMAIL,
//         name: 'NexAvian'
//     },
//     subject,
//     html,
//   };
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error("SendGrid email error:", error.response?.body?.errors || error.message);
//     throw error;
//   }
// }

// app.get("/order", (req, res) => res.sendFile(path.join(publicPath, "order.html")));
// app.get("/join", (req, res) => res.sendFile(path.join(publicPath, "indexJoin.html")));
// app.get("/", (req, res) => res.sendFile(path.join(publicPath, "index.html")));

// app.get("/api/orders", (req, res) => res.json(orders));

// app.post("/api/order", upload.single("file"), async (req, res) => {
//   const { name, email, phone, service, details } = req.body;
//   if (!name || !email || !phone || !service || !details) {
//     return res.status(400).json({ status: "error", message: "Missing required fields" });
//   }

//   const orderId = `AVR-${Date.now().toString().slice(-6)}`;
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   orderOtpStore[orderId] = otp;

//   const newOrder = {
//     id: orderId,
//     name,
//     email,
//     phone,
//     service,
//     details,
//     file: req.file ? req.file.filename : null,
//     date: new Date().toISOString(),
//   };
//   orders.push(newOrder);

//   try {
//     await sendEmail(email, "Your NexAvian Order OTP", `<p>Hello ${name},</p><p>Your OTP is: <b>${otp}</b></p><p>Order ID: ${orderId}</p>`);
//     await sendEmail(
//       [process.env.SENDGRID_EMAIL, "itsjatin080@gmail.com"],
//       "New Order Received - Averian",
//       `<p>Order ID: ${orderId}</p><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Service: ${service}</p><p>Details: ${details}</p>`
//     );
//     res.status(200).json({ status: "success", orderId });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Failed to send OTP email" });
//   }
// });

// app.post("/api/order/verify-otp", async (req, res) => {
//   const { orderId, otp } = req.body;
//   if (!orderId || !otp) {
//     return res.status(400).json({ status: "error", message: "Missing orderId or OTP" });
//   }

//   if (orderOtpStore[orderId] && parseInt(otp) === orderOtpStore[orderId]) {
//     delete orderOtpStore[orderId];
//     const order = orders.find(o => o.id === orderId);
//     if (order) {
//       try {
//         await sendEmail(order.email, "Your NexAvian Order is Confirmed ✅", `<p>Hello <b>${order.name}</b>,</p><p>Your order with ID <b>${orderId}</b> has been confirmed!</p>`);
//       } catch (err) {
//         console.error("Failed to send order confirmation email:", err);
//       }
//     }
//     return res.status(200).json({ status: "success", message: "Order confirmed!" });
//   }
//   res.status(400).json({ status: "error", message: "Invalid OTP" });
// });

// app.post("/api/join", upload.single("file"), async (req, res) => {
//   const { name, email, phone, skills, gender, dob } = req.body;
//   if (!name || !email || !phone || !skills || !gender || !dob) {
//     return res.status(400).json({ status: "error", message: "Missing required fields" });
//   }

//   const joinId = `JOIN-${Date.now().toString().slice(-6)}`;
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   joinOtpStore[joinId] = otp;

//   const newJoin = {
//     id: joinId,
//     name,
//     email,
//     phone,
//     skills,
//     gender,
//     dob,
//     file: req.file ? req.file.filename : null,
//     date: new Date().toISOString(),
//   };
//   joinRequests.push(newJoin);

//   try {
//     await sendEmail(email, "Your NexAvian Join Request OTP", `<p>Hello ${name},</p><p>Your OTP is: <b>${otp}</b></p><p>Join ID: ${joinId}</p>`);
//     await sendEmail(
//       [process.env.SENDGRID_EMAIL, "itsjatin080@gmail.com"],
//       "New Join Request - NexAvian",
//       `<p>Join ID: ${joinId}</p><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Skills: ${skills}</p><p>Gender: ${gender}</p><p>DOB: ${dob}</p>`
//     );
//     res.status(200).json({ status: "success", joinId });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Failed to send OTP email" });
//   }
// });

// app.post("/api/join/verify-otp", async (req, res) => {
//   const { joinId, otp } = req.body;
//   if (!joinId || !otp) {
//     return res.status(400).json({ status: "error", message: "Missing joinId or OTP" });
//   }

//   if (joinOtpStore[joinId] && parseInt(otp) === joinOtpStore[joinId]) {
//     delete joinOtpStore[joinId];
//     const join = joinRequests.find(j => j.id === joinId);
//     if (join) {
//       try {
//         await sendEmail(join.email, "NexAvian Form Submitted Successfully ✅", `<p>Hello <b>${join.name}</b>,</p><p>Your form with ID <b>${joinId}</b> has been submitted!</p>`);
//       } catch (err) {
//         console.error("Failed to send join confirmation email:", err);
//       }
//     }
//     return res.status(200).json({ status: "success", message: "Join request submitted!" });
//   }
//   res.status(400).json({ status: "error", message: "Invalid OTP" });
// });

// app.post("/api/contact", async (req, res) => {
//   const { name, email, service, message } = req.body;
//   if (!name || !email) {
//     return res.status(400).json({ status: "error", message: "Name and Email are required." });
//   }

//   try {
//     await sendEmail(
//       [process.env.SENDGRID_EMAIL, "itsjatin080@gmail.com"],
//       `New Contact Form Submission from ${name}`,
//       `<p>Name: ${name}</p><p>Email: ${email}</p><p>Service: ${service || "Not specified"}</p><p>Message: ${message || "No message provided"}</p>`
//     );
//     res.status(200).json({ status: "success", message: "Message sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Failed to send message" });
//   }
// });

// app.get("/uploads/:filename", (req, res) => {
//   const filePath = path.join(uploadDir, req.params.filename);
//   if (fs.existsSync(filePath)) {
//     res.download(filePath);
//   } else {
//     res.status(404).send("File not found");
//   }
// });

// app.listen(PORT, () => console.log(`🚀 NexAvian backend running on port ${PORT}`));
// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const sgMail = require("@sendgrid/mail");

// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const publicPath = path.join(__dirname, "public");
// app.use(express.static(publicPath));

// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Make the 'uploads' folder publicly accessible
// app.use('/uploads', express.static(uploadDir));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, `AVR-${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// // This function no longer needs to handle attachments
// async function sendEmail(to, subject, html) {
//   if (!to || to.length === 0) {
//     throw new Error("Recipient email is missing");
//   }
//   const msg = {
//     to,
//     from: {
//       email: process.env.SENDGRID_EMAIL,
//       name: 'NexAvian'
//     },
//     subject,
//     html,
//   };

//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error("SendGrid email error:", error.response?.body?.errors || error.message);
//     throw error;
//   }
// }

// app.get("/order", (req, res) => res.sendFile(path.join(publicPath, "order.html")));
// app.get("/join", (req, res) => res.sendFile(path.join(publicPath, "indexJoin.html")));
// app.get("/", (req, res) => res.sendFile(path.join(publicPath, "index.html")));

// app.get("/api/orders", (req, res) => res.json(orders));

// app.post("/api/order", upload.array("files", 5), async (req, res) => {
//   const { name, email, phone, service, details } = req.body;
//   if (!name || !email || !phone || !service || !details) {
//     return res.status(400).json({ status: "error", message: "Missing required fields" });
//   }

//   const orderId = `AVR-${Date.now().toString().slice(-6)}`;
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   orderOtpStore[orderId] = otp;

//   const newOrder = {
//     id: orderId, name, email, phone, service, details,
//     files: req.files ? req.files.map(f => f.filename) : [],
//     date: new Date().toISOString(),
//   };
//   orders.push(newOrder);

//   // Generate HTML with download links instead of attachments
//   let fileLinksHtml = '';
//   if (req.files && req.files.length > 0) {
//     const links = req.files.map(file => {
//       const url = `${process.env.BASE_URL}/uploads/${file.filename}`;
//       return `<li><a href="${url}" download>${file.originalname}</a></li>`;
//     }).join('');
//     fileLinksHtml = `<h3>Uploaded Files:</h3><ul>${links}</ul>`;
//   }

//   try {
//     const otpSubject = `Your NexAvian Verification Code`;
//     const otpHtml = `<p>Hello ${name},</p><p>To complete your order submission (ID: ${orderId}), please use the following verification code:</p><h2 style="font-size: 24px; letter-spacing: 2px; text-align: center;"><b>${otp}</b></h2><p>Thank you,<br>The NexAvian Team</p>`;
//     await sendEmail(email, otpSubject, otpHtml);

//     const adminEmailHtml = `<p><b>Order ID:</b> ${orderId}</p><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Service:</b> ${service}</p><p><b>Details:</b> ${details}</p>${fileLinksHtml}`;
//     await sendEmail(
//       [process.env.SENDGRID_EMAIL, "itsjatin080@gmail.com"],
//       `New Order Received - ${orderId}`,
//       adminEmailHtml // Send the HTML with links
//     );
//     res.status(200).json({ status: "success", orderId });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Failed to send email" });
//   }
// });

// app.post("/api/order/verify-otp", async (req, res) => {
//   const { orderId, otp } = req.body;
//   if (!orderId || !otp) {
//     return res.status(400).json({ status: "error", message: "Missing orderId or OTP" });
//   }
//   if (orderOtpStore[orderId] && parseInt(otp) === orderOtpStore[orderId]) {
//     delete orderOtpStore[orderId];
//     const order = orders.find(o => o.id === orderId);
//     if (order) {
//       try {
//         const confirmationSubject = `Your NexAvian Order #${orderId} is Confirmed!`;
//         const confirmationHtml = `<p>Hello ${order.name},</p><p>We're pleased to confirm that your order <b>#${orderId}</b> has been successfully submitted.</p><p>Our team will begin processing it shortly.</p><p>Thank you for choosing NexAvian!</p><p>Best regards,<br>The NexAvian Team</p>`;
//         await sendEmail(order.email, confirmationSubject, confirmationHtml);
//       } catch (err) {
//         console.error("Failed to send order confirmation email:", err);
//       }
//     }
//     return res.status(200).json({ status: "success", message: "Order confirmed!" });
//   }
//   res.status(400).json({ status: "error", message: "Invalid OTP" });
// });

// app.post("/api/join", upload.array("files", 5), async (req, res) => {
//   const { name, email, phone, skills, gender, dob } = req.body;
//   if (!name || !email || !phone || !skills || !gender || !dob) {
//     return res.status(400).json({ status: "error", message: "Missing required fields" });
//   }

//   const joinId = `JOIN-${Date.now().toString().slice(-6)}`;
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   joinOtpStore[joinId] = otp;

//   const newJoin = {
//     id: joinId, name, email, phone, skills, gender, dob,
//     files: req.files ? req.files.map(f => f.filename) : [],
//     date: new Date().toISOString(),
//   };
//   joinRequests.push(newJoin);

//   let fileLinksHtml = '';
//   if (req.files && req.files.length > 0) {
//     const links = req.files.map(file => {
//       const url = `${process.env.BASE_URL}/uploads/${file.filename}`;
//       return `<li><a href="${url}" download>${file.originalname}</a></li>`;
//     }).join('');
//     fileLinksHtml = `<h3>Uploaded Files:</h3><ul>${links}</ul>`;
//   }

//   try {
//     const otpSubject = `Your NexAvian Application Verification Code`;
//     const otpHtml = `<p>Hello ${name},</p><p>To verify your application to join NexAvian, please use the following code:</p><h2 style="font-size: 24px; letter-spacing: 2px; text-align: center;"><b>${otp}</b></h2><p>Thank you,<br>The NexAvian Team</p>`;
//     await sendEmail(email, otpSubject, otpHtml);

//     const adminEmailHtml = `<p><b>Join ID:</b> ${joinId}</p><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Skills:</b> ${skills}</p><p><b>Gender:</b> ${gender}</p><p><b>DOB:</b> ${dob}</p>${fileLinksHtml}`;
//     await sendEmail(
//       [process.env.SENDGRID_EMAIL, "itsjatin080@gmail.com"],
//       `New Join Request - ${joinId}`,
//       adminEmailHtml // Send the HTML with links
//     );
//     res.status(200).json({ status: "success", joinId });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Failed to send email" });
//   }
// });

// app.post("/api/join/verify-otp", async (req, res) => {
//   const { joinId, otp } = req.body;
//   if (!joinId || !otp) {
//     return res.status(400).json({ status: "error", message: "Missing joinId or OTP" });
//   }
//   if (joinOtpStore[joinId] && parseInt(otp) === joinOtpStore[joinId]) {
//     delete joinOtpStore[joinId];
//     const join = joinRequests.find(j => j.id === joinId);
//     if (join) {
//       try {
//         const confirmationSubject = `We've Received Your Application to Join NexAvian`;
//         const confirmationHtml = `<p>Hello ${join.name},</p><p>Thank you for your interest in joining the NexAvian team! We have received your application (ID: <b>${joinId}</b>).</p><p>Our team will review your submission and will get back to you if your profile matches our current needs.</p><p>Sincerely,<br>The NexAvian Team</p>`;
//         await sendEmail(join.email, confirmationSubject, confirmationHtml);
//       } catch (err) {
//         console.error("Failed to send join confirmation email:", err);
//       }
//     }
//     return res.status(200).json({ status: "success", message: "Join request submitted!" });
//   }
//   res.status(400).json({ status: "error", message: "Invalid OTP" });
// });

// app.post("/api/contact", async (req, res) => {
//   const { name, email, service, message } = req.body;
//   if (!name || !email) {
//     return res.status(400).json({ status: "error", message: "Name and Email are required." });
//   }
//   try {
//     await sendEmail(
//       [process.env.SENDGRID_EMAIL, "itsjatin080@gmail.com"],
//       `New Contact Form Submission from ${name}`,
//       `<p>Name: ${name}</p><p>Email: ${email}</p><p>Service: ${service || "Not specified"}</p><p>Message: ${message || "No message provided"}</p>`
//     );
//     res.status(200).json({ status: "success", message: "Message sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Failed to send message" });
//   }
// });

// app.get("/uploads/:filename", (req, res) => {
//   const filePath = path.join(uploadDir, req.params.filename);
//   if (fs.existsSync(filePath)) {
//     res.download(filePath);
//   } else {
//     res.status(404).send("File not found");
//   }
// });

// app.listen(PORT, () => console.log(`🚀 NexAvian backend running on port ${PORT}`));


const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `AVR-${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

let orders = [];
let joinRequests = [];
let orderOtpStore = {};
let joinOtpStore = {}; // <-- THIS LINE WAS MISSING

async function sendEmail(to, subject, html) {
  if (!to || to.length === 0) {
    throw new Error("Recipient email is missing");
  }
  const msg = {
    to,
    from: {
      email: process.env.SENDGRID_EMAIL,
      name: 'NexAvian'
    },
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("SendGrid email error:", error.response?.body?.errors || error.message);
    throw error;
  }
}

app.get("/order", (req, res) => res.sendFile(path.join(publicPath, "order.html")));
app.get("/join", (req, res) => res.sendFile(path.join(publicPath, "indexJoin.html")));
app.get("/", (req, res) => res.sendFile(path.join(publicPath, "index.html")));

app.get("/api/orders", (req, res) => res.json(orders));

app.post("/api/order", upload.array("files", 5), async (req, res) => {
  const { name, email, phone, service, details, Membership } = req.body;
  if (!name || !email || !phone || !service || !details) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  const orderId = `AVR-${Date.now().toString().slice(-6)}`;
  const otp = Math.floor(100000 + Math.random() * 900000);
  orderOtpStore[orderId] = otp;

  const newOrder = {
    id: orderId, name, email, phone, service, details, Membership,
    files: req.files ? req.files.map(f => f.filename) : [],
    date: new Date().toISOString(),
  };
  orders.push(newOrder);

  let fileLinksHtml = '';
  if (req.files && req.files.length > 0) {
    const links = req.files.map(file => {
      const url = `${process.env.BASE_URL}/uploads/${file.filename}`;
      return `<li><a href="${url}" download>${file.originalname}</a></li>`;
    }).join('');
    fileLinksHtml = `<h3>Uploaded Files:</h3><ul>${links}</ul>`;
  }

  try {
    const otpSubject = `Your NexAvian Verification Code`;
    const otpHtml = `<p>Hello ${name},</p><p>To complete your order submission (ID: ${orderId}), please use the following verification code:</p><h2 style="font-size: 24px; letter-spacing: 2px; text-align: center;"><b>${otp}</b></h2><p>Thank you,<br>The NexAvian Team</p>`;
    await sendEmail(email, otpSubject, otpHtml);

    const adminEmailHtml = `
      <p><b>Order ID:</b> ${orderId}</p>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Service:</b> ${service}</p>
      <p><b>Membership:</b> ${Membership || 'Not selected'}</p>
      <p><b>Details:</b> ${details}</p>
      ${fileLinksHtml}
    `;
    await sendEmail(
      [process.env.SENDGRID_EMAIL, "itsjatin080@gmail.com"],
      `New Order Received - ${orderId}`,
      adminEmailHtml
    );
    res.status(200).json({ status: "success", orderId });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to send email" });
  }
});

app.post("/api/order/verify-otp", async (req, res) => {
  const { orderId, otp } = req.body;
  if (!orderId || !otp) {
    return res.status(400).json({ status: "error", message: "Missing orderId or OTP" });
  }
  if (orderOtpStore[orderId] && parseInt(otp) === orderOtpStore[orderId]) {
    delete orderOtpStore[orderId];
    const order = orders.find(o => o.id === orderId);
    if (order) {
      try {
        const confirmationSubject = `Your NexAvian Order #${orderId} is Confirmed!`;
        const confirmationHtml = `<p>Hello ${order.name},</p><p>We're pleased to confirm that your order <b>#${orderId}</b> has been successfully submitted.</p><p>Our team will contact you for files.</p><p>Our team will begin processing it shortly.</p><p>Thank you for choosing NexAvian!</p><p>Best regards,<br>The NexAvian Team</p>`;
        await sendEmail(order.email, confirmationSubject, confirmationHtml);
      } catch (err) {
        console.error("Failed to send order confirmation email:", err);
      }
    }
    return res.status(200).json({ status: "success", message: "Order confirmed!" });
  }
  res.status(400).json({ status: "error", message: "Invalid OTP" });
});

app.post("/api/join", upload.array("files", 5), async (req, res) => {
  const { name, email, phone, skills, gender, dob } = req.body;
  if (!name || !email || !phone || !skills || !gender || !dob) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  const joinId = `JOIN-${Date.now().toString().slice(-6)}`;
  const otp = Math.floor(100000 + Math.random() * 900000);
  joinOtpStore[joinId] = otp;

  const newJoin = {
    id: joinId, name, email, phone, skills, gender, dob,
    files: req.files ? req.files.map(f => f.filename) : [],
    date: new Date().toISOString(),
  };
  joinRequests.push(newJoin);

  let fileLinksHtml = '';
  if (req.files && req.files.length > 0) {
    const links = req.files.map(file => {
      const url = `${process.env.BASE_URL}/uploads/${file.filename}`;
      return `<li><a href="${url}" download>${file.originalname}</a></li>`;
    }).join('');
    fileLinksHtml = `<h3>Uploaded Files:</h3><ul>${links}</ul>`;
  }

  try {
    const otpSubject = `Your NexAvian Application Verification Code`;
    const otpHtml = `<p>Hello ${name},</p><p>To verify your application to join NexAvian, please use the following code:</p><h2 style="font-size: 24px; letter-spacing: 2px; text-align: center;"><b>${otp}</b></h2><p>Thank you,<br>The NexAvian Team</p>`;
    await sendEmail(email, otpSubject, otpHtml);

    const adminEmailHtml = `<p><b>Join ID:</b> ${joinId}</p><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Skills:</b> ${skills}</p><p><b>Gender:</b> ${gender}</p><p><b>DOB:</b> ${dob}</p>${fileLinksHtml}`;
    await sendEmail(
      [process.env.SENDGRID_EMAIL, "itsjatin080@gmail.com"],
      `New Join Request - ${joinId}`,
      adminEmailHtml
    );
    res.status(200).json({ status: "success", joinId });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to send email" });
  }
});

app.post("/api/join/verify-otp", async (req, res) => {
  const { joinId, otp } = req.body;
  if (!joinId || !otp) {
    return res.status(400).json({ status: "error", message: "Missing joinId or OTP" });
  }
  if (joinOtpStore[joinId] && parseInt(otp) === joinOtpStore[joinId]) {
    delete joinOtpStore[joinId];
    const join = joinRequests.find(j => j.id === joinId);
    if (join) {
      try {
        const confirmationSubject = `We've Received Your Application to Join NexAvian`;
        const confirmationHtml = `<p>Hello ${join.name},</p><p>Thank you for your interest in joining the NexAvian team! We have received your application (ID: <b>${joinId}</b>).</p><p>Our team will review your submission and will get back to you if your profile matches our current needs.</p><p>Sincerely,<br>The NexAvian Team</p>`;
        await sendEmail(join.email, confirmationSubject, confirmationHtml);
      } catch (err) {
        console.error("Failed to send join confirmation email:", err);
      }
    }
    return res.status(200).json({ status: "success", message: "Join request submitted!" });
  }
  res.status(400).json({ status: "error", message: "Invalid OTP" });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, service, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ status: "error", message: "Name and Email are required." });
  }
  try {
    await sendEmail(
      [process.env.SENDGRID_EMAIL, "itsjatin080@gmail.com"],
      `New Contact Form Submission from ${name}`,
      `<p>Name: ${name}</p><p>Email: ${email}</p><p>Service: ${service || "Not specified"}</p><p>Message: ${message || "No message provided"}</p>`
    );
    res.status(200).json({ status: "success", message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to send message" });
  }
});

app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send("File not found");
  }
});

app.listen(PORT, () => console.log(`🚀 NexAvian backend running on port ${PORT}`));