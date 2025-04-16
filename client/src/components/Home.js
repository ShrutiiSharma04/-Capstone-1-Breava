import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Early Detection Saves Lives</h1>
        <p>
          Our AI-powered breast cancer detection platform combines advanced
          machine learning with medical expertise for accurate and early
          detection.
        </p>
        <div className="hero-buttons">
          <Link to="/diagnose">
            <button className="diagnose-btn">Start Free Diagnose</button>
          </Link>
          <Link to="/about">
            <button className="learnmore-btn">Learn More</button>
          </Link>
        </div>
      </header>

      <section className="features-section">
        <div className="feature-card">
          <h2>AI-Powered Analysis</h2>
          <p>
            Advanced machine learning models (GVM, RNN, Fuzzy 
            ESH-BP) for accurate results.
          </p>
        </div>
        <div className="feature-card">
          <h2>Quick Results</h2>
          <p>
            Get comprehensive analysis and receive initial results 
            within minutes.
          </p>
        </div>
        <div className="feature-card">
          <h2>Privacy First</h2>
          <p>
            Advanced machine learning models ensure data security 
            and user anonymity.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Take the First Step Towards Early Detection</h2>
        <p>Our platform is designed to support you every step of the way.</p>
        <Link to="/diagnose">
          <button className="diagnose-btn">Start Free Diagnose</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;