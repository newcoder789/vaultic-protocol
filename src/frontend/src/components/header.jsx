import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../../../declarations/core_protocol_canister/index.js';
// import { canisterId } from 'declarations/backend/index.js';
// import {idlfactory} from "../../../declarations/core_protocol_canister/core_protocol_canister.did.js"

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8080'; // Local

// Reusable button component
const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;

const Header = () => {
  const canisterId = "u6s2n-gx777-77774-qaaba-cai";
  const [actor, setActor] = useState(null);
  const [state, setState] = useState({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false,
    principal: 'Click "Whoami" to see your principal ID'
  });

  // Initialize auth client
  useEffect(() => {
    updateActor();
  }, []);

  const updateActor = async () => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      }
    });
    setActor(actor)
    const isAuthenticated = await authClient.isAuthenticated();

    setState((prev) => ({
      ...prev,
      actor,
      authClient,
      isAuthenticated
    }));
  };

  const login = async () => {
    conso
    await state.authClient.login({
      identityProvider,
      onSuccess: updateActor
    });
  };

  const logout = async () => {
    await state.authClient.logout();
    updateActor();
  };

  const whoami = async () => {
    setState((prev) => ({
      ...prev,
      principal: 'Loading...'
    }));

    const result = await state.actor.whoami();
    const principal = result.toString();
    setState((prev) => ({
      ...prev,
      principal
    }));
  };

  return (
    <div className='text-white text-lg p-6 rounded-lg shadow-md top-0 left-0 right-0 mx-auto max-w-4xl'>
      <h1>Who Am I?</h1>
      <div id="info-box" className="info-box">
        <div className="info-content">
          <p>
            <i className="fas fa-info-circle"></i> A <strong>principal</strong> is a unique identifier in the Internet
            Computer ecosystem.
          </p>
          <p>
            It represents an entity (user, canister smart contract, or other) and is used for identification and
            authorization purposes.
          </p>
          <p>
            In this example, click "Whoami" to find out the principal ID with which you're interacting with the backend.
            If you're not signed in, you will see that you're using the so-called anonymous principal, "2vxsx-fae".
          </p>
          <p>
            After you've logged in with Internet Identity, you'll see a longer principal, which is unique to your
            identity and the dHeader you're using.
          </p>
        </div>
      </div>

      {!state.isAuthenticated ? (
        <Button 
        className= "rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={login}>Login with Internet Identity</Button>
      ) : (
          <Button
            className="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out" onClick={logout}>Logout</Button>
      )}

      <Button className="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out" onClick={whoami}>Whoami</Button>

      {state.principal && (
        <div>
          <h2>Your principal ID is:</h2>
          <h4>{state.principal}</h4>
        </div>
      )}
    </div>
  );
};

export default Header;