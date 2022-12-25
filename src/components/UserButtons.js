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
import { lfm_api_key, lfm_secret } from "@env";

import styles from "./styles/style.js";

export default function UserButtons({
  albums,
  setListenEvents,
  handleGlobalTags,
  globalTags,
  globalResetTags,
  updateLibraryFetch,
  requestOptions,
  LFMKey,
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

  const logEvent = (album) => {
    let URL;
    if (album.id === album.master_id) {
      URL = `releases/${album.id}`;
    } else {
      URL = `masters/${album.master_id}`;
    }
    fetch(`https://api.discogs.com/${URL}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let r = tracklistFetch(result.tracklist);
        let string = tracklistToString(r, album);
        // console.log(string);
        let md5 = tracklistToMD5(r, album);
      })
      .catch((e) => console.log(e));
  };

  const tracklistFetch = (tracklist) => {
    let tracklistArray = [];
    for (let i = 0; i < tracklist.length; i++) {
      let track = {
        track: i,
        title: tracklist[i].title,
      };
      tracklistArray.push(track);
    }
    return tracklistArray;
  };

  const tracklistToString = (tracklistArray, album) => {
    let fullAlbumString = [`method=track.scrobble&sk=${LFMKey}`];
    for (let i = 0; i < tracklistArray.length; i++) {
      let fullString = `artist[${i}]=${album.artist}&track[${i}]=${
        tracklistArray[i].title
      }&timestamp[${i}]=${Date.now() + i * 60000}&album[${i}]=${album.title}`;
      fullAlbumString.push(fullString);
    }
    let combinedAlbumsString = fullAlbumString.join("&");
    return combinedAlbumsString;
  };

  var CryptoJS = require("crypto-js");

  const tracklistToMD5 = (tracklistArray, album) => {
    let fullArtistMD5 = [];
    let fullTrackMD5 = [];
    let fullAlbumMD5 = [];
    let fullTimestampMD5 = [];
    for (let i = 0; i < tracklistArray.length; i++) {
      let fullArtistString = `artist[${i}]${album.artist}`;
      fullArtistMD5.push(fullArtistString);
    }
    console.log(fullArtistMD5);
    for (let i = 0; i < tracklistArray.length; i++) {
      let fullTrackString = `track[${i}]${tracklistArray[i].title}`;
      fullTrackMD5.push(fullTrackString);
    }

    for (let i = 0; i < tracklistArray.length; i++) {
      let fullAlbumString = `album[${i}]=${album.title}`;
      fullAlbumMD5.push(fullAlbumString);
    }
    for (let i = 0; i < tracklistArray.length; i++) {
      let fullTimestampString = `timestamp[${i}]=${Date.now() + i * 60000}`;
      fullTimestampMD5.push(fullTimestampString);
    }

    let fullMD5 =
      // CryptoJS.MD5(
      `${fullAlbumMD5.join("")}api_key${lfm_api_key}${fullArtistMD5.join(
        ""
      )}methodtrack.scrobblesk${LFMKey}${fullTimestampMD5.join(
        ""
      )}${fullTrackMD5}${lfm_secret}`;
    // ).toString();
  };

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.userPageButtons}>
        <Button title="reset storage" onPress={() => clearStorage()} />
        {/*<Button
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
            console.log(albums[Math.floor(Math.random() * albums.length)])
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
        <Button
          title="random tracklist"
          onPress={() =>
            logEvent(albums.filter((a) => a.master_id === 11329)[0])
          }
        />
      </View>
    </View>
  );
}
