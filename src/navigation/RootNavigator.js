// src/navigation/RootNavigator.js

// rest of the import statement remains same
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";
import App from "../../App";

const linking = {
  prefixes: ["discogsapp://"],
};

const RootNavigator = () => {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator color="blue" size="large" />}
    >
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={App} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const RootStack = createNativeStackNavigator();

export default RootNavigator;
