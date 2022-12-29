import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./styles/style.js";

export default function TagsChoose3({ globalTags, displayedTags }) {
  const [chosenTags, setChosenTags] = useState(["", "", ""]);
  const [numChosenTags, setNumChosenTags] = useState(0);

  let newChosenTags;

  function handleChosenTag(item) {
    console.log(numChosenTags);
    // console.log(item);

    switch (numChosenTags) {
      case 0: {
        console.log("case 0");
        newChosenTags = [item, ...chosenTags.slice(0, 2)];
        setNumChosenTags(1);
        break;
      }
      case 1: {
        console.log("case 1");
        newChosenTags = [chosenTags[0], item, chosenTags[2]];
        setNumChosenTags(2);
        break;
      }
      case 2: {
        console.log("case 2");
        newChosenTags = [...chosenTags.slice(0, 2), item];
        setNumChosenTags(3);
        break;
      }
    }
    setChosenTags(newChosenTags);
  }

  const Item = ({ item, onPress }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: "space-around",
        margin: 1,
        maxWidth: "33%",
      }}
      onPress={onPress}
    >
      <View
        style={
          chosenTags.includes(item)
            ? styles.tagsSelectionButtonLowerChosen
            : styles.tagsSelectionButtonLower
        }
        adjustsFontSizeToFit
      >
        <Text style={{ flex: 1 }}></Text>
        <Text style={styles.tagsSelectionLowerText}>{item}</Text>
        <Text style={{ flex: 1 }}></Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} onPress={() => handleChosenTag(item)} />;
  };

  return (
    <View
      style={{
        padding: 5,
        alignContent: "flex-end",
        flexDirection: "column",
      }}
    >
      <View style={{ marginBottom: 6 }}>
        <Text>Chosen Tags:</Text>
        <FlatList
          data={chosenTags}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          extraData={chosenTags}
          numColumns="3"
        />
      </View>
      <Pressable
        title="see the list"
        //   onPress={() => seeTheList()}
      >
        <View style={styles.tagsSeeTheList}>
          <Text style={{ flex: 1 }}></Text>
          <Text style={styles.tagsSelectionLowerText} adjustsFontSizeToFit>
            SEE THE LIST!
          </Text>
          <Text style={{ flex: 1 }}></Text>
        </View>
      </Pressable>
      <View style={{ borderWidth: 1, marginBottom: 2 }}></View>
      <FlatList
        data={displayedTags}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={displayedTags}
        numColumns="3"
      />
    </View>
  );
}
