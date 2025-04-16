import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Frame } from "./screens/Frame";
import { Auth } from "./screens/Auth";
import { Diagnose } from "./screens/Diagnose";
import { About } from "./screens/About";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Frame />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </StrictMode>
);