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
  const [loaded, setLoaded] = useState(0);
  const [firstToken, setFirstTokens] = useState([]);
  const [secondToken, setSecondTokens] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (loaded === 0) {
      SecureStore.deleteItemAsync("oauth_token");
      SecureStore.deleteItemAsync("oauth_signature");
      SecureStore.deleteItemAsync("oauth_verifier");
      setLoaded(1);
    }
  }, []);

  let url = Linking.useURL();
  if (url && url.includes("verifier") && loggedin === 1) {
    setLoggedIn(2);
    console.log("yes url verifier");
    setVerifier(url.split("verifier=")[1]);
  } else {
  }

  console.log(loggedin);

  let nextStep;

  switch (loggedin) {
    case 0: {
      nextStep = null;
      setLoggedIn(1);
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
          setLoggedIn={setLoggedIn}
          setSecondTokens={setSecondTokens}
        />
      );
      break;
    }
    case 3: {
      nextStep = (
        <Auth3
          setLoggedIn={setLoggedIn}
          secondToken={secondToken}
          setUsername={setUsername}
        />
      );
      break;
    }
    case 4: {
      nextStep = <AppProduct username={username} secondToken={secondToken} />;
      break;
    }
  }

  return <View>{nextStep}</View>;
}
