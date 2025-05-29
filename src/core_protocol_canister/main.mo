import Blob "mo:base/Blob";
import IC "ic:aaaaa-aa";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";
import DIP721 "./dip721_interface";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

import Metadata "./MetadataParser";
import Types "types";
actor {
  public type NormalizedMetadata = Types.NormalizedMetadata;
  public type Attribute = Types.Attribute;


  // let externalNFT = actor("aaaaa-aa") : DIP721.DIP721Interface;
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  // public query func checkNFT(nftCanister: Principal, tokenId: Nat) : async Text {
  //   let nft = actor(nftCanister) : DIP721.DIP721Interface;
    // let result = await nft.ownerOf(tokenId);

  //   switch result {
  //       case (#Ok(owner)) {
  //           return "Owner is " # Principal.toText(owner);
  //       };
  //       case (#Err(err)) {
  //           return "Error: " # debug_show(err);
  //       };
  //   };
  // };

  // transform function to convert the response body to a string and ignore the headers
  public shared query func transform({
      context : Blob;
      response : IC.http_request_result;
  }) : async IC.http_request_result {
      {
          body = response.body;
          headers = [];
          status = response.status;
      };
  };
        
  public func http_get(url: Text) : async Text {
        let request_headers = [
            { name = "User-Agent"; value = "price-feed" },
        ];
        
        let http_request : IC.http_request_args = {
            url = url;
            method = #get;
            headers = request_headers;
            body = null;
            max_response_bytes = null;
            transform =  ?{
                function = transform;
                context = Blob.fromArray([]);
            };
        };
        
        // Cycles.add(230_949_972_000);
        // Cycles.add<system>(230_949_972_000);
        // (with cycles = 230_949_972_000) C.send(...)

        // let http_response : IC.http_request_result = await IC.http_request(http_request);
      

        let http_response : IC.http_request_result = await (with cycles = 230_949_972_000) IC.http_request(http_request);
        let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
            case (null) { "No value returned" };
            case (?y) { y };
        };
        decoded_text;
    };

    

  public shared func getDip721Metadata(
        canisterId: Principal,
        tokenId: Nat
    ) : async Metadata.NFTMetadata {
        let dip721 : DIP721.BasicInterface = actor(Principal.toText(canisterId));
        switch (await dip721.tokenMetadata(tokenId)) {
        case (#ok(metadata)) {
            Metadata.extractDIP721Metadata(metadata)
        };
        case (#err(error)) {
            // Handle error case - here we return default metadata
            {
                tokenId = ?tokenId;
                name = "Unknown NFT";
                description = "Metadata unavailable";
                image = "";
                attributes = [];
                collection = null;
            }
        };
        case (#Ok(_) or #Err(_)) {
            // Handle unexpected case
            {
                tokenId = ?tokenId;
                name = "Unknown NFT";
                description = "Metadata unavailable";
                image = "";
                attributes = [];
                collection = null;
            } 
        }
    }
    };
    public func normalizeMetadata(raw : Metadata.NFTMetadata) : async  NormalizedMetadata {
      let attributes = Array.map<Attribute, (Text, Text)>(
          raw.attributes,
          func (attr) { (attr.trait_type, attr.value) }
      );

      let riskScore = computeRiskScore(attributes);
      
      {
          nftId = switch (raw.tokenId) {
            case (?id) { Nat.toText(id) };
            case null { "unknown" };
          };
          imageUrl = raw.image;
          attributes = attributes;
          riskScore = riskScore;
          isEligible = riskScore > 0.7
        }
      };

    private func computeRiskScore(attrs: [(Text, Text)]) : Float {
      var score = 0.0;
      for ((k, v) in attrs.vals()) {
          if (k == "Rarity" and v == "Legendary") { score += 0.5; };
          if (k == "Type" and v == "Alien") { score += 0.3; };
      };
      score;
    };







  // for identity kit
  type SupportedStandard = {
    url : Text;
    name : Text;
  };
  public query func icrc10_supported_standards() : async [SupportedStandard] {
    return [
      {
        url = "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-10/ICRC-10.md";
        name = "ICRC-10";
      },
      {
        url = "https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_28_trusted_origins.md";
        name = "ICRC-28";
      }
    ];
  };

  type Icrc28TrustedOriginsResponse = {
    trusted_origins : [Text];
  };

  public shared ({ caller }) func icrc28_trusted_origins() : async Icrc28TrustedOriginsResponse {
    let trustedOrigins : [Text] = [
      // LOCAL (development)
      "http://localhost:3000", // or 3000/your local port
       "http://127.0.0.1:3000", 
       "http://localhost:8000", // or 8000/your local port
      "http://127.0.0.1:8000",
    

      "https://uzt4z-lp777-77774-qaabq-cai.icp0.io",
      "https://uzt4z-lp777-77774-qaabq-cai.raw.icp0.io",
      "https://uzt4z-lp777-77774-qaabq-cai.ic0.app",
      "https://uzt4z-lp777-77774-qaabq-cai.raw.ic0.app",

      // MAINNET (production)
      "https://a6x7x-xyaaa-aaaah-qcn6q-cai.icp0.io",
      "https://a6x7x-xyaaa-aaaah-qcn6q-cai.raw.icp0.io",
      "https://a6x7x-xyaaa-aaaah-qcn6q-cai.ic0.app",
      "https://a6x7x-xyaaa-aaaah-qcn6q-cai.raw.ic0.app",

      // CUSTOM DOMAINS (production)
      "https://vaultic.ai",
      "https://app.vaultic.ai"
    ];

    return {
      trusted_origins = trustedOrigins;
    };
};

    

};
