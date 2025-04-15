import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result } = location.state || { result: "unknown" };

  return (
    <div className="result-container">
      <h1>Diagnosis Result</h1>
      <p>
        The sample is diagnosed as: <strong>{result}</strong>
      </p>
      <button className="back-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default Result;
