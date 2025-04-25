const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
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

// Setup Multer for File Uploads
const upload = multer({ dest: "uploads/" });

// Auth Routes
app.use("/api/auth", authRoutes);

// Public Test Route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Protected Diagnose Endpoint
app.post(
  "/api/diagnose",
  auth,
  upload.single("file"),
  async (req, res) => {
    try {
      const result = Math.random() < 0.5 ? "malignant" : "benign";
      const filename = req.file ? req.file.originalname : "unknown_file";

      const newRecord = new Record({
        user: req.user.id,
        filename,
        result,
      });
      await newRecord.save();
      res.json({ result });
    } catch (err) {
      console.error("Error saving record:", err);
      res.status(500).json({ error: "Failed to save record" });
    }
  }
);

// Protected Get All Diagnosis Records
app.get("/api/records", auth, async (req, res) => {
  try {
    const records = await Record
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });
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
