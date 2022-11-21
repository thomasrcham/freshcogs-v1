import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import FrontPage from "./FrontPage";
import Footer from "./Footer";

function MainDisplay({ albums }) {
  return (
    <View
      style={{ position: "relative", height: Dimensions.get("window").height }}
    >
      <View>
        <Text>words</Text>
      </View>
      <View style={styles.mainPageContainer}>
        {albums ? <FrontPage albums={albums} /> : null}
      </View>
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}

const mainWindowHeight = Dimensions.get("window").height * 0.92;
const footerWindowHeight = Dimensions.get("window").height * 0.08;

export default MainDisplay;

const styles = StyleSheet.create({
  mainPageContainer: { height: mainWindowHeight },
  footerContainer: {
    height: footerWindowHeight,
    position: "absolute",
    left: 0,
    bottom: -10,
    right: 0,
    overflow: "visible",
  },
});
