// import FrontPage from "./FrontPage";
// import { View, Text, StyleSheet } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
// import OtherPage from "./OtherPage";

// const Stack = createNativeStackNavigator();

// function MainWindow({ albums }) {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* <View style={styles.container} key={"container"}> */}
//         <Stack.Screen name="FrontPage">
//           {(props) => <FrontPage {...props} albums={albums} />}
//         </Stack.Screen>
//         <Stack.Screen name="OtherPage" component={OtherPage} />
//         {/* <FrontPage albums={albums} /> */}
//         {/* <OtherPage /> */}
//         {/* </View> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default MainWindow;

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     backgroundColor: "pink",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: 50,
//     padding: 20,
//     width: "100%",
//     height: "100%",
//   },
// });
