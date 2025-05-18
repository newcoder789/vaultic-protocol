import Http "mo:ic:Http";
import Blob "mo:base/Blob";

public func http_get(url: Text) : async Text {
    let request : Http.Request = {
        url = url;
        method = #get;
        headers = [];
        body = null;
        max_response_bytes = null;
        transform = null;
    };
    let response = await Http.fetch(request);
    switch (response.body) {
        case (?body) Blob.toText(body);
        case null "";
    }
}
actor {
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

    public func normalize_metadata(canisterId: Principal, tokenId: Nat) : async ?NormalizedMetadata {
    let metadataResult = await canisterId.getMetadata(tokenId);
    
    let metadataJson : Text = switch (metadataResult) {
        case (#Uri(uri)) {
            await http_get(uri);
        };
        case (#Json(jsonText)) jsonText;
        case _ return null;
    };

    let parsed = JSON.parse(metadataJson);
    switch (parsed) {
        case (?obj) {
            let token_id = tokenId;
            let name = switch (obj.get("name")) { case (?n) n; case _ ""; };
            let image = switch (obj.get("image")) { case (?i) i; case _ ""; };
            let attributes = switch (obj.get("attributes")) {
                case (?arr) {
                    arr
                    |> Array.map<JSON, Attribute>(func (attr) {
                        {
                            trait_type = switch (attr.get("trait_type")) { case (?t) t; case _ ""; };
                            value = switch (attr.get("value")) { case (?v) v; case _ ""; };
                        }
                    });
                };
                case _ [];
            };
            ?{
                token_id = token_id;
                name = name;
                image = image;
                attributes = attributes;
            }
        };
        case _ null;
    }
    
    };


}