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
import TagsPageContainer from "./TagsPageContainer.js";
import styles from "./styles/style.js";
import "../../keys.js";

export default function AppProduct({ navigation }) {
  const [albums, setAlbums] = useState(null);
  const [frontPageAlbums, setFrontPageAlbums] = useState(null);
  const [user, setUser] = useState(null);
  const [listenEvents, setListenEvents] = useState([]);
  const [globalTags, setGlobalTags] = useState([
    {
      id: 0,
      tags: [
        "ACOUSTIC",
        "ANGRY",
        "CLASSIC",
        "CLUB",
        "DANCEABLE",
        "DRAMATIC",
        "ENERGETIC",
        "FOLKY",
        "FUNKY",
        "GUITARS",
        "HARMONY",
        "HYPER",
        "LOUD",
        "MOODY",
        "ORCHESTRAL",
        "ORNATE",
        "QUIET",
        "RURAL",
        "SPARSE",
        "SYNTHS",
        "TRIPPY",
        "UPLIFTING",
        "ANGSTY",
        "UPBEAT",
        "INSPIRING",
        "EPIC",
        "FEMALE SINGER",
        "GUITARS",
      ],
    },
  ]);

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

  useEffect(() => {
    getData();
  }, []);

  // LOCAL STORAGE AND RETRIEVAL

  //handles the overall retrieval from storage for all main states
  const getData = () => {
    albumDataGet();
    userDataGet();
    listenEventsDataGet();
    // tagsDataGet();
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
      handleAlbumFetch();
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

  const tagsDataGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@tags");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      listenEvents.length < 1
        ? console.log(`loading ${data.length} tags from local`)
        : `Tags storage retrieval failure: storage is empty`;
      setTags(data);
    } catch (e) {
      console.log(`Tags storage retrieval failure: ${e}`);
    }
  };

  //FETCHES

  const handleAlbumFetch = async () => {
    await fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=500`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        let returnData = data.releases;
        return returnData.map((release) => parseInfo(release));
      })
      .then((r) => {
        randomArray(r);
        setAlbums(r);
        storeAlbums(r);
      });
  };

  const getUserData = () => {
    fetch(`https://api.discogs.com/users/theyear1000`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        storeUser(result);
        setUser(result);
      })
      .catch((error) => console.log("user data error", error));
  };

  const updateLibraryFetch = () => {
    fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=500`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.releases.length);
        // let latestAlbum = albums
        //   ? albums
        //       .map((a) => a.date_added)
        //       .sort()
        //       .reverse()[0]
        //   : null;

        // let newest = data.releases
        //   .map((r) => r.date_added)
        //   .sort()
        //   .reverse()[0];

        // console.log(newest);
        // console.log(latestAlbum);
      });
    // let parsedReleases = returnData.map((release) => parseInfoSet(release));
  };

  // fetched data manipulation
  const parseInfo = (release) => {
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

    let master_id = release.basic_information.master_id
      ? release.basic_information.master_id
      : release.basic_information.id;

    let genresPlus = release.basic_information.title.includes("Christmas")
      ? [...genres, "Christmas"]
      : genres;

    let singleParsedRelease = {
      id: release.basic_information.id,
      master_id: master_id,
      artist: artist,
      title: release.basic_information.title,
      uri: release.basic_information.cover_image,
      date_added: ISODate,
      genres: genresPlus,
      isReissue: isReissue,
      year: release.basic_information.year,
    };
    return singleParsedRelease;
  };

  function randomArray(releases) {
    let newArray = [];
    let filteredAlbums = releases.filter(
      (a) => !a.genres.includes("Classical") && !a.genres.includes("Christmas")
    );
    for (let i = 0; i < 6; i = newArray.length) {
      let newItem =
        filteredAlbums[Math.floor(Math.random() * filteredAlbums.length)];
      if (newArray.map((a) => a.id).includes(newItem.id)) {
        null;
      } else {
        newArray.push(newItem);
      }
    }
    setFrontPageAlbums(newArray);
  }

  //storage

  const storeAlbums = async (value) => {
    try {
      console.log(`albums to be stored: ${value.length}`);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@albums", jsonValue);
    } catch (e) {
      console.log(`albums storage failure: ${e}`);
    }
  };

  const storeUser = async (value) => {
    try {
      console.log(value ? "storing user" : "clearing user storage");
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

  const storeTags = async (value) => {
    try {
      console.log(`storing tags: ${value.length}`);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@tags", jsonValue);
      setTags(jsonValue);
    } catch (e) {
      console.log(`Tags Storage failure: ${e}`);
    }
  };

  const handleGlobalTags = (newGlobalTags) => {
    setGlobalTags(newGlobalTags);
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
            <CollectionDisplayArea
              {...props}
              albums={frontPageAlbums}
              globalTags={globalTags}
              handleGlobalTags={handleGlobalTags}
            />
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
                    size={36}
                    color={focused ? "#FDCA40" : "white"}
                  />
                </View>
              );
            },
          }}
        >
          {(props) => (
            <CollectionDisplayArea
              {...props}
              albums={albums}
              globalTags={globalTags}
              handleGlobalTags={handleGlobalTags}
            />
          )}
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
          {(props) => <SearchDisplayArea {...props} albums={albums} />}
        </Tab.Screen>
        <Tab.Screen
          name="Tags"
          options={{
            header: () => (
              <View style={styles.header}>
                <Text style={styles.headerText}>Tags</Text>
              </View>
            ),
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <View style={styles.tabButtonBox}>
                  <FontAwesome5
                    name="tags"
                    size={30}
                    color={focused ? "#FDCA40" : "white"}
                  />
                </View>
              );
            },
          }}
        >
          {(props) => <TagsPageContainer />}
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
              storeAlbums={storeAlbums}
              requestOptions={requestOptions}
              listenEvents={listenEvents}
              getData={getData}
              setAlbums={setAlbums}
              setUser={setUser}
              updateLibraryFetch={updateLibraryFetch}
            />
          )}
        </Tab.Screen>

        {/* <Tab.Screen
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
              user={user}
              listenEvents={listenEvents}
              getData={getData}
              setAlbums={setAlbums}
              setListenEvents={setListenEvents}
              setUser={setUser}
              handleAlbumFetch={handleAlbumFetch}
              getUserData={getUserData}
              storeAlbums={storeAlbums}
              storeUser={storeUser}
              storeListenEvents={storeListenEvents}
              updateLibraryFetch={updateLibraryFetch}
            />
          )}
        </Tab.Screen> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
