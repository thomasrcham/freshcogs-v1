import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
// import Home from "./components/Home";

export default function App() {
  const [text, setText] = useState("Hallo");
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button onPress={() => setText("You clicked the button")}>
        Click me
      </Button>
    </View>
  );
  // return <Home />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
