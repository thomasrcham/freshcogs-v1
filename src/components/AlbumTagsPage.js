import { useEffect } from "react";
import { useState } from "react";
import { Image, Linking, Pressable, Text, View } from "react-native";

import styles from "./styles/style.js";

export default function AlbumTagsPage({
  route,
  navigation,
  globalTags,
  handleGlobalTags,
}) {
  const { album, albums } = route.params;
  const [tagsList, setTagsList] = useState(null);
  const [localAlbumTags, setLocalAlbumTags] = useState({
    id: album.id,
    tags: ["CLASSIC", "CLUB", "DANCEABLE"],
  });

  useEffect(() => {
    randomTagsArray(globalTags);
    setLocalAlbumTags(globalTags.filter((g) => g.id === album.id));
    console.log(globalTags);
  }, [globalTags]);

  function randomTagsArray(globalTags) {
    let newArray = [];
    for (let i = 0; i < 4; i = newArray.length) {
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

  function addTagToAlbum(selectedTag) {
    let newTag = selectedTag._dispatchInstances.memoizedProps.value;
    let newTagsList = [...localAlbumTags.tags, newTag];
    let newGlobalTags = [...globalTags, { id: album.id, tags: newTagsList }];
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

  let currentTagsDisplay = localAlbumTags
    ? localAlbumTags.tags.map((t) => (
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
    </View>
  );
}
