import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");

  useEffect(() => {
    randomTagsArray(globalTags);
  }, []);

  useEffect(() => {
    let localTags = globalTags.find((g) => g.id === album.id);
    let setTags = localTags ? localTags : { id: 0, tags: [] };
    setLocalAlbumTags(setTags);
  }, [globalTags]);

  function randomTagsArray(globalTags) {
    let fullTagList = globalTags.find((g) => g.id === 0).tags;
    let newArray = [];
    let localTags = globalTags ? globalTags.find((g) => g.id === album.id) : [];
    let remainingTags = localTags
      ? fullTagList.filter((x) => !localTags.tags.includes(x))
      : fullTagList;
    let value = remainingTags.length > 10 ? 10 : remainingTags.length;
    for (let i = 0; i < remainingTags.length; i = newArray.length) {
      let newItem =
        remainingTags[Math.floor(Math.random() * remainingTags.length)];
      if (newArray.includes(newItem) || localAlbumTags.tags.includes(newItem)) {
        null;
      } else {
        newArray.push(newItem);
      }
    }
    setTagsList(newArray);
    console.log(newArray);
  }

  const addNewTag = () => {
    setModalVisible(!modalVisible);
    text ? addTagToAlbum(text.toUpperCase()) : null;
    onChangeText("");
  };

  function addTagToAlbum(selectedTag) {
    let newTagsList = tagsList.filter((t) => !t.includes(selectedTag));
    setTagsList(newTagsList);
    let tags = [...localAlbumTags.tags, selectedTag];
    let newFullTag = {
      id: album.id,
      tags: tags,
    };
    setLocalAlbumTags(newFullTag);
    let filterGlobalTags = globalTags
      .find((g) => g.id === 0)
      .tags.includes(selectedTag)
      ? globalTags.filter((g) => g.id != newFullTag.id)
      : addTagToGlobal(selectedTag, album.id);
    let newGlobalTags = [...filterGlobalTags, newFullTag];
    handleGlobalTags(newGlobalTags);
  }

  const addTagToGlobal = (tag, id) => {
    let filteredTags = globalTags.filter((g) => g.id != id);
    let removedGlobalTags = filteredTags.filter((g) => g.id != 0);
    let newFullTag = {
      id: 0,
      tags: [...globalTags.filter((g) => g.id === 0)[0].tags, tag],
    };
    return [...removedGlobalTags, newFullTag];
  };

  function removeTagFromAlbum(selectedTag) {
    let tagItemToRemove = selectedTag._dispatchInstances.memoizedProps.value;
    let tags = localAlbumTags.tags.filter((t) => t != tagItemToRemove);
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
    ? tagsList.slice(0, 10).map((t) => (
        <Pressable
          key={t}
          value={t}
          onPress={(key) =>
            addTagToAlbum(key._dispatchInstances.memoizedProps.value)
          }
        >
          <Text style={styles.albumInfoTags}>{t}</Text>
        </Pressable>
      ))
    : null;

  let currentTagsDisplay =
    localAlbumTags.id === 0 ? (
      <Text>no tags</Text>
    ) : (
      localAlbumTags.tags.map((t) => (
        <Pressable key={t} value={t} onPress={(key) => removeTagFromAlbum(key)}>
          <Text style={styles.albumInfoTags}>{t}</Text>
        </Pressable>
      ))
    );

  return (
    <View style={[styles.container, styles.wholeAlbumPage]}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{ flex: 1, backgroundColor: modalVisible ? "#838285CC" : "" }}
        >
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                />
                <Pressable onPress={() => addNewTag()}>
                  <Text style={styles.albumInfoTags}>Add a tag!</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Pressable>
      </Modal>
      <Image
        style={styles.image}
        source={{
          uri: `${album.uri}`,
        }}
      />
      <View style={styles.tagsDisplayContainer}>
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
          <View
            style={{
              alignSelf: "flex-end",
              marginTop: 1,
            }}
          >
            <View
              style={{
                alignItems: "space-between",
                flexDirection: "row",
              }}
            >
              <Pressable
                onPress={() => {
                  let newTagsList = tagsList
                    ? tagsList.slice(10, tagsList.length)
                    : null;
                  setTagsList(newTagsList);
                }}
              >
                <Text style={styles.albumInfoTags}>
                  {tagsList
                    ? tagsList.length > 0
                      ? "More Tags"
                      : "Add tags -->"
                    : null}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.albumInfoTags}>New Tag</Text>
              </Pressable>
            </View>
          </View>
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
