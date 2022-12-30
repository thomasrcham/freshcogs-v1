import {
  Button,
  View,
  Image,
  Linking,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

import styles from "./styles/style.js";

export default function UserPage({
  albums,
  getData,
  handleGlobalTags,
  globalTags,
  globalResetTags,
  setGlobalTags,
  setAlbums,
  storeAlbums,
  setUser,
  listenEvents,
  requestOptions,
  user,
  updateLibraryFetch,
  setListenEvents,
  save,
  getValueFor,
  lastFMUsername,
  onChangelastFMUsername,
  lastFMPassword,
  onChangelastFMPassword,
  lastFMauth,
  lastFMUser,
  lastFMUserFetch,
}) {
  const navigation = useNavigation();
  const ref_input2 = useRef();
  const [updating, setUpdating] = useState("Update Now");
  const [albumsToUpdate, setAlbumsToUpdate] = useState(
    albums ? albums.filter((a) => a.isReissue === true).length : 0
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleProfileClick = (URL) => {
    Linking.canOpenURL(URL).then((supported) => {
      if (supported) {
        Linking.openURL(URL);
      } else {
        console.log("Don't know how to open URI: " + URL);
      }
    });
  };

  useEffect(() => {
    lastFMUserFetch();
  }, []);

  function yearReplaceTimer() {
    setUpdating("In Progress");
    let myInterval = setInterval(() => {
      let needsReplacement = albums
        ? albums.filter((a) => a.isReissue === true).slice(0, 1)
        : console.log("none to set as needs replacement");

      if (needsReplacement.length === 0) {
        console.log("finished");
        clearInterval(myInterval);
        setAlbums(albums);
        storeAlbums(albums);
        setUpdating("Complete");
        setAlbumsToUpdate(0);
      } else {
        console.log(
          `remaining albums that need year replaced: ${
            albums.filter((a) => a.isReissue === true).length
          }`
        );
        setAlbumsToUpdate(albums.filter((a) => a.isReissue === true).length);
        setUpdating("In Progress");
        needsReplacement.map((album) => individualYearReplace(album));
      }
    }, 1500);
  }

  function individualYearReplace(album) {
    console.log(`${album.title}, ${album.year}, ${album.master_id}`);
    fetch(`https://api.discogs.com/masters/${album.master_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        album.isReissue = false;
        album.year = result.year;
      });
  }

  return (
    <View style={styles.mainUserContainer}>
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
                  placeholder="Last.fm Username"
                  autoFocus={true}
                  onChangeText={onChangelastFMUsername}
                  value={lastFMUsername}
                  blurOnSubmit={false}
                />
                <TextInput
                  placeholder="Last.fm Password"
                  ref={ref_input2}
                  style={styles.input}
                  onChangeText={onChangelastFMPassword}
                  value={lastFMPassword}
                  textContentType={"password"}
                />

                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    lastFMauth();
                  }}
                >
                  <Text style={styles.albumInfoTags}>Submit</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Pressable>
      </Modal>
      <Text style={styles.tagsPageTitle}>Discogs Profile:</Text>
      <View style={styles.userPageContainer}>
        <View style={styles.userImageContainer}>
          <Image
            style={styles.userImage}
            source={{
              uri: `${user.avatar_url}`,
            }}
          />
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userText}>Username: {user.username}</Text>
          <Text style={styles.userText}>
            Discogs Member Since:{" "}
            {format(new Date(user.registered), "MM/dd/yyyy")}
          </Text>
          <Text style={styles.userText}>
            Records in Collection: {user.num_collection}
          </Text>
          <Pressable
            onPress={() => handleProfileClick(user.uri)}
            style={styles.userText}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Image
                style={{
                  aspectRatio: 1,
                  height: 25,
                  marginRight: 3,
                }}
                source={require("../icons/vinyl.png")}
              />
            </View>
            <Text style={(styles.userText, styles.discogsLinkText)}>
              Open Profile
            </Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.tagsPageTitle}>Last.fm Profile:</Text>
      <View style={styles.userPageContainer}>
        <View style={styles.userTextContainer}>
          <Text style={styles.userText}>Username: {lastFMUser.username}</Text>
          <Text style={styles.userText}>
            Last.fm Member Since:{" "}
            {format(new Date(lastFMUser.dateRegistered), "MM/dd/yyyy")}
          </Text>
          <Text style={styles.userText}>
            Total Playcount: {lastFMUser.playcount}
          </Text>
          <Pressable
            onPress={() => handleProfileClick(lastFMUser.lfmURL)}
            style={styles.userText}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Image
                style={{
                  aspectRatio: 1,
                  height: 25,
                  marginRight: 3,
                }}
                source={require("../icons/vinyl.png")}
              />
            </View>
            <Text style={(styles.userText, styles.discogsLinkText)}>
              Open Profile
            </Text>
          </Pressable>
        </View>
        <View style={styles.userImageContainer}>
          <Image
            style={styles.userImage}
            source={{
              uri: `${lastFMUser.lfmPFP}`,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          marginLeft: 10,
          height: "5%",
        }}
      >
        <View style={{ width: "55%" }}>
          <Text>
            Albums with potentially incorrect release year data:{" "}
            {albumsToUpdate}
          </Text>
        </View>
        <View
          style={{
            width: "45%",
            alignItems: "center",
          }}
        >
          {updating != "Update Now" ? (
            <Button title={updating} style={{ width: "30%" }} disabled={true} />
          ) : (
            <Button
              title="Update Now"
              style={{ width: "30%" }}
              onPress={yearReplaceTimer}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          marginLeft: 10,
        }}
      >
        <View style={{ width: "55%" }}>
          <Text>
            Total Listen Events Recorded:{" "}
            {listenEvents ? listenEvents.length : 0}
          </Text>
        </View>
        <View style={{ width: "45%", alignItems: "center" }}>
          <Button
            title="View Events"
            style={{ width: "30%" }}
            onPress={() => navigation.navigate("ListenEvents")}
          />
        </View>
      </View>
      <View style={styles.userPageButtons}>
        {/* <Button
          title="Last.fm auth"
          onPress={() => setModalVisible(!modalVisible)}
        /> */}
        <Button title="Admin" onPress={() => navigation.navigate("Buttons")} />
      </View>
    </View>
  );
}
