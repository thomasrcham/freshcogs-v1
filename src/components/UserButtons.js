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

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.userPageButtons}>
        {/*<Button title="reset storage" onPress={() => clearStorage()} />
        <Button
          title="import firebase data"
          onPress={() => {
            importFirebase();
          }}
        />
        <Button
        title="refresh fetch data"
        onPress={() => {
          getData();
        }}
      /> */}
        <Button title="update library" onPress={() => updateLibraryFetch()} />
        {/* <Button
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
        <Button
        title="clear global tags"
        onPress={() => handleGlobalTags([])}
      /> */}
        <Button
          title="Logout Last.fm"
          onPress={() => {
            removeItemValue("@lfmuser");
            setLastFMUser(null);
          }}
        />
      </View>
    </View>
  );
}
