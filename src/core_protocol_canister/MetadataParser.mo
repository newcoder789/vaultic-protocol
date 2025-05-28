// src/core_protocol_canister/metadata.mo
module {
    import DIP721 "dip721_interface";
    import Types "types";
    import Array "mo:base/Array";

    public type Attribute = Types.Attribute;
    public type NFTMetadata = Types.NFTMetadata;
    public type TokenMetadata = DIP721.TokenMetadata;

    public func extractDIP721Metadata(
        metadata: TokenMetadata
    ) : NFTMetadata {
        // Convert properties to attributes
        let attributes = Array.map<DIP721.Generic.Property, Attribute>(
            metadata.properties,
            func(prop) = { 
                trait_type = prop.name; 
                value = prop.value 
            }
        );
        
        // Extract standard fields
        var name = "";
        var description = "";
        var image = "";
        
        for (prop in metadata.properties.vals()) {
            switch (prop.name) {
                case "name" { name := prop.value };
                case "description" { description := prop.value };
                case "image" { image := prop.value };
                case _ {};
            };
        };
        
        {
            name;
            description;
            image;
            attributes;
            collection = null;
        }
    };

    public func parseHttpResponse(body: Blob) : ?NFTMetadata {
        // Implement your HTTP response parsing here
        null // Placeholder
    };
}