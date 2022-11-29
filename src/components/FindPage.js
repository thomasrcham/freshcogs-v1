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
import Filter from "./Filters";

export default function FindPage({ albums }) {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [localAlbums, setLocalAlbums] = useState(null);
  const [clicked, setClicked] = useState(false);

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
        <View style={styles.searchBar}>
          <Filter
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            handleSearch={handleSearch}
          />
        </View>
        <View style={styles.list}>
          <Text>
            {localAlbums
              ? localAlbums.length < albums.length
                ? `Searching by: ${searchPhrase}`
                : null
              : null}
          </Text>
          <List albums={localAlbums} />
        </View>
      </View>
    </View>
  );
}
const mainWindowHeight = Dimensions.get("window").height * 1.01;
const barWindowHeight = Dimensions.get("window").height * 0.08;
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
    height: barWindowHeight,
    width: "100%",
    backgroundColor: "red",
  },
  list: {
    // height: 50,
  },
});
