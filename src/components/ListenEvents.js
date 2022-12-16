import { format } from "date-fns";
import { View, Text, FlatList } from "react-native";
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
        />
      </View>
    </>
  );
}
