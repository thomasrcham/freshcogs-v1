import { Text } from "react-native";

import { useEffect } from "react";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";

import {
  discogsConsumerKey,
  discogsConsumerSecret,
  discogsUserToken,
  discogsOAuthtoken,
  discogsUserSecret,
} from "@env";

export default function Auth() {
  useEffect(() => {
    discogsTokenRequest();
  }, []);

  console.log("auth");

  var dateTime = Math.round(new Date().getTime() / 1000);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "User-Agent",
    "Flashcogs/1.0 +https://github.com/thomasrcham/discogs-app-v3"
  );
  myHeaders.append(
    "Authorization",
    `OAuth oauth_consumer_key="${discogsConsumerKey}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${dateTime}",oauth_nonce="${dateTime}",oauth_version="1.0",oauth_signature="${discogsConsumerSecret}&", oauth_callback="exp://192.168.1.158:19000"`
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const discogsTokenRequest = async () => {
    await fetch(`https://api.discogs.com/oauth/request_token`, requestOptions)
      .then((res) => res.formData())
      .then((data) => {
        console.log(data._parts);
        data._parts.map((r) => save(r[0], r[1]));
        let token = data._parts.filter((r) => r[0] === "oauth_token")[0][1];
        Linking.openURL(
          `https://discogs.com/oauth/authorize?oauth_token=${token}`
        );
      });
  };

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
    console.log(key + " " + value);
  };

  return <Text>auth page</Text>;
}
