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
  Alert,
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
        let tracklist = tracklistFetch(result.tracklist);
        let scrobbleInterval = setInterval(() => {
          if (tracklist.length === 0) {
            console.log("finished");
            clearInterval(scrobbleInterval);
          } else {
            scrobbleTrack(tracklist[0], album);
            tracklist.shift();
          }
        }, 10000);
      })
      .catch((e) => console.log(e));
  };

  var CryptoJS = require("crypto-js");
  var parseString = require("xml2js").parseString;

  const scrobbleTrack = (singleTrack, album) => {
    let dateTime = Math.round(Date.now() / 1000);
    let md5String = CryptoJS.MD5(
      `album[0]${album.title}api_key${lfm_api_key}artist[0]${album.artist}methodtrack.scrobblesk${LFMKey}timestamp[0]${dateTime}track[0]${singleTrack.title}${lfm_secret}`
    ).toString();
    let fullString = `method=track.scrobble&artist[0]=${album.artist}&track[0]=${singleTrack.title}&timestamp[0]=${dateTime}&album[0]=${album.title}&api_key=${lfm_api_key}&sk=${LFMKey}&api_sig=${md5String}`;

    var scrobbleRequestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `http://ws.audioscrobbler.com/2.0/?${fullString}`,
      scrobbleRequestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        parseString(result, function (err, output) {
          output.lfm.scrobbles[0].$.accepted
            ? console.log(
                "scrobbled " + output.lfm.scrobbles[0].scrobble[0].track[0]._
              )
            : Alert.alert("failed");
        })
      )
      .catch((error) => console.log("error", error));
  };

  const tracklistFetch = (tracklist) => {
    let tracklistArray = [];
    for (let i = 0; i < tracklist.length; i++) {
      let track = {
        trackNo: i,
        title: tracklist[i].title,
      };
      tracklistArray.push(track);
    }
    return tracklistArray;
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
            logEvent(
              // albums.filter((a) => a.master_id === 11329)[0]
              albums[Math.floor(Math.random() * albums.length)]
            )
          }
        />
      </View>
    </View>
  );
}
