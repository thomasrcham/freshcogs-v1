import { Dimensions, StyleSheet } from "react-native";

const mainWindowHeight = Dimensions.get("window").height * 0.95;
const windowWidth = Dimensions.get("window").width;
const buttonWidth = Dimensions.get("window").width * 0.3;

const topBarHeight = Dimensions.get("window").height * 0.06;

export default StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    bottom: 0,
    height: mainWindowHeight,
  },
  mainPageContainer: { height: mainWindowHeight, width: windowWidth },
  //album page
  wholeAlbumPage: {
    flex: 1,
    // flexDirection: "column",
    paddingTop: 50,
    padding: 20,
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "50%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "#878684",
    borderWidth: 2,
    borderRadius: 4,
  },
  albumDataContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "grey",
    marginTop: 20,
    borderRadius: 5,
  },
  albumInfo: {
    paddingLeft: 10,
    maxWidth: "60%",
    flexDirection: "column",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "white",
  },
  albumInfoBasicText: {
    paddingTop: 3,
  },
  albumPagePressables: {
    padding: 10,
    paddingRight: 5,
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: `#dcdcdc`,
    borderRadius: 8,
    minHeight: "10%",
  },
  backButton: {
    padding: 10,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: "12%",
    width: windowWidth,
  },
  //tab navigator
  tabButtonBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    padding: "1%",
  },
  tabButton: {
    flex: 1,
    maxHeight: "90%",
    maxWidth: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  //collection page
  albumDisplayContainer: {
    height: mainWindowHeight,
    width: windowWidth,
    // marginBottom: 100,
  },
  frontPageContainer: {
    backgroundColor: "pink",
    padding: 10,
    // paddingBottom: 200,
    // marginBottom: 80,
  },
  frontPageImageGrid: {
    width: "50%",
    padding: 10,
    // borderWidth: 1,
    borderColor: "black",
    height: 225,
    overflow: "hidden",
  },
  frontPageImage: {
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "#878684",
    borderWidth: 2,
    borderRadius: 4,
  },
  frontPageTextBox: {
    flex: 1,
    justifyContent: "flex-start",
  },
  frontPageText: {
    numberOfLines: 1,
    ellipsizeMode: "tail",
  },
  collectionPageContainer: {
    backgroundColor: "black",
    padding: 0,
    // paddingBottom: 200,
    marginBottom: 80,
  },
  collectionImageGrid: {
    width: "33%",
    // padding: 10,
    // borderWidth: 1,
    // borderColor: "black",
    // height: 225,
    overflow: "hidden",
  },
  collectionImage: {
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "black",
    borderWidth: 2,
    // borderRadius: 4,
  },
});

//
// Possibly deprecated styles
//   topBar: {
//     height: topBarHeight,
//     backgroundColor: "black",
//   },collectionContainer: {
//     backgroundColor: "black",
//     padding: 0,
//     // paddingBottom: 200,
//     marginBottom: 80,
//   },
//   text: {
//     textAlign: "center",
//   },
// });
