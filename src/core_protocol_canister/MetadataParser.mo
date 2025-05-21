import Blob "mo:base/Blob";
import IC "ic:aaaaa-aa";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";


module {
    type NormalizedMetadata = {
        token_id: Nat;
        name: Text;
        image: Text;
        attributes: [Attribute];
    };

    type Attribute = {
        trait_type: Text;
        value: Text;
    };

    // public func normalize_metadata(canisterId: Principal, tokenId: Nat) : async ?NormalizedMetadata {
    //     let metadataResult = await canisterId.getMetadata(tokenId);
        
    //     let metadataJson : Text = switch (metadataResult) {
    //         case (#Uri(uri)) {
    //             await http_get(uri);
    //         };
    //         case (#Json(jsonText)) jsonText;
    //         case _ return null;
    //     };

    //     let parsed = JSON.parse(metadataJson);
    //     switch (parsed) {
    //         case (?obj) {
    //             let token_id = tokenId;
    //             let name = switch (obj.get("name")) { case (?n) n; case _ ""; };
    //             let image = switch (obj.get("image")) { case (?i) i; case _ ""; };
    //             let attributes = switch (obj.get("attributes")) {
    //                 case (?arr) {
    //                     arr
    //                     |> Array.map<JSON, Attribute>(func (attr) {
    //                         {
    //                             trait_type = switch (attr.get("trait_type")) { case (?t) t; case _ ""; };
    //                             value = switch (attr.get("value")) { case (?v) v; case _ ""; };
    //                         }
    //                     });
    //                 };
    //                 case _ [];
    //             };
                // --remove this text--?{
    //                 token_id = token_id;
    //                 name = name;
    //                 image = image;
    //                 attributes = attributes;
    //             }
    //         };
    //         case _ null;
    //     }
    
    // };
    
    public func get_metadata() : async Text {
    let url = "https://entrepot.app/api/token/azle_heroes/1";
    let request_headers = [
        { name = "accept"; value = "application/json" }
    ];
    
    let http_request : IC.http_request_args = {
        url = url;
        max_response_bytes = null;
        headers = request_headers;
        body = null;
        method = #get;
        transform = null;
    };

    Cycles.add<system>(230_000_000_000);

    let http_response = await IC.http_request(http_request);
    let response_text = switch (Text.decodeUtf8(http_response.body)) {
        case null "No metadata returned";
        case (?txt) txt;
    };
    return response_text;
    };

}