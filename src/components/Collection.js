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
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles/style.js";

const FrontPageItem = ({ item, onPress }) => (
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

function Collection({ albums, allAlbums, navigation, randomArray }) {
  const route = useRoute();

  const renderFrontPageItem = ({ item }) => {
    return (
      <FrontPageItem
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

  //is fed either the full albums array or the randomized front page array (of 6 albums), decides which component to render based on length of array

  return (
    <View
      style={{ position: "relative", height: Dimensions.get("window").height }}
    >
      {albums ? (
        albums.length <= 6 ? (
          <>
            <View style={styles.albumDisplayContainer}>
              <FlatList
                style={styles.frontPageContainer}
                data={albums}
                renderItem={renderFrontPageItem}
                keyExtractor={(item) => item.id}
                extraData={albums}
                numColumns="2"
              />
            </View>
            {/* <View style={styles.backButton}>
              <View>
                <Pressable
                  onPress={() => {
                    randomArray(allAlbums);
                  }}
                >
                  <MaterialCommunityIcons
                    name="refresh-circle"
                    size={32}
                    color={"white"}
                  />
                </Pressable>
              </View>
            </View> */}
          </>
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
