import { useEffect } from "react";
import { useState } from "react";
import { Image, Linking, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles/style.js";

export default function AlbumTagsPage({
  route,
  navigation,
  globalTags,
  handleGlobalTags,
}) {
  const { album } = route.params;
  const [tagsList, setTagsList] = useState(null);
  const [localAlbumTags, setLocalAlbumTags] = useState({ id: 0, tags: [] });

  useEffect(() => {
    randomTagsArray(globalTags);
  }, []);

  useEffect(() => {
    let localTags = globalTags.find((g) => g.id === album.id);
    let setTags = localTags ? localTags : { id: 0, tags: [] };
    setLocalAlbumTags(setTags);
  }, []);

  function randomTagsArray(globalTags) {
    let newArray = [];
    for (let i = 0; i < 12; i = newArray.length) {
      let localTags = globalTags[0].tags;
      let newItem = localTags[Math.floor(Math.random() * localTags.length)];
      if (newArray.includes(newItem)) {
        null;
      } else {
        newArray.push(newItem);
      }
    }
    setTagsList(newArray);
  }

  console.log(globalTags);

  function addTagToAlbum(selectedTag) {
    let newTagItem = selectedTag._dispatchInstances.memoizedProps.value;
    let newTagsList = tagsList.filter((t) => !t.includes(newTagItem));
    setTagsList(newTagsList);
    // console.log(localAlbumTags.tags);
    let tags = [...localAlbumTags.tags, newTagItem];
    let newFullTag = {
      id: album.id,
      tags: tags,
    };
    setLocalAlbumTags(newFullTag);
    let filterGlobalTags = globalTags.filter((g) => g.id != newFullTag.id);
    let newGlobalTags = [...filterGlobalTags, newFullTag];
    handleGlobalTags(newGlobalTags);
  }

  let tagsDisplay = tagsList
    ? tagsList.map((t) => (
        <Pressable
          style={styles.albumInfoTags}
          key={t}
          value={t}
          onPress={(key) => addTagToAlbum(key)}
        >
          <Text>{t}</Text>
        </Pressable>
      ))
    : null;
  console.log("tags on mount");
  console.log(localAlbumTags);

  let currentTagsDisplay =
    localAlbumTags.id === 0 ? (
      <Text>no tags</Text>
    ) : (
      localAlbumTags.tags.map((t) => (
        <Text style={styles.albumInfoTags} key={t}>
          {t}
        </Text>
      ))
    );

  return (
    <View style={[styles.container, styles.wholeAlbumPage]}>
      <Image
        style={styles.image}
        source={{
          uri: `${album.uri}`,
        }}
      />
      <View style={styles.albumDataContainer}>
        <View style={styles.currentTagsDisplayContainer}>
          <Text numberOfLines={1} style={styles.tagsTitle}>
            Current Tags:
          </Text>
          <View style={styles.currentTags}>{currentTagsDisplay}</View>
        </View>
        <View style={styles.newTagsDisplayContainer}>
          <Text numberOfLines={1} style={styles.tagsTitle}>
            Add New Tags:
          </Text>
          <View style={styles.currentTags}>{tagsDisplay}</View>
        </View>
      </View>
      <View style={styles.albumPageButtonsGrid}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            flexDirection: "row",
          }}
        >
          <Pressable
            style={styles.albumPageButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialCommunityIcons
              name="skip-backward"
              size={40}
              color={"white"}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 12,
                transform: [{ translateY: -5 }],
              }}
            >
              back
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
