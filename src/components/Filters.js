import {
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";

export default function Filters({
  navigation,
  handleFilter,
  handleSort,
  folders,
}) {
  const [viewClick, setViewClick] = useState(0);
  // const [sortClick, setSortClick] = useState(false);

  let sortOptions = [
    { id: 1, value: "Artist", sortTerm: "artist" },
    { id: 2, value: "Date Added", sortTerm: "date_added" },
  ];
  let sortDisplay = sortOptions.map((f) => (
    <Pressable
      style={styles.pressable}
      key={f.id}
      onPress={() => {
        handleSort(f.sortTerm);
      }}
    >
      <Text>{f.value}</Text>
    </Pressable>
  ));

  let folderDisplay = folders.map((f) => (
    <Pressable
      style={styles.pressable}
      key={f.folderID}
      onPress={() => {
        handleFilter(f.folderName);
      }}
    >
      <Text>{f.folderName}</Text>
    </Pressable>
  ));

  let filterDisplay;

  switch (viewClick) {
    case 0:
      filterDisplay = (
        <View style={styles.buttonBox}>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              setViewClick(2);
            }}
          >
            <Text>Sort</Text>
          </Pressable>
          <Pressable style={styles.pressable} onPress={() => setViewClick(1)}>
            <Text>Folder</Text>
          </Pressable>
        </View>
      );
      break;
    case 1:
      filterDisplay = (
        <View style={styles.buttonBox}>
          {folderDisplay}
          <Pressable
            style={styles.pressable}
            onPress={() => {
              {
                handleFilter(null);
                setViewClick(0);
              }
            }}
          >
            <Text>✕</Text>
          </Pressable>
        </View>
      );
      break;
    case 2:
      filterDisplay = (
        <View style={styles.buttonBox}>
          {sortDisplay}
          <Pressable
            style={styles.pressable}
            onPress={() => {
              {
                handleSort(null);
                setViewClick(0);
              }
            }}
          >
            <Text>✕</Text>
          </Pressable>
        </View>
      );
      break;
  }

  return filterDisplay;
  // <View style={styles.buttonBox}>
  //   {folderClick ? (
  //
  //   ) : (
  //   )}
  //   {sortClick ? (
  //
  //   ) : (

  //   )}

  // {/* <Button title="Genre" onPress={() => handleFilter("Christmas")} />
  // <Button title="Decade" onPress={() => handleFilter("Christmas")} /> */}
  // {/* <Button title="Folder" onPress={() => handleFilter("Christmas")} /> */}
  // {/* <TextInput style={styles.input} placeholder="FilterGoesHere" /> */}
  // </View>
  // );
}

const styles = StyleSheet.create({
  buttonBox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 8,
    // marginLeft: 10,
  },
  buttons: {},
  pressable: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#54381e",
    padding: 4,
    backgroundColor: "#DADADD",
    borderRadius: 3,
    // boxS
    // :inset 0px 1px 0px 0px #a6827e;
    // background:linear-gradient(to bottom, #7d5d3b 5%, #634b30 100%);
    // ;

    // display:inline-block;
    // cursor:pointer;
    // color:#ffffff;
    // font-family:Arial;
    // font-size:11px;
    // padding:6px 12px;
    // text-decoration:none;
    // text-shadow:0px 1px 0px #4d3534}
  },
});
