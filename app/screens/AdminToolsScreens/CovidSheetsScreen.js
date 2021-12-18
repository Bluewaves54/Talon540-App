import React from 'react';
import { Text, View, Image } from 'react-native';

function CovidSheetsScreen({navigation}) {
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:'#1f2129'
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Hey Talon Admins and Leads!</Text>
          <Text style={{textAlign: 'center', color: 'white'}}>Open the Drawer on the Right for stuff</Text>
          <Image source={require('../../assets/construction.gif')}/>
        </View>
      )
}
export default CovidSheetsScreen