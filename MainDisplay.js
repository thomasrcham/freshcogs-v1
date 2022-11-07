import { View, ScrollView, Image, StyleSheet, Text } from "react-native";

function MainDisplay({ albums }) {
  // console.log(albums);
  return (
    <ScrollView key={"scroll"}>
      <View style={styles.container} key={"container"}>
        {albums.map((a) => {
          return (
            <>
              <View style={styles.imageGrid} key={a.id}>
                <Image
                  source={{ uri: a.uri }}
                  style={styles.image}
                  key={a.title}
                />
                <Text key={a.id + "text"}>{a.title}</Text>
              </View>
            </>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default MainDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 80,
    padding: 20,
    width: "100%",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "contain",
  },
  imageGrid: {
    width: "50%",
    padding: 10,
  },
  text: {
    textAlign: "center",
  },
});
