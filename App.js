import { useState, useEffect } from "react";
import { Button, Dimensions, Image, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DisplayArea from "./src/components/DisplayArea.js";
import FrontPage from "./src/components/FrontPage.js";
import Collection from "./src/components/Collection.js";
import Search from "./src/components/SearchPage.js";
import "./keys.js";

export default function App({ navigation }) {
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
    let artist = release.basic_information.artists[0].name;

    artist.charAt(artist.length - 3) === "("
      ? (artist = artist.substring(0, artist.length - 4))
      : artist;

    artist === "Various" ? (artist = "Various Artists") : artist;

    let singleParsedRelease = {
      id: release.basic_information.id,
      artist: artist,
      title: release.basic_information.title,
      uri: release.basic_information.cover_image,
    };

    return singleParsedRelease;
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
                    source={require("./src/icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
        >
          {(props) => <FrontPage {...props} albums={albums} />}
        </Tab.Screen>
        <Tab.Screen
          name="Collection"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.buttonBox}>
                  <Image
                    style={styles.button}
                    source={require("./src/icons/vinyl.png")}
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
                    source={require("./src/icons/vinyl.png")}
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
                    source={require("./src/icons/vinyl.png")}
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
                    source={require("./src/icons/vinyl.png")}
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
