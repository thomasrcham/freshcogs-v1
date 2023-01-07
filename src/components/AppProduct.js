import { useState, useEffect } from "react";
import { Alert, Dimensions, Image, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  discogsConsumerKey,
  discogsConsumerSecret,
  lfm_api_key,
  lfm_secret,
} from "@env";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import CollectionDisplayArea from "./CollectionDisplayArea.js";
import UserPageContainer from "./UserPageContainer";
import SearchDisplayArea from "./SearchDisplayArea.js";
import TagsPageContainer from "./TagsPageContainer.js";

import styles from "./styles/style.js";

export default function AppProduct({
  username,
  discogsToken,
  discogsSecretToken,
}) {
  const [albums, setAlbums] = useState(null);
  const [frontPageAlbums, setFrontPageAlbums] = useState(null);
  const [user, setUser] = useState(null);
  const [listenEvents, setListenEvents] = useState([]);
  const [globalTags, setGlobalTags] = useState([
    {
      id: 0,
      tags: globalResetTags,
    },
  ]);

  const [lastFMUser, setLastFMUser] = useState(null);
  const [LFMKey, setLFMKey] = useState(null);

  //VARIABLE ESTABLISHMENT

  var dateTime = Math.round(new Date().getTime() / 1000);

  const globalResetTags = [
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
    "SOULFUL",
    "SPARSE",
    "SYNTHS",
    "TRIPPY",
    "UPLIFTING",
    "ANGSTY",
    "UPBEAT",
    "INSPIRING",
    "EPIC",
    "FEMALE SINGER",
  ];

  // firebase establishment
  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  //fetch request setup

  var requestOptions = {
    headers: {
      Authorization: `OAuth oauth_consumer_key="${discogsConsumerKey}", oauth_nonce="${dateTime}", oauth_token="${discogsToken}", oauth_signature="${discogsConsumerSecret}&${discogsSecretToken}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${dateTime}"`,
      "User-Agent": "Freshcogs/1.0 +exp:127.0.0.1:19000",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  useEffect(() => {
    getData();
  }, []);

  // LOCAL RETRIEVAL

  //handles the overall retrieval from storage for all main states
  const getData = () => {
    albumDataGet();
    userDataGet();
    listenEventsDataGet();
    tagsDataGet();
    lfmUserDataGet();
    getKey("lfmauth");
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
      try {
        const jsonValue = await firebaseRead("albums");
        let data = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(`loading albums from firebase, items: ${data.length}`);
        randomArray(data);
        setAlbums(data);
        storeAlbums(data);
      } catch (e) {
        console.log("firebase read failed");
        handleAlbumFetch();
      }
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
      console.log(`loading ${data.length} listen events from local`);
      setListenEvents(data);
    } catch (e) {
      console.log(`Listen Events storage retrieval failure: ${e}`);
      try {
        const jsonValue = await firebaseRead("listenEvents");
        let data = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(
          `loading listen events from firebase, items: ${data.length}`
        );
        storeListenEvents(data);
      } catch (e) {
        console.log(`firebase read failed: ${e}`);
      }
    }
  };

  const tagsDataGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@tags");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(`loading ${data.length} tags from local`);
      setGlobalTags(data);
    } catch (e) {
      console.log(`Tag retrieval failure: ${e}`);
      try {
        const jsonValue = await firebaseRead("tags");
        let data = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(`loading tags from firebase, items: ${data.length}`);
        setGlobalTags(data);
        storeTags(data);
      } catch (e) {
        console.log(`firebase read failed: ${e}`);
      }
    }
  };

  const lfmUserDataGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@lfmuser");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      data.username
        ? console.log(`loading lfm user data from local`)
        : console.log(`User storage retrieval failure: ${e}`);
      setLastFMUser(data);
    } catch (e) {
      console.log(`User storage retrieval failure: ${e}`);
    }
  };

  const firebaseRead = async (target) => {
    console.log(`retrieving ${target} from firestore`);
    const dbRef = collection(db, target);
    const q = query(dbRef, orderBy("dateTime", "desc"), limit(1));
    const result = await getDocs(q);
    let newArray = [];
    switch (target) {
      case "albums": {
        result.forEach((doc) => {
          newArray.push(doc.data().albums);
        });
      }
      case "tags": {
        result.forEach((doc) => {
          newArray.push(doc.data().tags);
        });
      }
      case "listenEvents": {
        result.forEach((doc) => {
          newArray.push(doc.data().listenEvents);
        });
      }
    }

    return newArray[0];
  };

  //FETCHES

  const handleAlbumFetch = async () => {
    console.log("product user: " + username);
    await fetch(
      `https://api.discogs.com/users/${username}/collection/folders/0/releases?per_page=500`,
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
    fetch(`https://api.discogs.com/users/${username}`, requestOptions)
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
        let latestAlbum = albums
          ? albums
              .map((a) => a.date_added)
              .sort()
              .reverse()[0]
          : null;

        let newAlbums = data.releases.filter((r) => r.date_added > latestAlbum);
        if (newAlbums.length > 0) {
          let newParsedReleases = newAlbums.map((release) =>
            parseInfo(release)
          );
          let newArray = [...albums, newParsedReleases];
          setAlbums(newArray);
          storeAlbums(newArray);
          Alert.alert(
            `Library is updated: ${newParsedReleases.length} albums have been added`
          );
        } else {
          Alert.alert("Library is synced; no new albums to add");
        }
      });
  };

  //data manipulation

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

  const randomArray = (releases) => {
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
  };

  //storage

  const storeAlbums = async (value) => {
    try {
      console.log(`albums to be stored: ${value.length}`);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@albums", jsonValue);
      await firebaseStore("albums", jsonValue);
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
      setListenEvents(value);
      await AsyncStorage.setItem("@listenEvents", jsonValue);
      await firebaseStore("listenEvents", jsonValue);
    } catch (e) {
      console.log(`Listen Events Storage failure: ${e}`);
    }
  };

  const storeTags = async (value) => {
    try {
      console.log(`storing tags locally: items: ${value.length}`);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@tags", jsonValue);
      await firebaseStore("tags", jsonValue);
    } catch (e) {
      console.log(`Tags Storage failure: ${e}`);
    }
  };

  const storeLFMUser = async (value) => {
    try {
      console.log(`storing lfm user locally`);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@lfmuser", jsonValue);
      // await firebaseStore("tags", jsonValue);
    } catch (e) {
      console.log(`LFM User Storage failure: ${e}`);
    }
  };

  const handleGlobalTags = (newGlobalTags) => {
    storeTags(newGlobalTags);
    setGlobalTags(newGlobalTags);
  };

  const firebaseStore = async (target, payload) => {
    try {
      const docRef = await addDoc(collection(db, target), {
        dateTime: new Date().toISOString(),
        [target]: payload,
      });
      console.log("firestore success: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //secure storage for keys

  const save = async (key, value) => {
    console.log(key, value);
    await SecureStore.setItemAsync(key, value);
  };

  const getKey = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      switch (key) {
        case "lfmauth": {
          setLFMKey(result);
        }
      }
      console.log(key + " key set");
    } else {
      console.log(key + "No values stored under that key.");
    }
  };

  //last.fm user auth

  const [lastFMUsername, onChangelastFMUsername] = useState("");
  const [lastFMPassword, onChangelastFMPassword] = useState("");

  var parseString = require("xml2js").parseString;
  var CryptoJS = require("crypto-js");

  var requestOptionslfm = {
    method: "POST",
    redirect: "follow",
  };

  let lfmsig = CryptoJS.MD5(
    `api_key${lfm_api_key}methodauth.getMobileSessionpassword${lastFMPassword}username${lastFMUsername}${lfm_secret}`
  ).toString();

  const lastFMauth = async () => {
    await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=auth.getMobileSession&password=${lastFMPassword}&username=${lastFMUsername}&api_key=${lfm_api_key}&api_sig=${lfmsig}`,
      requestOptionslfm
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        parseString(result, function (err, output) {
          lastFMUserFetch(output.lfm.session[0].name[0]);
          save("lfmauth", output.lfm.session[0].key[0]);
          onChangelastFMPassword("");
          onChangelastFMUsername("");
        });
      })
      .catch((error) => console.log("error", error));
  };

  //last fm user info fetch

  var userRequestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const lastFMUserFetch = (username) => {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&api_key=${lfm_api_key}&user=${username}`,
      userRequestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        parseString(result, function (err, output) {
          lfmUserParse(output.lfm.user[0]);
        })
      )
      .catch((error) => console.log("lfm user fetch error", error));
  };

  const lfmUserParse = (lfmResponse) => {
    let parsedUser = {
      username: lfmResponse.name[0],
      playcount: lfmResponse.playcount[0],
      dateRegistered: new Date(
        lfmResponse.registered[0]._ * 1000
      ).toISOString(),
      lfmURL: lfmResponse.url[0],
      lfmPFP: lfmResponse.image[2]._,
    };
    storeLFMUser(parsedUser);
    setLastFMUser(parsedUser);
  };

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          unmountOnBlur: true,
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "#FFBF69",
          header: () => (
            <View style={styles.header}>
              <View style={styles.headerRow}>
                <Image
                  style={styles.headerImage}
                  source={require("../icons/icon.png")}
                />
                <Text style={styles.headerText}> Freshcogs </Text>
                <Image
                  style={styles.headerImage}
                  source={require("../icons/icon.png")}
                />
              </View>
            </View>
          ),
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
              storeListenEvents={storeListenEvents}
              randomArray={randomArray}
              allAlbums={albums}
              requestOptions={requestOptions}
              LFMKey={LFMKey}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Covers"
          tabBarLabelStyle={{
            backgroundColor: "black",
          }}
          options={{
            // header: () => (
            //   <View style={styles.header}>
            //     <Text style={styles.headerText}>Collection Browser</Text>
            //   </View>
            // ),
            // headerTintColor: "white",
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
              storeListenEvents={storeListenEvents}
              requestOptions={requestOptions}
              LFMKey={LFMKey}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Browse"
          options={{
            // header: () => (
            //   <View style={styles.header}>
            //     <Text style={styles.headerText}>Search your Collection:</Text>
            //   </View>
            // ),
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
              globalTags={globalTags}
              handleGlobalTags={handleGlobalTags}
              storeListenEvents={storeListenEvents}
              LFMKey={LFMKey}
              requestOptions={requestOptions}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Tags"
          options={{
            // header: () => (
            //   <View style={styles.header}>
            //     <Text style={styles.headerText}>Tags</Text>
            //   </View>
            // ),
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
          {(props) => (
            <TagsPageContainer
              albums={albums}
              globalTags={globalTags}
              handleGlobalTags={handleGlobalTags}
              storeListenEvents={storeListenEvents}
              LFMKey={LFMKey}
              requestOptions={requestOptions}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="User"
          options={{
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
              albums={albums}
              getData={getData}
              getKey={getKey}
              globalResetTags={globalResetTags}
              globalTags={globalTags}
              handleGlobalTags={handleGlobalTags}
              lastFMauth={lastFMauth}
              lastFMPassword={lastFMPassword}
              lastFMUser={lastFMUser}
              lastFMUserFetch={lastFMUserFetch}
              lastFMUsername={lastFMUsername}
              LFMKey={LFMKey}
              listenEvents={listenEvents}
              onChangelastFMPassword={onChangelastFMPassword}
              onChangelastFMUsername={onChangelastFMUsername}
              requestOptions={requestOptions}
              save={save}
              setAlbums={setAlbums}
              setGlobalTags={setGlobalTags}
              setLastFMUser={setLastFMUser}
              setListenEvents={setListenEvents}
              setUser={setUser}
              storeAlbums={storeAlbums}
              storeListenEvents={storeListenEvents}
              updateLibraryFetch={updateLibraryFetch}
              user={user}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
