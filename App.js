import { useEffect, useState } from "react";
import { View } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";

import AppProduct from "./src/components/AppProduct";
import Auth from "./src/components/authflow/Auth";
import Auth2 from "./src/components/authflow/Auth2";
import Auth3 from "./src/components/authflow/Auth3";

export default function App() {
  const [loggedin, setLoggedIn] = useState(0);
  const [verifier, setVerifier] = useState(null);
  const [loaded, setLoaded] = useState(1);
  const [firstToken, setFirstTokens] = useState([]);
  const [secondToken, setSecondTokens] = useState([]);
  const [username, setUsername] = useState(null);
  const [discogsToken, setDiscogsToken] = useState(null);
  const [discogsSecretToken, setDiscogsSecretToken] = useState(null);

  // useEffect(() => {
  if (loaded === 0) {
    SecureStore.deleteItemAsync("oauth_token");
    SecureStore.deleteItemAsync("oauth_token_secret");
    setLoaded(1);
  }
  // }, []);

  let url = Linking.useURL();
  if (url && url.includes("verifier") && loggedin === 1) {
    setLoggedIn(2);
    console.log("yes url verifier");
    setVerifier(url.split("verifier=")[1]);
  } else {
  }

  console.log(loggedin);

  const setKeys = async () => {
    await setKey("oauth_token");
    await setKey("oauth_token_secret");
    await setKey("username");
    discogsSecretToken ? setLoggedIn(5) : null;
  };

  const setKey = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      switch (key) {
        case "oauth_token": {
          setDiscogsToken(result);
          break;
        }
        case "oauth_token_secret": {
          setDiscogsSecretToken(result);
          break;
        }
        case "username": {
          setUsername(result);
          break;
        }
      }
    } else {
      console.log("no keys");
      setLoggedIn(1);
    }
  };

  const save = async (key, value) => {
    console.log("saving " + key);
    await SecureStore.setItemAsync(key, value);
  };

  let nextStep;

  switch (loggedin) {
    case 0: {
      setKeys();
      break;
    }
    case 1: {
      nextStep = <Auth setFirstTokens={setFirstTokens} />;
      break;
    }
    case 2: {
      nextStep = (
        <Auth2
          verifier={verifier}
          firstToken={firstToken}
          save={save}
          setDiscogsToken={setDiscogsToken}
          setDiscogsSecretToken={setDiscogsSecretToken}
          setLoggedIn={setLoggedIn}
          setSecondTokens={setSecondTokens}
        />
      );
      break;
    }
    case 3: {
      nextStep = (
        <Auth3
          discogsToken={discogsToken}
          discogsSecretToken={discogsSecretToken}
          save={save}
          setLoggedIn={setLoggedIn}
          secondToken={secondToken}
          setUsername={setUsername}
        />
      );
      break;
    }
    case 4: {
      setKeys();
      setLoggedIn(5);
    }
    case 5: {
      nextStep = (
        <AppProduct
          username={username}
          discogsToken={discogsToken}
          discogsSecretToken={discogsSecretToken}
        />
      );
      break;
    }
  }

  return <View style={{ flex: 1 }}>{nextStep}</View>;
}
