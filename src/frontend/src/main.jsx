// Set this before rendering the component
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';


import "@nfid/identitykit/react/styles.css"
import { IdentityKitProvider, IdentityKitTheme } from "@nfid/identitykit/react"

import { IdentityKitAuthType } from "@nfid/identitykit";
import { NFIDW, InternetIdentity, Stoic, OISY, MockedSigner } from "@nfid/identitykit"
// internet_identity: http://127.0.0.1:4943/?canisterId=ucwa4-rx777-77774-qaada-cai&id=ulvla-h7777-77774-qaacq-cai
// InternetIdentity.providerUrl = "http://localhost:4943/?canisterId=ucwa4-rx777-77774-qaada-cai&id=ulvla-h7777-77774-qaacq-cai"; 
// InternetIdentity.providerUrl = "https://identity.internetcomputer.org/"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IdentityKitProvider
      authType={IdentityKitAuthType.STANDARD}
      signerClientOptions={{
        targets: ["u6s2n-gx777-77774-qaaba-cai", "uxrrr-q7777-77774-qaaaq-cai", "uzt4z-lp777-77774-qaabq-cai"],
        derivationOrigin: "http://localhost:3000",
        // derivationOrigin: "https://ulvla-h7777-77774-qaacq-cai.icp0.io",  
      }}
      signers={[
        InternetIdentity,
        NFIDW, Stoic, OISY]}
      featuredSigner={InternetIdentity} 
      theme={IdentityKitTheme.DARK}
      agentOptions={{ host: "http://127.0.0.1:4943/" }}
    >
      <App />
    </IdentityKitProvider>
  </React.StrictMode>,
);

