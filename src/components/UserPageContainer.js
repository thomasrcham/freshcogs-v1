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
  lastFMUsername,
  onChangelastFMUsername,
  lastFMPassword,
  onChangelastFMPassword,
  lastFMauth,
  lastFMUser,
  LFMKey,
  lastFMUserFetch,
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
            initialRouteName="UserPage"
          >
            <Stack.Screen name="UserPage">
              {(props) => (
                <UserPage
                  albums={albums}
                  getData={getData}
                  listenEvents={listenEvents}
                  requestOptions={requestOptions}
                  setAlbums={setAlbums}
                  setUser={setUser}
                  storeAlbums={storeAlbums}
                  updateLibraryFetch={updateLibraryFetch}
                  user={user}
                  globalTags={globalTags}
                  globalResetTags={globalResetTags}
                  handleGlobalTags={handleGlobalTags}
                  setGlobalTags={setGlobalTags}
                  storeListenEvents={storeListenEvents}
                  setListenEvents={setListenEvents}
                  save={save}
                  lastFMUsername={lastFMUsername}
                  onChangelastFMUsername={onChangelastFMUsername}
                  lastFMPassword={lastFMPassword}
                  onChangelastFMPassword={onChangelastFMPassword}
                  lastFMauth={lastFMauth}
                  lastFMUser={lastFMUser}
                  lastFMUserFetch={lastFMUserFetch}
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
                  LFMKey={LFMKey}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
