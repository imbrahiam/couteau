import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Image, Dimensions } from 'react-native';
import axios from 'axios';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const HEADER_HEIGHT = Dimensions.get('window').width * 0.7;

const NewsScreen = () => {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=2fe65d1e59184d71a6bfc0b902b99abd'
        );
        setNews(response.data.articles.slice(0, 3)); // Show top 5 articles
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/news.jpg')} // Replace with your news image
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.container}>
        {news.map((article, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.description}>{article.description}</Text>
            <Text
              style={styles.readMore}
              onPress={() => Linking.openURL(article.url)}
            >
              Read More
            </Text>
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  readMore: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  headerImage: {
    height: HEADER_HEIGHT,
    width: Dimensions.get('window').width,
  },
});

export default NewsScreen;
