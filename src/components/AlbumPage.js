import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

function AlbumPage({ route, navigation }) {
  const { album } = route.params;

  return (
    <View style={styles.whole}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `${album.uri}`,
          }}
        />
        <View>
          <View>
            <Text>{album.artist}</Text>
            <Text>{album.title}</Text>
          </View>
          <View>
            <Text>{album.id}</Text>
            <Text>{album.folder}</Text>
            <Text>{album.year}</Text>
          </View>
        </View>
        <View style={styles.backButton}>
          <View>
            <Button
              title="back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default AlbumPage;

const mainWindowHeight = Dimensions.get("window").height * 0.5;
const windowWidth = Dimensions.get("window").width;
const buttonWidth = Dimensions.get("window").width * 0.3;

const styles = StyleSheet.create({
  whole: {
    flex: 1,
    flexDirection: "column",
  },
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    padding: 20,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "50%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "#878684",
    borderWidth: 2,
    borderRadius: 4,
  },
  backButton: {
    padding: 10,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "18%",
    width: windowWidth,
  },
});
