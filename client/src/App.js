import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Diagnose from "./components/Diagnose";
import About from "./components/About";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Breava</Link>
        <div className="nav-links">
          <Link to="/diagnose">Diagnose</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
