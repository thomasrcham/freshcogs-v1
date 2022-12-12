import { Button, Text, View } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({
  albums,
  folders,
  user,
  listenEvents,
  setAlbums,
  setFolders,
  setListenEvents,
  setUser,
  handleAlbumFetch,
  storeAlbums,
  storeFolders,
  storeUser,
  storeListenEvents,
  updateLibraryFetch,
}) {
  // const [fixedYearArray, setFixedYearArray] = useState([]);

  const clearStorage = () => {
    removeItemValue();
    setAlbums(null);
    setFolders(null);
    setUser(null);
  };

  const removeItemValue = async () => {
    let keys = ["@albums", "@folders", "@userProfile"];
    await AsyncStorage.multiRemove(keys);
  };

  // let display = albums
  //   ? albums.filter((a) => a.isReissue === true).length
  //   : "None in state";

  // function yearReplaceTimer() {
  //   let myInterval = setInterval(() => {
  //     let needsReplacement = albums
  //       ? albums.filter((a) => a.isReissue === true).slice(0, 5)
  //       : console.log("none to set as needs replacement");

  //     if (needsReplacement.length === 0) {
  //       console.log("finished");
  //       clearInterval(myInterval);
  //       handleStorage(albums, folders);
  //       // generateSectionList(albums);
  //     } else {
  //       console.log(
  //         `remaining albums that need year replaced: ${
  //           albums.filter((a) => a.isReissue === true).length
  //         }`
  //       );
  //       needsReplacement.map((album) => individualYearReplace(album));
  //     }
  //   }, 10000);
  // }

  // function individualYearReplace(album) {
  //   console.log(`${album.title}, ${album.year}, ${album.master_id}`);
  //   fetch(`https://api.discogs.com/masters/${album.master_id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       album.isReissue = false;
  //       album.year = result.year;
  //     });
  // }

  // let latestAlbum = albums
  //   ? albums
  //       .map((a) => a.ISODate)
  //       .sort()
  //       .reverse()[0]
  //   : null;

  // function updateFetch() {
  //   console.log("test fetching");
  //   fetch(
  //     `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=500`,
  //     requestOptions
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let returnData = data.releases.filter(
  //         (r) => r.date_added > latestAlbum
  //       );
  //       let parsedReleases = returnData.map((release) => parseInfoSet(release));
  //       getFolderData(parsedReleases);
  //       console.log(parsedReleases);
  //     });
  // }

  // function parseInfoSet(release) {
  //   let artist = release.basic_information.artists[0].name;

  //   artist.charAt(artist.length - 3) === "("
  //     ? (artist = artist.substring(0, artist.length - 4))
  //     : artist;

  //   artist === "Various" ? (artist = "Various Artists") : artist;

  //   let desc = release.basic_information.formats
  //     .map((f) => f.descriptions)
  //     .flat();

  //   let newDate = new Date(release.date_added);
  //   let ISODate = newDate.toISOString();

  //   let genres = release.basic_information.genres
  //     .concat(release.basic_information.styles)
  //     .filter((genre) => genre != "Folk, World, & Country")
  //     .filter((genre) => genre != "Stage & Screen");

  //   let isReissue =
  //     !!desc.find((item) =>
  //       item ? item.slice(0, 2).toLowerCase() === "re" : null
  //     ) || release.basic_information.year === 0;

  //   let singleParsedRelease = {
  //     id: release.basic_information.id,
  //     master_id: release.basic_information.master_id,
  //     artist: artist,
  //     title: release.basic_information.title,
  //     uri: release.basic_information.cover_image,
  //     date_added: release.date_added,
  //     ISODate: ISODate,
  //     genres: genres,
  //     folder: 0,
  //     isReissue: isReissue,
  //     year: release.basic_information.year,
  //   };
  //   // dispatch(addAlbum(singleParsedRelease));
  //   return singleParsedRelease;
  // }

  // let sectionList = [];

  // const generateSectionList = (input) => {
  //   let filteredInput = albums;
  //   for (let i = 1; i > 0; i = filteredInput.length) {
  //     let yearValue = filteredInput[0].year;
  //     let albumsArray = albums.filter((a) => a.year === yearValue);
  //     let yearSection = { year: yearValue, albums: albumsArray };

  //     sectionList.push(yearSection);
  //     filteredInput = filteredInput.filter((a) => a.year != yearValue);
  //     // console.log("filteredInput.length " + filteredInput.length);
  //     // console.log("sectionList: " + sectionList);
  //   }
  // };

  // const createGenreList = (albums) => {
  //   let genres = albums
  //     .map((a) => a.genres)
  //     .flat()
  //     .sort();

  //   function onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  //   }

  //   let unique = genres.filter(onlyUnique);
  //   let duplicates = genres
  //     .filter((e, i, a) => a.indexOf(e) !== i)
  //     .filter(onlyUnique);
  //   setGenres(duplicates);
  // };

  // const createListenEvent = (album) => {
  //   let dateTime = new Date().toISOString();
  //   let newEvent = listenEvents
  //     ? [...listenEvents, { album: album, dateTime: dateTime }]
  //     : [{ album: album, dateTime: dateTime }];
  //   setListenEvents(newEvent);
  //   storeListenEvents(newEvent);
  // };

  // const resetListenEvent = () => {
  //   storeListenEvents([]);
  // };

  return (
    <View>
      {/* <Text>{display}</Text> */}
      <Button title="reset storage" onPress={() => clearStorage()} />
      <Button
        title="refresh fetch data"
        onPress={() => {
          handleAlbumFetch();
          getUserData();
        }}
      />
      {/* <Button
        title="check listen events"
        onPress={() => console.log(listenEvents)}
      /> */}
      {/* <Button title="reset listen events" onPress={() => resetListenEvent()} /> */}

      <Button title="update library" onPress={() => updateLibraryFetch()} />
      <Button
        title="console.log random album"
        onPress={() =>
          console.log(albums[Math.floor(Math.random() * albums.length)])
        }
      />
      {/*  <Button title="year replace" onPress={() => yearReplaceTimer()} />
      <Button title="genre list" onPress={() => createGenreList(albums)} />
      <Button
        title="log user info"
        onPress={() =>
          console.log(
            // user.registered
            format(new Date(user.registered), "MM/dd/yyyy")
          )
        }
      /> */}
      {/* <Button title="update library" onPress={() => updateFetch()} /> */}
    </View>
  );
}
