import { Image, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { lfm_api_key, lfm_secret } from "@env";

import styles from "./styles/style.js";

function AlbumPage({
  route,
  navigation,
  globalTags,
  LFMKey,
  requestOptions,
  storeListenEvents,
}) {
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

  const createListenEvent = () => {
    let dateTime = new Date().toISOString();
    let newEvent = { album: album, dateTime: dateTime };
    let newArray = localListenEvents
      ? [...localListenEvents, newEvent]
      : [newEvent];
    let newTotalArray = totalListenEvents
      ? [...totalListenEvents, newEvent]
      : [newEvent];
    scrobbleEvent();
    setLocalListenEvents(newArray);
    setTotalListenEvents(newTotalArray);
    storeListenEvents(newTotalArray);
  };

  const scrobbleEvent = () => {
    let URL;
    if (album.id === album.master_id) {
      URL = `releases/${album.id}`;
    } else {
      URL = `masters/${album.master_id}`;
    }
    fetch(`https://api.discogs.com/${URL}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let tracklist = tracklistFetch(result.tracklist);
        let scrobbleInterval = setInterval(() => {
          if (tracklist.length === 0) {
            console.log("finished");
            clearInterval(scrobbleInterval);
          } else {
            scrobbleTrack(tracklist[0], album);
            tracklist.shift();
          }
        }, 10000);
      })
      .catch((e) => console.log(e));
  };

  var CryptoJS = require("crypto-js");
  var parseString = require("xml2js").parseString;

  const scrobbleTrack = (singleTrack, album) => {
    let dateTime = Math.round(Date.now() / 1000);
    let md5String = CryptoJS.MD5(
      `album[0]${album.title}api_key${lfm_api_key}artist[0]${album.artist}methodtrack.scrobblesk${LFMKey}timestamp[0]${dateTime}track[0]${singleTrack.title}${lfm_secret}`
    ).toString();
    let fullString = `method=track.scrobble&artist[0]=${album.artist}&track[0]=${singleTrack.title}&timestamp[0]=${dateTime}&album[0]=${album.title}&api_key=${lfm_api_key}&sk=${LFMKey}&api_sig=${md5String}`;

    var scrobbleRequestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `http://ws.audioscrobbler.com/2.0/?${fullString}`,
      scrobbleRequestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        parseString(result, function (err, output) {
          output.lfm.scrobbles[0].$.accepted
            ? console.log(
                "scrobbled " + output.lfm.scrobbles[0].scrobble[0].track[0]._
              )
            : Alert.alert("failed");
        });
      })
      .catch((error) => console.log("error", error));
  };

  const tracklistFetch = (tracklist) => {
    let tracklistArray = [];
    for (let i = 0; i < tracklist.length; i++) {
      let track = {
        trackNo: i,
        title: tracklist[i].title,
      };
      tracklistArray.push(track);
    }
    return tracklistArray;
  };

  let currentTagsDisplay =
    localAlbumTags.id === 0 ? (
      <Text>no tags</Text>
    ) : localAlbumTags.id < 6 ? (
      localAlbumTags.tags.map((t) => (
        <Pressable key={t} value={t}>
          <Text style={styles.albumPageCurrentTags} key={t}>
            {t}
          </Text>
        </Pressable>
      ))
    ) : (
      localAlbumTags.tags.slice(0, 6).map((t) => (
        <Pressable key={t} value={t}>
          <Text style={styles.albumPageCurrentTags} key={t}>
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
                <Text style={styles.albumInfoBasicText} numberOfLines={2}>
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
                          localListenEvents
                            .map((e) => e.dateTime)
                            .sort()
                            .reverse()[0]
                        ),
                        "MMMM d, yyyy"
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
                    <Text style={styles.albumInfoTagsButton}>
                      {localAlbumTags.id === 0 ? "Add Tags!" : "Edit Tags"}
                    </Text>
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
