import { useState, useEffect } from "react";
import { Dimensions, Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import { addAlbum } from "../redux/albumSlice";
import CollectionDisplayArea from "./CollectionDisplayArea.js";
import Settings from "./Settings.js";
import UserPage from "./UserPage";
import styles from "./styles/style.js";
import "../../keys.js";
import SearchDisplayArea from "./SearchDisplayArea.js";

export default function AppProduct({ navigation }) {
  // const { titles } = useSelector((state) => state.albumTitleReducer);
  // const dispatch = useDispatch();
  const [albums, setAlbums] = useState(null);
  const [displayAlbums, setDisplayAlbums] = useState(null);
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState(null);
  const [sectionList, setSectionList] = useState(null);

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

  // useEffect(() => {
  //   albums && folders ? multiStoreData(albums, folders) : null;
  // }, [albums, folders]);

  const getData = () => {
    albumDataGet();
    folderDataGet();
    handleStorage(albums, folders);
  };

  const albumDataGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@albums");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(`loading albums from local, items: ${data.length}`);
      randomArray(data);
      setAlbums(data);
    } catch (e) {
      console.log(`Album retrieval failure: ${e}`);
      runFetch();
    }
  };

  const folderDataGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@folders");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(`loading folders from local, items: ${data.length}`);
      setFolders(data);
    } catch (e) {
      console.log(`Folder storage retrieval failure: ${e}`);
    }
  };

  const handleStorage = async (albumsValue, foldersValue) => {
    setAlbums(albumsValue);
    setFolders(foldersValue);
    albumsValue
      ? console.log("albums to be stored: " + albumsValue.length)
      : console.log("no albums to store");
    foldersValue
      ? console.log("folders to be stored: " + foldersValue.length)
      : console.log("no folders to store");
    albumsValue && foldersValue
      ? multiStoreData(albumsValue, foldersValue)
      : null;
  };

  const multiStoreData = async (albumsValue, foldersValue) => {
    console.log("multiStore Called");
    const albumsPair = ["@albums", JSON.stringify(albumsValue)];
    const foldersPair = ["@folders", JSON.stringify(foldersValue)];
    try {
      await AsyncStorage.multiSet([albumsPair, foldersPair]);
    } catch (e) {
      console.log(`Storage failure: ${e}`);
    }
    console.log(
      albumsValue && foldersValue
        ? `Multi-storage success: Albums: ${albumsValue.length}, Folders: ${foldersValue.length}`
        : `Multi-storage failure`
    );
  };

  //DATA FETCH

  useEffect(() => {
    getData();
  }, []);

  function runFetch() {
    console.log("fetching");
    fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=500`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        let returnData = data.releases;
        let parsedReleases = returnData.map((release) => parseInfo(release));
        handleStorage(parsedReleases, folders);
        randomArray(parsedReleases);
        getFolderData(parsedReleases);
        console.log(`seeding from fetch, items: ${parsedReleases.length}`);
      });
  }

  //FETCHED DATA MANIP AND STATE SET
  function parseInfo(release) {
    let artist = release.basic_information.artists[0].name;

    artist.charAt(artist.length - 3) === "("
      ? (artist = artist.substring(0, artist.length - 4))
      : artist;

    artist === "Various" ? (artist = "Various Artists") : artist;

    let desc = release.basic_information.formats
      .map((f) => f.descriptions)
      .flat();

    let newDate = new Date(release.date_added);
    let ISODate = newDate.toISOString();

    let genres = release.basic_information.genres
      .concat(release.basic_information.styles)
      .filter((genre) => genre != "Folk, World, & Country")
      .filter((genre) => genre != "Stage & Screen");

    let isReissue =
      !!desc.find((item) =>
        item ? item.slice(0, 2).toLowerCase() === "re" : null
      ) || release.basic_information.year === 0;

    let singleParsedRelease = {
      id: release.basic_information.id,
      master_id: release.basic_information.master_id,
      artist: artist,
      title: release.basic_information.title,
      uri: release.basic_information.cover_image,
      date_added: release.date_added,
      ISODate: ISODate,
      genres: genres,
      folder: 0,
      isReissue: isReissue,
      // !!desc.find((item) =>
      //   item ? item.slice(0, 2).toLowerCase() === "re" : null
      // ),
      year: release.basic_information.year,
    };
    // dispatch(addAlbum(singleParsedRelease));
    return singleParsedRelease;
  }

  const getFolderData = (parsedReleases) => {
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
        setFolders(folders);
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
            }
          });
          handleStorage(parsedReleases, folders);
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
            headerStyle: {
              backgroundColor: "pink",
            },
            headerTitle: "Albums for Today:",
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <Image
                    style={styles.tabButton}
                    source={require("../icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
          header={{
            title: "title",
          }}
        >
          {(props) => (
            <CollectionDisplayArea {...props} albums={displayAlbums} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Collection"
          tabBarLabelStyle={{
            backgroundColor: "black",
          }}
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <Image
                    style={styles.tabButton}
                    source={require("../icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
        >
          {(props) => <CollectionDisplayArea {...props} albums={albums} />}
        </Tab.Screen>
        <Tab.Screen
          name="Search"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <Image
                    style={styles.tabButton}
                    source={require("../icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
        >
          {(props) => (
            <SearchDisplayArea
              {...props}
              albums={albums}
              folders={folders}
              sectionList={sectionList}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="User"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <Image
                    style={styles.tabButton}
                    source={require("../icons/vinyl.png")}
                  />
                </View>
              );
            },
          }}
          component={UserPage}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <Image
                    style={styles.tabButton}
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
              albumDataGet={albumDataGet}
              folders={folders}
              getData={getData}
              getFolderData={getFolderData}
              handleStorage={handleStorage}
              requestOptions={requestOptions}
              runFetch={runFetch}
              setAlbums={setAlbums}
              setFolders={setFolders}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const topBarHeight = Dimensions.get("window").height * 0.06;
// const mainWindowHeight = Dimensions.get("window").height * 0.8;

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     backgroundColor: "pink",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     bottom: 0,
//     height: mainWindowHeight,
//   },
//   topBar: {
//     height: topBarHeight,
//     backgroundColor: "black",
//   },
//   buttonBox: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     bottom: 0,
//     padding: "1%",
//   },
//   button: {
//     flex: 1,
//     maxHeight: "90%",
//     maxWidth: undefined,
//     aspectRatio: 1,
//     resizeMode: "contain",
//   },
// });
