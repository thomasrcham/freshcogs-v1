import {
  Button,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles/style.js";

export default function Filters({
  navigation,
  handleDecade,
  handleFilter,
  handleSort,
  handleGenre,
  folders,
  viewClick,
  setViewClick,
}) {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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

  let genreList = [
    { id: 0, value: "All", display: "All - " },
    { id: 1, value: "Classical", display: "Classical - " },
    { id: 2, value: "Country", display: "Country - " },
    { id: 3, value: "Electronic", display: "Electronic - " },
    { id: 4, value: "Folk", display: "Folk - " },
    { id: 5, value: "Funk / Soul", display: "Funk / Soul - " },
    { id: 6, value: "Hip Hop", display: "Hip Hop - " },
    { id: 7, value: "Jazz", display: "Jazz - " },
    { id: 8, value: "Non-Music", display: "Non-Music - " },
    { id: 9, value: "Pop", display: "Pop - " },
    { id: 10, value: "Rock", display: "Rock - " },
    { id: 11, value: "Soundtrack", display: "Soundtrack" },
  ];

  let genreClicker = genreList.map((g) => (
    <Pressable onPress={() => handleGenre(g.value)}>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          backgroundColor: "grey",
          fontSize: 16,
        }}
      >
        {g.display}
      </Text>
    </Pressable>
  ));

  let decadeOptions = [
    { id: 1, value: "pre-50s", decadeTerm: "pre-1950s" },
    { id: 2, value: "50s-60s", decadeTerm: "1950s & 1960s" },
    { id: 3, value: "70s-80s", decadeTerm: "1970s & 1980s" },
    { id: 4, value: "90s-00s", decadeTerm: "1990s & 2000s" },
    { id: 5, value: "10s-20s", decadeTerm: "2010s & 2020s" },
  ];

  let decadesDisplay = decadeOptions.map((f) => (
    <Pressable
      style={styles.filterPressable}
      key={f.id}
      onPress={() => {
        handleDecade(f.decadeTerm);
      }}
    >
      <Text>{f.value}</Text>
    </Pressable>
  ));

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
    case 3:
      filterDisplay = (
        <View style={styles.filterButtonBox}>
          {decadesDisplay}
          <Pressable
            style={styles.filterPressable}
            onPress={() => {
              {
                handleDecade(null);
                setClicked(false);
              }
            }}
          >
            <Text>✕</Text>
          </Pressable>
        </View>
      );
      break;
    case 4:
      filterDisplay = (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "grey",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left-circle"
            size={25}
            color="white"
            style={{ borderRightWidth: 2, borderRightColor: "white" }}
          />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ marginLeft: 2, marginRight: 2 }}
          >
            {genreClicker}
          </ScrollView>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={25}
            color="white"
            style={{
              paddingLeft: 2,
              borderLeftWidth: 2,
              borderLeftColor: "white",
            }}
          />
          <Pressable
            style={styles.filterPressable}
            onPress={() => {
              {
                handleGenre("All");
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
        <Pressable
          style={styles.filterPressable}
          onPress={() => {
            setClicked(true);
            setViewClick(3);
          }}
        >
          <Text>Decades</Text>
        </Pressable>
        <Pressable
          style={styles.filterPressable}
          onPress={() => {
            setClicked(true);
            setViewClick(4);
          }}
        >
          <Text>Genre</Text>
        </Pressable>
      </View>
      {clicked ? filterDisplay : null}
    </>
  );
}
