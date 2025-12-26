const mongoose = require("mongoose");

// Individual family member schema
const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  birthYear: { type: Number },
  generation: { type: Number, required: true }, // 0, 1, 2, etc. (generation level)
  traits: {
    eyeColor: { 
      type: String,
      enum: ["Blue", "Green", "Brown", "Other", "Unknown"],
      default: "Unknown"
    },
    height: { type: Number }, // in cm
    diseaseHistory: [{ 
      condition: { type: String },
      diagnosed: { type: Boolean, default: false },
      ageOfOnset: { type: Number }
    }],
    geneticMarkers: [{
      rsid: { type: String },
      genotype: { type: String }
    }]
  },
  isAlive: { type: Boolean, default: true },
  notes: { type: String }
});

// Family tree schema
const familyTreeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { type: String },
  members: [familyMemberSchema],
  // Relationships stored as pairs of [parent, child] indices into the members array
  relationships: [[{ type: Number }]],
  // For visualization metadata
  visualSettings: {
    layout: { type: String, default: "vertical" }, // vertical, horizontal, radial
    colorScheme: { type: String, default: "default" }
  },
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

// Indexes
familyTreeSchema.index({ userId: 1 });
familyTreeSchema.index({ "members.name": 1 });

module.exports = mongoose.model("FamilyTree", familyTreeSchema);