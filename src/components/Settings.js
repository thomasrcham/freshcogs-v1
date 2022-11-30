import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({
  albums,
  handleAlbumState,
  runFetch,
  setAlbums,
  requestOptions,
}) {
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@albums", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@albums");
      setAlbums(jsonValue != null ? JSON.parse(jsonValue) : null);
      console.log(`loading from local, items: ${data.length}`);
    } catch (e) {
      // error reading value
    }
  };

  const getUserData = () => {
    fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let returnData = result.folders;
        let names = returnData.map((f) => ({
          folderID: f.id,
          folderName: f.name,
        }));
        let folders = names.filter((f) => f.folderID != 0);
        folderAssignment(albums, folders);
      })
      .catch((error) => console.log("error", error));

    // let folderID = 4421972;
    // let folderName = "Christmas";
    // fetch(
    //   `https://api.discogs.com/users/theyear1000/collection/folders/${folderID}/releases?per_page=500`,
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     let returnData = result.releases;
    //     console.log(returnData.length);
    //     folderAssignment(returnData, folderID, folderName);
    //   })
    //   .catch((error) => console.log("error", error));
  };

  const folderAssignment = (albums, folders) => {
    folders.map((f) => {
      //pulls releases for each folder
      fetch(
        `https://api.discogs.com/users/theyear1000/collection/folders/${f.folderID}/releases?per_page=500`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          let returnData = result.releases;
          let ids = returnData.map((a) => a.id);
          albums.map((album) => {
            if (ids.includes(album.id)) {
              album.folder = f.folderName;
            } else {
              album.folder = album.folder;
            }
          });
          handleAlbumState(albums);
        })
        .catch((error) => console.log("error", error));
    });
  };

  let display = albums ? albums[0].folder : "None in state";

  return (
    <View>
      <Text>{display}</Text>
      <Button title="store album state" onPress={() => storeData(albums)} />
      <Button title="clear album state" onPress={() => setAlbums(null)} />
      <Button title="load from storage" onPress={() => getData()} />
      <Button title="clear local storage" onPress={() => storeData(null)} />
      <Button title="refresh fetch data" onPress={() => runFetch()} />
      <Button title="set folder values" onPress={() => getUserData()} />
    </View>
  );
}
