import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/core_protocol_canister/core_protocol_canister.did.js';
import { idlFactory as dip721IdlFactory } from '../../../declarations/dip721_nft_container/dip721_nft_container.did.js';
import { useAuth } from "@nfid/identitykit/react"

import './NFTMetadataFetcher.css';
import { Principal } from '@dfinity/principal';
import {motion} from 'framer-motion';


const NFTMetadataFetcher = () => {
    const { connect, disconnect, isConnecting, user } = useAuth()   
    const [nfts, setNfts] = useState([]);
    // const [canisterId, setCanisterId] = useState('uzt4z-lp777-77774-qaabq-cai');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loans, setLoans] = useState([]);
    const [loanForm, setLoanForm] = useState({ tokenId: '', amount: '', interestRate: '', duration: '' });
    const [focusedTokenId, setFocusedTokenId] = useState(null);

    const canisterPrincipal = 'u6s2n-gx777-77774-qaaba-cai'; 
    const canisterId = 'uzt4z-lp777-77774-qaabq-cai';  // dip canister id 
    const fetchNFTs = async () => {
        if (!user) return;
        setLoading(true);
        setError(null);
        try {
            if (!isConnecting && user?.principal) {
                const agent = new HttpAgent({ host: 'http://localhost:8080' });
                await agent.fetchRootKey();
                const actor = Actor.createActor(idlFactory, {
                    agent,
                    canisterId: canisterPrincipal,
                });
                console.log("Actor created:", actor);
                // Fetch owned token IDs from external canister
                const dip721Actor = Actor.createActor(dip721IdlFactory, {
                    agent,
                    canisterId: canisterId,
                });
                console.log("DIP721 Actor created:", dip721Actor);
                console.log("User principal:", user.principal);
                const userPrincipal = user.principal;
                const tokenIdsResult = await dip721Actor.ownerTokenIds(userPrincipal);
                console.log("Token IDs result:", tokenIdsResult);
                if ('Ok' in tokenIdsResult) {
                    const tokenIds = tokenIdsResult.Ok;
                    const nftData = [];
                    for (const tokenId of tokenIds) {
                        const metadataResult = await actor.getDip721Metadata(Principal.fromText(canisterId), BigInt(tokenId));
                        console.log(`Metadata result for token ${tokenId}:`, metadataResult);
                        if ('Ok' in metadataResult) {
                            const metadata = metadataResult.Ok;
                            const normalizedResult = await actor.normalizeMetadata(metadata);
                            nftData.push({ tokenId: Number(tokenId), metadata, normalized: normalizedResult });
                        } else {
                            console.error(`Failed to fetch metadata for token ${tokenId}:`, metadataResult.Err);
                            continue;
                        }
                        }
                    console.log("NFT data fetched:", nftData);
                    setNfts(nftData);
                } else {
                    setError('Failed to fetch token IDs: ' + JSON.stringify(tokenIdsResult.Err));
                }
    
                // Fetch loans
                const loansData = await actor.getAllLoans();
                setLoans(loansData.map(([id, loan]) => ({ id, ...loan })));
            }
        } catch (err) {
            setError('Error fetching NFTs: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateLoan = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('Please connect your wallet');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            console.log("Creating loan with form data:", loanForm);
            if (!loanForm.tokenId || !loanForm.amount || !loanForm.interestRate || !loanForm.duration) {
                setError('Please fill in all fields');
            }
            const agent = new HttpAgent({ host: 'http://localhost:8080' });
            await agent.fetchRootKey();
            const actor = Actor.createActor(idlFactory, {
                agent,
                canisterId: canisterPrincipal,
            });
            const result = await actor.createLoan(
                Principal.fromText(canisterId),
                BigInt(loanForm.tokenId),     
                BigInt(loanForm.amount),      
                BigInt(loanForm.interestRate), 
                BigInt(loanForm.duration) * BigInt(1_000_000_000) 
            );
            
            if ('Ok' in result) {
                alert('Loan created with transaction ID: ' + result.Ok);
                setLoanForm({ tokenId: '', amount: '', interestRate: '', duration: '' });
                await fetchNFTs();
            } else {
                setError('Failed to create loan: ' + JSON.stringify(result.Err));
            }
        } catch (err) {
            setError('Error creating loan: ' + err.message);
        } finally {
            setLoading(false);
        }};

    const handleAcceptLoan = async (loanId) => {
        if (!user) {
            setError('Please connect your wallet');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const agent = new HttpAgent({ host: 'http://localhost:8080' });
            await agent.fetchRootKey();
            const actor = Actor.createActor(idlFactory, {
                agent,
                canisterId: canisterPrincipal,
            });
            const result = await actor.acceptLoan(loanId);
            if ('Ok' in result) {
                alert('Loan accepted with transaction ID: ' + result.Ok);
                await fetchNFTs();
            } else {
                setError('Failed to accept loan: ' + JSON.stringify(result.Err));
            }
        } catch (err) {
            setError('Error accepting loan: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNFTs();
        }
    }, [user]);

    const handleCardFocus = (tokenId) => {
        setFocusedTokenId(tokenId);
        setLoanForm((prev) => ({ ...prev, tokenId }));
    };

    return (
        <div className="nft-fetcher">
            <h2>NFT Lending Dashboard</h2>
            {!user ? (
                <button onClick={connect}>Connect Wallet</button>
            ) : (
                <div>
                    <button onClick={disconnect}>Disconnect</button>
                    <p>Principal: {user.principal.toText()}</p>
                </div>
            )}
            <div>
                <label>External Canister ID:</label>
                <input
                    type="text"
                    value={canisterId}
                    // onChange={(e) => setCanisterId(e.target.value)}
                    placeholder="e.g., u6def-o7777-77774-qaaeq-cai"
                />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <h3>Your NFTs</h3>
            <div className="nft-list">
                {nfts.map((nft) => (
                    <motion.div
                        key={nft.tokenId}
                        className={`nft-card${focusedTokenId === nft.tokenId ? ' focused' : ''}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: focusedTokenId === nft.tokenId ? 1.08 : 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleCardFocus(nft.tokenId)}
                        style={{
                            zIndex: focusedTokenId === nft.tokenId ? 10 : 1,
                            boxShadow: focusedTokenId === nft.tokenId ? '0 0 0 4px #e99b63, 0 8px 32px rgba(0,0,0,0.25)' : '',
                            position: focusedTokenId === nft.tokenId ? 'relative' : 'static',
                        }}
                    >

                        <h4>{nft.metadata.name}</h4>
                        <img src={nft.normalized.imageUrl} alt={nft.metadata.name} />
                        <p>ID: {nft.tokenId}</p>
                        <p>Risk Score: {nft.normalized.riskScore}</p>
                        <p>Eligible: {nft.normalized.isEligible ? 'Yes' : 'No'}</p>
                        {nft.normalized.isEligible && (
                            <form onSubmit={handleCreateLoan}>
                                <input
                                    type="hidden"
                                    name="tokenId"
                                    value={nft.tokenId}
                                />
                                <input
                                    type="number"
                                    placeholder="Loan Amount"
                                    value={loanForm.amount}
                                    onChange={(e) => setLoanForm({ ...loanForm, amount: e.target.value })}
                                    className = "text-black bg-white border border-gray-300 rounded-md p-2 mb-2 w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Interest Rate (basis points)"
                                    value={loanForm.interestRate}
                                    onChange={(e) => setLoanForm({ ...loanForm, interestRate: e.target.value })}
                                    className="text-black bg-white border border-gray-300 rounded-md p-2 mb-2 w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Duration (seconds)"
                                    value={loanForm.duration}
                                    onChange={(e) => setLoanForm({ ...loanForm, duration: e.target.value })}
                                    className="text-black bg-white border border-gray-300 rounded-md p-2 mb-2 w-full"
                                />
                                <button type="submit" disabled={loading}>Create Loan</button>
                            </form>
                        )}
                    </motion.div>
                ))}
            </div>
            <h3>Available Loans</h3>
            <div className="loan-list">
                {loans.map((loan) => (
                    <div key={loan.id} className="loan-card">
                        <p>Loan ID: {loan.id}</p>
                        <p>Token ID: {loan.tokenId}</p>
                        <p>Canister: {loan.nftCanisterId.toText()}</p>
                        <p>Amount: {loan.amount}</p>
                        <p>Interest Rate: {loan.interestRate / 100}%</p>
                        <p>Duration: {loan.duration / 1_000_000_000} seconds</p>
                        <p>Status: {loan.isActive ? 'Active' : loan.isRepaid ? 'Repaid' : 'Liquidated'}</p>
                        {loan.isActive && !loan.isRepaid && !loan.isLiquidated && (
                            <button onClick={() => handleAcceptLoan(loan.id)} disabled={loading}>
                                Accept Loan
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFTMetadataFetcher;

// Add CSS for .nft-card.focused in NFTMetadataFetcher.css:
// .nft-card.focused {
//   outline: 3px solid #e99b63;
//   box-shadow: 0 0 0 4px #e99b63, 0 8px 32px rgba(0,0,0,0.25);
//   transform: scale(1.08);
//   z-index: 10;
// }