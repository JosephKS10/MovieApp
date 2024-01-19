import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

const SearchScreen = ({ route, navigation }) => {
  const { searchQuery } = route.params || {};
  const [search, setSearch] = useState(searchQuery || '');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      // If searchText is available (coming from HomeScreen), perform the initial search
      handleSearch();
    }
  }, [searchQuery]);

  const handleSearch = () => {
    // Set loading to true when starting the search
    setLoading(true);

    // Fetch data from TVMaze API based on the search term
    axios.get(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      })
      .finally(() => {
        // Set loading to false when the search is complete
        setLoading(false);
      });
  };

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item })}>
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.show.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar
          placeholder="Search movies..."
          onChangeText={(text) => setSearch(text)}
          value={search}
          lightTheme
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          onSubmitEditing={handleSearch}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : searchResults.length > 0 ? (
          <>
            <Text style={styles.heading}>Search Results</Text>
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.show.id.toString()}
              renderItem={renderSearchItem}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        ) : (
          <Text style={styles.noResults}>No results found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieContainer: {
    marginRight: 20,
    width: 150, // Increased width for larger tiles
  },
  thumbnail: {
    width: '100%',
    height: 200, // Increased height for larger thumbnails
    resizeMode: 'contain',
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 5,
  },
  title: {
    fontSize: 18, // Adjusted font size for the title
    fontWeight: 'bold',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInputContainer: {
    backgroundColor: 'white',
  },
  noResults: {
    fontSize: 18,
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 150,
  },
});

export default SearchScreen;
