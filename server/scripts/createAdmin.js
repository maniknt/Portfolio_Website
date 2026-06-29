const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("../models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
    });

    await admin.save();

    console.log("✅ Admin Created Successfully");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });