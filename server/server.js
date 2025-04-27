const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

const auth = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const Record = require("./models/Record");

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection Setup
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Breava";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Setup Multer for File Uploads to disk
const upload = multer({ dest: "uploads/" });

// Auth Routes
app.use("/api/auth", authRoutes);

// Public Test Route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Protected Diagnose Endpoint: forward to Flask & save records
app.post(
  "/api/diagnose",
  auth,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "no file uploaded" });
    }

    const filePath = req.file.path;
    try {
      // Build form-data for Flask
      const form = new FormData();
      form.append("file", fs.createReadStream(filePath), req.file.originalname);

      // Call Flask service
      const flaskRes = await axios.post(
        "http://localhost:8008/predict_csv",
        form,
        { headers: form.getHeaders() }
      );
      const results = flaskRes.data.results; // ['benign','malignant',...]

      // Save each result as a separate Record
      const recordDocs = results.map((r) => ({
        user: req.user.id,
        filename: req.file.originalname,
        result: r,
      }));
      await Record.insertMany(recordDocs);

      // Return array to client
      return res.json({ result: results });
    } catch (err) {
      // Log full details
      console.error("Flask error status:", err.response?.status);
      console.error("Flask error body:  ", err.response?.data);
      // Forward the actual error message to client
      const msg = err.response?.data?.error || err.message;
      return res
      .status(err.response?.status || 500)
      .json({ error: msg });
    } finally {
      // Clean up uploaded file
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error("Failed to delete file:", unlinkErr);
      });
    }
  }
);

// Protected Get All Diagnosis Records
app.get("/api/records", auth, async (req, res) => {
  try {
    const records = await Record.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
