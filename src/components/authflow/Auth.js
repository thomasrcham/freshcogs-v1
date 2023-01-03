import { ImageBackground, Pressable, Text, View } from "react-native";

import * as Linking from "expo-linking";

import { discogsConsumerKey, discogsConsumerSecret } from "@env";
import style from "../styles/style";

export default function Auth({ setFirstTokens }) {
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
        let token = data._parts.filter((r) => r[0] === "oauth_token")[0][1];
        let secretToken = data._parts.filter(
          (r) => r[0] === "oauth_token_secret"
        )[0][1];
        setFirstTokens([token, secretToken]);
        Linking.openURL(
          `https://discogs.com/oauth/authorize?oauth_token=${token}`
        );
      })
      .then(() => {
        console.log("auth success");
      });
  };

  return (
    <View style={style.authPageContainer}>
      <ImageBackground
        source={require("../../icons/splash.png")}
        resizeMode="cover"
      >
        <View>
          <View style={style.authPageBox}>
            <Text style={style.authPageHeaderText}>Welcome to FRESHCOGS!</Text>
            <Text style={style.authPageText}>
              In order to use the app, you'll need to authorize via Discogs.
            </Text>
            <Pressable
              style={style.authPageButton}
              onPress={() => discogsTokenRequest()}
            >
              <Text style={style.authPageButtonText}>AUTHORIZE</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
