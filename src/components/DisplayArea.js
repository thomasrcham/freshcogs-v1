import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FrontPage from "./Collection";
import AlbumPage from "./AlbumPage";
import Collection from "./Search";
import AuthTest from "./AuthTest";
import AuthReceive from "./AuthReceive";
import Footer from "./Footer";

const Stack = createNativeStackNavigator();
function DisplayArea({ albums, navigation }) {
  return (
    <View>
      <View style={styles.mainPageContainer}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="FrontPage"
          >
            <Stack.Screen name="AuthTest" component={AuthTest} />
            <Stack.Screen name="AuthReceive" component={AuthReceive} />
            <Stack.Screen name="FrontPage">
              {(props) => <FrontPage {...props} albums={albums} />}
            </Stack.Screen>
            <Stack.Screen name="Collection" component={Collection} />
            <Stack.Screen name="AlbumPage" component={AlbumPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <View style={styles.footerContainer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const mainWindowHeight = Dimensions.get("window").height * 1.01;

const footerWindowHeight = Dimensions.get("window").height * 0.08;
const windowWidth = Dimensions.get("window").width;

export default DisplayArea;

const styles = StyleSheet.create({
  mainPageContainer: { height: mainWindowHeight, width: windowWidth },
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
