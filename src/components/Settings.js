import { Button, Text, View } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({
  albums,
  user,
  listenEvents,
  getData,
  setAlbums,
  setListenEvents,
  setUser,
  handleAlbumFetch,
  storeAlbums,
  storeUser,
  storeListenEvents,
  updateLibraryFetch,
}) {
  const clearStorage = () => {
    removeItemValue();
    setAlbums(null);
    setUser(null);
  };

  const removeItemValue = async () => {
    let keys = ["@albums", "@userProfile"];
    await AsyncStorage.multiRemove(keys);
  };

  return (
    <View>
      <Button title="reset storage" onPress={() => clearStorage()} />
      <Button
        title="refresh fetch data"
        onPress={() => {
          getData();
        }}
      />
      <Button title="update library" onPress={() => updateLibraryFetch()} />
      <Button
        title="console.log random album"
        onPress={() =>
          console.log(albums[Math.floor(Math.random() * albums.length)])
        }
      />
    </View>
  );
}
