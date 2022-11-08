import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig.js";
import { Button, View, Alert } from "react-native";
import { useState } from "react";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function TestButton() {
  const [albums, setAlbums] = useState(null);

  function getData() {
    fetch(
      `https://api.discogs.com/users/theyear1000/collection/folders/0/releases?per_page=500${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        let returnData = data.releases;
        setAlbums(returnData);
      })
      .then(Alert.alert(null, "Fetch Complete"));
  }

  async function addData() {
    await albums.map((album) =>
      setDoc(doc(db, "albums", `${album.basic_information.id}`), {
        title: album.basic_information.title,
        master_url: album.basic_information.master_url,
      })
    );
  }
  return (
    <View style={{ paddingTop: 100 }}>
      <Button value="test" title="test" onPress={() => getData()} />
      <Button value="test" title="test" onPress={() => addData()} />
    </View>
  );
}

export default TestButton;
