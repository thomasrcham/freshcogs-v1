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
import styles from "./styles/style.js";

export default function Filters({
  navigation,
  handleFilter,
  handleSort,
  folders,
  viewClick,
  setViewClick,
}) {
  const [clicked, setClicked] = useState(false);

  let sortOptions = [
    { id: 1, value: "Artist", sortTerm: "artist" },
    { id: 2, value: "Date Added", sortTerm: "date" },
    { id: 3, value: "Year Asc", sortTerm: "yearA" },
    { id: 4, value: "Year Desc", sortTerm: "yearD" },
  ];
  let sortDisplay = sortOptions.map((f) => (
    <Pressable
      style={styles.filterPressable}
      key={f.id}
      onPress={() => {
        handleSort(f.sortTerm);
      }}
    >
      <Text>{f.value}</Text>
    </Pressable>
  ));

  let folderDisplay = folders
    ? folders.map((f) => (
        <Pressable
          style={styles.filterPressable}
          key={f.folderID}
          onPress={() => {
            handleFilter(f.folderName);
          }}
        >
          <Text>{f.folderName}</Text>
        </Pressable>
      ))
    : null;

  let filterDisplay;

  switch (viewClick) {
    case 1:
      filterDisplay = (
        <View style={styles.filterButtonBox}>
          {folderDisplay}
          <Pressable
            style={styles.filterPressable}
            onPress={() => {
              {
                handleFilter(null);
                setClicked(false);
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
        <View style={styles.filterButtonBox}>
          {sortDisplay}
          <Pressable
            style={styles.filterPressable}
            onPress={() => {
              {
                handleSort(null);
                setClicked(false);
              }
            }}
          >
            <Text>✕</Text>
          </Pressable>
        </View>
      );
      break;
  }

  return (
    <>
      <View style={styles.filterButtonBox}>
        <Pressable
          style={styles.filterPressable}
          onPress={() => {
            setViewClick(2);
            setClicked(true);
          }}
        >
          <Text>Sort</Text>
        </Pressable>
        <Pressable
          style={styles.filterPressable}
          onPress={() => {
            setClicked(true);
            setViewClick(1);
          }}
        >
          <Text>Folder</Text>
        </Pressable>
      </View>
      {clicked ? filterDisplay : null}
    </>
  );
}

// const styles = StyleSheet.create({
//   filterButtonBox: {
//     flex: 1,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "flex-end",
//     justifyContent: "space-evenly",
//     width: "100%",
//     marginTop: 8,
//     // marginLeft: 10,
//   },
//   buttons: {},
//   filterPressable: {
//     borderWidth: 1,
//     borderStyle: "solid",
//     borderColor: "#54381e",
//     padding: 4,
//     backgroundColor: "#DADADD",
//     borderRadius: 3,
//   },
// });
