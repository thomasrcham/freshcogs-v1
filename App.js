import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import "./keys.js";
import { NavigationContainer } from "@react-navigation/native";
import MainDisplay from "./src/components/MainDisplay.js";
import { Dimensions } from "react-native";
// import { useFonts } from "expo-font";

export default function App() {
  // const [fontsLoaded] = useFonts(font);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=60${token}`
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
      id: release.basic_information.id,
      artist: release.basic_information.artists[0].name,
      title: release.basic_information.title,
      uri: release.basic_information.cover_image,
    };
    return singleParsedRelease;
  }

  // if (!fontsLoaded) {
  //   return <Text>no text</Text>;
  // }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}></View>
      <View style={styles.container}>
        <MainDisplay albums={albums} />
      </View>
    </View>
  );
}

const topBarHeight = Dimensions.get("window").height * 0.06;
const mainWindowHeight = Dimensions.get("window").height * 0.94;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    bottom: 0,
    // height: mainWindowHeight,
  },
  topBar: {
    height: topBarHeight,
    backgroundColor: "black",
  },
  image: {
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  imageGrid: {
    width: "50%",
    padding: 10,
    fontFamily: "Martel",
  },
});
