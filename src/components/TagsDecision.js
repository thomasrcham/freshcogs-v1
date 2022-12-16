import { Button, Pressable, Text, View } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles/style.js";

export default function TagsDecision({ albums, globalTags }) {
  const [decisionAlbums, setDecisionAlbums] = useState(albums);
  const [tagDecisionList, setTagDecisionList] = useState([]);
  const [chosenTags, setChosenTags] = useState([]);

  useEffect(() => {
    randomArray();
  }, []);

  function randomArray() {
    let newArray = [];
    let tagsList = globalTags.filter((g) => g.id === 0)[0].tags;
    for (let i = 0; i < 14; i = newArray.length) {
      let newItem = tagsList[Math.floor(Math.random() * tagsList.length)];
      if (newArray.includes(newItem)) {
        null;
      } else {
        newArray.push(newItem);
      }
    }
    setTagDecisionList(newArray);
  }

  function handleMadeDecision(click) {
    let newChosenTags = [
      ...chosenTags,
      click._dispatchInstances.memoizedProps.value,
    ];
    console.log(newChosenTags);
    setChosenTags(newChosenTags);
    let newDecisionList = tagDecisionList.slice(2, tagDecisionList.length);
    setTagDecisionList(newDecisionList);

    // TODO: filter albums list
    // TODO: send to results page
    // TODO: display results page
  }

  function skip() {
    let newDecisionList = tagDecisionList.slice(2, tagDecisionList.length);
    setTagDecisionList(newDecisionList);
  }

  function seeTheList() {
    console.log("see the list");
  }

  return (
    <View style={styles.tagsDecisionWindowTotal}>
      <View style={styles.tagsDecisionWindowUpper}>
        <View style={styles.tagsDecisionRowUpper}>
          <Pressable
            title="tagDecisionList 2"
            value={tagDecisionList[0]}
            onPress={(value) => handleMadeDecision(value)}
          >
            <View style={styles.tagsDecisionButtonUpper}>
              <Text style={{ flex: 1 }}></Text>
              <Text style={styles.tagsDecisionText}>{tagDecisionList[0]}</Text>
              <Text style={{ flex: 1 }}></Text>
            </View>
          </Pressable>
        </View>
        <Text style={{ alignSelf: "center", borderwidth: 1 }}>or</Text>
        <View style={styles.tagsDecisionRowUpper}>
          <Pressable
            title="tagDecisionList 1"
            value={tagDecisionList[1]}
            onPress={(value) => handleMadeDecision(value)}
          >
            <View style={styles.tagsDecisionButtonUpper}>
              <Text style={{ flex: 1 }}></Text>
              <Text style={styles.tagsDecisionText}>{tagDecisionList[1]}</Text>
              <Text style={{ flex: 1 }}></Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.tagsDecisionWindowLower}>
        <View style={styles.tagsDecisionRowLower}>
          <Pressable title="skip" onPress={() => skip()}>
            <View style={styles.tagsDecisionButtonLower}>
              <Text style={{ flex: 1 }}></Text>
              <Text style={styles.tagsLowerDecisionText} adjustsFontSizeToFit>
                SKIP
              </Text>
              <Text style={{ flex: 1 }}></Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.tagDecisionRemaining}>
          <Text style={styles.tagDecisionRemainingText}>ALBUMS</Text>
          <Text style={styles.tagDecisionRemainingText}>REMAINING:</Text>
          <Text style={styles.tagDecisionRemainingText}>
            {decisionAlbums.length}
          </Text>
        </View>
        <View style={styles.tagsDecisionRowLower}>
          <Pressable title="see the list" onPress={() => seeTheList()}>
            <View style={styles.tagsDecisionButtonLower}>
              <Text style={{ flex: 1 }}></Text>
              <Text style={styles.tagsLowerDecisionText} adjustsFontSizeToFit>
                SEE THE LIST
              </Text>
              <Text style={{ flex: 1 }}></Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
