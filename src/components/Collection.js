import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

function Collection({ albums, navigation }) {
  return (
    <View
      style={{ position: "relative", height: Dimensions.get("window").height }}
    >
      <View style={styles.mainPageContainer}>
        <ScrollView key={"scroll"}>
          <View style={styles.container}>
            {albums ? (
              albums.map((a) => {
                let shortTitle =
                  a.title.length > 40 ? a.title.slice(0, 40) : a.title;
                return (
                  <View style={styles.imageGrid} key={a.id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AlbumPage", {
                          album: a,
                        })
                      }
                    >
                      <Image
                        source={{ uri: a.uri }}
                        style={styles.image}
                        key={a.title}
                      />
                    </TouchableOpacity>
                    <View style={styles.textBox}>
                      <Text key={a.id + "text"}>{shortTitle}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text>no albums</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const mainWindowHeight = Dimensions.get("window").height * 0.95;
const windowWidth = Dimensions.get("window").width;

export default Collection;

const styles = StyleSheet.create({
  mainPageContainer: { height: mainWindowHeight, width: windowWidth },
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 30,
    padding: 20,
    width: "100%",
    height: "100%",
  },
  imageGrid: {
    width: "50%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    height: 220,
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
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
