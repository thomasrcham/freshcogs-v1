import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles/style.js";

export default function UserButtons({
  albums,
  customFields,
  discogsAuth,
  getData,
  getKey,
  globalTags,
  globalResetTags,
  handleGlobalTags,
  requestOptions,
  setLastFMUser,
  setListenEvents,
  updateLibraryFetch,
}) {
  const clearStorage = () => {
    removeItemValue();
    setListenEvents(null);
  };

  const removeItemValue = async (key) => {
    // let keys = [
    //   "@albums",
    //   // "@userProfile",
    //   "@tags",
    //   "@listenEvents",
    // ];
    await AsyncStorage.removeItem(key);
    console.log("removed " + key);
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

  const importFirebase = () => {
    removeItemValue();
    getData();
  };

  const scrobbleEvent = (album) => {
    let URL;
    if (album[0].id === album[0].master_id) {
      URL = `releases/${album[0].id}`;
    } else {
      URL = `masters/${album[0].master_id}`;
    }

    fetch(`https://api.discogs.com/${URL}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let tracklist = tracklistFetch(
          result.tracklist,
          album[0],
          !!album[0].artist.includes("Various")
        );
        // console.log(result.tracklist.map((t) => t.artists[0].name));
        console.log(tracklist);
        // let scrobbleInterval = setInterval(() => {
        //   if (tracklist.length === 0) {
        //     console.log("finished");
        //     clearInterval(scrobbleInterval);
        //   } else {
        //     scrobbleTrack(tracklist[0], album);
        //     tracklist.shift();
        //   }
        // }, 10000);
      })
      .catch((e) => console.log(e));
  };

  const tracklistFetch = (tracklist, album, various) => {
    let tracklistArray = [];
    if (various) {
      for (let i = 0; i < tracklist.length; i++) {
        let track = {
          trackNo: i,
          title: tracklist[i].title,
          artist: tracklist[i].artists[0].name,
          album: album.title,
        };
        tracklistArray.push(track);
      }
    } else {
      for (let i = 0; i < tracklist.length; i++) {
        let track = {
          trackNo: i,
          title: tracklist[i].title,
          artist: album.artist,
          album: album.title,
        };
        tracklistArray.push(track);
      }
    }
    return tracklistArray;
  };

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.userPageButtons}>
        <Button title="reset storage" onPress={() => clearStorage()} />
        <Button
          title="import firebase data"
          onPress={() => {
            importFirebase();
          }}
        />
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
            // console.log(albums[Math.floor(Math.random() * albums.length)])
            console.log(albums.filter((a) => a.id === 16179631))
          }
        />
        <Button
          title="various artists test"
          onPress={
            () => scrobbleEvent(albums.filter((a) => a.id === 8357933))
            // scrobbleEvent(albums.filter((a) => a.id === 16179631))
          }
        />
        {/* <Button
        title="clear global tags"
        onPress={() => handleGlobalTags([])}
      /> */}
        <Button
          title="resetLFM"
          onPress={() => {
            removeItemValue("@lfmuser");
            setLastFMUser(null);
          }}
        />
      </View>
    </View>
  );
}
