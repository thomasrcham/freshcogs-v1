import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Item = ({ item, onPress }) => (
  <View style={styles.imageGrid} key={item.id}>
    {/* <View style={styles.textBox}>
      <Text>{item.artist}</Text>
      <Text>{item.title}</Text>
    </View> */}
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: item.uri }} style={styles.image} key={item.title} />
    </TouchableOpacity>
    <View style={styles.textBox}>
      <Text>{item.artist}</Text>
      <Text>{item.title}</Text>
    </View>
  </View>
);

function Collection({ albums, navigation }) {
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
    <View
      style={{ position: "relative", height: Dimensions.get("window").height }}
    >
      {albums ? (
        albums.length > 6 ? (
          <View style={styles.textBox}>
            <Text> Filter: </Text>
          </View>
        ) : null
      ) : null}
      <View style={styles.mainPageContainer}>
        {albums ? (
          <FlatList
            style={styles.container}
            data={albums}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={albums}
            numColumns="2"
          />
        ) : (
          <Text>no albums</Text>
        )}
      </View>
    </View>
  );
}

const mainWindowHeight = Dimensions.get("window").height * 0.95;
const windowWidth = Dimensions.get("window").width;

export default Collection;

const styles = StyleSheet.create({
  mainPageContainer: {
    height: mainWindowHeight,
    width: windowWidth,
    marginBottom: 100,
  },
  container: {
    backgroundColor: "pink",
    padding: 10,
    // paddingBottom: 200,
    marginBottom: 80,
  },
  imageGrid: {
    width: "50%",
    padding: 10,
    // borderWidth: 1,
    borderColor: "black",
    height: 225,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "#878684",
    borderWidth: 2,
    borderRadius: 4,
  },
  textBox: {
    flex: 1,
    justifyContent: "flex-start",
  },
  text: {
    textAlign: "center",
  },
});
