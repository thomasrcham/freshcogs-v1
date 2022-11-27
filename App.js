import { StyleSheet, View, Image } from "react-native";
import { useState, useEffect } from "react";
import "./keys.js";
import DisplayArea from "./src/components/DisplayArea.js";
import { Dimensions } from "react-native";
import FrontPage from "./src/components/FrontPage.js";
import Collection from "./src/components/Collection.js";
import Search from "./src/components/Search.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

  const Tab = createBottomTabNavigator();

  // export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
            tabBarShowLabel: false,
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
            tabBarShowLabel: false,
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
          {(props) => <Collection {...props} albums={albums} />}
        </Tab.Screen>
        <Tab.Screen
          name="Search"
          options={{
            tabBarShowLabel: false,
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
            tabBarShowLabel: false,
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
            tabBarShowLabel: false,
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
