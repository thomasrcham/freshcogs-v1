import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

export default function SearchBar({
  navigation,
  handleClear,
  // handleSearch,
  searchPhrase,
  setSearchPhrase,
  clicked,
  setClicked,
}) {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search by Artist or Title"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
      {clicked && (
        <View style={styles.buttons}>
          <Button
            color="#33cc33"
            title="✓"
            onPress={() => {
              Keyboard.dismiss();
              // setClicked(false);
              // handleSearch();
            }}
          />
        </View>
      )}
      {clicked || searchPhrase ? (
        <View style={styles.buttons}>
          <Button
            title="✕"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              handleClear();
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    width: "100%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
