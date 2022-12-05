import { Image, Linking, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./styles/style.js";

function AlbumPage({ route, navigation }) {
  const { album, albums } = route.params;

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
          <View style={{ maxHeight: 65 }}>
            <Text
              numberOfLines={3}
              style={{ fontSize: 16, color: "white", fontStyle: "bold" }}
            >
              {album.title}
            </Text>
          </View>
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
      <View style={styles.albumPageButtons}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            flexDirection: "row",
          }}
        >
          <Pressable
            style={styles.albumPageButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialCommunityIcons
              name="skip-backward"
              size={40}
              color={"white"}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 12,
                transform: [{ translateY: -5 }],
              }}
            >
              back
            </Text>
          </Pressable>
          <Pressable
            style={styles.albumPageButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialCommunityIcons name="play" size={40} color={"white"} />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 12,
                transform: [{ translateY: -5 }],
              }}
            >
              back
            </Text>
          </Pressable>
          <Pressable
            style={styles.albumPageButton}
            onPress={() => {
              let randomAlbum =
                albums[Math.floor(Math.random() * albums.length)];
              navigation.navigate("AlbumPage", {
                album: randomAlbum,
                albums: albums,
              });
            }}
          >
            <MaterialCommunityIcons
              name="skip-forward"
              size={40}
              color={"white"}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 12,
                transform: [{ translateY: -5 }],
              }}
            >
              random
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default AlbumPage;
