import LoginScreen from './app/screens/LoginScreen';
import React,{useState,useEffect} from 'react'

import {
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info'

let id = DeviceInfo.getUniqueId()

function App() {
  return (

    // <SafeAreaView style={styles.container}>
    //   <Text>
    //    {id}
    //   </Text>
    // </SafeAreaView>
    <LoginScreen />
  )};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default App;