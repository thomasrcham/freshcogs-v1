import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import albumSlice from "../redux/albumSlice";

export default function Settings({
  albums,
  albumDataGet,
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

  function yearReplaceTimer() {
    let myInterval = setInterval(() => {
      let needsReplacement = albums
        ? albums.filter((a) => a.isReissue === true).slice(0, 5)
        : console.log("none to set as needs replacement");
      console.log(needsReplacement.length);
      if (needsReplacement.length === 0) {
        console.log("finished");
        clearInterval(myInterval);
        handleStorage(albums, folders);
      } else {
        console.log(
          `remaining albums that need year replaced: ${
            albums.filter((a) => a.isReissue === true).length
          }`
        );
        needsReplacement.map((album) => individualYearReplace(album));
      }
    }, 10000);
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
    </View>
  );
}
