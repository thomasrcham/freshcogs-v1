import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Footer from "./Footer";
import MainWindow from "./MainWindow";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OtherPage from "./OtherPage";
import FrontPage from "./FrontPage";

const Stack = createNativeStackNavigator();
function DisplayArea({ albums }) {
  return (
    <View
      style={{ position: "relative", height: Dimensions.get("window").height }}
    >
      <View>
        <Text>words</Text>
      </View>
      <View style={styles.mainPageContainer}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="FrontPage"
          >
            <Stack.Screen name="FrontPage">
              {(props) => <FrontPage {...props} albums={albums} />}
            </Stack.Screen>
            <Stack.Screen name="OtherPage" component={OtherPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}

const mainWindowHeight = Dimensions.get("window").height * 0.93;
const footerWindowHeight = Dimensions.get("window").height * 0.08;
const windowWidth = Dimensions.get("window").width;

export default DisplayArea;

const styles = StyleSheet.create({
  mainPageContainer: { height: mainWindowHeight, width: windowWidth },
  footerContainer: {
    height: footerWindowHeight,
    width: windowWidth,
    position: "absolute",
    left: 0,
    bottom: -5,
    right: 0,
    overflow: "visible",
  },
});
