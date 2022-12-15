import { Button, View, Image, Linking, Pressable, Text } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import styles from "./styles/style.js";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb");

export default function UserPage({
  albums,
  getData,
  handleGlobalTags,
  globalTags,
  globalResetTags,
  setAlbums,
  storeAlbums,
  setUser,
  listenEvents,
  requestOptions,
  user,
  updateLibraryFetch,
}) {
  const navigation = useNavigation();
  const [updating, setUpdating] = useState("Update Now");
  const [albumsToUpdate, setAlbumsToUpdate] = useState(
    albums ? albums.filter((a) => a.isReissue === true).length : 0
  );

  const handleProfileClick = () => {
    let URL = `${user.uri}`;
    Linking.canOpenURL(URL).then((supported) => {
      if (supported) {
        Linking.openURL(URL);
      } else {
        console.log("Don't know how to open URI: " + URL);
      }
    });
  };

  function yearReplaceTimer() {
    setUpdating("In Progress");
    let myInterval = setInterval(() => {
      let needsReplacement = albums
        ? albums.filter((a) => a.isReissue === true).slice(0, 5)
        : console.log("none to set as needs replacement");

      if (needsReplacement.length === 0) {
        console.log("finished");
        clearInterval(myInterval);
        setAlbums(albums);
        storeAlbums(albums);
        setUpdating("Complete");
        setAlbumsToUpdate(0);
      } else {
        console.log(
          `remaining albums that need year replaced: ${
            albums.filter((a) => a.isReissue === true).length
          }`
        );
        setAlbumsToUpdate(albums.filter((a) => a.isReissue === true).length);
        setUpdating("In Progress");
        needsReplacement.map((album) => individualYearReplace(album));
      }
    }, 10000);
  }

  function individualYearReplace(album) {
    console.log(`${album.title}, ${album.year}, ${album.master_id}`);
    fetch(`https://api.discogs.com/masters/${album.master_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        album.isReissue = false;
        album.year = result.year;
      });
  }

  const clearStorage = () => {
    removeItemValue();
    setAlbums(null);
  };

  const removeItemValue = async () => {
    let keys = ["@albums", "@userProfile"];
    await AsyncStorage.multiRemove(keys);
  };

  const resetGlobalTags = (globalTags, globalResetTags) => {
    let newFullTag = {
      id: 0,
      tags: globalResetTags,
    };
    let filterGlobalTags = globalTags.filter((g) => g.id != newFullTag.id);
    let newGlobalTags = [...filterGlobalTags, newFullTag];
    handleGlobalTags(newGlobalTags);
  };

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.userPageContainer}>
        <View style={styles.userImageContainer}>
          <Image
            style={styles.userImage}
            source={{
              uri: `${user.avatar_url}`,
            }}
          />
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userText}>Username: {user.username}</Text>
          <Text style={styles.userText}>
            Discogs Member Since:{" "}
            {format(new Date(user.registered), "MM/dd/yyyy")}
          </Text>
          <Text style={styles.userText}>
            Records in Collection: {user.num_collection}
          </Text>
          <Pressable onPress={handleProfileClick} style={styles.userText}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Image
                style={{
                  aspectRatio: 1,
                  height: 25,
                  marginRight: 3,
                }}
                source={require("../icons/vinyl.png")}
              />
            </View>
            <Text style={(styles.userText, styles.discogsLinkText)}>
              Discogs Profile
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          marginLeft: 10,
          height: "5%",
        }}
      >
        <View style={{ width: "55%" }}>
          <Text>
            Albums with potentially incorrect release year data:{" "}
            {albumsToUpdate}
          </Text>
        </View>
        <View
          style={{
            width: "45%",
            alignItems: "center",
          }}
        >
          {updating != "Update Now" ? (
            <Button title={updating} style={{ width: "30%" }} disabled={true} />
          ) : (
            <Button
              title="Update Now"
              style={{ width: "30%" }}
              onPress={yearReplaceTimer}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          marginLeft: 10,
        }}
      >
        <View style={{ width: "55%" }}>
          <Text>
            Total Listen Events Recorded:{" "}
            {listenEvents ? listenEvents.length : 0}
          </Text>
        </View>
        <View style={{ width: "45%", alignItems: "center" }}>
          <Button
            title="View Events"
            style={{ width: "30%" }}
            onPress={() => navigation.navigate("ListenEvents")}
          />
        </View>
      </View>
      <View style={styles.userPageButtons}>
        <Button title="reset storage" onPress={() => clearStorage()} />
        <Button
          title="refresh fetch data"
          onPress={() => {
            getData();
          }}
        />
        <Button title="update library" onPress={() => updateLibraryFetch()} />
        <Button
          title="reset default tags"
          onPress={() => resetGlobalTags(globalTags, globalResetTags)}
        />

        <Button
          title="console.log random album"
          onPress={() =>
            console.log(albums[Math.floor(Math.random() * albums.length)])
          }
        />
      </View>
    </View>
  );
}
