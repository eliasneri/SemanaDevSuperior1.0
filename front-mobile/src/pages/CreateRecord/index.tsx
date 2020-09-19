import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, View } from 'react-native';
import Header from '../../components/Header'
import PlatformCard from './PlatformCard'
import { GamePlatform } from './types';


const CreateRecord = () => {

const [platform, setPlatform] = useState<GamePlatform>();

const handleChangePlatform = (selectedPlatform: GamePlatform) => {
   setPlatform(selectedPlatform);
}


    return (
        <>
        <Header />
         <View style={styles.container}>
           <TextInput style={styles.inputText} placeholder="Nome"
           placeholderTextColor="#9e9e9e" maxLength={30}/>
           
           <TextInput 
           keyboardType="numeric"
           style={styles.inputText} placeholder="Idade"
           placeholderTextColor="#9E9E9E"
           maxLength={3}/>
         </View>

         <View style={styles.platformContainer}>
            <PlatformCard 
              platform="PC"
              icon="laptop"
              onChange={handleChangePlatform}
              activePlatform={platform}/>
            <PlatformCard 
              platform="XBOX"
              icon="xbox"
              onChange={handleChangePlatform}
              activePlatform={platform}/>
            <PlatformCard 
              platform="PLAYSTATION"
              icon="playstation"
              onChange={handleChangePlatform}
              activePlatform={platform}/>
         </View>

        </>       
         
    );
}

// CSS
const styles = StyleSheet.create (
    {
        container: {
          marginTop: '15%',
          paddingRight: '5%',
          paddingLeft: '5%',
          paddingBottom: 50
        },
        inputText: {
          height: 50,
          backgroundColor: '#FFF',
          borderRadius: 10,
          color: '#ED7947',
          fontFamily: "Play_700Bold",
          fontSize: 16,
          paddingLeft: 20,
          marginBottom: 21
        },
        platformContainer: {
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        footer: {
          marginTop: '15%',
          alignItems: 'center',
        },
        button: {
          backgroundColor: '#00D4FF',
          flexDirection: 'row',
          borderRadius: 10,
          height: 60,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        },
        buttonText: {
          fontFamily: "Play_700Bold",
          fontWeight: 'bold',
          fontSize: 18,
          color: '#0B1F34',
        }
      }
);

export default CreateRecord