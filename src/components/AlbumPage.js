import { Text, Image, StyleSheet, View, Dimensions } from "react-native";

function AlbumPage({ route }) {
  const { album } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={{
          uri: `${album.uri}`,
        }}
      />
      <Text>{album.title}</Text>
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
});
