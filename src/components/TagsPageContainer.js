import TagsPage from "./TagsPage.js";

import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumPage from "./AlbumPage";
import AlbumTagsPage from "./AlbumTagsPage";
import styles from "./styles/style.js";

const Stack = createNativeStackNavigator();
export default function TagsPageContainer({
  albums,
  globalTags,
  handleGlobalTags,
  storeListenEvents,
}) {
  return (
    <View>
      <View style={styles.mainPageContainer}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="TagsPage"
          >
            <Stack.Screen name="TagsPage">
              {(props) => (
                <TagsPage {...props} albums={albums} globalTags={globalTags} />
              )}
            </Stack.Screen>
            <Stack.Screen name="AlbumPage">
              {(props) => (
                <AlbumPage
                  {...props}
                  albums={albums}
                  globalTags={globalTags}
                  storeListenEvents={storeListenEvents}
                />
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
