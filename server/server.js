const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Example server route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
