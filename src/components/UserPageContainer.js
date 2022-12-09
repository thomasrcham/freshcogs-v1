import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserPage from "./UserPage";
import ListenEvents from "./ListenEvents";
import CameraPage from "./CameraPage";
import styles from "./styles/style.js";
import TFTestComponent from "./TFTestComponent";

const Stack = createNativeStackNavigator();
export default function UserPageContainer({
  albums,
  listenEvents,
  folders,
  requestOptions,
  handleStorage,
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
                  folders={folders}
                  requestOptions={requestOptions}
                  handleStorage={handleStorage}
                  listenEvents={listenEvents}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ListenEvents">
              {(props) => <ListenEvents listenEvents={listenEvents} />}
            </Stack.Screen>
            <Stack.Screen name="TFTestComponent">
              {(props) => <TFTestComponent />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
