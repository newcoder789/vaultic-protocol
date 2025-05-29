// src/components/NFTMetadataFetcher.jsx
import { useState, useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as dip721Idl } from "../../../declarations/dip721_nft_container/dip721_nft_container.did.js"; // Import DIP-721 interface
import { Principal } from "@dfinity/principal";
import { useAuth } from "@nfid/identitykit/react"


import "./hero.css";

export default function NFTMetadataFetcher({ userPrincipal }) {
  
    const { connect, disconnect, isConnecting, user } = useAuth()
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!userPrincipal) return;

        const fetchNFTs = async () => {
            setLoading(true);
            try {
                const agent = new HttpAgent({ host: "http://127.0.0.1:8080" }); // If using Plug wallet
                await agent.fetchRootKey().catch((err) => {
                    console.warn("Unable to fetch root key:", err);
                  });
                // const nftCanisterId = "e3izy-jiaaa-aaaah-qacbq-cai"; // Example: Entrepot NFT canister
                const nftCanisterId = "uzt4z-lp777-77774-qaabq-cai"; 
                // Initialize NFT canister actor
                const nftActor = Actor.createActor(dip721Idl, {
                    agent,
                    canisterId: nftCanisterId,
                });
                console.log("NFT Actor initialized:", nftActor);   
                if (!isConnecting && user?.principal){
                        const userPrincipal = user.principal;
                        console.log("User Principal:", userPrincipal);
                        console.log("Calling ownerTokenIds with principal:", userPrincipal.toText());
                        // Fetch user's NFTs
                        // const tokenIds = await nftActor.ownerTokenIdentifiers(userPrincipal);
        
                        // Convert userPrincipal to Principal object
                        const tokenIds = await nftActor.ownerTokenIds(userPrincipal);
                        const nftMetadata = await Promise.all(
                            tokenIds.map(async (id) => {
                                const metadata = await nftActor.getMetadata(id);
                                return {
                                    id,
                                    name: metadata.name,
                                    image: metadata.image,
                                    attributes: metadata.attributes,
                                };
                            })
                        );
                        console.log("Fetched NFT Metadata:", nftMetadata);  
                        console.log("User Principal:", tokenIds);
                        setNfts(nftMetadata);
                } 
            } catch (error) {
                console.error("Failed to fetch NFTs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNFTs();
    }, [userPrincipal]);

    if (loading) return <div>Loading NFTs...</div>;

    return (
        <div className="nft-grid">
            {nfts.map((nft) => (
                <div key={nft.id} className="nft-card">
                    <img src={nft.image} alt={nft.name} />
                    <h3>{nft.name}</h3>
                    <ul>
                        {nft.attributes.map((attr, i) => (
                            <li key={i}>
                                <strong>{attr.trait_type}:</strong> {attr.value}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}