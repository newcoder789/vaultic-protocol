// Set this before rendering the component
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';


import "@nfid/identitykit/react/styles.css"
import { IdentityKitProvider, IdentityKitTheme } from "@nfid/identitykit/react"

import { IdentityKitAuthType } from "@nfid/identitykit";
import { NFIDW, InternetIdentity, Stoic, OISY, MockedSigner } from "@nfid/identitykit"
// internet_identity: http://127.0.0.1:8080/?canisterId=ucwa4-rx777-77774-qaada-cai&id=ulvla-h7777-77774-qaacq-cai
// InternetIdentity.providerUrl = "http://localhost:4943/?canisterId=ucwa4-rx777-77774-qaada-cai&id=ulvla-h7777-77774-qaacq-cai"; 
// InternetIdentity.providerUrl = "https://identity.internetcomputer.org/"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IdentityKitProvider
      authType={IdentityKitAuthType.STANDARD}
      signerClientOptions={{
        targets: ["core_protocol_canister", "auction_governance_canister", "dip721_nft_container "],
        derivationOrigin: "http://localhost:3000",
        // derivationOrigin: "https://ulvla-h7777-77774-qaacq-cai.icp0.io",  
      }}
      signers={[
        InternetIdentity,
        NFIDW, Stoic, OISY]}
      featuredSigner={InternetIdentity} 
      theme={IdentityKitTheme.DARK}
      agentOptions={{ host: "http://127.0.0.1:8080" }}
    >
      <App />
    </IdentityKitProvider>
  </React.StrictMode>,
);

