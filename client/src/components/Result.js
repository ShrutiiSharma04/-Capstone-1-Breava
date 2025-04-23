import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css"; // reuse auth card styling if desired

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  // Redirect back if no result in state
  useEffect(() => {
    if (!result) {
      navigate('/', { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null; // or a loading indicator

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Diagnosis Result</h2>
        <p>
          The sample is diagnosed as: <strong>{result}</strong>
        </p>
        <button
          className="back-btn"
          onClick={() => navigate('/', { replace: true })}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
