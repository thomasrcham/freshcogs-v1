import { useState, useEffect } from "react";
import { Dimensions, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CollectionDisplayArea from "./CollectionDisplayArea.js";
import UserPageContainer from "./UserPageContainer";
import SearchDisplayArea from "./SearchDisplayArea.js";

import Settings from "./Settings.js";
import styles from "./styles/style.js";
import "../../keys.js";

export default function AppProduct({ navigation }) {
  const [albums, setAlbums] = useState(null);
  const [frontPageAlbums, setFrontPageAlbums] = useState(null);
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState(null);
  const [listenEvents, setListenEvents] = useState([]);
  // rearranged albums array for SectionList implementation
  // const [sectionList, setSectionList] = useState(null);
  // generated list of all repeated genre labels from discogs
  // const [genreList, setGenreList] = useState(null);

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

  // LOCAL STORAGE AND RETRIEVAL

  //handles the overall retrieval from storage for all main states
  const getData = () => {
    albumDataGet();
    folderDataGet();
    userDataGet();
    listenEventsDataGet();
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

  const userDataGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@userProfile");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      data.username ? console.log(`loading user from local`) : getUserData();
      setUser(data);
    } catch (e) {
      console.log(`User storage retrieval failure: ${e}`);
      getUserData();
    }
  };

  const listenEventsDataGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@listenEvents");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      listenEvents.length < 1
        ? console.log(`loading ${data.length} listen events from local`)
        : `Listen Events storage retrieval failure: storage is empty`;
      setListenEvents(data);
    } catch (e) {
      console.log(`Listen Events storage retrieval failure: ${e}`);
    }
  };

  //ensures that state and storage match for albums and folders
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

  //stores albums and folders
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

  //ensures that state and storage match for user
  // const handleUser = (value) => {
  //   storeUser(value);
  //   setUser(value);
  // };

  const storeUser = async (value) => {
    try {
      console.log("storing user");
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@userProfile", jsonValue);
    } catch (e) {
      console.log(`User Storage failure: ${e}`);
    }
  };

  const storeListenEvents = async (value) => {
    try {
      console.log(`storing listening events: ${value.length}`);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@listenEvents", jsonValue);
      setListenEvents(jsonValue);
    } catch (e) {
      console.log(`Listen Events Storage failure: ${e}`);
    }
  };

  // data fetch

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
        // createGenreList(parsedReleases);
        console.log(`seeding from fetch, items: ${parsedReleases.length}`);
      });
  }

  const getUserData = () => {
    fetch(`https://api.discogs.com/users/theyear1000`, requestOptions)
      .then((response) => response.json())
      .then((result) => handleUser(result))
      .catch((error) => console.log("error", error));
  };

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

  // fetched data manipulation
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

    let master_id = release.master_id
      ? release.master_id
      : release.basic_information.id;

    let singleParsedRelease = {
      id: release.basic_information.id,
      master_id: master_id,
      artist: artist,
      title: release.basic_information.title,
      uri: release.basic_information.cover_image,
      date_added: ISODate,
      genres: genres,
      folder: 0,
      isReissue: isReissue,
      year: release.basic_information.year,
    };
    // dispatch(addAlbum(singleParsedRelease));
    return singleParsedRelease;
  }

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
    setFrontPageAlbums(newArray);
  }

  const createGenreList = (albums) => {
    let genres = albums
      .map((a) => a.genres)
      .flat()
      .sort();

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    let duplicates = genres
      .filter((e, i, a) => a.indexOf(e) !== i)
      .filter(onlyUnique);
    setGenreList(duplicates);
  };

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          unmountOnBlur: true,
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "#FFBF69",
          tabBarStyle: {
            display: "flex",
            flexDirection: "row",
            backgroundColor: `#124242`,
            width: "100%",
            height: Dimensions.get("window").height * 0.08,
            overflow: "visible",
            paddingBottom: 5,
            ...Platform.select({
              ios: { paddingBottom: 15 },
              android: { paddingBottom: 5 },
              default: { paddingBottom: 5 },
            }),
            borderTopWidth: 0,
            borderTopColor: "transparent",
          },
        })}
      >
        <Tab.Screen
          name="FrontPage"
          options={{
            header: () => (
              <View style={styles.header}>
                <Text style={styles.headerText}>Check these out:</Text>
              </View>
            ),
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <MaterialCommunityIcons
                    name="record-player"
                    size={40}
                    color={focused ? "#FDCA40" : "white"}
                  />
                </View>
              );
            },
          }}
        >
          {(props) => (
            <CollectionDisplayArea {...props} albums={frontPageAlbums} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Collection"
          tabBarLabelStyle={{
            backgroundColor: "black",
          }}
          options={{
            header: () => (
              <View style={styles.header}>
                <Text style={styles.headerText}>Collection Browser</Text>
              </View>
            ),
            headerTintColor: "white",
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <MaterialIcons
                    name="library-music"
                    size={40}
                    color={focused ? "#FDCA40" : "white"}
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
            header: () => (
              <View style={styles.header}>
                <Text style={styles.headerText}>Search your Collection:</Text>
              </View>
            ),
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <MaterialCommunityIcons
                    name="text-search"
                    size={40}
                    color={focused ? "#FDCA40" : "white"}
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
            header: () => (
              <View style={styles.header}>
                <Text style={styles.headerText}>User Profile</Text>
              </View>
            ),
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <FontAwesome5
                    name="user-astronaut"
                    size={32}
                    color={focused ? "#FDCA40" : "white"}
                  />
                </View>
              );
            },
          }}
        >
          {(props) => (
            <UserPageContainer
              user={user}
              albums={albums}
              folders={folders}
              requestOptions={requestOptions}
              handleStorage={handleStorage}
              listenEvents={listenEvents}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Settings"
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <MaterialIcons
                    name="settings-applications"
                    size={40}
                    color={focused ? "#FDCA40" : "white"}
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
              getUserData={getUserData}
              user={user}
              handleStorage={handleStorage}
              requestOptions={requestOptions}
              runFetch={runFetch}
              setAlbums={setAlbums}
              setFolders={setFolders}
              listenEvents={listenEvents}
              setListenEvents={setListenEvents}
              storeListenEvents={storeListenEvents}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
