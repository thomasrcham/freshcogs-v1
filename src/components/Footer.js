import { StyleSheet, View, Text, Image } from "react-native";

function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.buttonBox}>
        <Image
          style={styles.button}
          source={require("./icons/circle-icon.png")}
        />
      </View>
      <View style={styles.buttonBox}>
        <Image
          style={styles.button}
          source={require("./icons/circle-icon.png")}
        />
      </View>
      <View style={styles.bigButtonBox}>
        <Image
          style={styles.buttonBig}
          source={require("./icons/circle-icon.png")}
        />
      </View>
      <View style={styles.buttonBox}>
        <Image
          style={styles.button}
          source={require("./icons/circle-icon.png")}
        />
      </View>
      <View style={styles.buttonBox}>
        <Image
          style={styles.button}
          source={require("./icons/circle-icon.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: `#fff`,
    // backgroundColor: `#99607e`,
    width: "100%",
    height: "100%",
  },
  buttonBox: {
    backgroundColor: "blue",
    flex: 1,
    alignItems: "center",
    bottom: 0,
    padding: "2%",
  },
  bigButtonBox: {
    backgroundColor: "blue",
    flex: 1,
    alignItems: "center",
    bottom: 0,
    overflow: "visible",
  },
  button: {
    flex: 1,
    maxHeight: "auto",
    maxWidth: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  buttonBig: {
    maxHeight: "120%",
    maxWidth: "150%",
    overflow: "visible",
  },
});

export default Footer;

{
  /* <Image
        style={styles.button}
        source={require("./icons/circle-icon.png")}
      />
      <Image
        style={styles.button}
        source={require("./icons/circle-icon.png")}
      />
      <Image
        style={styles.buttonBig}
        source={require("./icons/circle-icon.png")}
      />
      <Image
        style={styles.button}
        source={require("./icons/circle-icon.png")}
      />
      <Image
        style={styles.button}
        source={require("./icons/circle-icon.png")}
      /> */
}
