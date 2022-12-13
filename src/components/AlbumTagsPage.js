import { Image, Linking, Pressable, Text, View } from "react-native";

import styles from "./styles/style.js";

export default function AlbumTagsPage({ route, navigation }) {
  const { album, albums } = route.params;
  return (
    <View style={[styles.container, styles.wholeAlbumPage]}>
      <Image
        style={styles.image}
        source={{
          uri: `${album.uri}`,
        }}
      />
      <View style={styles.albumDataContainer}>
        <View style={styles.albumDataDisplay}></View>
      </View>
    </View>
  );
}
