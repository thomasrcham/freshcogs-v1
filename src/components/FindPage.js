import {
  Button,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import Filters from "./Filters";

export default function FindPage({ albums, folders }) {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [localAlbums, setLocalAlbums] = useState(null);
  const [sortedAlbums, setSortedAlbums] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [folderFilter, setFolderFilter] = useState(null);

  useEffect(() => {
    setLocalAlbums(albums);
  }, [albums]);

  function handleSearch() {
    let searchedList = "";
    searchPhrase
      ? (searchedList = albums.filter(
          (a) =>
            String(a.title.toLowerCase()).includes(
              searchPhrase.toLowerCase()
            ) ||
            String(a.artist.toLowerCase()).includes(searchPhrase.toLowerCase())
        ))
      : (searchedList = albums);
    setLocalAlbums(searchedList);
  }

  function handleClear() {
    setLocalAlbums(albums);
    setSearchPhrase(null);
  }

  function handleFilter(input) {
    setFolderFilter(input);
    let newArray = input ? albums.filter((a) => a.folder === input) : albums;
    setLocalAlbums(newArray);
  }

  // function handleSort(sortID) {
  //   console.log(`${albums.length}, ${sortID}`);
  //   function compare(a, b) {
  //     let thing = sortID;
  //     if (a.thing < b.thing) {
  //       console.log(a.thing + " < " + b.thing);
  //     }
  //     if (a.thing > b.thing) {
  //       console.log(a.thing + " > " + b.thing);
  //     }
  //     return 0;
  //   }
  //   let sortAlbums = albums.sort(compare);
  //   // console.log(sortAlbums);
  // }

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            handleSearch={handleSearch}
            handleClear={handleClear}
          />
        </View>
        <View style={styles.filterBar}>
          <Filters
            clicked={clicked}
            folders={folders}
            setClicked={setClicked}
            handleFilter={handleFilter}
            folderFilter={folderFilter}
            setFolderFilter={setFolderFilter}
            handleSort={handleSort}
            handleSearch={handleSearch}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
          />
        </View>
        <View style={styles.list}>
          {/* <Text>
            {localAlbums && albums
              ? localAlbums.length < albums.length
                ? `Searching by: ${searchPhrase}`
                : null
              : null}
          </Text> */}
          <List albums={localAlbums} />
        </View>
      </View>
    </View>
  );
}
const mainWindowHeight = Dimensions.get("window").height * 1.01;
const searchBarWindowHeight = Dimensions.get("window").height * 0.08;
const filterBarWindowHeight = Dimensions.get("window").height * 0.06;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  mainPageContainer: { height: mainWindowHeight, width: windowWidth },
  container: {
    // flex: 1,
    // flexDirection: "column",
    // flexWrap: "wrap",
    backgroundColor: "pink",
    // alignItems: "center",
    // alignContent: "space-between",
    width: "100%",
    bottom: 0,
  },
  searchBar: {
    height: searchBarWindowHeight,
    width: "100%",
    backgroundColor: "red",
  },
  filterBar: {
    // flex: 1,
    height: filterBarWindowHeight,
    width: "100%",
    // backgroundColor: "blue",
  },
  list: {
    // height: 50,
  },
});
