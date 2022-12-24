import {
  Button,
  View,
  Image,
  Linking,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

import styles from "./styles/style.js";
import albumSlice from "../redux/albumSlice.js";

export default function UserButtons({
  albums,
  setListenEvents,
  handleGlobalTags,
  globalTags,
  globalResetTags,
  updateLibraryFetch,
  getValueFor,
  requestOptions,
  getData,
}) {
  const clearStorage = () => {
    removeItemValue();
    setListenEvents(null);
  };

  const removeItemValue = async () => {
    let keys = [
      //   "@albums",
      // "@userProfile",
      // "@tags",
      "@listenEvents",
    ];
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

  function tracklistCheckTimer() {
    let checking = albums.filter((a) => a.hasTracklist === false);
    // albums.map((a) => checking.push(a));
    let myInterval = setInterval(() => {
      console.log(checking.length);
      if (checking.length === 0) {
        console.log("finished");
        clearInterval(myInterval);
      } else {
        tracklistCheck(checking[0]);
        checking.splice(0, 1);
      }
    }, 1500);
  }

  function tracklistCheck(album) {
    let URL;
    if (album.id === album.master_id) {
      URL = `releases/${album.id}`;
    } else {
      URL = `masters/${album.master_id}`;
    }
    fetch(`https://api.discogs.com/${URL}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result.tracklist
          ? (album.hasTracklist = true)
          : (album.hasTracklist = false);
      });
  }

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.userPageButtons}>
        <Button title="reset storage" onPress={() => clearStorage()} />
        {/* <Button
          title="refresh fetch data"
          onPress={() => {
            getData();
          }}
        /> */}
        <Button title="update library" onPress={() => updateLibraryFetch()} />
        <Button
          title="reset default tags"
          onPress={() => resetGlobalTags(globalTags, globalResetTags)}
        />
        <Button
          title="console.log random album"
          onPress={() =>
            console.log(
              // albums.filter((a) => a.hasTracklist === false).length
              albums[Math.floor(Math.random() * albums.length)]
            )
          }
        />
        {/* <Button
        title="clear global tags"
        onPress={() => handleGlobalTags([])}
      /> */}
        <Button
          title="Last.fm auth"
          onPress={() => setModalVisible(!modalVisible)}
        />
        <Button title="log key" onPress={() => getValueFor("lfmauth")} />
        <Button title="check tracklist" onPress={() => tracklistCheckTimer()} />
      </View>
    </View>
  );
}
