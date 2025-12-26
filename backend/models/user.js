// models/User.js
const mongoose = require("mongoose");

// Expanding the user schema to include profile information
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: {
    type: String,
    trim: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    gender: { 
      type: String,
      enum: ["male", "female", "other", "prefer not to say"]
    },
    contactNumber: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String }
    }
  },
  role: {
    type: String,
    enum: ["user", "researcher", "admin"],
    default: "user"
  },
  consentToDataUse: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  lastLogin: { type: Date }
}, { timestamps: true });

// Indexes for performance (email already unique -> implicit index)
userSchema.index({ role: 1 });

// Remove password from responses
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
