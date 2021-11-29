import React, { useState } from 'react'

import {
  StyleSheet
} from 'react-native';
import DeviceInfo from 'react-native-device-info'

let id = DeviceInfo.getUniqueId()

export { id };

let verified = false;

function LoadScreen({ navigation, route }) {
  console.log(navigation)
  const [accountExistsData, setData] = useState([]);
  if (!verified) {
    fetch('http://127.0.0.1:5000/verifyDeviceID/' + id
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
      verified = true;
    })
  }
  if (Object.values(accountExistsData)[0]) {
      navigation.navigate(
        'LoggedInStack'
      )
      return null
  } else {
      navigation.navigate(
        'MainStack'
      )
      return null
  }
  
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default LoadScreen