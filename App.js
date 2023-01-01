import { useEffect, useState } from "react";
import { View } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";

import AppProduct from "./src/components/AppProduct";
import Auth from "./src/components/Auth";

export default function App() {
  const [loggedin, setLoggedIn] = useState(0);

  useEffect(() => {
    // SecureStore.deleteItemAsync("oauth_token");
    // SecureStore.deleteItemAsync("oauth_signature");
    // SecureStore.deleteItemAsync("oauth_verifier");
    getKey("oauth_verifier");
  }, []);

  const getKey = async (key) => {
    console.log("get key");
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setLoggedIn(2);
    } else {
      setLoggedIn(1);
    }
  };

  console.log(loggedin);

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const url = Linking.useURL();
  console.log(url);
  url && url.includes("verifier")
    ? save("oauth_verifier", url.split("verifier=")[1])
    : null;

  let nextStep;

  switch (loggedin) {
    case 0: {
      nextStep = null;
      break;
    }
    case 1: {
      nextStep = <Auth />;
      break;
    }
    case 2: {
      nextStep = <AppProduct />;
    }
  }

  return <View>{nextStep}</View>;
}
