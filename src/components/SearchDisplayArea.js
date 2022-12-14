import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumPage from "./AlbumPage";
import AlbumTagsPage from "./AlbumTagsPage";
import FindPage from "./FindPage";
import styles from "./styles/style.js";

const Stack = createNativeStackNavigator();
export default function SearchDisplayArea({
  albums,
  globalTags,
  handleGlobalTags,
}) {
  return (
    <View>
      <View style={styles.mainPageContainer}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Search"
          >
            <Stack.Screen name="Search">
              {(props) => <FindPage {...props} albums={albums} />}
            </Stack.Screen>
            <Stack.Screen name="AlbumPage">
              {(props) => (
                <AlbumPage {...props} albums={albums} globalTags={globalTags} />
              )}
            </Stack.Screen>
            <Stack.Screen name="AlbumTagsPage">
              {(props) => (
                <AlbumTagsPage
                  {...props}
                  albums={albums}
                  globalTags={globalTags}
                  handleGlobalTags={handleGlobalTags}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
