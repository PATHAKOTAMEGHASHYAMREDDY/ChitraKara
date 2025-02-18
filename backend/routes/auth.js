const express = require("express");
const router = express.Router();
const Artist = require("../models/artistusers");
const Customer = require("../models/customerusers");
const mongoose = require("mongoose");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Painting = require("../models/painting");
// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dktvtxucf",
  api_key: "387231481659719",
  api_secret: "r9kUS7Ty_XI-b1D2OQq23vJS9jk",
});

// Cloudinary Storage Setup with Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chitrakara-paintings",
    allowedFormats: ["jpg", "jpeg", "png"]
  }
});
const upload = multer({ storage });

// Painting Schema

// Artist Signup Route
router.post("/artistsignup", async (req, res) => {
  try {
    const { sname, semail, spassword } = req.body;

    if (!sname || !semail || !spassword) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const existingUser = await Artist.findOne({ semail });
    if (existingUser) {
      return res.status(400).send({ error: "Email is already registered" });
    }

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

    if (!semail || !spassword) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const artist = await Artist.findOne({ semail });
    if (!artist) {
      return res.status(400).send({ error: "Invalid Email or Password" });
    }

    const isMatch = await artist.comparePassword(spassword);
    if (!isMatch) {
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
    if (existingCustomer) {
      return res.status(400).json({ error: "Email already registered" });
    }

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
    if (!customer) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await customer.matchPassword(cpassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Customer Login Successful", username: customer.cname });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Customer Login Failed" });
  }
});

// Upload Painting Route
router.post("/uploadpainting", upload.single("image"), async (req, res) => {
  try {
    const { title, price, contact, artist } = req.body;
    const imageUrl = req.file.path;

    const newPainting = new Painting({
      title,
      imageUrl,
      price,
      contact,
      artist
    });

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

module.exports = router;
