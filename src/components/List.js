import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} key={item.title} />
    </View>
    <View style={{ overflow: "hidden" }}>
      <Text style={[styles.title]}>
        {item.artist} - {item.title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function List({ albums, searchPhrase }) {
  albums ? console.log(`list component: ${albums.length}`) : null;
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        // onPress={() => setSelectedId(item.id)}
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
        extraData={albums}
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
    height: "100%",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    // justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#878684",
  },
  imageContainer: {
    resizeMode: "contain",
    height: "80%",
    width: "13%",
    paddingBottom: 6,
    // maxHeight: "8%",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    borderColor: "#878684",
    borderWidth: 2,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    paddingLeft: 5,
    overflow: "hidden",
    marginRight: 50,
    maxHeight: 40,
  },
});
