 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Hero from "./components/Hero";
import AOS from 'aos';
import 'aos/dist/aos.css';


import { useAgent } from "@nfid/identitykit/react"
import { HttpAgent } from "@dfinity/agent"
import { useEffect, useState } from "react"
import { AuthenticatedSection } from "./helpers/agent";
import { useAuth } from "@nfid/identitykit/react"

import NFTMetadataFetcher from "./components/NFTMetadataFetcher";
  export default function App() {
    
    const { connect, disconnect, isConnecting, user } = useAuth()
  const [userPrincipal, setUserPrincipal] = useState(null);
  useEffect(() => {
    requestAnimationFrame(() => {
      AOS.init({
        duration: 1500,
        once: true,
      });
    });
  }, []);
  

  useEffect(() => {
    // Check if user is authenticated (e.g., via NFID)
    if (!isConnecting && user?.principal) {  
      console.log("User principal set:", user.principal);
      setUserPrincipal(user.principal.toText());
    } else {
      console.log("User is not connected, principal is null");
      setUserPrincipal(null);
    }
  }, [user, isConnecting]);
  // const ICP_API_HOST

  return (
      <main className="relative z-10">
        {/* BACKGROUND VISUALS */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/*Gradient image*/}
          <img className="absolute top-0 right-0 opacity-60" src="/images/gradient.png" alt="Gradient-img" />

          {/*Blur effect*/}
        {/* Temporarily reduce blur */}
        <div className="absolute top-[30%] right-[5%] w-[30rem] h-[30rem] rounded-full bg-[#e99b63] opacity-40 blur-[50px]"></div>

          <div className="absolute top-[35%] right-[10%] w-[15rem] h-[15rem] rounded-full bg-[#f7ab6c] opacity-60 blur-[100px]"></div>
        </div>

        {/* ACTUAL CONTENT */}
        <Header />
        <Hero />
        
        <AuthenticatedSection />

      {/* Add NFT Metadata Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6">Your NFTs</h2>
        {userPrincipal ? (
          <div style={{ minHeight: "200px", border: "1px solid #ccc" }}>
            <NFTMetadataFetcher userPrincipal={userPrincipal} />
          </div>
        ) : (
          <p>Connect your wallet to view NFTs.</p>
        )}
      </section>

      </main>
  )
}