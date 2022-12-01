import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Filters({ navigation, handleFilter, folders }) {
  let folderList = folders
    ? folders.map((f) => ({
        key: f.folderID,
        value: f.folderName,
      }))
    : null;
  return (
    <View style={styles.buttons}>
      <Button title="Folder" onPress={() => handleFilter("Christmas")} />
      <Button
        title="✕"
        onPress={() => {
          handleFilter(null);
        }}
      />
      {/* <Button title="Genre" onPress={() => handleFilter("Christmas")} />
      <Button title="Decade" onPress={() => handleFilter("Christmas")} /> */}
      {/* <Button title="Folder" onPress={() => handleFilter("Christmas")} /> */}
      {/* <TextInput style={styles.input} placeholder="FilterGoesHere" /> */}
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
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
