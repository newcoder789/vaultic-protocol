import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GetLoan from "./pages/GetLoan";
import GiveLoan from "./pages/GiveLoan";
import HowItWorks from "./pages/HowItWorks";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-loan" element={<GetLoan />} />
        <Route path="/give-loan" element={<GiveLoan />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </Router>
  );
};

export default App;
