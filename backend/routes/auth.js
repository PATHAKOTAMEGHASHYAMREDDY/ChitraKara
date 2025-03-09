const express = require("express");
const router = express.Router();
const Artist = require("../models/artistusers");
const Customer = require("../models/customerusers");
const mongoose = require("mongoose");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Painting = require("../models/painting");
const bcrypt = require("bcryptjs");
const Order = require("../models/orders");
const CustomPaintingRequest = require("../models/custompaintingrequest");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dktvtxucf",
  api_key: "387231481659719",
  api_secret: "r9kUS7Ty_XI-b1D2OQq23vJS9jk",
});

// Storage setups for Cloudinary
const paintingStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: "chitrakara-paintings", allowedFormats: ["jpg", "jpeg", "png"] },
});

const requestStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: "chitrakara-custom-requests", allowedFormats: ["jpg", "jpeg", "png"] },
});

const paintingUpload = multer({ storage: paintingStorage });
const requestUpload = multer({ storage: requestStorage });

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "meghashyamreddy014@gmail.com",
    pass: process.env.EMAIL_PASS || "amfs nznb wsbg snna",
  },
});

// Artist Signup Route
router.post("/artistsignup", async (req, res) => {
  try {
    const { sname, semail, spassword } = req.body;
    if (!sname || !semail || !spassword) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const existingUser = await Artist.findOne({ semail });
    if (existingUser) return res.status(400).send({ error: "Email is already registered" });
    const artist = new Artist({ sname, semail, spassword });
    await artist.save();
    res.status(201).send({ message: "Artist Signup Successful" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send({ error: "Server Error during Signup" });
  }
});

// Artist Login Route
router.post("/artistlogin", async (req, res) => {
  try {
    const { semail, spassword } = req.body;
    if (!semail || !spassword) return res.status(400).send({ error: "All fields are required" });
    const artist = await Artist.findOne({ semail });
    if (!artist || !(await artist.comparePassword(spassword))) {
      return res.status(400).send({ error: "Invalid Email or Password" });
    }
    res.status(200).send({ message: "Artist Login Successful", username: artist.sname });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ error: "Server Error during Login" });
  }
});

// Customer Signup Route
router.post("/customersignup", async (req, res) => {
  try {
    const { cname, cemail, cpassword } = req.body;
    const existingCustomer = await Customer.findOne({ cemail });
    if (existingCustomer) return res.status(400).json({ error: "Email already registered" });
    const customer = new Customer({ cname, cemail, cpassword });
    await customer.save();
    res.status(201).json({ message: "Customer Signup Successful" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Customer Signup Failed" });
  }
});

// Customer Login Route
router.post("/customerlogin", async (req, res) => {
  try {
    const { cemail, cpassword } = req.body;
    const customer = await Customer.findOne({ cemail });
    if (!customer || !(await customer.matchPassword(cpassword))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    res.status(200).json({ message: "Customer Login Successful", username: customer.cname, email: cemail });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Customer Login Failed" });
  }
});

// Order Route with Email Notification
router.post("/order", async (req, res) => {
  try {
    const { customerName, artistName, paintingTitle, price, contact, imageUrl, customerAddress, customerPhone } = req.body;

    if (!customerName || !artistName || !paintingTitle || !price || !contact || !imageUrl || !customerAddress || !customerPhone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const order = new Order({
      customerName,
      artistName,
      paintingTitle,
      price,
      contact,
      imageUrl,
      customerAddress,
      customerPhone,
    });
    await order.save();

    // Fetch artist's email
    const artist = await Artist.findOne({ sname: artistName });
    if (!artist) {
      console.error(`Artist ${artistName} not found for email notification`);
    } else {
      const mailOptions = {
        from: process.env.EMAIL_USER || "meghashyamreddy014@gmail.com",
        to: artist.semail,
        subject: `New Order Received: ${paintingTitle}`,
        text: `
          Hello ${artistName},

          You have received a new order from ${customerName}!
          Details:
          - Painting: ${paintingTitle}
          - Price: ₹${price}
          - Customer Contact: ${customerPhone}
          - Delivery Address: ${customerAddress}
          - Image URL: ${imageUrl}

          Please contact the customer at ${contact} to proceed with the order.

          Regards,
          ChitraKara Team
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Order email sent to ${artist.semail}`);
    }

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Fetch All Orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Fetch Customer Orders
router.get("/customerorders/:customerName", async (req, res) => {
  try {
    const orders = await Order.find({ customerName: req.params.customerName });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({ error: "Failed to fetch your orders" });
  }
});

// Upload Painting Route
router.post("/uploadpainting", paintingUpload.single("image"), async (req, res) => {
  try {
    const { title, price, contact, artist } = req.body;
    const imageUrl = req.file.path;
    const newPainting = new Painting({ title, imageUrl, price, contact, artist });
    await newPainting.save();
    res.status(201).send({ message: "Painting uploaded successfully!" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).send({ error: "Painting upload failed!" });
  }
});

// Fetch All Paintings
router.get("/paintings", async (req, res) => {
  try {
    const paintings = await Painting.find({});
    res.status(200).json(paintings);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).send({ error: "Failed to fetch paintings!" });
  }
});

// Fetch All Artists
router.get("/artists", async (req, res) => {
  try {
    const artists = await Artist.find({}, "sname _id");
    res.status(200).json(artists);
  } catch (error) {
    console.error("Error fetching artists:", error);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
});

// Custom Painting Request Route with Email Notification
router.post("/custompaintingrequest", requestUpload.single("image"), async (req, res) => {
  try {
    const { name, address, phone, artist, customerEmail } = req.body;
    const imageUrl = req.file.path;
    const newRequest = new CustomPaintingRequest({
      name,
      address,
      phone,
      imageUrl,
      artist,
      customerEmail,
    });
    await newRequest.save();

    // Fetch artist's email
    const artistData = await Artist.findOne({ sname: artist });
    if (!artistData) {
      console.error(`Artist ${artist} not found for email notification`);
    } else {
      const mailOptions = {
        from: process.env.EMAIL_USER || "meghashyamreddy014@gmail.com",
        to: artistData.semail,
        subject: `New Custom Painting Request from ${name}`,
        text: `
          Hello ${artist},

          You have received a new custom painting request from ${name}!
          Details:
          - Customer Name: ${name}
          - Delivery Address: ${address}
          - Phone: ${phone}
          - Reference Image: ${imageUrl}
          - Customer Email: ${customerEmail}

          Please contact the customer at ${phone} or ${customerEmail} to discuss further.

          Regards,
          ChitraKara Team
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Request email sent to ${artistData.semail}`);
    }

    res.status(201).json({
      message: "Custom painting request submitted successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error("Custom Request Error:", error);
    res.status(500).json({ error: "Failed to submit custom painting request" });
  }
});

// Artist: Get Custom Painting Requests
router.get("/customrequests/:artistName", async (req, res) => {
  try {
    const requests = await CustomPaintingRequest.find({ artist: req.params.artistName });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Fetch Requests Error:", error);
    res.status(500).json({ error: "Failed to fetch custom requests" });
  }
});

// Artist: Update Request Status
router.put("/customrequests/:requestId", async (req, res) => {
  try {
    const { status } = req.body;
    const request = await CustomPaintingRequest.findByIdAndUpdate(
      req.params.requestId,
      { status },
      { new: true }
    );
    res.status(200).json({ message: `Request ${status} successfully`, request });
  } catch (error) {
    console.error("Update Request Error:", error);
    res.status(500).json({ error: "Failed to update request status" });
  }
});

// Customer: Get their Custom Requests
router.get("/myrequests/:customerEmail", async (req, res) => {
  try {
    const requests = await CustomPaintingRequest.find({ customerEmail: req.params.customerEmail });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Fetch My Requests Error:", error);
    res.status(500).json({ error: "Failed to fetch your requests" });
  }
});

// Delete Painting Route
router.delete("/paintings/:paintingId", async (req, res) => {
  try {
    const paintingId = req.params.paintingId;
    const painting = await Painting.findById(paintingId);
    if (!painting) {
      return res.status(404).json({ error: "Painting not found" });
    }
    const publicId = painting.imageUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`chitrakara-paintings/${publicId}`);
    await Painting.findByIdAndDelete(paintingId);
    res.status(200).json({ message: "Painting deleted successfully" });
  } catch (error) {
    console.error("Delete Painting Error:", error);
    res.status(500).json({ error: "Failed to delete painting" });
  }
});

// Forgot Password - Generate and Send OTP
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, userType } = req.body;
    if (!email || !userType) {
      return res.status(400).json({ error: "Email and user type are required" });
    }

    let user;
    if (userType === "artist") {
      user = await Artist.findOne({ semail: email });
    } else if (userType === "customer") {
      user = await Customer.findOne({ cemail: email });
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = otpExpires;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER || "meghashyamreddy014@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ error: "Failed to process password reset request" });
  }
});

// Reset Password - Avoid pre.save hook
router.post("/reset-password", async (req, res) => {
  try {
    const { email, userType, otp, newPassword } = req.body;
    if (!email || !userType || !otp || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const submittedOtp = String(otp);
    let Model;
    let emailField;
    let passwordField;

    if (userType === "artist") {
      Model = Artist;
      emailField = "semail";
      passwordField = "spassword";
    } else if (userType === "customer") {
      Model = Customer;
      emailField = "cemail";
      passwordField = "cpassword";
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    const user = await Model.findOne({
      [emailField]: email,
      resetPasswordOTP: submittedOtp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await Model.updateOne(
      { _id: user._id },
      {
        $set: { [passwordField]: hashedPassword },
        $unset: { resetPasswordOTP: "", resetPasswordExpires: "" },
      }
    );

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

module.exports = router;