// Import necessary components
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './DetailsScreen';
import axios from 'axios';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from TVMaze API
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        // Set isLoading to false when data fetching is completed
        setIsLoading(false);
      });
  }, []);

  const handleSearchBarClick = () => {
    if (navigation) {
      navigation.navigate('Search', { searchQuery: search });
    }
  };

  const handleTilePress = (item) => {
    navigation.navigate('Details', { movie: item });
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTilePress(item)}>
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.show.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Display loading animation if isLoading is true
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
          onSubmitEditing={handleSearchBarClick}
        />
        <Text style={styles.heading}>Popular Movies</Text>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.show.id.toString()}
          renderItem={renderMovieItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
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
    fontSize: 18,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeStack;
