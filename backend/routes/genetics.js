const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const Genetic = require("../models/Genetic");

// Mock machine learning model predictions
// In production, this would integrate with a Python ML service
const mockPredictions = {
  eyeColor: (snpData) => {
    // Simplified eye color prediction logic based on common SNPs
    // For real implementation, this would call a trained ML model API
    const eyeColorSNPs = {
      "rs12913832": { "GG": "Blue", "AG": "Green", "AA": "Brown" },
      "rs1800407": { "CC": "Blue", "CT": "Green", "TT": "Green" },
      "rs16891982": { "CC": "Brown", "CG": "Brown", "GG": "Other" }
    };
    
    // Check if we have any of the key SNPs
    for (const rsid of Object.keys(eyeColorSNPs)) {
      const snp = snpData.find(s => s.rsid === rsid);
      if (snp && eyeColorSNPs[rsid][snp.genotype]) {
        return {
          prediction: eyeColorSNPs[rsid][snp.genotype],
          confidence: 0.7 + Math.random() * 0.2 // Mock confidence score
        };
      }
    }
    
    // Default values if no key SNPs are found
    const colors = ["Blue", "Green", "Brown", "Other"];
    return {
      prediction: colors[Math.floor(Math.random() * colors.length)],
      confidence: 0.5 + Math.random() * 0.3
    };
  },
  
  height: (snpData, gender, age) => {
    // Simplified height prediction based on gender and random variation
    // For real implementation, this would use SNP data with a trained model
    const baseHeight = gender === "male" ? 175 : 162; // Average heights in cm
    const heightVariation = 10; // ±10 cm variation
    
    return {
      prediction: baseHeight + (Math.random() * 2 - 1) * heightVariation,
      confidence: 0.6 + Math.random() * 0.2
    };
  },
  
  diseaseRisk: (snpData, familyHistory) => {
    // Common conditions to predict
    const conditions = [
      "Type 2 Diabetes", 
      "Coronary Heart Disease",
      "Alzheimer's Disease", 
      "Certain Cancers",
      "Hypertension"
    ];
    
    // Generate predictions for each condition
    return conditions.map(condition => {
      // Check if condition is mentioned in family history
      const familyRiskFactor = familyHistory && 
        familyHistory.toLowerCase().includes(condition.toLowerCase()) ? 0.3 : 0;
      
      // Base probability plus family history factor
      const riskProbability = 0.1 + Math.random() * 0.3 + familyRiskFactor;
      
      // Convert probability to risk category
      let risk;
      if (riskProbability < 0.2) risk = "Low";
      else if (riskProbability < 0.5) risk = "Moderate";
      else risk = "High";
      
      return {
        condition,
        risk,
        confidence: 0.5 + Math.random() * 0.3
      };
    });
  }
};

// @route   POST /api/genetics/predict
// @desc    Submit genetic data and get predictions
// @access  Private
router.post(
  "/predict",
  [
    auth,
    check("name", "Name is required").not().isEmpty(),
    check("age", "Age must be a number between 0 and 120").isInt({ min: 0, max: 120 }),
    check("gender", "Gender must be one of: male, female, other").isIn(["male", "female", "other"]),
    check("familyHistory", "Family history is required").not().isEmpty(),
    check("snpData", "SNP data must be an array").optional().isArray()
  ],
  validate,
  async (req, res) => {
    try {
      const { name, age, gender, familyHistory, snpData = [], dataSource = "manual" } = req.body;
      
      // Generate predictions using our mock ML models
      // In production, this would call a Python microservice
      const eyeColorPrediction = mockPredictions.eyeColor(snpData);
      const heightPrediction = mockPredictions.height(snpData, gender, age);
      const diseaseRiskPredictions = mockPredictions.diseaseRisk(snpData, familyHistory);
      
      // Create genetic data entry with predictions
      const geneticData = new Genetic({
        userId: req.user._id,
        name,
        age,
        gender,
        familyHistory,
        snpData,
        predictions: {
          eyeColor: eyeColorPrediction.prediction,
          height: heightPrediction.prediction,
          diseaseRisks: diseaseRiskPredictions
        },
        dataSource
      });
      
      await geneticData.save();
      
      // Return predictions
      res.json({
        id: geneticData._id,
        predictions: {
          eyeColor: {
            value: eyeColorPrediction.prediction,
            confidence: eyeColorPrediction.confidence
          },
          height: {
            value: Math.round(heightPrediction.prediction),
            confidence: heightPrediction.confidence
          },
          diseaseRisks: diseaseRiskPredictions
        }
      });
    } catch (err) {
      console.error("Prediction error:", err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   GET /api/genetics/history
// @desc    Get user's genetic prediction history
// @access  Private
router.get("/history", auth, async (req, res) => {
  try {
    const geneticHistory = await Genetic.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("-snpData"); // Exclude raw SNP data for faster responses
    
    res.json(geneticHistory);
  } catch (err) {
    console.error("Get history error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   GET /api/genetics/:id
// @desc    Get specific genetic prediction by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const genetic = await Genetic.findById(req.params.id);
    
    // Check if record exists
    if (!genetic) {
      return res.status(404).json({ msg: "Genetic record not found" });
    }
    
    // Check ownership
    if (genetic.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized to access this record" });
    }
    
    res.json(genetic);
  } catch (err) {
    console.error("Get genetic record error:", err.message);
    
    // Check if error is due to invalid ObjectId
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: "Genetic record not found" });
    }
    
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   DELETE /api/genetics/:id
// @desc    Delete a genetic record
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const genetic = await Genetic.findById(req.params.id);
    
    // Check if record exists
    if (!genetic) {
      return res.status(404).json({ msg: "Genetic record not found" });
    }
    
    // Check ownership
    if (genetic.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized to delete this record" });
    }
    
    await genetic.deleteOne();
    res.json({ msg: "Genetic record removed" });
  } catch (err) {
    console.error("Delete genetic record error:", err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: "Genetic record not found" });
    }
    
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   POST /api/genetics/upload
// @desc    Upload and parse genetic data file (23andMe, AncestryDNA, etc.)
// @access  Private
router.post("/upload", auth, async (req, res) => {
  // Note: In a real implementation, you would:
  // 1. Use multer to handle file upload
  // 2. Parse the specific format (23andMe, AncestryDNA, etc.)
  // 3. Extract the SNP data
  // 4. Save it to the database
  
  // For this example, we'll just return a mock response
  res.json({
    msg: "File upload feature would be implemented here",
    details: "Would use multer middleware to handle file uploads and a parser for genetic data formats"
  });
});

module.exports = router;