import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Hero from "./components/Hero";
import AOS from 'aos';
import 'aos/dist/aos.css';



import "@nfid/identitykit/react/styles.css"
import { IdentityKitProvider, IdentityKitTheme } from "@nfid/identitykit/react"

import { IdentityKitAuthType } from "@nfid/identitykit";
import { NFIDW, InternetIdentity, Stoic, OISY } from "@nfid/identitykit"
import { useAgent } from "@nfid/identitykit/react"
import { HttpAgent } from "@dfinity/agent"
import { useEffect, useState } from "react"
import { AuthenticatedSection } from "./helpers/agent";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  // const ICP_API_HOST

  return (
    <IdentityKitProvider
      authType={IdentityKitAuthType.ACCOUNTS}
      signerClientOptions={{
        targets: ["core_protocol_canister", "auction_governance_canister"], 
      }}
      signers={[NFIDW, InternetIdentity, Stoic, OISY]}
      featuredSigner={NFIDW}
      theme={IdentityKitTheme.DARK} 
      >
      <main className="relative z-10">

        {/* BACKGROUND VISUALS */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/*Gradient image*/}
          <img className="absolute top-0 right-0 opacity-60" src="/images/gradient.png" alt="Gradient-img" />

          {/*Blur effect*/}
          <div className="absolute top-[30%] right-[5%] w-[30rem] h-[30rem] rounded-full bg-[#e99b63] opacity-40 blur-[200px]"></div>
          <div className="absolute top-[35%] right-[10%] w-[15rem] h-[15rem] rounded-full bg-[#f7ab6c] opacity-60 blur-[100px]"></div>
        </div>

        {/* ACTUAL CONTENT */}
        <Header />
        <AuthenticatedSection />
        <Hero />
      </main>
    </IdentityKitProvider>
  )
}