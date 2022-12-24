import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserPage from "./UserPage";
import ListenEvents from "./ListenEvents";
import styles from "./styles/style.js";
import UserButtons from "./UserButtons";

const Stack = createNativeStackNavigator();
export default function UserPageContainer({
  albums,
  getData,
  setAlbums,
  storeAlbums,
  handleGlobalTags,
  globalTags,
  globalResetTags,
  setGlobalTags,
  setUser,
  listenEvents,
  requestOptions,
  user,
  updateLibraryFetch,
  storeListenEvents,
  setListenEvents,
  save,
  getValueFor,
  lastFMUsername,
  onChangelastFMUsername,
  lastFMPassword,
  onChangelastFMPassword,
  lastFMauth,
  lastFMUser,
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
                  getData={getData}
                  setAlbums={setAlbums}
                  setUser={setUser}
                  updateLibraryFetch={updateLibraryFetch}
                  globalTags={globalTags}
                  globalResetTags={globalResetTags}
                  handleGlobalTags={handleGlobalTags}
                  setGlobalTags={setGlobalTags}
                  storeListenEvents={storeListenEvents}
                  setListenEvents={setListenEvents}
                  save={save}
                  getValueFor={getValueFor}
                  lastFMUsername={lastFMUsername}
                  onChangelastFMUsername={onChangelastFMUsername}
                  lastFMPassword={lastFMPassword}
                  onChangelastFMPassword={onChangelastFMPassword}
                  lastFMauth={lastFMauth}
                  lastFMUser={lastFMUser}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ListenEvents">
              {(props) => <ListenEvents listenEvents={listenEvents} />}
            </Stack.Screen>
            <Stack.Screen name="Buttons">
              {(props) => (
                <UserButtons
                  listenEvents={listenEvents}
                  albums={albums}
                  requestOptions={requestOptions}
                  getData={getData}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
