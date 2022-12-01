import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";

export default function Filters({ navigation, handleFilter, folders }) {
  const [folderClick, setFolderClick] = useState(0);

  // let folderDisplay = folders
  //   ? folders.map((f) => ({
  //     <Button title=f.folderName onPress={() => setFolderClick(1) }/>
  //     }))
  //   : null;

  return (
    <View style={styles.buttonBox}>
      <Button title="Folder" onPress={() => setFolderClick(1)} />
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
  buttonBox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 8,
    // marginLeft: 10,
  },
  buttons: {},
});
