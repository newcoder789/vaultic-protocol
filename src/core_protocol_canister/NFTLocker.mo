import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor {

  type TokenId = Nat;
  type LockInfo = {
    original_owner: Principal;
    locked_at: Int;
  };

  stable var lockedNFTs = HashMap.HashMap<TokenId, LockInfo>(0, HashMap.natHash);

  // Simulate locking the NFT (after transfer)
  public func lockNFT(tokenId: TokenId, owner: Principal) : async Text {
    if (lockedNFTs.contains(tokenId)) {
      return "Token already locked";
    };

    // Record the lock
    let now = Time.now();
    lockedNFTs.put(tokenId, {
      original_owner = owner;
      locked_at = now;
    });

    return "NFT locked successfully";
  };

  // Check if a token is locked
  public query func isLocked(tokenId: TokenId) : async Bool {
    lockedNFTs.contains(tokenId);
  };

  // Unlock NFT (could be called after loan repayment)
  public func unlockNFT(tokenId: TokenId, requester: Principal) : async Text {
    switch (lockedNFTs.get(tokenId)) {
      case (null) return "NFT not locked";
      case (?lockInfo) {
        if (lockInfo.original_owner != requester) {
          return "Unauthorized unlock attempt";
        };
        lockedNFTs.delete(tokenId);
        return "NFT unlocked and ready to return";
      };
    };
  };
}
