import {
  View,
  Image,
  Pressable,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./styles/style.js";

const Item = ({ item, onPress }) => (
  <View style={styles.frontPageImageGrid} key={item.id}>
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{ uri: item.uri }}
        style={styles.frontPageImage}
        key={item.title}
      />
    </TouchableOpacity>
    <View style={styles.frontPageTextBox}>
      <Text numberOfLines={1} style={styles.frontPageText}>
        {item.artist}
      </Text>
      <Text numberOfLines={1} style={styles.frontPageText}>
        {item.title}
      </Text>
    </View>
  </View>
);

const CollectionItem = ({ item, onPress }) => (
  <View style={styles.collectionImageGrid} key={item.id}>
    <Pressable onPress={onPress}>
      <Image
        source={{ uri: item.uri }}
        style={styles.collectionImage}
        key={item.title}
      />
    </Pressable>
  </View>
);

function Collection({ albums, navigation }) {
  const route = useRoute();

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate("AlbumPage", {
            album: item,
            albums: albums,
          })
        }
      />
    );
  };

  const renderCollectionItem = ({ item }) => {
    return (
      <CollectionItem
        item={item}
        onPress={() =>
          navigation.navigate("AlbumPage", {
            album: item,
            albums: albums,
          })
        }
      />
    );
  };

  return (
    <View
      style={{ position: "relative", height: Dimensions.get("window").height }}
    >
      {albums ? (
        albums.length <= 6 ? (
          <View style={styles.albumDisplayContainer}>
            <FlatList
              style={styles.frontPageContainer}
              data={albums}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={albums}
              numColumns="2"
            />
          </View>
        ) : null
      ) : null}
      <View style={styles.albumDisplayContainer}>
        {albums && route.name === "Collection" && albums.length != 6 ? (
          <FlatList
            style={styles.collectionPageContainer}
            data={albums}
            renderItem={renderCollectionItem}
            keyExtractor={(item) => item.id}
            extraData={albums}
            numColumns="3"
          />
        ) : null}
      </View>
    </View>
  );
}

export default Collection;
