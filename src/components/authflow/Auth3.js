import { useEffect } from "react";

import { discogsConsumerKey, discogsConsumerSecret } from "@env";

export default function Auth3({
  verifier,
  token,
  save,
  setLoggedIn,
  secondToken,
  setUsername,
}) {
  var dateTime = Math.round(new Date().getTime() / 1000);

  var requestOptions = {
    headers: {
      Authorization: `OAuth oauth_consumer_key="${discogsConsumerKey}", oauth_nonce="${dateTime}", oauth_token="${secondToken[0]}", oauth_signature="${discogsConsumerSecret}&${secondToken[1]}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${dateTime}"`,
      "User-Agent": "Freshcogs/1.0 +exp:127.0.0.1:19000",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  console.log("auth3");

  useEffect(() => {
    discogsIdentityCheck();
  }, []);

  const discogsIdentityCheck = () => {
    fetch(`https://api.discogs.com/oauth/identity`, requestOptions)
      .then((response) => response.formData())
      .then((result) => {
        let username = result._parts[0][0].split('"')[5];
        console.log("username: " + username);
        save("username", username);
        setUsername(username);
        setLoggedIn(4);
      })
      .catch((error) => console.log("user data error", error));
  };
}
