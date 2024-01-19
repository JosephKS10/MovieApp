import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params || {};
  const navigation = useNavigation();

  if (!movie) {
    // Handle the case where movie is undefined
    return <Text>No movie details available</Text>;
  }
  
  const show = movie.show;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: show.image?.original }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>Start Watching</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{show.name}</Text>
        <Text style={styles.subTitle}>{show.type} - {show.language}</Text>
        <Text style={styles.genres}>{show.genres.join(', ')}</Text>
        <Text>Status: {show.status}</Text>
        <Text>Runtime: {show.runtime} minutes</Text>
        <Text>Premiere Date: {show.premiered}</Text>
        <Text>Average Rating: {show.rating?.average}</Text>
        <Text>Network: {show.network?.name} ({show.network?.country?.name})</Text>
        {show.officialSite && (
          <Text style={styles.link} onPress={() => Linking.openURL(show.officialSite)}>
            Official Site
          </Text>
        )}
        <Text style={styles.summary}>{show.summary.replace(/<[^>]*>/g, '')}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
  },
  genres: {
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  summary: {
    marginTop: 10,
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailsScreen;
