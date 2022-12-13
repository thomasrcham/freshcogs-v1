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
  const [localAlbumTags, setLocalAlbumTags] = useState({ id: 0, tags: [] });

  useEffect(() => {
    randomTagsArray(globalTags);
  }, []);

  useEffect(() => {
    let localTags = globalTags.filter((g) => g.id === album.id);
    let setTags = localTags.length > 0 ? localTags : { id: album.id, tags: [] };
    setLocalAlbumTags(setTags);
  }, []);

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
    let newTagItem = selectedTag._dispatchInstances.memoizedProps.value;
    let newTagsList = tagsList.filter((t) => !t.includes(newTagItem));
    setTagsList(newTagsList);
    console.log("existing state");
    console.log(localAlbumTags);
    let newFullTag = {
      id: album.id,
      tags: [...localAlbumTags.tags, newTagItem],
    };
    console.log("state to be set");

    console.log(newFullTag);
    setLocalAlbumTags(newFullTag);
    let filterGlobalTags = globalTags.filter((g) => g.id != newFullTag.id);
    let newGlobalTags = [...filterGlobalTags, newFullTag];
    console.log(newGlobalTags);
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

  let currentTagsDisplay =
    localAlbumTags.tags === [] ? (
      localAlbumTags.tags.map((t) => (
        <Pressable
          style={styles.albumInfoTags}
          key={t}
          value={t}
          onPress={(key) => addTagToAlbum(key)}
        >
          <Text>{t}</Text>
        </Pressable>
      ))
    ) : (
      <Text>no tags</Text>
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
    </View>
  );
}
