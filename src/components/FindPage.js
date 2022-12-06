import {
  Button,
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import Filters from "./Filters";
import styles from "./styles/style.js";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function FindPage({ albums, folders, navigation, sectionList }) {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [localAlbums, setLocalAlbums] = useState(null);
  const [sortedAlbums, setSortedAlbums] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [folderFilter, setFolderFilter] = useState(null);
  const [sortSelector, setSortSelector] = useState("none");
  const [viewClick, setViewClick] = useState(0);
  const [decadeFilter, setDecadeFilter] = useState(null);
  const listRef = useRef(null);

  // albums ? console.log("findpage: " + albums.length) : console.log("no albums");
  // localAlbums
  //   ? console.log("findpage: " + localAlbums.length)
  //   : console.log("no local albums");

  useEffect(() => {
    setLocalAlbums(albums);
  }, [albums]);

  useEffect(() => {
    displayList();
  }, [searchPhrase, folderFilter, sortSelector, decadeFilter]);

  // function handleSearch(input) {
  //   setSearchTerm(input)
  // }

  function handleClear() {
    setLocalAlbums(albums);
    setSearchPhrase(null);
  }

  function handleFilter(input) {
    console.log("handlefilter");
    setFolderFilter(input);
  }

  function handleSort(sortTerm) {
    console.log(`${albums.length}, ${sortTerm}`);
    switch (sortTerm) {
      case "artist":
        function compareArtist(a, b) {
          if (a.artist < b.artist) {
            return -1;
          }
          if (a.artist > b.artist) {
            return 1;
          }
          return 0;
        }
        let artistArray = albums.sort(compareArtist);
        setLocalAlbums(artistArray);
        setSortSelector("Artist");
        break;
      case "date":
        function compareDate(a, b) {
          if (a.ISODate < b.ISODate) {
            return -1;
          }
          if (a.ISODate > b.ISODate) {
            return 1;
          }
          return 0;
        }
        let dateArray = albums.sort(compareDate);
        setLocalAlbums(dateArray);
        setSortSelector("Date Added");
        break;
      case "yearA":
        function compareYearAsc(a, b) {
          if (a.year < b.year) {
            return -1;
          }
          if (a.year > b.year) {
            return 1;
          }
          return 0;
        }
        let yearAscArray = albums.sort(compareYearAsc);
        setLocalAlbums(yearAscArray);
        setSortSelector("Year, Asc");
        break;
      case "yearD":
        function compareYearDesc(a, b) {
          if (a.year < b.year) {
            return 1;
          }
          if (a.year > b.year) {
            return -1;
          }
          return 0;
        }
        let yearDescArray = albums.sort(compareYearDesc);
        setLocalAlbums(yearDescArray);
        setSortSelector("Year, Desc");
        break;
      case "none":
        setLocalAlbums(albums);
        setSortSelector(null);
        break;
      default:
        setLocalAlbums(albums);
        setSortSelector(null);
    }
  }

  function handleDecade(decadeTerm) {
    setDecadeFilter(decadeTerm);
  }

  let listDisplay;

  const handleDecadeFilter = (filterAlbums) => {
    switch (decadeFilter) {
      case "pre-1950s":
        return filterAlbums.filter((a) => a.year < 1950);
      case "1950s & 1960s":
        return filterAlbums.filter((a) => a.year >= 1950 && a.year < 1970);
      case "1970s & 1980s":
        return filterAlbums.filter((a) => a.year >= 1970 && a.year < 1990);
      case "1990s & 2000s":
        return filterAlbums.filter((a) => a.year >= 1990 && a.year < 2010);
      case "2010s & 2020s":
        return filterAlbums.filter((a) => a.year >= 2010 && a.year < 2030);
      default:
        return filterAlbums;
    }
  };
  function displayList() {
    let searchedAlbums = searchPhrase
      ? (searchedAlbums = albums.filter(
          (a) =>
            String(a.title.toLowerCase()).includes(
              searchPhrase.toLowerCase()
            ) ||
            String(a.artist.toLowerCase()).includes(searchPhrase.toLowerCase())
        ))
      : albums;
    let filterAlbums = folderFilter
      ? searchedAlbums.filter((a) => a.folder === folderFilter)
      : searchedAlbums;
    let decadeAlbums = decadeFilter
      ? handleDecadeFilter(filterAlbums, decadeFilter)
      : filterAlbums;

    setLocalAlbums(decadeAlbums);
  }

  switch (sortSelector) {
    case "artist":
      listDisplay = (
        <List
          albums={albums}
          localAlbums={localAlbums}
          navigation={navigation}
          listRef={listRef}
          sectionList={sectionList}
        />
      );
      break;
    case "date":
      listDisplay = (
        <List
          albums={albums}
          localAlbums={localAlbums}
          navigation={navigation}
          listRef={listRef}
          sectionList={sectionList}
        />
      );
      break;
    case "Year, Desc":
    case "Year, Asc":
      listDisplay = (
        <List
          albums={albums}
          localAlbums={localAlbums}
          navigation={navigation}
          listRef={listRef}
          sectionList={sectionList}
        />
      );
      break;
    default:
      listDisplay = (
        <List
          albums={albums}
          localAlbums={localAlbums}
          navigation={navigation}
          listRef={listRef}
          sectionList={sectionList}
        />
      );
  }

  return (
    <View style={styles.mainPageContainer}>
      <View style={styles.resultsPageContainer}>
        <View style={styles.searchBar}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            // handleSearch={handleSearch}
            handleClear={handleClear}
          />
        </View>
        <View style={styles.filterBar}>
          <Filters
            clicked={clicked}
            folders={folders}
            setClicked={setClicked}
            handleDecade={handleDecade}
            handleFilter={handleFilter}
            folderFilter={folderFilter}
            setFolderFilter={setFolderFilter}
            handleSort={handleSort}
            // handleSearch={handleSearch}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            viewClick={viewClick}
            setViewClick={setViewClick}
            sectionList={sectionList}
          />
        </View>
        <Text>
          {searchPhrase ? "Searching ✪ " : null}
          {folderFilter ? `Folder: ${folderFilter} ✪ ` : null}
          {sortSelector ? `Sort: ${sortSelector} ✪ ` : null}
          {decadeFilter ? `${decadeFilter}` : null}
        </Text>
        <View style={styles.resultsList}>{listDisplay}</View>
      </View>
      <View style={styles.backButton}>
        <View>
          <Pressable
            onPress={() => {
              listRef.current.scrollToOffset({ offset: 0, animated: true });
            }}
          >
            <FontAwesome5 name="arrow-circle-up" size={32} color={"#3F7CAC"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
