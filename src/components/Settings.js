import { Button, Text, View } from "react-native";
import { useState } from "react";

export default function Settings({
  albums,
  albumDataGet,
  folders,
  getData,
  getUserData,
  user,
  handleStorage,
  requestOptions,
  runFetch,
  setAlbums,
  setFolders,
  setListenEvents,
  listenEvents,
  storeListenEvents,
}) {
  const [fixedYearArray, setFixedYearArray] = useState([]);

  let display = albums
    ? albums.filter((a) => a.isReissue === true).length
    : "None in state";

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

  // function sectionFetch() {
  //   console.log("fetching");
  //   fetch(
  //     `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=50`,
  //     requestOptions
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let returnData = data.releases;
  //       let parsedReleases = returnData.map((release) => parseInfo(release));
  //       sectionListCreate(parsedReleases);
  //       console.log(`${parsedReleases.length}`);
  //     });
  // }

  // function parseInfo(release) {
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
  //     isReissue: !!desc.find((item) =>
  //       item ? item.slice(0, 2).toLowerCase() === "re" : null
  //     ),
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
      {/* <Button
        title="create listen event"
        onPress={
          () =>
            createListenEvent(albums[Math.floor(Math.random() * albums.length)])
          // console.log(albums[Math.floor(Math.random() * albums.length)])
        }
      /> */}
      <Button
        title="check listen events"
        onPress={() => console.log(listenEvents)}
      />
      {/* <Button title="reset listen events" onPress={() => resetListenEvent()} /> */}

      {/* <Button title="set folder values" onPress={() => getFolderData()} /> */}
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
    </View>
  );
}
