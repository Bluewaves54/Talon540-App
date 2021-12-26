import React from 'react';
import { Text, View, Image } from 'react-native';
import { AppSettings, RoboticsInfo } from '../../settings.json'

function ScoutingScreen({navigation}) {
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: AppSettings.globalGray
          }}>
          <Text style={{ color: "white" }}>Hey Talon Admins and Leads!</Text>
          <Text style={{ color: "white" }}>Open the Drawer on the Right for stuff</Text>
          <Image source={require('../../assets/construction.gif')}/>
        </View>
      )
}
export default ScoutingScreen