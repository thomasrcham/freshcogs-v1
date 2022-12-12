import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import styles from "./styles/style.js";

export default function Filters({
  navigation,
  handleDecade,
  handleFilter,
  handleSort,
  viewClick,
  setViewClick,
}) {
  //handles display of second line of filters
  const [clicked, setClicked] = useState(false);

  //category establishment
  let sortOptions = [
    { id: 1, value: "Artist", sortTerm: "artist" },
    { id: 2, value: "Date Added", sortTerm: "date" },
    { id: 3, value: "Year Asc", sortTerm: "yearA" },
    { id: 4, value: "Year Desc", sortTerm: "yearD" },
  ];

  let decadeOptions = [
    { id: 1, value: "pre-50s", decadeTerm: "pre-1950s" },
    { id: 2, value: "50s-60s", decadeTerm: "1950s & 1960s" },
    { id: 3, value: "70s-80s", decadeTerm: "1970s & 1980s" },
    { id: 4, value: "90s-00s", decadeTerm: "1990s & 2000s" },
    { id: 5, value: "10s-20s", decadeTerm: "2010s & 2020s" },
  ];

  //creates second line buttons by mapping over existing arrays (sort and decade options)

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

  //handles display of the second line based on viewClick state set in parent
  switch (viewClick) {
    case 2:
      filterDisplay = (
        <View style={styles.filterButtonBox}>
          {sortDisplay}
          <Pressable
            style={styles.filterPressable}
            onPress={() => {
              {
                // handleSort(null);
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
  }

  //creates options on first line and handles setting states to contol filtering of data
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
            setViewClick(3);
          }}
        >
          <Text>Decades</Text>
        </Pressable>
      </View>
      {clicked ? filterDisplay : null}
    </>
  );
}
