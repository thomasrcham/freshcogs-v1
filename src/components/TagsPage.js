import { Pressable, Text, View } from "react-native";

import TagsDecision from "./TagsDecision.js";
import NeedsTags from "./NeedsTags.js";

import styles from "./styles/style.js";

export default function TagsPage({ albums, globalTags, navigation }) {
  return (
    <View style={styles.tagsPageContainer}>
      <View style={styles.tagsDecisionContainer}>
        <TagsDecision albums={albums} globalTags={globalTags} />
      </View>
      <View
        style={{ flex: 2, backgroundColor: "green", marginBottom: 30 }}
      ></View>

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
