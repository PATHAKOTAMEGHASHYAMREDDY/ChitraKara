const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const artistSchema = new mongoose.Schema(
  {
    sname: { type: String, required: true, unique: true },
    semail: { type: String, required: true, unique: true },
    spassword: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving to database
artistSchema.pre("save", async function (next) {
  if (!this.isModified("spassword")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.spassword = await bcrypt.hash(this.spassword, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare entered password with stored hashed password
artistSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.spassword);
};

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
