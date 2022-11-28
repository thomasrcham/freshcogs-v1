import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { addAlbum } from "../redux/albumSlice";

function AlbumPage({ route }) {
  const { album } = route.params;
  const dispatch = useDispatch();
  const [displayAlbum, setDisplayAlbum] = useState(null);

  useEffect(() => {}, []);

  // console.log(displayAlbum);

  let display = displayAlbum ? (
    <>
      <Image
        style={styles.image}
        source={{
          uri: `${displayAlbum.uri}`,
        }}
      />
      <View>
        <Text>{displayAlbum.artist}</Text>
        <Text>{displayAlbum.title}</Text>
      </View>
      <View>
        <Text>{displayAlbum.id}</Text>
      </View>
    </>
  ) : null;

  return <View style={styles.container}>{display}</View>;
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
