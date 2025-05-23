import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Hero from "../components/Hero";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
// import GetLoan from "./pages/GetLoan";
// import GiveLoan from "./pages/GiveLoan";
// import HowItWorks from "./pages/HowItWorks";
    <Router>
      <Routes>
       <Route path="/" element={<Home />} />
        {/*<Route path="/get-loan" element={<GetLoan />} />
        <Route path="/give-loan" element={<GiveLoan />} />
        <Route path="/how-it-works" element={<HowItWorks />} /> */}
      </Routes>
    </Router>
export default function App() {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true,
        })
    })
    return (
        <main>
            {/*Gradient image*/}
            <img className="absolute top-0 right-0 opacity-60 -z-10" src="/images/gradient.png" alt="Gradient-img" />
            {/*Blur effect */}
            <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-[30deg] -z-10"></div>
            <Header />
            <Hero />
        </main>
    )
}