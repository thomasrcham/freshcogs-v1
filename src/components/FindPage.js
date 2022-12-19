import { Pressable, Text, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import Filters from "./Filters";
import styles from "./styles/style.js";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function FindPage({ albums, navigation }) {
  const [clicked, setClicked] = useState(false);
  const [viewClick, setViewClick] = useState(0);

  const [searchPhrase, setSearchPhrase] = useState(null);

  const [sortSelector, setSortSelector] = useState("none");
  const [decadeFilter, setDecadeFilter] = useState(null);

  const [localAlbums, setLocalAlbums] = useState(null);

  const listRef = useRef(null);

  console.log(navigation);

  useEffect(() => {
    setLocalAlbums(albums);
  }, [albums]);

  useEffect(() => {
    displayList();
  }, [searchPhrase, sortSelector, decadeFilter]);

  function handleClear() {
    setLocalAlbums(albums);
    setSearchPhrase(null);
  }

  function handleSort(sortTerm) {
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
    let decadeAlbums = decadeFilter
      ? handleDecadeFilter(searchedAlbums, decadeFilter)
      : searchedAlbums;

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
            handleClear={handleClear}
          />
        </View>
        <View style={styles.filterBar}>
          <Filters
            clicked={clicked}
            setClicked={setClicked}
            handleDecade={handleDecade}
            handleSort={handleSort}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            viewClick={viewClick}
            setViewClick={setViewClick}
          />
        </View>
        <Text>
          {searchPhrase ? "Searching ✪ " : null}
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
