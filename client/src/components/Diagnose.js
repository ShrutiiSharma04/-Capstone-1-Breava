import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Diagnose() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/diagnose", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // Navigate to Result page with the diagnosis result
      navigate("/result", { state: { result: data.result } });
    } catch (error) {
      console.error("Error during diagnosis:", error);
      alert("There was an error processing your request.");
    }
  };

  return (
    <div className="diagnose-container">
      <h1>Breast Cancer Diagnosis</h1>
      <div className="upload-box">
        <h2>Upload Files</h2>
        <p>Select and upload the files of your choice</p>
        <div className="drag-drop-area">
          <p className="drag-drop-text">Choose a file or drag &amp; drop it here</p>
          <p className="drag-drop-formats">JPEG, PNG, PDF, and MP4 formats, up to 500MB</p>
          <label className="browse-btn">
            Browse File
            <input
              type="file"
              name="file"              // <-- Added name attribute
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
