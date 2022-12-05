import { FlatList, Image, Text, Pressable, View } from "react-native";
import styles from "./styles/style.js";

const Item = ({ item, onPress }) => (
  <Pressable onPress={onPress} style={[styles.listItem]}>
    <View style={styles.listImageContainer}>
      <Image
        source={{ uri: item.uri }}
        style={styles.listImage}
        key={item.title}
      />
    </View>
    <View style={{ overflow: "hidden" }}>
      <Text style={[styles.listTitle]}>
        {item.artist} - {item.title}
      </Text>
    </View>
  </Pressable>
);

export default function List({ listRef, localAlbums, navigation }) {
  // localAlbums
  //   ? console.log(`list component: ${localAlbums.length}`)
  //   : console.log(`list component: no albums`);
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate("AlbumPage", {
            album: item,
          })
        }
      />
    );
  };
  return (
    <>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.listContainer}
          data={localAlbums}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={localAlbums}
          ref={listRef}
        />
      </View>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   listContainer: {
//     height: "100%",
//   },
//   item: {
//     flex: 1,
//     flexDirection: "row",
//     padding: 5,
//     alignItems: "center",
//     // justifyContent: "center",
//     borderTopWidth: 1,
//     borderTopColor: "#878684",
//   },
//   imageContainer: {
//     resizeMode: "contain",
//     height: "80%",
//     width: "13%",
//     paddingBottom: 6,
//     // maxHeight: "8%",
//   },
//   image: {
//     flex: 1,
//     width: undefined,
//     height: undefined,
//     aspectRatio: 1,
//     borderColor: "#878684",
//     borderWidth: 2,
//     borderRadius: 4,
//   },
//   title: {
//     fontSize: 16,
//     paddingLeft: 5,
//     overflow: "hidden",
//     marginRight: 50,
//     maxHeight: 40,
//   },
// });
