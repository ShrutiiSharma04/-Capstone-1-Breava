import React, { useState } from "react";

function Diagnose() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle file upload here (e.g., send to server)
    alert(`Submitted file: ${selectedFile ? selectedFile.name : "None"}`);
  };

  return (
    <div className="diagnose-container">
      <h1>Breast Cancer Diagnosis</h1>
      <div className="upload-box">
        <h2>Upload files</h2>
        <p>Select and upload the files of your choice</p>

        <div className="drag-drop-area">
          <p className="drag-drop-text">
            Choose a file or drag &amp; drop it here
          </p>
          <p className="drag-drop-formats">
            JPEG, PNG, PDG, and MP4 formats, up to 500MB
          </p>
          <label className="browse-btn">
            Browse File
            <input
              type="file"
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
