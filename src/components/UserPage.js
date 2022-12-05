import { View, Image, Linking, Pressable, Text } from "react-native";
import { format } from "date-fns";
import styles from "./styles/style.js";

export default function UserPage({ user }) {
  const handleProfileClick = () => {
    let URL = `${user.uri}`;
    Linking.canOpenURL(URL).then((supported) => {
      if (supported) {
        Linking.openURL(URL);
      } else {
        console.log("Don't know how to open URI: " + URL);
      }
    });
  };
  return (
    <View style={styles.mainPageContainer}>
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
          <Pressable onPress={handleProfileClick} style={styles.userText}>
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
              Discogs Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
