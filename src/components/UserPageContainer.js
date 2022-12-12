import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserPage from "./UserPage";
import ListenEvents from "./ListenEvents";
import styles from "./styles/style.js";

const Stack = createNativeStackNavigator();
export default function UserPageContainer({
  albums,
  storeAlbums,
  listenEvents,
  requestOptions,
  user,
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
            <Stack.Screen name="UserPage">
              {(props) => (
                <UserPage
                  user={user}
                  albums={albums}
                  storeAlbums={storeAlbums}
                  requestOptions={requestOptions}
                  listenEvents={listenEvents}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ListenEvents">
              {(props) => <ListenEvents listenEvents={listenEvents} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
