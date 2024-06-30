import ParallaxScrollThemedView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';

// Mapeo de los códigos WMO a descripciones legibles
const weatherCodeDescriptions: { [key: number]: string } = {
  0: 'Despejado',
  1: 'Principalmente despejado',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Niebla',
  48: 'Niebla con escarcha',
  51: 'Llovizna ligera',
  53: 'Llovizna moderada',
  55: 'Llovizna intensa',
  61: 'Lluvia ligera',
  63: 'Lluvia moderada',
  65: 'Lluvia intensa',
  66: 'Lluvia y aguanieve ligera',
  67: 'Lluvia y aguanieve intensa',
  71: 'Nieve ligera',
  73: 'Nieve moderada',
  75: 'Nieve intensa',
  80: 'Chubascos ligeros',
  81: 'Chubascos moderados',
  82: 'Chubascos intensos',
  95: 'Tormenta',
  96: 'Tormenta con granizo',
  99: 'Tormenta severa con granizo'
};

export default function WeatherScreen() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=18.7357&longitude=-70.1627&current_weather=true');
      const data = await response.json();
      setWeather(data.current_weather);
    };

    fetchWeather();
  }, []);

  return (
    <ParallaxScrollThemedView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/weather.jpg')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Clima en República Dominicana</ThemedText>
        {weather ? (
          <ThemedView style={styles.weatherContainer}>
          <ThemedText style={styles.temperature}>Temperatura: {weather.temperature}°C</ThemedText>
          <ThemedText style={styles.condition}>{weatherCodeDescriptions[weather.weathercode]}</ThemedText>
          <ThemedText style={styles.detail}>Windspeed: {weather.windspeed} km/h</ThemedText>
          <ThemedText style={styles.detail}>Dirección viento: {weather.winddirection}°</ThemedText>
        </ThemedView>
        
        ) : (
          <ThemedText>Cargando...</ThemedText>
        )}
      </ThemedView>
    </ParallaxScrollThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    weatherContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#e9ecef',
        width: '80%',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    condition: {
        fontSize: 14,
        marginBottom: 8,
    },
    detail: {
        fontSize: 14,
    },
    headerImage: {
      height: Dimensions.get('window').width * 0.7,
      width: Dimensions.get('window').width,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
  });
  