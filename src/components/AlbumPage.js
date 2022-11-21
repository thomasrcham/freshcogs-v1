import { Text, Image, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import Footer from "./Footer";

function AlbumPage({ route, navigation }) {
  const { album } = route.params;
  const [displayAlbum, setDisplayAlbum] = useState(null);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={{
          uri: `${album.uri}`,
        }}
      />
      <Text>{album.title}</Text>
      <View style={styles.footerContainer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const footerWindowHeight = Dimensions.get("window").height * 0.08;
const windowWidth = Dimensions.get("window").width;

export default AlbumPage;

const styles = StyleSheet.create({
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
});
