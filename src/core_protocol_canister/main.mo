import Blob "mo:base/Blob";
import IC "ic:aaaaa-aa";
import Text "mo:base/Text";
import ExperimentalCycles "mo:base/ExperimentalCycles";


actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

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
        
        ExperimentalCycles.add(230_949_972_000); 
        
        let http_response : IC.http_request_result = await IC.http_request(http_request);
        
        let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
            case (null) { "No value returned" };
            case (?y) { y };
        };
        decoded_text;
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
