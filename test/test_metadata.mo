import M "mo:matchers/Matchers";
import T "mo:matchers/Testable";
import Suite "mo:matchers/Suite";
import Metadata "../src/core_protocol_canister/metadata";

let suite = Suite.suite("Metadata Tests", [
    Suite.test("Basic extraction",
        Metadata.extractDIP721Metadata({
            properties = [{
                name = "name"; 
                value = "Test NFT"
            }, {
                name = "Background";
                value = "Blue"
            }];
            owner = null;
            // ... other required TokenMetadata fields ...
        }),
        M.equals(T.record({
            name = T.text("Test NFT");
            description = T.text("");
            image = T.text("");
            attributes = T.array([
                T.record({
                    trait_type = T.text("name");
                    value = T.text("Test NFT")
                }),
                T.record({
                    trait_type = T.text("Background");
                    value = T.text("Blue")
                })
            ]);
            collection = T.null;
        }))
    )
]);

Suite.run(suite);