const express = require("express");
const router = express.Router();
const Artist = require("../models/artistusers");
const Customer = require("../models/customerusers");
// Artist Signup Route
router.post("/artistsignup", async (req, res) => {
  try {
    const { sname, semail, spassword } = req.body;

    // Check if all fields are provided
    if (!sname || !semail || !spassword) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if email is already registered
    const existingUser = await Artist.findOne({ semail });
    if (existingUser) {
      return res.status(400).send({ error: "Email is already registered" });
    }

    // Create new artist and save
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

    // Check if all fields are provided
    if (!semail || !spassword) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Find the artist by email
    const artist = await Artist.findOne({ semail });
    if (!artist) {
      return res.status(400).send({ error: "Invalid Email or Password" });
    }

    // Compare entered password with stored hashed password
    const isMatch = await artist.comparePassword(spassword);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid Email or Password",username:artist.sname });
    }

    res.status(200).send({ message: "Artist Login Successful",username:artist.sname });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ error: "Server Error during Login" });
  }
});
router.post("/customersignup", async (req, res) => {
    try {
      const { cname, cemail, cpassword } = req.body;
  
      // Check if customer already exists
      const existingCustomer = await Customer.findOne({ cemail });
      if (existingCustomer) {
        return res.status(400).json({ error: "Email already registered" });
      }
  
      // Create new customer
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
  
      // Check if customer exists
      const customer = await Customer.findOne({ cemail });
      if (!customer) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      // Compare passwords
      const isMatch = await customer.matchPassword(cpassword);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      res.status(200).json({ message: "Customer Login Successful" ,username:customer.cname});
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Customer Login Failed" });
    }
  });
module.exports = router;
