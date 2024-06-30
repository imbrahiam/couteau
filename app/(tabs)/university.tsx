import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Button, FlatList, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function UniversityScreen() {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState<any>([]);

  const fetchUniversities = async () => {
    const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
    const data = await response.json();
    setUniversities(data);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/university.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Buscar Universidades</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el nombre del país"
          value={country}
          onChangeText={setCountry}
        />
        <Button title="Buscar" onPress={fetchUniversities} />
        <FlatList scrollEnabled={false}
          data={universities}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ThemedView style={styles.university}>
              <ThemedText style={styles.universityName}>{item.name}</ThemedText>
              <ThemedText style={styles.universityCountry}>{item.country}</ThemedText>
            </ThemedView>
          )}
        />
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
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '80%',
    borderRadius: 8,
  },
  university: {
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#e9ecef',
    width: '100%',
  },
  universityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  universityCountry: {
    fontSize: 14,
  },
  headerImage: {
    height: Dimensions.get('window').width * 0.7,
    width: Dimensions.get('window').width,
  },
});
