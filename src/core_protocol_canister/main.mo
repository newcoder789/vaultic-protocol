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


    

};
