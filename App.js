import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";
import "./keys.js";

import { NavigationContainer } from "@react-navigation/native";
// import Home from "./components/Home";

export default function App() {
  const [text, setText] = useState("Hallo");
  const [albums, setAlbums] = useState({});

  console.log(albums);

  useEffect(() => {
    fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=25${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        let returnData = data.releases;
        let parsedReleases = returnData.map((release) => parseInfo(release));
        setAlbums(parsedReleases);
      });
  }, []);

  function parseInfo(release) {
    let parsedReleases = [];
    let singleParsedRelease = {
      artist: release.basic_information.artists[0].name,
      title: release.basic_information.title,
      cover: release.basic_information.cover_image,
    };

    parsedReleases.push(singleParsedRelease);

    return parsedReleases;
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button onPress={() => setText("You clicked the button")}>
        Click me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
