import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import albumSlice from "../redux/albumSlice";

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
  const [fixedYearArray, setFixedYearArray] = useState([]);
  let display = albums
    ? albums.filter((a) => a.isReissue === true).length
    : "None in state";

  // let needsReplacement = albums
  //   ? albums.filter((a) => a.isReissue === true).slice(0, 20)
  //   : null;

  function yearReplaceTimer() {
    setInterval(yearReplace, 5000);
  }

  function yearReplace() {
    let needsReplacement = albums
      ? albums.filter((a) => a.isReissue === true).slice(0, 3)
      : null;
    needsReplacement
      ? needsReplacement.map((album) => individualYearReplace(album))
      : null;
    // : clearTimeout();
    console.log(
      needsReplacement
        ? `left to handle: ${albums.filter((a) => a.isReissue === true).length}`
        : `finished`
    );
  }

  function individualYearReplace(album) {
    console.log(`${album.title}, ${album.year}, ${album.master_id}`);
    fetch(`https://api.discogs.com/masters/${album.master_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        album.isReissue = false;
        album.year = result.year;
      });
  }

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
      <Button title="year replacement" onPress={() => yearReplaceTimer()} />
      <Button title="stop" onPress={() => clearInterval()} />
    </View>
  );
}
