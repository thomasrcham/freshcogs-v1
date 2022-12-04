import {
  Button,
  Dimensions,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import style from "./styles/style.js";
import styles from "./styles/style.js";

function AlbumPage({ route, navigation }) {
  const { album } = route.params;

  const handleClick = () => {
    let URL = `https://www.discogs.com/master/${album.master_id}`;
    Linking.canOpenURL(URL).then((supported) => {
      if (supported) {
        Linking.openURL(URL);
      } else {
        console.log("Don't know how to open URI: " + URL);
      }
    });
  };

  return (
    <View style={[styles.container, styles.wholeAlbumPage]}>
      <Image
        style={styles.image}
        source={{
          uri: `${album.uri}`,
        }}
      />
      <View style={styles.albumDataContainer}>
        <View style={styles.albumInfo}>
          <Text style={{ fontSize: 26, color: "white", fontStyle: "bold" }}>
            {album.artist}
          </Text>
          <Text style={{ fontSize: 16, color: "white", fontStyle: "bold" }}>
            {album.title}
          </Text>
          <Text style={styles.albumInfoBasicText}>Folder: {album.folder}</Text>
          <Text style={styles.albumInfoBasicText}>
            Originally released in {album.year}
          </Text>
          <Text style={styles.albumInfoBasicText}>
            Genres: {album.genres.join(", ")}
          </Text>
        </View>
        <View>
          <View style={{ flex: 0.3 }}></View>
          <View style={{ flex: 1 }}>
            <Pressable onPress={handleClick} style={styles.albumPagePressables}>
              <View>
                <Image
                  style={{ aspectRatio: 1, height: 25, marginRight: 5 }}
                  source={require("../icons/vinyl.png")}
                />
              </View>
              <Text style={{ alignSelf: "center", fontSize: 14 }}>
                OPEN DISCOGS
              </Text>
            </Pressable>
          </View>
          <View style={{ flex: 0.3 }}></View>
          <View style={{ flex: 1 }}>
            <Pressable style={styles.albumPagePressables}>
              <View>
                <Image
                  style={{ aspectRatio: 1, height: 25, marginRight: 5 }}
                  source={require("../icons/vinyl.png")}
                />
              </View>
              <Text>LISTEN NOW</Text>
            </Pressable>
          </View>
          <View style={{ flex: 0.3 }}></View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Pressable style={styles.albumPagePressables}>
              <View>
                <Image
                  style={{
                    aspectRatio: 1,
                    height: 25,
                    marginRight: 5,
                  }}
                  source={require("../icons/vinyl.png")}
                />
              </View>
              <Text>TAG ALBUM</Text>
            </Pressable>
          </View>
          <View style={{ flex: 0.3 }}></View>
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
  );
}

export default AlbumPage;

// const mainWindowHeight = Dimensions.get("window").height * 0.5;
// const windowWidth = Dimensions.get("window").width;
// const buttonWidth = Dimensions.get("window").width * 0.3;

// const styles = StyleSheet.create({
//   discogsLink: {
//     flex: 1,
//   },
// });
//   whole: {
//     flex: 1,
//     flexDirection: "column",
//   },
//   container: {
//     flex: 2,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     backgroundColor: "pink",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: 50,
//     padding: 20,
//     width: "100%",
//   },
//   image: {
//     width: "100%",
//     height: "50%",
//     aspectRatio: 1,
//     resizeMode: "contain",
//     borderColor: "#878684",
//     borderWidth: 2,
//     borderRadius: 4,
//   },
//   backButton: {
//     padding: 10,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "absolute",
//     bottom: "18%",
//     width: windowWidth,
//   },
// });
