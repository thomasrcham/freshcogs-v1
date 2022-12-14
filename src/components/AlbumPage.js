import { Image, Linking, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles/style.js";

function AlbumPage({ route, navigation, globalTags }) {
  const { album, albums } = route.params;
  const [localListenEvents, setLocalListenEvents] = useState([]);
  const [totalListenEvents, setTotalListenEvents] = useState([]);
  const [localAlbumTags, setLocalAlbumTags] = useState({ id: 0, tags: [] });

  useEffect(() => {
    listenEventsDataGet();
    totalListenEventDataGet();
  }, [album]);

  useEffect(() => {
    let localTags = globalTags.find((g) => g.id === album.id);
    let setTags = localTags ? localTags : { id: 0, tags: [] };
    setLocalAlbumTags(setTags);
  }, [globalTags]);

  const handleClick = () => {
    let URL = `https://www.discogs.com/master/${album.master_id}`;
    Linking.canOpenURL(URL).then((supported) => {
      if (supported) {
        Linking.openURL(URL);
      } else {
        console.log("Don't know how to open URI: " + URL);
      }
    });
  };

  const listenEventsDataGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@listenEvents");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      let localEvents = data.filter((e) => e.album.id === album.id);
      localEvents.length >= 1
        ? setLocalListenEvents(localEvents)
        : setLocalListenEvents([]);
    } catch (e) {
      console.log(`Listen Events storage retrieval failure: ${e}`);
    }
  };

  const totalListenEventDataGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@listenEvents");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      setTotalListenEvents(data);
    } catch (e) {
      console.log(`Listen Events storage retrieval failure: ${e}`);
    }
  };

  const storeListenEvents = async (value) => {
    try {
      console.log(`storing listening events: ${value.length}`);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@listenEvents", jsonValue);
    } catch (e) {
      console.log(`Listen Events Storage failure: ${e}`);
    }
  };

  const createListenEvent = () => {
    let dateTime = new Date().toISOString();
    // let newAlbum = albums[Math.floor(Math.random() * albums.length)];
    let newEvent = { album: album, dateTime: dateTime };
    let newArray = localListenEvents
      ? [...localListenEvents, newEvent]
      : [newEvent];
    let newTotalArray = [...totalListenEvents, newEvent];
    setLocalListenEvents(newArray);
    setTotalListenEvents(newTotalArray);
    storeListenEvents(newTotalArray);
  };

  let currentTagsDisplay =
    localAlbumTags.id === 0 ? (
      <Text>no tags</Text>
    ) : localAlbumTags.id < 6 ? (
      localAlbumTags.tags.map((t) => (
        <Pressable style={styles.albumInfoTags} key={t} value={t}>
          <Text style={styles.albumInfoTags} key={t}>
            {t}
          </Text>
        </Pressable>
      ))
    ) : (
      localAlbumTags.tags.slice(0, 6).map((t) => (
        <Pressable style={styles.albumInfoTags} key={t} value={t}>
          <Text style={styles.albumInfoTags} key={t}>
            {t}
          </Text>
        </Pressable>
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
        <View style={styles.albumDataDisplay}>
          <View style={styles.albumInfo}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.albumInfoArtist}
            >
              {album.artist}
            </Text>
            <View style={{ maxHeight: 65 }}>
              <Text
                numberOfLines={1}
                style={{ fontSize: 16, color: "white", fontStyle: "bold" }}
              >
                {album.title}
              </Text>
            </View>
            <View style={styles.albumOuterInfoBox}>
              <View style={styles.albumLeftInfoBox}>
                <Text style={styles.albumInfoBasicText}>
                  Originally released in {album.year}
                </Text>
                <Text style={styles.albumInfoBasicText} numberOfLines={3}>
                  Genres:{" "}
                  {album.genres.length > 0
                    ? album.genres.join(", ")
                    : "no genre recorded"}
                </Text>
                <View style={styles.albumPageTags}>{currentTagsDisplay}</View>
              </View>
              <View style={styles.albumRightInfoBox}>
                {localListenEvents.length > 0 ? (
                  <View style={{ flex: 1 }}>
                    <Text style={styles.albumInfoBasicText}>
                      Total Listens: {localListenEvents.length}
                    </Text>
                    <Text style={styles.albumInfoBasicText}>
                      Last listened on:
                    </Text>
                    <Text style={styles.albumInfoBasicText}>
                      {format(
                        new Date(
                          localListenEvents.map((e) => e.dateTime).sort()[0]
                        ),
                        "MMMM d yyyy"
                      )}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.albumInfoBasicText}>
                    No listens recorded
                  </Text>
                )}
                <View style={styles.albumInfoTagsButton}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("AlbumTagsPage", {
                        album: album,
                        globalTags: globalTags,
                      })
                    }
                  >
                    <Text>Edit Tags</Text>
                  </Pressable>
                </View>
              </View>
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
          <Pressable style={styles.albumPageButton}>
            {/* <MaterialCommunityIcons
              name="step-backward"
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
              previous
            </Text> */}
          </Pressable>
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
          <Pressable
            style={styles.albumPageButton}
            onPress={() => createListenEvent()}
          >
            <MaterialCommunityIcons name="play" size={40} color={"white"} />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 12,
                transform: [{ translateY: -5 }],
              }}
            >
              listen
            </Text>
          </Pressable>
          <Pressable
            style={styles.albumPageButton}
            onPress={() => {
              let randomAlbum =
                albums[Math.floor(Math.random() * albums.length)];
              navigation.navigate("AlbumPage", {
                album: randomAlbum,
                albums: albums,
              });
            }}
          >
            <MaterialCommunityIcons
              name="skip-forward"
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
              random
            </Text>
          </Pressable>
          <Pressable style={styles.albumPageButton}>
            {/* <FontAwesome5 name="record-vinyl" size={30} color={"white"} />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 12,
                transform: [{ translateY: -5 }],
              }}
            >
              tags
            </Text> */}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default AlbumPage;
