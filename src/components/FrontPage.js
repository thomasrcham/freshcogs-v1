import { Button, StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { addAlbum } from "../redux/AlbumSlice";

export default function FrontPage() {
  const dispatch = useDispatch();
  // const album = useSelector((state) => state.album.title);
  return (
    <View style={styles.container}>
      <Button
        title="words"
        onPress={() =>
          dispatch(addAlbum({ title: "changed", artist: "changed" }))
        }
      />
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
