import { Image, StyleSheet, Text, View } from "react-native";

function AlbumPage({ route }) {
  const { album } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `${album.uri}`,
        }}
      />
      <View>
        <Text>{album.artist}</Text>
        <Text>{album.title}</Text>
      </View>
      <View>
        <Text>{album.id}</Text>
      </View>
    </View>
  );
}

export default AlbumPage;

const styles = StyleSheet.create({
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
  image: {
    width: "100%",
    height: "50%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "#878684",
    borderWidth: 2,
    borderRadius: 4,
  },
});
