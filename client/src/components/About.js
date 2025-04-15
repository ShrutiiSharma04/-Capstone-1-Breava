import React from "react";

function About() {
  // Replace 'YOUR_IMAGE_URL_HERE' with the actual URL to display your image.
  const imageUrl = "YOUR_IMAGE_URL_HERE";

  return (
    <div className="about-container">
      {/* Top Section / Banner */}
      <div className="about-hero">
        <h1>About Our Platform</h1>
        <p>
          Our breast cancer detection platform combines advanced machine learning
          models with medical expertise to provide accurate and reliable
          screening assistance. We utilize three powerful algorithms:
          <br />
          SVM, KNN, and Fuzzy ELM-RBE,
          <br />
          each bringing unique strengths to the detection process.
        </p>
      </div>

      {/* Image + Features Section */}
      <div className="about-content">
        {/* Left side: Pink Ribbon Image */}
        <div className="about-image">
          <img src={imageUrl} alt="Breast Cancer Illustration" />
        </div>

        {/* Right side: Feature highlights */}
        <div className="about-features">
          <h2>Reliable</h2>
          <p>High accuracy rates with multiple model validation.</p>
          <h2>Intelligent</h2>
          <p>
            Advanced ML algorithms for precise detection.
          </p>
          <h2>Fast</h2>
          <p>
            Quick results without compromising accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;