import React, { useState } from 'react'

import {
  StyleSheet
} from 'react-native';
import DeviceInfo from 'react-native-device-info'

let id = DeviceInfo.getUniqueId()

export { id };

let verified = false;
let data

function LoadScreen({ navigation, route }) {
  const [accountExistsData, setData] = useState([]);
  if (!verified) {
    fetch('https://talon540appbackend.herokuapp.com/fetchInformation/' + id
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
      console.log(myJson)
      verified = true;
    })
  }
  if (Object.values(accountExistsData)[0] == id) {
    data = accountExistsData
    verified = false
    console.log(data)
    navigation.navigate(
      'LoggedInStack'
    )
      return null
  } else {
      navigation.navigate(
        'GoogleSignInScreen'
      )
      return null
  }
  
};

export { data }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default LoadScreen