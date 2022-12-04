import {
  Button,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import Filters from "./Filters";
import styles from "./styles/style.js";

export default function FindPage({ albums, folders, navigation }) {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [localAlbums, setLocalAlbums] = useState(null);
  const [sortedAlbums, setSortedAlbums] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [folderFilter, setFolderFilter] = useState(null);
  const [sortSelector, setSortSelector] = useState("none");
  const [viewClick, setViewClick] = useState(0);
  const listRef = useRef(null);

  // albums ? console.log("findpage: " + albums.length) : console.log("no albums");
  // localAlbums
  //   ? console.log("findpage: " + localAlbums.length)
  //   : console.log("no local albums");

  useEffect(() => {
    setLocalAlbums(albums);
  }, [albums]);

  useEffect(() => {
    displayList();
  }, [searchPhrase, folderFilter, sortSelector]);

  // function handleSearch(input) {
  //   setSearchTerm(input)
  // }

  function handleClear() {
    setLocalAlbums(albums);
    setSearchPhrase(null);
  }

  function handleFilter(input) {
    console.log("handlefilter");
    setFolderFilter(input);
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
        let artistArray = albums.sort(compareArtist);
        setLocalAlbums(artistArray);
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
        let dateArray = albums.sort(compareDate);
        setLocalAlbums(dateArray);
        setSortSelector("date");
        break;
      case "yearA":
        function compareYearAsc(a, b) {
          if (a.year < b.year) {
            return -1;
          }
          if (a.year > b.year) {
            return 1;
          }
          return 0;
        }
        let yearAscArray = albums.sort(compareYearAsc);
        setLocalAlbums(yearAscArray);
        setSortSelector("yearA");
        break;
      case "yearD":
        function compareYearDesc(a, b) {
          if (a.year < b.year) {
            return 1;
          }
          if (a.year > b.year) {
            return -1;
          }
          return 0;
        }
        let yearDescArray = albums.sort(compareYearDesc);
        setLocalAlbums(yearDescArray);
        setSortSelector("yearD");
        break;
      case "none":
        setLocalAlbums(albums);
        setSortSelector(null);
        break;
      default:
        setLocalAlbums(albums);
        setSortSelector(null);
    }
  }

  let listDisplay;

  function displayList() {
    let searchedAlbums = searchPhrase
      ? (searchedAlbums = albums.filter(
          (a) =>
            String(a.title.toLowerCase()).includes(
              searchPhrase.toLowerCase()
            ) ||
            String(a.artist.toLowerCase()).includes(searchPhrase.toLowerCase())
        ))
      : albums;
    let filterAlbums = folderFilter
      ? searchedAlbums.filter((a) => a.folder === folderFilter)
      : searchedAlbums;
    setLocalAlbums(filterAlbums);
  }

  switch (sortSelector) {
    case "artist":
      listDisplay = (
        <List
          localAlbums={localAlbums}
          navigation={navigation}
          listRef={listRef}
        />
      );
      break;
    case "date":
      listDisplay = (
        <List
          localAlbums={localAlbums}
          navigation={navigation}
          listRef={listRef}
        />
      );
      break;
    default:
      listDisplay = (
        <List
          localAlbums={localAlbums}
          navigation={navigation}
          listRef={listRef}
        />
      );
  }

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.resultsPageContainer}>
        <View style={styles.searchBar}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            // handleSearch={handleSearch}
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
            // handleSearch={handleSearch}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            viewClick={viewClick}
            setViewClick={setViewClick}
          />
        </View>
        <View style={styles.resultsList}>
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
      <View style={styles.backButton}>
        <View>
          <Button
            title="⬆️"
            onPress={() => {
              listRef.current.scrollToOffset({ offset: 0, animated: true });
            }}
          />
        </View>
      </View>
    </View>
  );
}
// const mainWindowHeight = Dimensions.get("window").height * 1.01;
// const searchBarWindowHeight = Dimensions.get("window").height * 0.08;
// const filterBarWindowHeight = Dimensions.get("window").height * 0.1;
// const windowWidth = Dimensions.get("window").width;

// const styles = StyleSheet.create({
//   mainPageContainer: { height: mainWindowHeight, width: windowWidth },
//   resultsPageContainer: {
//     // flex: 1,
//     // flexDirection: "column",
//     // flexWrap: "wrap",
//     backgroundColor: "pink",
//     // alignItems: "center",
//     // alignContent: "space-between",
//     width: "100%",
//     bottom: 0,
//   },
//   searchBar: {
//     height: searchBarWindowHeight,
//     width: "100%",
//     backgroundColor: "red",
//   },
//   filterBar: {
//     // flex: 1,
//     height: filterBarWindowHeight,
//     width: "100%",
//     // backgroundColor: "blue",
//   },
//   resultsList: {
//     // height: 50,
//   },
// });
