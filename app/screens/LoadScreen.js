import React, { useState, useEffect } from 'react'

import {
  StyleSheet
} from 'react-native';
import DeviceInfo from 'react-native-device-info'

let id = DeviceInfo.getUniqueId()

export { id };

let verified = false;
let data = ''
let dailyURL

export default function LoadScreen({ navigation }) {
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
      async function getDailySheet() {
          const getDate = new Date();
          const date = getDate.getFullYear()+'-'+(getDate.getMonth()+1)+'-'+getDate.getDate()
          const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'date': date,
            })
          };
          response = await fetch('https://talon540appbackend.herokuapp.com/returnSpreadsheetKey', requestOptions)
          const JSONdailySheetResponse = await response.json()
        
          const spreadsheetID = JSONdailySheetResponse['spreadsheet_key']
          const dayID = JSONdailySheetResponse['worksheet_key']
        
          dailyURL = "https://docs.google.com/spreadsheets/d/"+spreadsheetID+"/pubhtml?gid="+dayID
      }
      if (!verified) {
        fetchData()
        getDailySheet()
      } else {
        return;
      }
      
    }
  )
  return null
};

export { data, dailyURL }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})