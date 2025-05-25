import React, { useMemo } from "react"
import { useAgent } from "@nfid/identitykit/react"
import { Actor } from "@dfinity/agent"


import { idlFactory as targetIdlFactory } from "../../../declarations/core_protocol_canister/core_protocol_canister.did.js";

const TARGET_CANISTER_ID = "u6s2n-gx777-77774-qaaba-cai";

export function AuthenticatedSection() {
    const authenticatedAgent = useAgent();

    const authenticatedActor = useMemo(() => {
        if (!authenticatedAgent) return null;

        return Actor.createActor(targetIdlFactory, {
            agent: "u6s2n-gx777-77774-qaaba-cai",
            canisterId: TARGET_CANISTER_ID,
        });
    }, [authenticatedAgent]);


    const tryingActor = async () => {
        console.log("Trying to call actor methods...");
        if (!authenticatedActor) {
            alert("Actor not initialized. Connect your wallet first.");
            return;
        }

        try {
            const result1 = await authenticatedActor.greet("Aryan");
            console.log("Result of greet:", result1);

            // const result2 = await authenticatedActor.icrc28_trusted_origins({
            //     origin: "https://example.com",
            //     canisterId: "u6s2n-gx777-77774-qaaba-cai",
            // });
            // console.log("Result of icrc28_trusted_origins:", result2);
        } catch (err) {
            console.error("Actor call failed:", err);
        }
    };

    return (
        <button
            onClick={tryingActor}
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
        >
            Test Actor
        </button>
    );
}
