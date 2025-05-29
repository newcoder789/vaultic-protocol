// Set this before rendering the component
InternetIdentity.providerUrl = "http://localhost:8080/?canisterId=umunu-kh777-77774-qaaca-cai"; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';


import "@nfid/identitykit/react/styles.css"
import { IdentityKitProvider, IdentityKitTheme } from "@nfid/identitykit/react"

import { IdentityKitAuthType } from "@nfid/identitykit";
import { NFIDW, InternetIdentity, Stoic, OISY } from "@nfid/identitykit"




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IdentityKitProvider
      authType={IdentityKitAuthType.ACCOUNTS}
      signerClientOptions={{
        targets: ["core_protocol_canister", "auction_governance_canister"],
      }}
      signers={[
        InternetIdentity,
        NFIDW, Stoic, OISY]}
      featuredSigner={NFIDW}
      theme={IdentityKitTheme.DARK}
      agentOptions={{ host: "http://127.0.0.1:8080" }}
    >
      <App />
    </IdentityKitProvider>
  </React.StrictMode>,
);

