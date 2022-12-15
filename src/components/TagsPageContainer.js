import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TagsPage from "./TagsPage.js";
import styles from "./styles/style.js";

const Stack = createNativeStackNavigator();
export default function TagsPageContainer({ albums, globalTags }) {
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
            <Stack.Screen name="UserPage">
              {(props) => <TagsPage albums={albums} globalTags={globalTags} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
