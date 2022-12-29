import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumPage from "./AlbumPage";
import AlbumTagsPage from "./AlbumTagsPage";
import Collection from "./Collection";
import styles from "./styles/style.js";

const Stack = createNativeStackNavigator();
export default function CollectionDisplayArea({
  albums,
  allAlbums,
  globalTags,
  handleGlobalTags,
  storeListenEvents,
  randomArray,
  requestOptions,
  LFMKey,
}) {
  return (
    <View>
      <View style={styles.mainPageContainer}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            backBehavior="none"
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Collection"
          >
            <Stack.Screen name="Collection">
              {(props) => (
                <Collection
                  {...props}
                  albums={albums}
                  randomArray={randomArray}
                  allAlbums={allAlbums}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="AlbumPage" options={{ title: "My home" }}>
              {(props) => (
                <AlbumPage
                  {...props}
                  globalTags={globalTags}
                  LFMKey={LFMKey}
                  requestOptions={requestOptions}
                  storeListenEvents={storeListenEvents}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="AlbumTagsPage" options={{ animation: "none" }}>
              {(props) => (
                <AlbumTagsPage
                  {...props}
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
