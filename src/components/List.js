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
