import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles/style.js";

export default function UserButtons({
  albums,
  getData,
  globalTags,
  globalResetTags,
  handleGlobalTags,
  setListenEvents,
  updateLibraryFetch,
}) {
  const clearStorage = () => {
    removeItemValue();
    setListenEvents(null);
  };

  const removeItemValue = async () => {
    let keys = [
      "@albums",
      // "@userProfile",
      "@tags",
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

  const importFirebase = () => {
    removeItemValue();
    getData();
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
      </View>
    </View>
  );
}
