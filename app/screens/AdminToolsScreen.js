import React from 'react';
import { Text, View, Image } from 'react-native';

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hey Talon Admins and Leads!</Text>
      <Text>Open the Drawer on the Right for stuff</Text>
      <Image source={require('../assets/construction.gif')}/>
    </View>
  )
}
export default HelloWorldApp;
//Drawer View
    //Supgroup signin
    //Scouting
    //CovidSheets
    //