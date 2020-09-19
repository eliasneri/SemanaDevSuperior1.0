import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
// Importando as Fontes
import {
  useFonts,
  Play_400Regular,
  Play_700Bold
  
} from '@expo-google-fonts/play';

import Header from './src/components/Header';
import Home from './src/pages/Home';

export default function App() {
  const [fontsLoaded] = useFonts({
    Play_400Regular,
    Play_700Bold
  });

  // Caso as fontes não esteja carregadas, será exibida um loading no celular
  if (!fontsLoaded ) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
      <Header />
      <Home />
      <StatusBar style="light" />
      </View>
    );
    
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B1F34',
    flex: 1,
  }
});