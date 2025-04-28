// src/pages/Diagnose.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Diagnose() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError]               = useState("");
  const { isLoggedIn }                  = useContext(AuthContext);
  const navigate                        = useNavigate();

  const handleFileChange = (e) => {
    setError("");
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }
    if (!isLoggedIn) {
      setError("You must be signed in to diagnose.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // axios.defaults.baseURL = http://localhost:5000
      // x-auth-token header is attached automatically by AuthContext
      const res = await axios.post("/api/diagnose", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/result", { state: { result: res.data.result } });
    } catch (err) {
      console.error("Error during diagnosis:", err);
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="diagnose-container">
      <h1>Breast Cancer Diagnosis</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="upload-box">
        <h2>Upload Files</h2>
        <p>Select and upload the files of your choice</p>

        <div className="drag-drop-area">
          {selectedFile ? (
            <p className="file-name">{selectedFile.name}</p>
          ) : (
            <p className="drag-drop-text">
              Choose a file or drag & drop it here
            </p>
          )}
          <p className="drag-drop-formats">.CSV files only</p>
          <label className="browse-btn">
            Browse File
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit for Analysis
        </button>
      </div>
    </div>
  );
}