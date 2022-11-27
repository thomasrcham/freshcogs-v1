import { Dimensions, StyleSheet, Text, View } from "react-native";
import Footer from "./Footer";

function Search({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Collection Page</Text>
    </View>
  );
}

const footerWindowHeight = Dimensions.get("window").height * 0.08;
const windowWidth = Dimensions.get("window").width;

export default Search;

const styles = StyleSheet.create({
  footerContainer: {
    height: footerWindowHeight,
    width: windowWidth,
    position: "absolute",
    left: 0,
    bottom: -5,
    right: 0,
    overflow: "visible",
  },
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    padding: 20,
    width: "100%",
    height: "100%",
  },
});
