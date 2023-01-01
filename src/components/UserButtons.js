import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles/style.js";

export default function UserButtons({
  albums,
  customFields,
  discogsAuth,
  getData,
  getKey,
  globalTags,
  globalResetTags,
  handleGlobalTags,
  setListenEvents,
  updateLibraryFetch,
  requestOptions,
}) {
  const clearStorage = () => {
    removeItemValue();
    setListenEvents(null);
  };

  const removeItemValue = async () => {
    let keys = [
      "@albums",
      // "@userProfile",
      "@tags",
      "@listenEvents",
    ];
    await AsyncStorage.multiRemove(keys);
  };

  const resetGlobalTags = (globalTags, globalResetTags) => {
    let newFullTag = {
      id: 0,
      tags: globalResetTags,
    };
    let filterGlobalTags = globalTags.filter((g) => g.id != newFullTag.id);
    let newGlobalTags = [...filterGlobalTags, newFullTag];
    handleGlobalTags(newGlobalTags);
  };

  const importFirebase = () => {
    removeItemValue();
    getData();
  };

  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  // myHeaders.append(
  //   "User-Agent",
  //   "Flashcogs/1.0 +https://github.com/thomasrcham/discogs-app-v3"
  // );
  // myHeaders.append(
  //   "Authorization",
  //   `OAuth oauth_consumer_key=${discogsConsumerKey},oauth_token=${discogsUserToken},oauth_signature_method="PLAINTEXT",oauth_timestamp="${dateTime}",oauth_nonce="${dateTime}",oauth_version="1.0",oauth_signature=""&"consumer_secret=${discogsConsumerKey}`
  // );

  // var discogsTagsRequestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.userPageButtons}>
        <Button title="reset storage" onPress={() => clearStorage()} />
        <Button
          title="import firebase data"
          onPress={() => {
            importFirebase();
          }}
        />
        {/*<Button
        title="refresh fetch data"
        onPress={() => {
          getData();
        }}
      /> */}
        <Button title="update library" onPress={() => updateLibraryFetch()} />
        <Button
          title="reset default tags"
          onPress={() => resetGlobalTags(globalTags, globalResetTags)}
        />
        <Button
          title="console.log random album"
          onPress={() =>
            console.log(albums[Math.floor(Math.random() * albums.length)])
          }
        />
        {/* <Button
        title="clear global tags"
        onPress={() => handleGlobalTags([])}
      /> */}
        <Button
          title="Last.fm auth"
          onPress={() => setModalVisible(!modalVisible)}
        />
        {/* <Button title="log key" onPress={() => getValueFor("lfmauth")} /> */}
        <Button title="custom field" onPress={() => discogsAuth()} />
        <Button title="get key" onPress={() => getKey("oauth_token")} />
      </View>
    </View>
  );
}
