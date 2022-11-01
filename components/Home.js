import Buttons from "./Buttons";
// import Main from "./Main";
// import Random from "./Random";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Home({}) {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <View className="header">
        <button value="Main" onClick={() => navigation.navigate("Main")}>
          Home
        </button>
        <button value="Random" onClick={() => navigation.navigate("Random")}>
          Random
        </button>
        {/* <Buttons navigation={navigation} handleNavigation={handleNavigation} />; */}
      </View>
      <View style={styles.mainWindow}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Random" component={Random} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}

function Random() {
  return "Random";
}

function Main() {
  return "Main";
}

const styles = StyleSheet.create({
  mainWindow: {
    flex: 1,
    marginTop: "10%",
    backgroundColor: "#4287f5",
  },
});
