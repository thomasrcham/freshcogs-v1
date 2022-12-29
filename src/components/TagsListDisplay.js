import { Pressable, Text, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import List from "./List";
import styles from "./styles/style.js";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function TagsListDisplay({ albums, navigation, route }) {
  const listRef = useRef(null);
  const { localAlbums, chosenTags } = route.params;

  let tags = chosenTags.join(", ");

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.resultsPageContainer}>
        {route.name === "List" ? (
          <View>
            <Text>{tags}</Text>
          </View>
        ) : null}

        <View style={styles.resultsList}>
          <List
            localAlbums={localAlbums}
            navigation={navigation}
            listRef={listRef}
          />
        </View>
      </View>
      <View style={styles.backButton}>
        <View>
          <Pressable
            onPress={() => {
              listRef.current.scrollToOffset({ offset: 0, animated: true });
            }}
          >
            <FontAwesome5 name="arrow-circle-up" size={32} color={"white"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
