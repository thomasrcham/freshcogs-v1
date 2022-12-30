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

export default function TagsChoose3({
  albums,
  globalTags,
  displayedTags,
  navigation,
}) {
  const [chosenTags, setChosenTags] = useState(["", "", ""]);
  const [numChosenTags, setNumChosenTags] = useState(0);
  const [decisionAlbums, setDecisionAlbums] = useState(albums);
  const [buttonText, setButtonText] = useState("CHOOSE 3 TAGS");

  let newChosenTags;

  function handleChosenTag(item) {
    switch (numChosenTags) {
      case 0: {
        newChosenTags = [item, ...chosenTags.slice(0, 2)];
        setNumChosenTags(1);
        break;
      }
      case 1: {
        newChosenTags = [chosenTags[0], item, chosenTags[2]];
        setNumChosenTags(2);
        break;
      }
      case 2: {
        newChosenTags = [...chosenTags.slice(0, 2), item];
        setNumChosenTags(3);
        setButtonText("SEE THE LIST");
        break;
      }
    }
    setChosenTags(newChosenTags);
  }

  function seeTheList() {
    let newDecisionIDs = globalTags
      .filter(
        (i) =>
          i.tags.includes(chosenTags[0]) &&
          i.tags.includes(chosenTags[1]) &&
          i.tags.includes(chosenTags[2])
      )
      .map((i) => i.id);
    let newDecisionAlbums = albums.filter((a) => newDecisionIDs.includes(a.id));
    newDecisionAlbums.length === 0
      ? setButtonText("NO MATCHES")
      : navigation.navigate("List", {
          localAlbums: newDecisionAlbums,
          chosenTags: chosenTags,
        });
  }

  const reset = () => {
    setChosenTags(["", "", ""]);
    setNumChosenTags(0);
  };

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
    <View style={styles.tagsSelectionWindow}>
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
      <View style={styles.tagsSelectionWindowLower}>
        <View style={styles.tagsSelectionRowLower}>
          <Pressable title="reset" onPress={() => reset()}>
            <View style={styles.tagsSelectionButtonLower}>
              <Text style={{ flex: 1 }}></Text>
              <Text style={styles.tagsSelectionLowerText} adjustsFontSizeToFit>
                RESET
              </Text>
              <Text style={{ flex: 1 }}></Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.tagsSelectionRowLower}>
          <Pressable
            title="see the list"
            onPress={numChosenTags === 2 ? null : () => seeTheList()}
          >
            <View style={styles.tagsSelectionButtonLower}>
              <Text style={{ flex: 1 }}></Text>
              <Text style={styles.tagsSelectionLowerText} adjustsFontSizeToFit>
                {buttonText}
              </Text>
              <Text style={{ flex: 1 }}></Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={{ borderWidth: 1, marginBottom: 2 }}></View>
      <View>
        <FlatList
          data={displayedTags}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          extraData={displayedTags}
          numColumns="3"
        />
      </View>
    </View>
  );
}
