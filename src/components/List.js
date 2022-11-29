import { setStatusBarStyle } from "expo-status-bar";
import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} key={item.title} />
    </View>
    <Text style={[styles.title, textColor]}>
      {item.artist} - {item.title}
    </Text>
  </TouchableOpacity>
);

export default function List({ albums }) {
  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    // const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        // backgroundColor={{ backgroundColor }}
        // textColor={{ color }}
      />
    );
  };
  return (
    <View style={styles.listContainer}>
      <FlatList
        style={styles.listContainer}
        data={albums}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  listContainer: {
    // flex: 2,
    height: "100%",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  imageContainer: {
    resizeMode: "contain",
    height: "80%",
    width: "10%",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    fontSize: 16,
    paddingLeft: 5,
  },
});
