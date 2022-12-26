import { Pressable, Text, View } from "react-native";

import TagsDecision from "./TagsDecision.js";
import NeedsTags from "./NeedsTags.js";

import styles from "./styles/style.js";

export default function TagsPage({ albums, globalTags, navigation }) {
  return (
    <View style={styles.tagsPageContainer}>
      <Text style={styles.tagsPageTitle}>Choose by Tag:</Text>
      <View style={styles.tagsDecisionContainer}>
        <TagsDecision albums={albums} globalTags={globalTags} />
      </View>
      <View
        style={{ flex: 2, backgroundColor: "green", marginBottom: 15 }}
      ></View>
      <Text style={styles.tagsPageTitle}>These Albums Need Tags:</Text>
      <View style={styles.needsTagsContainer}>
        <NeedsTags
          albums={albums}
          globalTags={globalTags}
          navigation={navigation}
        />
      </View>
    </View>
  );
}
