import { useState, useEffect } from "react";
import { Button, Dimensions, Image, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useDispatch, useSelector } from "react-redux";
import { addAlbum } from "../redux/albumSlice";
import DisplayArea from "./DisplayArea.js";
import FrontPage from "./FrontPage.js";
import Collection from "./Collection.js";
import Search from "./SearchPage.js";
import "../../keys.js";

export default function AppProduct({ navigation }) {
  // const { titles } = useSelector((state) => state.albumTitleReducer);
  const dispatch = useDispatch();
  const [albums, setAlbums] = useState(null);
  const [displayAlbums, setDisplayAlbums] = useState(null);

  albums ? console.log(albums.length) : null;

  useEffect(() => {
    fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=20${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        let returnData = data.releases;
        let parsedReleases = returnData.map((release) => parseInfo(release));
        setAlbums(parsedReleases);
        randomArray(parsedReleases);
      });
  }, []);

  function parseInfo(release) {
    let artist = release.basic_information.artists[0].name;

    // let descriptions = release.basic_information.formats
    //   .map((f) => f.descriptions)
    //   .concat();
    // console.log(descriptions);

    artist.charAt(artist.length - 3) === "("
      ? (artist = artist.substring(0, artist.length - 4))
      : artist;

    artist === "Various" ? (artist = "Various Artists") : artist;

    let singleParsedRelease = {
      id: release.basic_information.id,
      master_id: release.basic_information.master_id,
      artist: artist,
      title: release.basic_information.title,
      uri: release.basic_information.cover_image,
      date_added: release.date_added,
      genres: release.basic_information.genres.concat(
        release.basic_information.styles
      ),
    };

    dispatch(
      addAlbum({
        id: release.basic_information.id,
        master_id: release.basic_information.master_id,
        artist: artist,
        title: release.basic_information.title,
        uri: release.basic_information.cover_image,
        date_added: release.date_added,
        genres: release.basic_information.genres.concat(
          release.basic_information.styles
        ),
      })
    );

    return singleParsedRelease;
  }

  function randomArray(releases) {
    let newArray = [];
    for (let i = 0; i < 5; i += 1) {
      newArray.push(releases[Math.floor(Math.random() * releases.length)]);
    }
    setDisplayAlbums(newArray);
  }

  const Tab = createBottomTabNavigator();

  // const backButton = navigate.goBack()
  //   ? () => (
  //       <Button onPress={() => navigation.goBack()} title="Info" color="#fff" />
  //     )
  //   : null;

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // headerShown: false,
          headerStyle: {},
          tabBarStyle: {
            display: "flex",
            flexDirection: "row",
            backgroundColor: `#f2dae7`,
            width: "100%",
            height: Dimensions.get("window").height * 0.08,
            overflow: "visible",
          },
        })}
      >
        <Tab.Screen
          name="FrontPage"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.buttonBox}>
                  <Image
                    style={styles.button}
                    source={require("../icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
        >
          {(props) => <FrontPage {...props} displayAlbums={displayAlbums} />}
        </Tab.Screen>
        <Tab.Screen
          name="Collection"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.buttonBox}>
                  <Image
                    style={styles.button}
                    source={require("../icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
        >
          {(props) => <DisplayArea {...props} albums={albums} />}
        </Tab.Screen>
        <Tab.Screen
          name="Search"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.buttonBox}>
                  <Image
                    style={styles.button}
                    source={require("../icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
          component={Search}
        />
        <Tab.Screen
          name="Stats"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.buttonBox}>
                  <Image
                    style={styles.button}
                    source={require("../icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
          component={Collection}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.buttonBox}>
                  <Image
                    style={styles.button}
                    source={require("../icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
          component={Collection}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const topBarHeight = Dimensions.get("window").height * 0.06;
const footerWindowHeight = Dimensions.get("window").height * 0.08;
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
  },
  topBar: {
    height: topBarHeight,
    backgroundColor: "black",
  },
  buttonBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    padding: "1%",
  },
  button: {
    flex: 1,
    maxHeight: "90%",
    maxWidth: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
});