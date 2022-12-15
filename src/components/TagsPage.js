import { Pressable, Text, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import TagsDecision from "./TagsDecision.js";

import styles from "./styles/style.js";
export default function TagsPage({ albums, globalTags }) {
  return (
    <View style={styles.tagsPageContainer}>
      <View style={styles.tagsDecisionContainer}>
        <TagsDecision albums={albums} globalTags={globalTags} />
      </View>
      <View
        style={{ flex: 2, backgroundColor: "green", marginBottom: 30 }}
      ></View>

      <View
        style={{ flex: 2, backgroundColor: "red", marginBottom: 15 }}
      ></View>
    </View>
  );
}
