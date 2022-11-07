import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import "./keys.js";
import { NavigationContainer } from "@react-navigation/native";
import MainDisplay from "./MainDisplay.js";

export default function App() {
  const [albums, setAlbums] = useState(null);
  //   [
  //   {
  //     artist: "Radiohead",
  //     title: "In Rainbows",
  //     cover: require("./public/images/covers/001.jpg"),
  //   },
  //   {
  //     artist: "Hundred Waters",
  //     title: "Communicating",
  //     cover: require("./public/images/covers/002.jpg"),
  //   },
  //   {
  //     artist: "Public Service Broadcasting",
  //     title: "White Star Liner",
  //     cover: require("./public/images/covers/003.jpg"),
  //   },
  //   {
  //     artist: "Big Red Machine (2)",
  //     title: "How Long Do You Think It's Gonna Last?",
  //     cover: require("./public/images/covers/004.jpg"),
  //   },
  //   {
  //     artist: "Beirut",
  //     title: "Gallipoli",
  //     cover: require("./public/images/covers/005.jpg"),
  //   },
  //   {
  //     artist: "The National",
  //     title: "I Am Easy To Find",
  //     cover: require("./public/images/covers/006.jpg"),
  //   },
  //   {
  //     artist: "The Mountain Goats",
  //     title: "Tallahassee",
  //     cover: require("./public/images/covers/007.jpg"),
  //   },
  //   {
  //     artist: "The Mountain Goats",
  //     title: "We Shall All Be Healed",
  //     cover: require("./public/images/covers/008.jpg"),
  //   },
  //   {
  //     artist: "The Mountain Goats",
  //     title: "The Sunset Tree",
  //     cover: require("./public/images/covers/009.jpg"),
  //   },
  //   {
  //     artist: "The Mountain Goats",
  //     title: "Get Lonely",
  //     cover: require("./public/images/covers/010.jpg"),
  //   },
  //   {
  //     artist: "The Mountain Goats",
  //     title: "The Life Of The World To Come",
  //     cover: require("./public/images/covers/011.jpg"),
  //   },
  //   {
  //     artist: "The National",
  //     title: "High Violet",
  //     cover: require("./public/images/covers/012.jpg"),
  //   },
  //   {
  //     artist: "tUnE-yArDs",
  //     title: "w h o k i l l",
  //     cover: require("./public/images/covers/013.jpg"),
  //   },
  //   {
  //     artist: "Grimes (4)",
  //     title: "Art Angels",
  //     cover: require("./public/images/covers/014.jpg"),
  //   },
  //   {
  //     artist: "Various",
  //     title: "Dark Was The Night",
  //     cover: require("./public/images/covers/015.jpg"),
  //   },
  //   {
  //     artist: "The Mountain Goats",
  //     title: "Heretic Pride",
  //     cover: require("./public/images/covers/016.jpg"),
  //   },
  //   {
  //     artist: "Joe Cocker",
  //     title: "With A Little Help From My Friends",
  //     cover: require("./public/images/covers/017.jpg"),
  //   },
  //   {
  //     artist: "Janet Jackson",
  //     title: "Rhythm Nation 1814",
  //     cover: require("./public/images/covers/018.jpg"),
  //   },
  //   {
  //     artist: "Gillian Welch",
  //     title: "The Harrow & The Harvest",
  //     cover: require("./public/images/covers/019.jpg"),
  //   },
  //   {
  //     artist: "Little Simz",
  //     title: "Sometimes I Might Be Introvert",
  //     cover: require("./public/images/covers/020.jpg"),
  //   },
  //   {
  //     artist: "Steve Reich",
  //     title: "Tokyo Opera City, 21.5.2008",
  //     cover: require("./public/images/covers/021.jpg"),
  //   },
  //   {
  //     artist: "Frédéric Chopin",
  //     title: "Études Op. 10 And Allegro De Concert Op. 46",
  //     cover: require("./public/images/covers/022.jpg"),
  //   },
  //   {
  //     artist: "Neko Case",
  //     title: "Fox Confessor Brings The Flood",
  //     cover: require("./public/images/covers/023.jpg"),
  //   },
  //   {
  //     artist: "Neko Case",
  //     title: "Blacklisted",
  //     cover: require("./public/images/covers/024.jpg"),
  //   },
  // ]);

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
