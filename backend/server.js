const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

let orders = [];
let joinRequests = [];
let orderOtpStore = {};
let joinOtpStore = {};

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `AVR-${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Serve frontend pages
app.get("/", (req, res) => res.sendFile(path.join(publicPath, "index.html")));
app.get("/order", (req, res) => res.sendFile(path.join(publicPath, "order.html")));
app.get("/join", (req, res) => res.sendFile(path.join(publicPath, "indexJoin.html")));

// Order APIs
app.get("/api/orders", (req, res) => res.json(orders));

app.post("/api/order", upload.single("file"), (req, res) => {
  const { name, email, phone, service, details } = req.body;
  if (!name || !email || !phone || !service || !details)
    return res.json({ status: "error", message: "Missing fields" });

  const orderId = `AVR-${Date.now().toString().slice(-6)}`;
  const newOrder = { id: orderId, name, email, phone, service, details, file: req.file ? req.file.filename : null, date: new Date().toISOString() };
  orders.push(newOrder);

  const otp = Math.floor(100000 + Math.random() * 900000);
  orderOtpStore[orderId] = otp;

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your NexAvian Order OTP",
    text: `Hello ${name},\n\nYour OTP for order confirmation is: ${otp}\nOrder ID: ${orderId}\n\n— Averian Team`,
  });

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER + ",itsjatin080@gmail.com",
    subject: "New Order Received - Averian",
    text: `Order ID: ${orderId}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nDetails: ${details}`,
    attachments: req.file ? [{ filename: req.file.originalname, path: path.join(uploadDir, req.file.filename) }] : [],
  });

  res.json({ status: "success", orderId });
});

app.post("/api/order/verify-otp", (req, res) => {
  const { orderId, otp } = req.body;
  if (!orderId || !otp) return res.json({ status: "error", message: "Missing fields" });

  if (orderOtpStore[orderId] && parseInt(otp) === orderOtpStore[orderId]) {
    delete orderOtpStore[orderId];
    const order = orders.find(o => o.id === orderId);
    if (order)
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: order.email,
        subject: "Your NexAvian Order is Confirmed ✅",
        html: `<p>Hello <b>${order.name}</b>,</p>
               <p>Your order with ID <b>${orderId}</b> has been successfully confirmed!</p>
               <p>Join our Averian community for updates: 
                  <a href="https://chat.whatsapp.com/LbeYZAwJd3xLICkabQFIuI" target="_blank">Click here to open WhatsApp group</a>
               </p>
               <p>Your order is being processed by our professionals. Thank you!</p>
               <p>— NexAvian Team</p>`,
      });

    return res.json({ status: "success", message: "Order OTP verified and confirmation email sent!" });
  }

  res.json({ status: "error", message: "Invalid OTP" });
});

// Join APIs
app.post("/api/join", upload.single("file"), (req, res) => {
  const { name, email, phone, skills, gender, dob } = req.body;
  if (!name || !email || !phone || !skills || !gender || !dob)
    return res.json({ status: "error", message: "Missing fields" });

  const joinId = `JOIN-${Date.now().toString().slice(-6)}`;
  const newJoin = { id: joinId, name, email, phone, skills, gender, dob, file: req.file ? req.file.filename : null, date: new Date().toISOString() };
  joinRequests.push(newJoin);

  const otp = Math.floor(100000 + Math.random() * 900000);
  joinOtpStore[joinId] = otp;

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your NexAvian Join OTP",
    text: `Hello ${name},\n\nYour OTP for joining Averian is: ${otp}\nJoin ID: ${joinId}\n\n— NexAvian Team`,
  });

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER + ",itsjatin080@gmail.com",
    subject: "New Join Request - NexAvian",
    text: `Join ID: ${joinId}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSkills: ${skills}\nGender: ${gender}\nDOB: ${dob}`,
    attachments: req.file ? [{ filename: req.file.originalname, path: path.join(uploadDir, req.file.filename) }] : [],
  });

  res.json({ status: "success", joinId });
});

app.post("/api/join/verify-otp", (req, res) => {
  const { joinId, otp } = req.body;
  if (!joinId || !otp) return res.json({ status: "error", message: "Missing fields" });

  if (joinOtpStore[joinId] && parseInt(otp) === joinOtpStore[joinId]) {
    delete joinOtpStore[joinId];
    const join = joinRequests.find(j => j.id === joinId);
    if (join)
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: join.email,
        subject: "NexAvian Form Submitted Successfully ✅",
        html: `<p>Hello <b>${join.name}</b>,</p>
               <p>Your form with ID <b>${joinId}</b> has been successfully submitted!</p>
               <p>Our Averian team will review your application and contact you soon.</p>
               <p>Join our community for updates: 
                  <a href="https://chat.whatsapp.com/LbeYZAwJd3xLICkabQFIuI" target="_blank">Join WhatsApp Community</a>
               </p>
               <p>— NexAvian Team</p>`,
      });

    return res.json({ status: "success", message: "Join OTP verified and confirmation email sent!" });
  }

  res.json({ status: "error", message: "Invalid OTP" });
});

// Contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, service, message } = req.body;
  if (!name || !email) return res.status(400).json({ status: "error", message: "Name and Email are required." });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER + ",itsjatin080@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service || "Not specified"}\nMessage: ${message || "No message provided"}`,
    });
    res.json({ status: "success", message: "Message sent successfully!" });
  } catch {
    res.status(500).json({ status: "error", message: "Failed to send message." });
  }
});

// Serve uploads
app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (fs.existsSync(filePath)) res.download(filePath);
  else res.status(404).send("File not found");
});

// Catch-all route for SPA
app.get("/", (req, res) => res.sendFile(path.join(publicPath, "index.html")));

// Start server
app.listen(PORT, () => console.log(`🚀 NexAvian backend running on port ${PORT}`));
