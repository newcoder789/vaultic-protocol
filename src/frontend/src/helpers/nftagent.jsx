import { useAgent } from "@nfid/identitykit/react";

const agent = useAgent();

import { Actor } from "@dfinity/agent";
import { idlFactory as dip721Idl } from "../dip721/dip721.did.js"; // path to your IDL
const DIP721_CANISTER_ID = "your-nft-canister-id";

const nftActor = useMemo(() => {
    if (!agent) return null;

    return Actor.createActor(dip721Idl, {
        agent,
        canisterId: DIP721_CANISTER_ID,
    });
}, [agent]);
