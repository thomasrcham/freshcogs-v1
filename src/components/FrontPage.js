import { View, ScrollView, Image, StyleSheet, Text } from "react-native";

function FrontPage({ albums }) {
  return (
    <ScrollView key={"scroll"}>
      <View style={styles.container}>
        {albums ? (
          albums.map((a) => {
            return (
              <View style={styles.imageGrid} key={a.id}>
                <Image
                  source={{ uri: a.uri }}
                  style={styles.image}
                  key={a.title}
                />
                <Text key={a.id + "text"}>{a.title}</Text>
              </View>
            );
          })
        ) : (
          <Text>no albums</Text>
        )}
      </View>
    </ScrollView>
  );
}

export default FrontPage;

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
  imageGrid: {
    width: "50%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    height: 220,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "#878684",
    borderWidth: 2,
    borderRadius: 4,
  },
  text: {
    textAlign: "center",
  },
});
