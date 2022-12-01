import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({
  albums,
  folders,
  getData,
  handleStorage,
  requestOptions,
  runFetch,
  setAlbums,
  setFolders,
}) {
  // const multiStoreData = async (albumsValue, foldersValue) => {
  //   const albumsPair = ["@albums", JSON.stringify(albumsValue)];
  //   const foldersPair = ["@folders", JSON.stringify(foldersValue)];
  //   try {
  //     await AsyncStorage.multiSet([albumsPair, foldersPair]);
  //   } catch (e) {
  //     console.log(`Storage failure: ${e}`);
  //   }
  //   console.log("Stored");
  // };

  // const multiGetData = () => {
  //   albumDataGet();
  //   folderDataGet();
  // };

  // const albumDataGet = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("@albums");
  //     // setAlbums(jsonValue != null ? JSON.parse(jsonValue) : null);
  //     let data = jsonValue != null ? JSON.parse(jsonValue) : null;
  //     console.log(`loading albums from local , items: ${data.length}`);
  //   } catch (e) {
  //     console.log(`Album retrieval failure: ${e}`);
  //   }
  // };
  // const folderDataGet = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("@folders");
  //     let data = jsonValue != null ? JSON.parse(jsonValue) : null;
  //     // setAlbums(jsonValue != null ? JSON.parse(jsonValue) : null);
  //     console.log(`loading folders from local, items: ${data.length}`);
  //   } catch (e) {
  //     console.log(`Folder retrieval failure: ${e}`);
  //   }
  // };

  let display = albums
    ? albums.filter((a) => a.isReissue === true).length
    : "None in state";

  return (
    <View>
      <Text>{display}</Text>
      <Button
        title="store state in local"
        onPress={() => handleStorage(albums, folders)}
      />
      <Button title="clear album state" onPress={() => setAlbums(null)} />
      <Button title="load from storage" onPress={() => getData()} />
      <Button
        title="clear local storage"
        onPress={() => handleStorage(null, null)}
      />
      <Button title="refresh fetch data" onPress={() => runFetch()} />
      {/* <Button title="set folder values" onPress={() => getUserData()} /> */}
      <Button
        title="console.log random album"
        onPress={() =>
          console.log(albums[Math.floor(Math.random() * albums.length)])
        }
      />
    </View>
  );
}
