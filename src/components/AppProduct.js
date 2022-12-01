import { useState, useEffect } from "react";
import { Button, Dimensions, Image, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import { addAlbum } from "../redux/albumSlice";
import DisplayArea from "./DisplayArea.js";
import Settings from "./Settings.js";
import AuthTest from "./AuthTest";
import AuthPass from "./deprecated/AuthPass";
import FindPage from "./FindPage";
import "../../keys.js";

export default function AppProduct({ navigation }) {
  // const { titles } = useSelector((state) => state.albumTitleReducer);
  // const dispatch = useDispatch();
  const [albums, setAlbums] = useState(null);
  const [displayAlbums, setDisplayAlbums] = useState(null);
  const [user, setUser] = useState(null);

  //VARIABLE ESTABLISHMENT

  var dateTime = Math.round(new Date().getTime() / 1000);

  //fetch request setup
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "User-Agent",
    "Flashcogs/1.0 +https://github.com/thomasrcham/discogs-app-v3"
  );
  myHeaders.append(
    "Authorization",
    `OAuth oauth_consumer_key=${consumerKey},oauth_token=${userToken},oauth_signature_method="PLAINTEXT",oauth_timestamp="${dateTime}",oauth_nonce="${dateTime}",oauth_version="1.0",oauth_signature=""&"consumer_secret=${consumerKey}`
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // Local storage and retrieval
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@albums");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(`loading from local, items: ${data.length}`);
      randomArray(data);
      handleAlbumState(data);
    } catch (e) {
      console.log(`loading from local failed + ${e}`);
      runFetch();
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@albums", jsonValue);
    } catch (e) {
      console.log(`storage error + ${e}`);
    }
  };

  const handleAlbumState = (data) => {
    console.log(data);
    storeData(data);
    setAlbums(data);
  };

  //DATA FETCH

  useEffect(() => {
    getData();
    //
  }, []);

  function runFetch() {
    fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=30${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        let returnData = data.releases;
        let parsedReleases = returnData.map((release) => parseInfo(release));
        handleAlbumState(parsedReleases);
        randomArray(parsedReleases);
        getUserData(parsedReleases);
        console.log(`seeding from fetch, items: ${parsedReleases.length}`);
      });
  }

  //FETCHED DATA MANIP AND STATE SET
  function parseInfo(release) {
    let artist = release.basic_information.artists[0].name;
    let desc = release.basic_information.formats
      .map((f) => f.descriptions)
      .flat();

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
      folder: 0,
      isReissue: !desc.find((item) => item.slice(0, 2).toLowerCase() === "re"),
    };

    return singleParsedRelease;
  }

  const getUserData = (parsedReleases) => {
    fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let returnData = result.folders;
        let names = returnData.map((f) => ({
          folderID: f.id,
          folderName: f.name,
        }));
        let folders = names.filter((f) => f.folderID != 0);
        folderAssignment(parsedReleases, folders);
      })
      .catch((error) => console.log("error", error));
  };

  const folderAssignment = (parsedReleases, folders) => {
    folders.map((f) => {
      //pulls releases for each folder
      fetch(
        `https://api.discogs.com/users/theyear1000/collection/folders/${f.folderID}/releases?per_page=500`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          let returnData = result.releases;
          let ids = returnData.map((a) => a.id);
          parsedReleases.map((album) => {
            if (ids.includes(album.id)) {
              album.folder = f.folderName;
            } else {
              album.folder = album.folder;
            }
          });
          handleAlbumState(parsedReleases);
        })
        .catch((error) => console.log("error", error));
    });
  };

  function randomArray(releases) {
    let newArray = [];
    for (let i = 0; i < 6; i = newArray.length) {
      let newItem = releases[Math.floor(Math.random() * releases.length)];
      if (newArray.map((a) => a.id).includes(newItem.id)) {
        null;
      } else {
        newArray.push(newItem);
      }
    }
    setDisplayAlbums(newArray);
  }

  const Tab = createBottomTabNavigator();

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
          {(props) => <DisplayArea {...props} albums={displayAlbums} />}
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
        >
          {(props) => <FindPage {...props} albums={albums} />}
        </Tab.Screen>
        <Tab.Screen
          name="Auth"
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
          component={AuthTest}
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
        >
          {(props) => (
            <Settings
              {...props}
              albums={albums}
              folderAssignment={folderAssignment}
              getUserData={getUserData}
              handleAlbumState={handleAlbumState}
              requestOptions={requestOptions}
              runFetch={runFetch}
              setAlbums={setAlbums}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const topBarHeight = Dimensions.get("window").height * 0.06;
const mainWindowHeight = Dimensions.get("window").height * 0.8;

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
    height: mainWindowHeight,
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
