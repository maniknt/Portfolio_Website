const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const upload = require("../middleware/upload");

// ======================
// GET All Projects
// ======================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// ADD Project
// ======================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      github: req.body.github,
      live: req.body.live,
      image: req.file ? req.file.path : "",
    });

    await project.save();

    res.status(201).json({
      message: "Project Added Successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ======================
// UPDATE Project
// ======================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      github: req.body.github,
      live: req.body.live,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after",
      }
    );

    res.json({
      message: "Project Updated Successfully",
      project: updatedProject,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ======================
// DELETE Project
// ======================
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;