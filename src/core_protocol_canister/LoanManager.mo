// import NFTLocker "NFTLocker";
// import MetadataParser "MetadataParser";
// import Types "types";
// import DIP721 "dip721_interface";

// actor LoanManager {
//     let locker = actor("nft-locker-principal") : NFTLocker.NFTLocker;
//     let parser = actor("metadata-parser-principal") : MetadataParser.MetadataParser;

//     public shared(msg) func initiateLoan(
//         nftCanister: Principal,
//         tokenId: Text,
//         standard: { #DIP721; #EXT }
//     ) : async { #ok: Nat; #err: Text } {
//         try {
//             // Lock NFT
//             let lockResult = switch (standard) {
//                 case (#DIP721) {
//                     await locker.lock_dip721(
//                         nftCanister, 
//                         Nat.fromText(tokenId)!
//                     )
//                 };
//                 // EXT case would go here
//             };
            
//             if (Result.isErr(lockResult)) {
//                 return #err("Locking failed");
//             };
            
//             // Fetch metadata
//             let metadata = await _fetchMetadata(nftCanister, tokenId, standard);
            
//             // Process metadata
//             let normalized = await parser.normalizeMetadata(metadata);
            
//             // Risk assessment would go here
//             #ok(0) // Return loan ID
            
//         } catch e {
//             #err("Unexpected error")
//         }
//     };

//     private func _fetchMetadata(
//         canister: Principal,
//         tokenId: Text,
//         standard: { #DIP721; #EXT }
//     ) : async Types.NFTMetadata {
//         switch (standard) {
//             case (#DIP721) {
//                 let dip721 : DIP721.BasicInterface = actor(Principal.toText(canister));
//                 let tokenIdNat = Nat.fromText(tokenId)!;
//                 switch (await dip721.tokenMetadata(tokenIdNat)) {
//                     case (#Ok(metadata)) {
//                         await parser.extractDIP721Metadata(metadata)
//                     };
//                     case (#Err(_)) { _defaultMetadata() };
//                 }
//             };
//             // EXT case would go here
//         }
//     };

//     private func _defaultMetadata() : Types.NFTMetadata {
//         {
//             name = "Unknown";
//             description = "";
//             image = "";
//             attributes = [];
//             collection = null;
//         }
//     };
// }