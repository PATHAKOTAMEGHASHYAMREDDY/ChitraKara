// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const customerSchema = new mongoose.Schema(
//   {
//     cname: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     cemail: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     cpassword: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// // Hashing password before saving
// customerSchema.pre("save", async function (next) {
//   if (!this.isModified("cpassword")) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.cpassword = await bcrypt.hash(this.cpassword, salt);
//   next();
// });

// // Password verification method
// customerSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.cpassword);
// };

// const Customer = mongoose.model("Customer", customerSchema);
// module.exports = Customer;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Changed to bcryptjs for consistency

const customerSchema = new mongoose.Schema(
  {
    cname: {
      type: String,
      required: true,
      unique: true,
    },
    cemail: {
      type: String,
      required: true,
      unique: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
    resetPasswordOTP: { type: String }, // Added for OTP storage
    resetPasswordExpires: { type: Number }, // Added for OTP expiration
  },
  { timestamps: true }
);

// Hashing password before saving
customerSchema.pre("save", async function (next) {
  if (!this.isModified("cpassword")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.cpassword = await bcrypt.hash(this.cpassword, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password verification method
customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.cpassword);
};

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;