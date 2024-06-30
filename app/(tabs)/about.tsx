import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AboutScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFD700', dark: '#8B8000' }}
      headerImage={
        <Image
          source={require('@/assets/images/about.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <Image source={require('@/assets/images/ppf.png')} style={styles.image} />
        <ThemedText type="title">Acerca de mí</ThemedText>
        <ThemedText>Nombre: Brahiam Montero</ThemedText>
        <ThemedText>Email: 20222034@itla.edu.do</ThemedText>
        <ThemedText>Teléfono: +8099622004</ThemedText>
        <ThemedText>Descripción: Software Developer</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  headerImage: {
    height: Dimensions.get('window').width * 0.7,
    width: Dimensions.get('window').width,
  },
});
