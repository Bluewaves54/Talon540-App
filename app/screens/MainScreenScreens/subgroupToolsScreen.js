import React from 'react';
import {
    Text,
    View,
    Image,
    
} from 'react-native';
import { AppSettings } from '../../settings.json'
export default function subgroupToolsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: AppSettings.globalGray
      }}>
      <Image source={require('../../assets/construction.gif')}/>
    </View>
  )
}