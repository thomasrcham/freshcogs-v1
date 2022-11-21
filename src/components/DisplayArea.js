import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FrontPage from "./FrontPage";
import AlbumPage from "./AlbumPage";
import Collection from "./Collection";

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
            <Stack.Screen name="FrontPage">
              {(props) => <FrontPage {...props} albums={albums} />}
            </Stack.Screen>
            <Stack.Screen name="Collection" component={Collection} />
            <Stack.Screen name="AlbumPage" component={AlbumPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const mainWindowHeight = Dimensions.get("window").height * 1.01;
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
});
