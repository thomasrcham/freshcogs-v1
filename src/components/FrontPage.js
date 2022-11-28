import { StyleSheet, Text, View } from "react-native";

export default function FrontPage() {
  return (
    <View style={styles.container}>
      <Text>Front Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    padding: 20,
    width: "100%",
    height: "100%",
  },
});
