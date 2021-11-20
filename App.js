import LoginScreen from './app/screens/LoginScreen';
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import {
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native';
import DeviceInfo from 'react-native-device-info'

let id = DeviceInfo.getUniqueId()

const countries = ["Egypt", "Canada", "Australia", "Ireland"]

function App() {
  return (
    <LoginScreen />


  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default App;