import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles/style.js";

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
    <View style={styles.searchBarcontainer}>
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
          style={styles.searchBarInput}
          placeholder="Search by Artist or Title"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
      {clicked && (
        <View style={styles.searchBarButtons}>
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
        <View style={styles.searchBarButtons}>
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
