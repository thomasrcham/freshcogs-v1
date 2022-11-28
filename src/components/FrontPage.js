import { Button, StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { addAlbum } from "../redux/albumSlice";

export default function FrontPage() {
  const album = {
    artist: "Radiohead",
    id: 1158751,
    title: "In Rainbows",
    uri: "https://i.discogs.com/8wHYeJHpnyK0eb7A68y417FWTa9GdLjSW9gr4bMvY5E/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNTg3/NTEtMTIwMDU4OTA5/Ni5qcGVn.jpeg",
  };
  const dispatch = useDispatch();
  // const album = useSelector((state) => state.album.title);

  return (
    <View style={styles.container}>
      <Button title="words" onPress={() => onPresh()} />
      {/* <Text>{album}</Text> */}
    </View>
  );
}

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
