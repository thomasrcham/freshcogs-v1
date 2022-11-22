import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerMain}>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => navigation.navigate("Collection")}>
            <Image
              style={styles.button}
              source={require("./icons/vinyl.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => navigation.navigate("AuthTest")}>
            <Image
              style={styles.button}
              source={require("./icons/music.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => navigation.navigate("AuthReceive")}>
            <Image
              style={styles.button}
              source={require("./icons/play-button.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <Image style={styles.button} source={require("./icons/user.png")} />
        </View>
        <View style={styles.buttonBox}>
          <Image style={styles.button} source={require("./icons/gear.png")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    overflow: "visible",
  },
  footerMain: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: `#f2dae7`,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  buttonBox: {
    flex: 1,
    alignItems: "center",
    bottom: 0,
    padding: "1%",
  },
  //   bigButtonBox: {
  //     flex: 1,
  //     alignItems: "center",
  //     justifyContent: "flex-end",
  //     bottom: 0,
  //     overflow: "visible",
  //     backgroundColor: "red",
  //   },
  button: {
    flex: 1,
    maxHeight: "90%",
    maxWidth: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  //   buttonBig: {
  //     flex: 1,
  //     maxHeight: "90%",
  //     maxHeight: "100%",
  //     maxWidth: undefined,
  //     overflow: "visible",
  //   },
});

export default Footer;
