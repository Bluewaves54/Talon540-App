import LoginScreen from './app/screens/LoginScreen';
import MainScreen from './app/screens/MainScreen';
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import {
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native';
import DeviceInfo from 'react-native-device-info'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

let id = DeviceInfo.getUniqueId()
let verified = false;

const countries = ["Egypt", "Canada", "Australia", "Ireland"]

const Stack = createNativeStackNavigator();
const MyStack = () => {
  const [data, setData] = useState([]);
  if (!verified) {
  fetch('http://127.0.0.1:5000/' + id
  ,
    {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
  )
  .then(function(response){
    resp = response.json();
    return resp
  })
  .then(function(myJson){
    setData(myJson)
    console.log(data)
    verified = true;
  })
}
if (Object.values(data)[0]) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} else {
  return (
    <LoginScreen />
  )
}
  };

// function App() {
//   return (
//     <LoginScreen />


//   )
// };

export default MyStack

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

// export default App;