import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import logo from '../img/ponteteclogo.png';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
  
    setTimeout(() => {
      navigation.replace('Home'); 
    }, 3000); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/ponteteclogo.png')} // m
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  logo: {
    marginBottom: 20,
    padding:20
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;