import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import TagsDecision from "./TagsDecision.js";
import NeedsTags from "./NeedsTags.js";

import styles from "./styles/style.js";
import TagsChoose3 from "./TagsChoose3.js";

export default function TagsPage({ albums, globalTags, navigation }) {
  const [displayedTags, setDisplayedTags] = useState(null);

  useEffect(() => {
    tagsDisplayArray();
  }, [globalTags]);

  function tagsDisplayArray() {
    let newArray = [];
    let tagsList = globalTags.filter((g) => g.id === 0)[0].tags;
    for (let i = 0; i < 15; i = newArray.length) {
      let newItem = tagsList[Math.floor(Math.random() * tagsList.length)];
      if (newArray.includes(newItem)) {
        null;
      } else {
        newArray.push(newItem);
      }
    }
    setDisplayedTags(newArray);
  }

  return (
    <View style={styles.tagsPageContainer}>
      <Text style={styles.tagsPageTitle}>Choose by Tag:</Text>
      <View style={styles.tagsDecisionContainer}>
        <TagsDecision
          albums={albums}
          globalTags={globalTags}
          navigation={navigation}
        />
      </View>
      <Text style={styles.tagsPageTitle}>Choose 3 and see what matches:</Text>
      <View style={styles.tagsSelectionContainer}>
        <TagsChoose3
          albums={albums}
          globalTags={globalTags}
          navigation={navigation}
          displayedTags={displayedTags}
        />
      </View>
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
