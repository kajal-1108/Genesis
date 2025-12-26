const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const FamilyTree = require("../models/FamilyTree");

// @route   POST /api/family-tree
// @desc    Create a new family tree
// @access  Private
router.post(
  "/",
  [
    auth,
    check("name", "Family tree name is required").not().isEmpty(),
    check("members", "Members array is required").isArray(),
    check("relationships", "Relationships array is required").isArray(),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, description, members, relationships, visualSettings, isPublic } = req.body;
      
      // Create new family tree
      const familyTree = new FamilyTree({
        userId: req.user._id,
        name,
        description,
        members,
        relationships,
        visualSettings,
        isPublic: isPublic || false
      });
      
      await familyTree.save();
      
      res.status(201).json(familyTree);
    } catch (err) {
      console.error("Create family tree error:", err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   GET /api/family-tree
// @desc    Get all user's family trees
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const familyTrees = await FamilyTree.find({ userId: req.user._id })
      .select("-members -relationships") // Exclude detailed arrays for faster response
      .sort({ updatedAt: -1 });
    
    res.json(familyTrees);
  } catch (err) {
    console.error("Get family trees error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   GET /api/family-tree/:id
// @desc    Get a specific family tree by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const familyTree = await FamilyTree.findById(req.params.id);
    
    // Check if tree exists
    if (!familyTree) {
      return res.status(404).json({ msg: "Family tree not found" });
    }
    
    // Check if user owns tree or if tree is public
    if (familyTree.userId.toString() !== req.user._id.toString() && !familyTree.isPublic) {
      return res.status(403).json({ msg: "Not authorized to access this family tree" });
    }
    
    res.json(familyTree);
  } catch (err) {
    console.error("Get family tree error:", err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: "Family tree not found" });
    }
    
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   PUT /api/family-tree/:id
// @desc    Update a family tree
// @access  Private
router.put(
  "/:id",
  [
    auth,
    check("name", "Name cannot be empty").optional().not().isEmpty(),
    check("members", "Members must be an array").optional().isArray(),
    check("relationships", "Relationships must be an array").optional().isArray()
  ],
  validate,
  async (req, res) => {
    try {
      const { name, description, members, relationships, visualSettings, isPublic } = req.body;
      
      // Find family tree
      const familyTree = await FamilyTree.findById(req.params.id);
      
      // Check if tree exists
      if (!familyTree) {
        return res.status(404).json({ msg: "Family tree not found" });
      }
      
      // Check ownership
      if (familyTree.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ msg: "Not authorized to update this family tree" });
      }
      
      // Update fields if provided
      if (name !== undefined) familyTree.name = name;
      if (description !== undefined) familyTree.description = description;
      if (members !== undefined) familyTree.members = members;
      if (relationships !== undefined) familyTree.relationships = relationships;
      if (visualSettings !== undefined) familyTree.visualSettings = visualSettings;
      if (isPublic !== undefined) familyTree.isPublic = isPublic;
      
      await familyTree.save();
      
      res.json(familyTree);
    } catch (err) {
      console.error("Update family tree error:", err.message);
      
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: "Family tree not found" });
      }
      
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   DELETE /api/family-tree/:id
// @desc    Delete a family tree
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find family tree
    const familyTree = await FamilyTree.findById(req.params.id);
    
    // Check if tree exists
    if (!familyTree) {
      return res.status(404).json({ msg: "Family tree not found" });
    }
    
    // Check ownership
    if (familyTree.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized to delete this family tree" });
    }
    
    await familyTree.deleteOne();
    
    res.json({ msg: "Family tree removed" });
  } catch (err) {
    console.error("Delete family tree error:", err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: "Family tree not found" });
    }
    
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   POST /api/family-tree/:id/member
// @desc    Add a new member to family tree
// @access  Private
router.post(
  "/:id/member",
  [
    auth,
    check("name", "Name is required").not().isEmpty(),
    check("gender", "Gender must be one of: male, female, other").isIn(["male", "female", "other"]),
    check("generation", "Generation must be a number").isNumeric()
  ],
  validate,
  async (req, res) => {
    try {
      const { name, gender, generation, birthYear, traits, isAlive, notes } = req.body;
      
      // Find family tree
      const familyTree = await FamilyTree.findById(req.params.id);
      
      // Check if tree exists
      if (!familyTree) {
        return res.status(404).json({ msg: "Family tree not found" });
      }
      
      // Check ownership
      if (familyTree.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ msg: "Not authorized to update this family tree" });
      }
      
      // Create new member
      const newMember = {
        name,
        gender,
        generation,
        birthYear,
        traits: traits || {},
        isAlive: isAlive !== undefined ? isAlive : true,
        notes
      };
      
      // Add to family tree
      familyTree.members.push(newMember);
      await familyTree.save();
      
      res.json({
        msg: "Member added",
        member: newMember,
        memberId: familyTree.members.length - 1 // Index of the new member
      });
    } catch (err) {
      console.error("Add member error:", err.message);
      
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: "Family tree not found" });
      }
      
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   POST /api/family-tree/:id/relationship
// @desc    Add a new relationship to family tree
// @access  Private
router.post(
  "/:id/relationship",
  [
    auth,
    check("parent", "Parent index is required").isNumeric(),
    check("child", "Child index is required").isNumeric()
  ],
  validate,
  async (req, res) => {
    try {
      const { parent, child } = req.body;
      
      // Find family tree
      const familyTree = await FamilyTree.findById(req.params.id);
      
      // Check if tree exists
      if (!familyTree) {
        return res.status(404).json({ msg: "Family tree not found" });
      }
      
      // Check ownership
      if (familyTree.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ msg: "Not authorized to update this family tree" });
      }
      
      // Validate member indices
      if (parent >= familyTree.members.length || parent < 0) {
        return res.status(400).json({ msg: "Invalid parent index" });
      }
      
      if (child >= familyTree.members.length || child < 0) {
        return res.status(400).json({ msg: "Invalid child index" });
      }
      
      // Check if relationship already exists
      const existingRelationship = familyTree.relationships.some(
        rel => rel[0] === parent && rel[1] === child
      );
      
      if (existingRelationship) {
        return res.status(400).json({ msg: "Relationship already exists" });
      }
      
      // Add relationship
      familyTree.relationships.push([parent, child]);
      await familyTree.save();
      
      res.json({
        msg: "Relationship added",
        relationship: [parent, child]
      });
    } catch (err) {
      console.error("Add relationship error:", err.message);
      
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: "Family tree not found" });
      }
      
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   GET /api/family-tree/public
// @desc    Get public family trees
// @access  Public
router.get("/public", async (req, res) => {
  try {
    const publicTrees = await FamilyTree.find({ isPublic: true })
      .select("-members -relationships") // Exclude detailed arrays for faster response
      .sort({ updatedAt: -1 })
      .limit(10); // Limit to 10 most recent
    
    res.json(publicTrees);
  } catch (err) {
    console.error("Get public trees error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;