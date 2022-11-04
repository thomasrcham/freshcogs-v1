import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import "./keys.js";

import { NavigationContainer } from "@react-navigation/native";
// import Home from "./components/Home";

export default function App() {
  const [albums, setAlbums] = useState(albumsList);


let albumsList = [
    {
      artist: "Radiohead",
      title: "In Rainbows",
      cover: "https://i.discogs.com/8wHYeJHpnyK0eb7A68y417FWTa9GdLjSW9gr4bMvY5E/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNTg3/NTEtMTIwMDU4OTA5/Ni5qcGVn.jpeg"
    },
    {
      artist: "Hundred Waters",
      title: "Communicating",
      cover: "https://i.discogs.com/5ZIEU_w50nMmlUeLwQ_iIVmmStkMzjSZflAW6DscPis/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMDky/MDgzLTE1MDk3MTcz/MTAtMjc5MS5qcGVn.jpeg"
    },
    {
      artist: "Public Service Broadcasting",
      title: "White Star Liner",
      cover: "https://i.discogs.com/2eDyGvKU3BSerd6ZZ8IDOHLB5G4mMakpb5kSDjIs1uE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyODk5/NTMxLTE1NDQxMjE2/MDgtNjg4OS5qcGVn.jpeg"
    },
    {
      artist: "Big Red Machine (2)",
      title: "How Long Do You Think It's Gonna Last?",
      cover: "https://i.discogs.com/W3ElzN60W9kzNz4ruD8VQDZ6h4cNQtxqGeuI3x9-Vgs/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIxMjU4/NjQzLTE2Mzg4NTg1/OTMtNzE0NS5qcGVn.jpeg"
    },
    {
      artist: "Beirut",
      title: "Gallipoli",
      cover: "https://i.discogs.com/8VZtPPH_lCv1I2OBk4ouWaSl3zzQAL8aZlvGR44Z3BU/rs:fit/g:sm/q:90/h:599/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMTU4/MDM2LTE1NDk0MDYw/MjctMzMwNy5qcGVn.jpeg"
    },
    {
      artist: "The National",
      title: "I Am Easy To Find",
      cover: "https://i.discogs.com/1KT9-N4l2psQYhiiaDjlkOnFyZrZHh6m0RT3aEs2da0/rs:fit/g:sm/q:90/h:603/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNzgw/NDM2LTE2NjI0MDUw/MzUtMjY0Ni5qcGVn.jpeg"
    },
    {
      artist: "The Mountain Goats",
      title: "Tallahassee",
      cover: "https://i.discogs.com/ag8C4otK6iDi6qcvlUPqM-np3iqfxlg_577HItvGHFk/rs:fit/g:sm/q:90/h:602/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMTUw/OTMtMTY0NTIyMDIw/NS00ODkyLmpwZWc.jpeg"
    },
    {
      artist: "The Mountain Goats",
      title: "We Shall All Be Healed",
      cover: "https://i.discogs.com/79MQgftMq4o9uRWUY2v7HUTbjajfV_dfvxL8yUBYDUE/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTg0OTYx/NzktMTQ2Mjc3NDA5/MS01NjA2LmpwZWc.jpeg"
    },
    {
      artist: "The Mountain Goats",
      title: "The Sunset Tree",
      cover: "https://i.discogs.com/HcrVt0sA-G6bO0egu7_-U06f8aipVQnojVNpTBWzDsI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMzc5/NTUtMTYzMTgzMTI2/MS01NjY2LmpwZWc.jpeg"
    },
    {
      artist: "The Mountain Goats",
      title: "Get Lonely",
      cover: "https://i.discogs.com/tZ4m_lAdDHCpl52rKR1tP8SsrtPlnLVmGm3GAtmnjqQ/rs:fit/g:sm/q:90/h:580/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNjQ1/NDItMTU2MzQ0ODkx/OC0zODU0LmpwZWc.jpeg"
    },
    {
      artist: "The Mountain Goats",
      title: "The Life Of The World To Come",
      cover: "https://i.discogs.com/mBIltGKsFsQiEl8BniFgcwdI3ev2YwR_Zq3YBegELrU/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5ODgw/MTMtMTI2MDc0MTMz/MS5qcGVn.jpeg"
    },
    {
      artist: "The National",
      title: "High Violet",
      cover: "https://i.discogs.com/2VYkuaO775JRIJuw6rsEo7MzFJjVDx7YJELRF5W8RlA/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMDg2/NDIyLTE1Mzg2ODQx/NDktNDM5NS5qcGVn.jpeg"
    },
    {
      artist: "tUnE-yArDs",
      title: "w h o k i l l",
      cover: "https://i.discogs.com/-6-UFrLthuPofGK4hh1X07FuU9GZqAiJPgW06Tr1mFE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5MTEw/OTQ2LTE2NDQzMjU0/NDQtNDYyMC5qcGVn.jpeg"
    },
    {
      artist: "Grimes (4)",
      title: "Art Angels",
      cover: "https://i.discogs.com/rXYQFXsbJEp5Vb9mM-McGW2_xd23sFEgRaINqRc9NvQ/rs:fit/g:sm/q:90/h:606/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4OTYy/Njc3LTE2MjI0OTAz/ODctMjEyNS5qcGVn.jpeg"
    },
    {
      artist: "Various",
      title: "Dark Was The Night",
      cover: "https://i.discogs.com/zB65XI4_DkmsEQBM9Wgh87EU7k200nuCcEwp9bmajn4/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2NjU3/NTItMTIzNTUxOTYw/My5qcGVn.jpeg"
    },
    {
      artist: "The Mountain Goats",
      title: "Heretic Pride",
      cover: "https://i.discogs.com/VM9i1SJ2rrZdcJCk_AK66zOZGa03ylg5flCcGaklmz8/rs:fit/g:sm/q:90/h:601/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4MDY5/NDUxLTE2MTcxMjgz/NTctODg1OS5qcGVn.jpeg"
    },
    {
      artist: "Joe Cocker",
      title: "With A Little Help From My Friends",
      cover: "https://i.discogs.com/NpRMHlLNdUS3czDXrGQeg-M-cmZlPPBMj01Es6GKW-k/rs:fit/g:sm/q:90/h:606/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ5NzI2/MDUtMTM4MTAwNjAx/Ni00NzUxLmpwZWc.jpeg"
    },
    {
      artist: "Janet Jackson",
      title: "Rhythm Nation 1814",
      cover: "https://i.discogs.com/SolVtlLYEP2JaAxwT1rWBf1xgm68WLhFvQ5APTJozgM/rs:fit/g:sm/q:90/h:556/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzOTE3/MTcwLTE1NjQ3NzYz/MDctNDc2MS5qcGVn.jpeg"
    },
    {
      artist: "Gillian Welch",
      title: "The Harrow & The Harvest",
      cover: "https://i.discogs.com/6oXVbct8yT3Rr99Q08hmL676uDWPufAN3OHWvOlZc6c/rs:fit/g:sm/q:90/h:564/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNjE4/OTgzLTE1MDEwNjU3/OTMtNjcxNy5qcGVn.jpeg"
    },
    {
      artist: "Little Simz",
      title: "Sometimes I Might Be Introvert",
      cover: "https://i.discogs.com/HRERhfbmmtWX7INggxMCwxs1EdGjIfUj6VEWF-cc3EM/rs:fit/g:sm/q:90/h:593/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwMTYy/MzgwLTE2NDMxMzg1/MjMtMzIyMS5qcGVn.jpeg"
    },
    {
      artist: "Steve Reich",
      title: "Tokyo Opera City, 21.5.2008",
      cover: "https://i.discogs.com/mLqQpkGl5RwlRyNq5HVYOyE7ZqmM9TAkSvUq8CLR5vU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0NDY1/MTkwLTE1NzUwODI0/MDItMjAwMi5qcGVn.jpeg"
    },
    {
      artist: "Frédéric Chopin",
      title: "Études Op. 10 And Allegro De Concert Op. 46",
      cover: "https://i.discogs.com/FxJWIcW6PHUdnNGbCK6M9kp5R8I9s6ndVSWLIGEz5XM/rs:fit/g:sm/q:90/h:590/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY3MTA0/MjQtMTQ0NDg1NDYz/OC04MTczLmpwZWc.jpeg"
    },
    {
      artist: "Neko Case",
      title: "Fox Confessor Brings The Flood",
      cover: "https://i.discogs.com/LwFUvxB0KXgrDXcFAJ_1j72MpFpO1bhSH827z3wvF_I/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNDE1/NzQ5LTE1Mjk1MDc0/NTItMTQ4NC5qcGVn.jpeg"
    },
    {
      artist: "Neko Case",
      title: "Blacklisted",
      cover: "https://i.discogs.com/ia2Jq2JHJyxcRGFtXmrzf8183WX1plZePh9vARKfFiI/rs:fit/g:sm/q:90/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTg4ODkw/NTctMTQ3MDg1NjAz/My05MTAzLmpwZWc.jpeg"
    },
    {
      artist: "Fleet Foxes",
      title: "Shore",
      cover: "https://i.discogs.com/j8YGK7RMO9Ym4X5oXOAoswowDIu4O9jZOc7XGLJi6Mo/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3ODYx/MzI5LTE2MjgxMzk2/MTMtNjk5MC5qcGVn.jpeg"
    }
]


  return (
    <View style={styles.container}> 
{/* <ScrollView>{albumsList.map((a)=>{return (<View><Text>{a.title}</Text></View>)})}</ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
