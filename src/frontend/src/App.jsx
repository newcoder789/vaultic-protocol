import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Hero from "./components/Hero";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
// import GetLoan from "./pages/GetLoan";
// import GiveLoan from "./pages/GiveLoan";
// import HowItWorks from "./pages/HowItWorks";
<<<<<<< HEAD
{/* <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    {/*<Route path="/get-loan" element={<GetLoan />} />
=======
import Header from "./components/header"; 
import Hero from "./components/Hero";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
export default function App() {
  useEffect(()=>{
    AOS.init({
      duration:1500,
      once:true,
    })
  })
  return (
   <main>
    {/*Gradient image*/}
    <img className="absolute top-0 right-0 opacity-60 -z-10" src="/gradient.png" alt="Gradient-img"/>
    {/*Blur effect */}
    <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-[30deg] -z-10"></div>
    <Header/>
    <Hero/>
   </main>
  )
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/get-loan" element={<GetLoan />} />
>>>>>>> 0cc23d34717e6cd4724be30921d7d6840d359a50
        <Route path="/give-loan" element={<GiveLoan />} />
        <Route path="/how-it-works" element={<HowItWorks />} /> */}
//   </Routes>
// </Router> */}
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
      <img className="absolute top-0 right-0 opacity-60 -z-10  " src="/images/gradient.png" alt="Gradient-img" />
      {/*Blur effect */}
      <div className="absolute top-[30%] right-[5%] w-[30rem] h-[30rem] rounded-full bg-[#e99b63] opacity-40 blur-[200px] -z-10"></div>
      <div className="absolute top-[35%] right-[10%] w-[15rem] h-[15rem] rounded-full bg-[#f7ab6c] opacity-60 blur-[100px] -z-10"></div>


      <Header />
      <Hero />
    </main>
  )
}