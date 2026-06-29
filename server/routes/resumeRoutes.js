const express = require("express");
const router = express.Router();

const Resume = require("../models/Resume");

// ==========================
// GET Resume
// ==========================
router.get("/", async (req, res) => {
  try {
    const resume = await Resume.findOne();

    res.json(resume);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ==========================
// ADD / UPDATE Resume
// ==========================
router.post("/", async (req, res) => {
  try {
    const existing = await Resume.findOne();

    if (existing) {
      existing.resume = req.body.resume;

      await existing.save();

      return res.json({
        success: true,
        message: "Resume Updated Successfully",
      });
    }

    const resume = new Resume({
      resume: req.body.resume,
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: "Resume Added Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;