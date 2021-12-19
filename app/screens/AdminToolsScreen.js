import React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CovidSheetsScreen from './AdminToolsScreens/CovidSheetsScreen'
import ScoutingScreen from './AdminToolsScreens/ScoutingScreen'
import SubgroupSigninScreen from './AdminToolsScreens/SubgroupSigninScreen'

import { data } from '../screens/LoadScreen'

const Drawer = createDrawerNavigator(); 
export default function AdminTools() {
  return (
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: "left",
          drawerStyle: {
            backgroundColor: '#1f2129',
          },
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: 'lightblue',
          labelStyle:{
            marginLeft:5
          }
        }}
      >
        <Drawer.Screen name="Covid Data & Sign in Times" component={CovidSheetsScreen} />
        <Drawer.Screen name="Subgroup Signin Sheet" component={SubgroupSigninScreen} />
        <Drawer.Screen name="Scouting" component={ScoutingScreen} />
      </Drawer.Navigator>
  )
}
//Drawer View
    //Supgroup signin
    //Scouting
    //CovidSheets
