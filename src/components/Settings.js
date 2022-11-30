import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({ albums, setAlbums }) {
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      setAlbums(jsonValue != null ? JSON.parse(jsonValue) : null);
      console.log("success");
    } catch (e) {
      // error reading value
    }
  };

  let display = albums ? albums[0].title : "None in state";

  return (
    <View>
      <Text>{display}</Text>
      <Button title="store album state" onPress={() => storeData(albums)} />
      <Button title="clear album state" onPress={() => setAlbums(null)} />
      <Button title="load from storage" onPress={() => getData()} />
      <Button title="clear local storage" onPress={() => storeData(null)} />
    </View>
  );
}
