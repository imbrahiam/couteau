import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Button, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AgeScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState<any>('');

  const fetchAge = async () => {
    const response = await fetch(`https://api.agify.io/?name=${name}`);
    const data = await response.json();
    setAge(data.age);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFE4B5', dark: '#8B4513' }}
      headerImage={
        <Image
          source={require('@/assets/images/age.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Predicción de Edad</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={name}
          onChangeText={setName}
        />
        <Button title="Predecir" onPress={fetchAge} />
        {age && (
          <ThemedView style={styles.result}>
            <ThemedText type="defaultSemiBold">Edad: {age}</ThemedText>
            <ThemedText>
              {age < 18 ? 'Joven' : age < 60 ? 'Adulto' : 'Anciano'}
            </ThemedText>
          </ThemedView>
        )}
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
  result: {
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#e9ecef',
  },
  headerImage: {
    height: Dimensions.get('window').width * 0.7,
    width: Dimensions.get('window').width,
  },
});
