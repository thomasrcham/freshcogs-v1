import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

import AlbumPage from "./AlbumPage";
import AlbumTagsPage from "./AlbumTagsPage";
import TagsPage from "./TagsPage.js";
import TagsListDisplay from "./TagsListDisplay";

import styles from "./styles/style.js";

const Stack = createNativeStackNavigator();
export default function TagsPageContainer({
  albums,
  globalTags,
  handleGlobalTags,
  lastFMUser,
  storeListenEvents,
  LFMKey,
  requestOptions,
}) {
  const route = useRoute();

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
                  globalTags={globalTags}
                  lastFMUser={lastFMUser}
                  LFMKey={LFMKey}
                  requestOptions={requestOptions}
                  storeListenEvents={storeListenEvents}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="AlbumTagsPage">
              {(props) => (
                <AlbumTagsPage
                  {...props}
                  globalTags={globalTags}
                  handleGlobalTags={handleGlobalTags}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="List">
              {(props) => <TagsListDisplay {...props} albums={albums} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
