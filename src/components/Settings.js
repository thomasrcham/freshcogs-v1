import { Button, Text, View } from "react-native";

export default function Settings({
  albums,
  getData,
  handleAlbumState,
  requestOptions,
  runFetch,
  setAlbums,
  storeData,
}) {
  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem("@albums", jsonValue);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("@albums");
  //     setAlbums(jsonValue != null ? JSON.parse(jsonValue) : null);
  //     console.log(`loading from local, items: ${data.length}`);
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  let display = albums
    ? albums.filter((a) => a.isReissue === true).length
    : "None in state";

  return (
    <View>
      <Text>{display}</Text>
      <Button title="store album state" onPress={() => storeData(albums)} />
      <Button title="clear album state" onPress={() => setAlbums(null)} />
      <Button title="load from storage" onPress={() => getData()} />
      <Button title="clear local storage" onPress={() => storeData(null)} />
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
