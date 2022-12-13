import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumPage from "./AlbumPage";
import AlbumTagsPage from "./AlbumTagsPage";
import Collection from "./Collection";
import styles from "./styles/style.js";

const Stack = createNativeStackNavigator();
export default function CollectionDisplayArea({ albums }) {
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
              {(props) => <Collection {...props} albums={albums} />}
            </Stack.Screen>
            <Stack.Screen name="AlbumPage" component={AlbumPage} />

            <Stack.Screen name="AlbumTagsPage" component={AlbumTagsPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
