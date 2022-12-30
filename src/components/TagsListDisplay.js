import { FlatList, Pressable, Text, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import List from "./List";
import styles from "./styles/style.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TagsListDisplay({ albums, navigation, route }) {
  const listRef = useRef(null);
  const { localAlbums, chosenTags } = route.params;

  const Item = ({ item }) => (
    <View style={styles.tagsListButton} adjustsFontSizeToFit>
      <Text style={{ flex: 1 }}></Text>
      <Text style={styles.tagsListText}>{item}</Text>
      <Text style={{ flex: 1 }}></Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.resultsPageContainer}>
        {route.name === "List" ? (
          <View style={styles.tagsSelectionWindow}>
            <View style={styles.tagsListWindow}>
              <View style={{ alignSelf: "flex-start", marginRight: 10 }}>
                <Pressable
                  style={styles.albumPageButton}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <MaterialCommunityIcons
                    name="skip-backward"
                    size={28}
                    color={"black"}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 10,
                      transform: [{ translateY: -5 }],
                    }}
                  >
                    back
                  </Text>
                </Pressable>
              </View>
              <View style={styles.tagsListRow}>
                <Text>TAGS: </Text>
                <FlatList
                  data={chosenTags}
                  renderItem={renderItem}
                  keyExtractor={(item) => item}
                  extraData={chosenTags}
                  numColumns="3"
                />
              </View>
            </View>
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
    </View>
  );
}
