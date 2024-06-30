import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Button, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function GenderScreen() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  const fetchGender = async () => {
    const response = await fetch(`https://api.genderize.io/?name=${name}`);
    const data = await response.json();
    setGender(data.gender);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFB6C1', dark: '#8B0000' }}
      headerImage={
        <Image
          source={require('@/assets/images/gender.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Predicción de Género</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={name}
          onChangeText={setName}
        />
        <Button title="Predecir" onPress={fetchGender} />
        {gender && (
          <ThemedView style={[styles.result, gender === 'male' ? styles.male : styles.female]}>
            <ThemedText type="defaultSemiBold">
              Género: {gender === 'male' ? 'Masculino' : 'Femenino'}
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
  },
  male: {
    backgroundColor: '#add8e6',
  },
  female: {
    backgroundColor: '#f6c6ea',
  },
  headerImage: {
    height: Dimensions.get('window').width * 0.7,
    width: Dimensions.get('window').width,
  },
});
