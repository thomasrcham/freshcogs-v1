import { format } from "date-fns";
import { StyleSheet, View, Text, FlatList } from "react-native";
import styles from "./styles/style.js";

const Item = ({ item, onPress }) => (
  <View style={styles.tableRow} key={item.id}>
    <View style={styles.tableCell}>
      <Text>{format(new Date(item.dateTime), "MM/dd/yyyy")}</Text>
    </View>
    <View style={styles.tableCell}>
      <Text>{item.artist}</Text>
    </View>
    <View style={styles.tableCell}>
      <Text>{item.title}</Text>
    </View>
  </View>
);

export default function ListenEvents({ listenEvents }) {
  console.log(listenEvents[0].dateTime);

  let tableHead = ["Date", "Artist", "Album"];
  let albumEvent = [];
  let tableData = listenEvents.map(
    (e) =>
      (albumEvent = {
        dateTime: e.dateTime,
        artist: e.album.artist,
        title: e.album.title,
      })
  );

  function compareDate(a, b) {
    if (a.dateTime < b.dateTime) {
      return -1;
    }
    if (a.dateTime > b.dateTime) {
      return 1;
    }
    return 0;
  }

  let sortedTableData = tableData.sort(compareDate);

  //   let tableRow = sortedTableData.map((row) => (
  //     <View style={styles.tableRow} key={row.id}>
  //       <View style={styles.tableCell}>
  //         <Text>{format(new Date(row.dateTime), "MM/dd/yyyy")}</Text>
  //       </View>
  //       <View style={styles.tableCell}>
  //         <Text>{row.artist}</Text>
  //       </View>
  //       <View style={styles.tableCell}>
  //         <Text>{row.title}</Text>
  //       </View>
  //     </View>
  //   ));

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };
  return (
    <>
      <View style={styles.tableContainer}>
        <FlatList
          style={styles.tableContainer}
          data={sortedTableData}
          renderItem={renderItem}
          keyExtractor={(item) => item.dateTime}
          extraData={sortedTableData}
          //   stickyHeaderIndices={[0]}
        />
      </View>
    </>
  );

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Date</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>Artist</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>Title</Text>
        </View>
      </View>
      {/* <View style={styles.tableRow} key={sortedTableData[0].id}>
        <View style={styles.tableCell}>
          <Text>
            {format(new Date(sortedTableData[0].dateTime), "MM/dd/yyyy")}
          </Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{sortedTableData[0].artist}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{sortedTableData[0].title}</Text>
        </View>
      </View> */}
      {tableRow}
    </View>
  );
}
