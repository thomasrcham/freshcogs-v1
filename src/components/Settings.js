import { Button, Text, View } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({
  albums,
  folders,
  user,
  listenEvents,
  getData,
  setAlbums,
  // setFolders,
  setListenEvents,
  setUser,
  handleAlbumFetch,
  storeAlbums,
  // storeFolders,
  storeUser,
  storeListenEvents,
  updateLibraryFetch,
}) {
  const clearStorage = () => {
    removeItemValue();
    setAlbums(null);
    // setFolders(null);
    setUser(null);
  };

  const removeItemValue = async () => {
    let keys = ["@albums", "@folders", "@userProfile"];
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
      <Button
        title="console.log random album"
        onPress={() => console.log(albums.filter((a) => a.folder === 0))}
      />
    </View>
  );
}
