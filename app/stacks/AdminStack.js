import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CovidSheetsScreen from '../screens/AdminToolsScreens/CovidSheetsScreen'
import ScoutingScreen from '../screens/AdminToolsScreens/ScoutingScreen'
import SubgroupSigninScreen from '../screens/AdminToolsScreens/SubgroupSigninScreen'
import { AppSettings } from '../settings.json'
var globalColor = AppSettings.globalColor

const Drawer = createDrawerNavigator(); 
export default function AdminTools() {
  return (
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: "left",
          drawerStyle: {
            backgroundColor: '#1f2129',
          },
          headerTransparent: true,
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
        },
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: globalColor,
          labelStyle:{
            marginLeft:5
          }
        }}
      >
        <Drawer.Screen name={"Covid Data & Sign in Times"} component={CovidSheetsScreen} />
        <Drawer.Screen name="Subgroup Signin Sheet" component={SubgroupSigninScreen} />
        <Drawer.Screen name="Scouting" component={ScoutingScreen} />
      </Drawer.Navigator>
  )
}
