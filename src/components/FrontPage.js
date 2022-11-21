import {
  Button,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import Footer from "./Footer";

function FrontPage({ albums, navigation }) {
  return (
    <View
      style={{ position: "relative", height: Dimensions.get("window").height }}
    >
      <View style={styles.mainPageContainer}>
        <ScrollView key={"scroll"}>
          <View style={styles.container}>
            {albums ? (
              albums.map((a) => {
                return (
                  <View style={styles.imageGrid} key={a.id}>
                    <Image
                      source={{ uri: a.uri }}
                      style={styles.image}
                      key={a.title}
                    />
                    <Text key={a.id + "text"}>{a.title}</Text>
                  </View>
                );
              })
            ) : (
              <Text>no albums</Text>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.footerContainer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const mainWindowHeight = Dimensions.get("window").height * 0.95;
const footerWindowHeight = Dimensions.get("window").height * 0.08;
const windowWidth = Dimensions.get("window").width;

export default FrontPage;

const styles = StyleSheet.create({
  mainPageContainer: { height: mainWindowHeight, width: windowWidth },
  footerContainer: {
    height: footerWindowHeight,
    width: windowWidth,
    position: "absolute",
    left: 0,
    bottom: -5,
    right: 0,
    overflow: "visible",
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
    height: "100%",
  },
  imageGrid: {
    width: "50%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    height: 220,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "#878684",
    borderWidth: 2,
    borderRadius: 4,
  },
  text: {
    textAlign: "center",
  },
});
