import { Dimensions, StyleSheet, Platform } from "react-native";

const mainWindowHeight = Dimensions.get("window").height * 1;
const windowWidth = Dimensions.get("window").width;
const buttonWidth = Dimensions.get("window").width * 0.3;
const searchBarWindowHeight = Dimensions.get("window").height * 0.08;
const filterBarWindowHeight = Dimensions.get("window").height * 0.05;
const topBarHeight = Dimensions.get("window").height * 0.11;

export default StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#D8DBE2",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    bottom: 0,
    height: mainWindowHeight,
  },
  mainPageContainer: { height: mainWindowHeight, width: windowWidth },
  header: {
    backgroundColor: "#124242",
    height: topBarHeight,
    justifyContent: "flex-end",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 20,
  },
  //album page
  wholeAlbumPage: {
    flex: 1,
    // flexDirection: "column",
    paddingTop: 50,
    padding: 20,
    backgroundColor: `black`,
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
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "grey",
    marginTop: 20,
    borderRadius: 5,
    minHeight: "25%",
  },
  albumDataDisplay: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },

  albumInfo: {
    paddingLeft: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  albumInfoArtist: {
    fontSize: 26,
    color: "white",
    fontStyle: "bold",
    // ...Platform.select({
    //   ios: { fontSize: 20 },
    //   android: { fontSize: 26 },
    //   default: { fontSize: 26 },
    // }),
  },
  albumInfoBasicText: {
    paddingTop: 3,
    // ...Platform.select({
    //   ios: { fontSize: 12 },
    //   android: { fontSize: 14 },
    //   default: { fontSize: 14 },
    // }),
  },
  albumOuterInfoBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 5,
  },
  albumLeftInfoBox: {
    width: "60%",
  },
  albumRightInfoBox: {
    paddingLeft: 10,
  },
  albumPagePressables: {
    padding: 10,
    paddingRight: 5,
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: `#dcdcdc`,
    borderRadius: 8,
    minHeight: "12%",
    alignItems: "center",
  },
  albumPageButtonsGrid: {
    padding: 20,
    flex: 1,
    alignContent: "space-around",
    justifyContent: "flex-end",
    width: windowWidth,
    position: "absolute",
    // ...Platform.select({
    //   ios: { bottom: 140 },
    //   android: { bottom: "12%" },
    //   default: { bottom: "12%" },
    // }),
  },
  albumPageButton: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
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
    backgroundColor: "#D8DBE2",
    padding: 20,
    paddingTop: 10,
  },
  frontPageImageGrid: {
    width: "50%",
    padding: 4,
    overflow: "hidden",
  },
  frontPageImage: {
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
  },
  frontPageTextBox: {
    marginTop: 3,
    flex: 3,
    justifyContent: "flex-start",
    backgroundColor: "#A07178",
    borderRadius: 5,
    borderColor: "#523129",
    borderWidth: 1,
    padding: 2,
  },
  frontPageText: {
    paddingLeft: 2,
    color: "white",
    ellipsizeMode: "tail",
  },
  collectionPageContainer: {
    backgroundColor: "black",
    padding: 0,
    marginBottom: 80,
  },
  collectionImageGrid: {
    width: "33%",
    overflow: "hidden",
  },
  collectionImage: {
    aspectRatio: 1,
    resizeMode: "contain",
    borderColor: "black",
    borderWidth: 2,
  }, //filter page
  filterButtonBox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 8,
  },
  buttons: {},
  filterPressable: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#3F7CAC",
    padding: 4,
    backgroundColor: "#DADADD",
    borderRadius: 3,
  }, //search bar
  searchBarcontainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    width: "100%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  searchBarInput: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  searchBarButtons: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  }, //results page
  resultsPageContainer: {
    backgroundColor: "#D8DBE2",
    width: "100%",
    bottom: 0,
  },
  searchBar: {
    height: searchBarWindowHeight,
    width: "100%",
    backgroundColor: "#040F0F",
  },
  filterBar: {
    height: Dimensions.get("window").height * 0.1,
    width: "100%",
    backgroundColor: "#040F0F",
  },
  resultsList: {}, //list page
  listContainer: {
    height: "100%",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    padding: 3,
    alignItems: "center",
    margin: 1,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: "#A07178",
    borderRadius: 5,
    borderColor: "#523129",
    borderWidth: 1,
  },
  listImageContainer: {
    resizeMode: "contain",
    width: "13%",
  },
  listImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    borderColor: "#523129",
    borderWidth: 2,
    borderRadius: 4,
  },
  listTitle: {
    fontSize: 16,
    paddingLeft: 5,
    overflow: "hidden",
    marginRight: 50,
    maxHeight: 40,
    color: "white",
  },
  //user page
  userPageContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    marginTop: 30,
    backgroundColor: "#D8DBE2",
  },
  userImageContainer: {
    padding: 10,
    width: "50%",
  },
  userTextContainer: {
    margin: 10,
    width: "50%",
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 5,
  },
  userImage: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: "#523129",
    borderRadius: 6,
  },
  userText: {
    color: "white",
    padding: 2,
    fontWeight: "bold",
  },
  discogsLinkText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 2,
    alignSelf: "flex-start",
    fontSize: 14,
  },
  tableContainer: {
    flex: 1,
    flexDirection: "column",
    width: "98%",
    alignSelf: "center",
    marginTop: 10,
    overflow: "scroll",
  },
  tableRow: {
    flexDirection: "row",
    borderWidth: 1,
    // height: 10,
  },
  tableCell: {
    width: "28%",
    paddingLeft: 2,
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
// listTitle: {
//   fontSize: 16,
//   paddingLeft: 5,
//   overflow: "hidden",
//   marginRight: 50,
//   maxHeight: 40,
// },
// });
