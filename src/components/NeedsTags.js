import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import styles from "./styles/style.js";

export default function NeedsTags({ albums, globalTags, navigation }) {
  const [needsTagsList, setNeedsTagsList] = useState(null);

  useEffect(() => {
    randomArray(needsTags);
  }, [globalTags]);

  let hasTagsIDs = globalTags ? globalTags.map((g) => g.id) : null;
  let needsTags = albums
    ? albums.filter((a) => !hasTagsIDs.includes(a.id))
    : null;

  function randomArray(releases) {
    let newArray = [];

    for (let i = 0; i < 8; i = newArray.length) {
      let newItem = releases[Math.floor(Math.random() * releases.length)];
      if (newArray.includes(newItem.id)) {
        null;
      } else {
        newArray.push(newItem);
      }
    }
    setNeedsTagsList(newArray);
  }

  const Item = ({ item, onPress }) => (
    <View style={styles.needsTagsImageGrid} key={item.id}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: item.uri }}
          style={styles.needsTagsImage}
          key={item.title}
        />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate("AlbumTagsPage", {
            album: item,
            globalTags: globalTags,
          })
        }
      />
    );
  };

  return (
    <View>
      <View>
        <FlatList
          data={needsTagsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={needsTagsList}
          numColumns="4"
        />
      </View>
    </View>
  );
}
