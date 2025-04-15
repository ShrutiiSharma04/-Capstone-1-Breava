const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// -------------------------
// MongoDB Connection Setup
// -------------------------
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

// -------------------------
// Define a Mongoose Model
// -------------------------
const recordSchema = new mongoose.Schema({
  filename: String,
  result: String,
  createdAt: { type: Date, default: Date.now },
});
const Record = mongoose.model("Record", recordSchema);

// -------------------------
// Setup Multer for File Uploads
// -------------------------
const upload = multer({ dest: "uploads/" });

// -------------------------
// API Endpoints
// -------------------------

// Test Route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Demo Diagnose Endpoint
app.post("/api/diagnose", upload.single("file"), async (req, res) => {
  // Simulate a model by randomly returning "malignant" or "benign"
  const result = Math.random() < 0.5 ? "malignant" : "benign";
  const filename = req.file ? req.file.originalname : "unknown_file";

  // Save record to MongoDB
  const newRecord = new Record({ filename, result });
  newRecord.save()
  .then(() => {
    res.json({ result });
  })
  .catch((err) => {
    console.error("Error saving record:", err);
    res.status(500).json({ error: "Failed to save record" });
  });

});

// Get All Diagnosis Records
app.get("/api/records", (req, res) => {
  Record.find()
    .sort({ createdAt: -1 })
    .exec((err, records) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Failed to fetch records" });
      }
      res.json(records);
    });
});

// -------------------------
// Start the Server
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
