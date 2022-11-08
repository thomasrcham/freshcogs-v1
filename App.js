import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import "./keys.js";
import { NavigationContainer } from "@react-navigation/native";
import MainDisplay from "./MainDisplay.js";

export default function App() {
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

  return albums ? <MainDisplay albums={albums} key={"main-display"} /> : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 80,
    padding: 20,
    width: "100%",
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
  },
});
