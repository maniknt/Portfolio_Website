const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Routes
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// ==============================
// Middleware
// ==============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==============================
// API Routes
// ==============================

app.use("/api/projects", projectRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API Running 🚀",
  });
});

// ==============================
// 404 Route
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});