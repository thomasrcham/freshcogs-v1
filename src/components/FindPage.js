import {
  Button,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";

export default function FindPage({ albums }) {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [clicked, setClicked] = useState(false);

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>

        <View style={styles.list}>
          <Text>{searchPhrase ? `Searching by: ${searchPhrase}` : null}</Text>
          <List albums={albums} />
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
