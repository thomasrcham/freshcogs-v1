import { Text } from "react-native";

import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import { discogsConsumerKey, discogsConsumerSecret } from "@env";

export default function Auth2({
  verifier,
  firstToken,
  setLoggedIn,
  setSecondTokens,
}) {
  useEffect(() => {
    discogsAccessRequest();
  }, []);

  console.log("access");

  var dateTime = Math.round(new Date().getTime() / 1000);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "User-Agent",
    "Flashcogs/1.0 +https://github.com/thomasrcham/discogs-app-v3"
  );
  myHeaders.append(
    "Authorization",
    `OAuth oauth_consumer_key="${discogsConsumerKey}",oauth_token="${firstToken[0]}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${dateTime}",oauth_nonce="${dateTime}",oauth_version="1.0",oauth_signature="${discogsConsumerSecret}&${firstToken[1]}", oauth_verifier="${verifier}`
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const discogsAccessRequest = async () => {
    console.log("request");
    await fetch(`https://api.discogs.com/oauth/access_token`, requestOptions)
      .then((res) => res.formData())
      .then((data) => {
        console.log(data._parts);
        let secondToken = data._parts.filter(
          (r) => r[0] === "oauth_token"
        )[0][1];
        let secondSecret = data._parts.filter(
          (r) => r[0] === "oauth_token_secret"
        )[0][1];
        save("oauth_token", secondToken);
        save("oauth_token_secret", secondSecret);
        setSecondTokens([secondToken, secondSecret]);
      })
      .then(() => {
        console.log("access success");
        setLoggedIn(3);
      });
  };

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  return <Text>auth page</Text>;
}
