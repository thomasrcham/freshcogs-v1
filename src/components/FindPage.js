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
  const [sortSelector, setSortSelector] = useState("artist");

  albums ? console.log("findpage: " + albums.length) : console.log("no albums");
  localAlbums
    ? console.log("findpage: " + localAlbums.length)
    : console.log("no local albums");

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
    console.log("handlefilter");
    setFolderFilter(input);
    let newArray = input ? albums.filter((a) => a.folder === input) : albums;
    setLocalAlbums(newArray);
  }

  function handleSort(sortTerm) {
    console.log(`${albums.length}, ${sortTerm}`);
    switch (sortTerm) {
      case "artist":
        function compareArtist(a, b) {
          if (a.artist < b.artist) {
            return -1;
          }
          if (a.artist > b.artist) {
            return 1;
          }
          return 0;
        }
        setLocalAlbums(albums.sort(compareArtist));
        setSortSelector("artist");
        break;
      case "date":
        function compareDate(a, b) {
          if (a.ISODate < b.ISODate) {
            return -1;
          }
          if (a.ISODate > b.ISODate) {
            return 1;
          }
          return 0;
        }
        setLocalAlbums(albums.sort(compareDate));
        setSortSelector("date");
        break;
      default:
        setSortSelector(null);
    }
  }

  let listDisplay;

  switch (sortSelector) {
    case "artist":
      listDisplay = <List localAlbums={localAlbums} />;
      break;
    case "date":
      listDisplay = <List localAlbums={localAlbums} />;
      break;
    default:
      listDisplay = null;
  }

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
          {listDisplay}
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
