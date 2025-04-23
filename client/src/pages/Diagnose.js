import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Diagnose() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setError("");
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }
    if (!token) {
      setError("You must be signed in to diagnose.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/diagnose", {
        method: "POST",
        headers: {
          "x-auth-token": token
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      navigate("/result", { state: { result: data.result } });
    } catch (err) {
      console.error("Error during diagnosis:", err);
      setError(err.message || "There was an error processing your request.");
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
              Choose a file or drag &amp; drop it here
            </p>
          )}
          <p className="drag-drop-formats">
            JPEG, PNG, PDF, and MP4 formats, up to 500MB
          </p>
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

export default Diagnose;
