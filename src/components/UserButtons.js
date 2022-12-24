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

export default function UserButtons({
  albums,
  setListenEvents,
  handleGlobalTags,
  globalTags,
  globalResetTags,
  updateLibraryFetch,
  getValueFor,
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
      </View>
    </View>
  );
}
