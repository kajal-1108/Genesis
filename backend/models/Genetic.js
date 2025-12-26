const mongoose = require("mongoose");

// SNP data schema for storing individual genetic markers
const snpSchema = new mongoose.Schema({
  rsid: { type: String, required: true },  // SNP identifier (e.g., rs429358)
  genotype: { type: String, required: true }, // Genotype (e.g., "AA", "AG", "GG")
});

// Genetic data schema - comprehensive model for genetic information
const geneticSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true,
    min: 0,
    max: 120 
  },
  gender: { 
    type: String, 
    required: true,
    enum: ["male", "female", "other"]
  },
  familyHistory: { 
    type: String 
  },
  // Array of SNP data for the user
  snpData: [snpSchema],
  // Prediction results
  predictions: {
    eyeColor: { 
      type: String,
      enum: ["Blue", "Green", "Brown", "Other", "Unknown"]
    },
    height: { 
      type: Number // in cm
    },
    diseaseRisks: [{
      condition: { type: String },
      risk: { 
        type: String,
        enum: ["Low", "Moderate", "High", "Unknown"] 
      },
      confidence: { 
        type: Number,
        min: 0,
        max: 1
      }
    }]
  },
  dataSource: {
    type: String,
    enum: ["manual", "23andMe", "AncestryDNA", "MyHeritage", "other"],
    default: "manual"
  }
}, { timestamps: true });

// Indexes for query optimization
geneticSchema.index({ userId: 1 });
geneticSchema.index({ "snpData.rsid": 1 });

module.exports = mongoose.model("Genetic", geneticSchema);