import React, { useState, useEffect } from 'react'

import {
  StyleSheet
} from 'react-native';
import DeviceInfo from 'react-native-device-info'

let id = DeviceInfo.getUniqueId()

export { id };

let verified = false;
let data
let accountExists = null

async function fetchData() {
  response = await fetch('https://talon540appbackend.herokuapp.com/fetchInformation/' + id,
    {
      headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    }
  )
  json = await response.json()
  //console.log('json', json)
  verified = true;
}

export default function LoadScreen({ navigation, route }) {
    useEffect(() => {
      async function fetchData() {
        response = await fetch('https://talon540appbackend.herokuapp.com/fetchInformation/' + id,
          {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
          }
        );
        const json = await response.json();
        //console.log('json', json);
        verified = true;
        if (Object.values(json)[0] == id) {
          data = json;
          navigation.navigate(
            'LoggedInStack'
          );
          return null;
        } else {
            navigation.navigate(
              'GoogleSignInScreen'
            );
          return null;
        }
      }
      if (!verified) {
        fetchData()
      } else {
        return;
      }
      
    }
    )
  return null
  
};

export { data }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})