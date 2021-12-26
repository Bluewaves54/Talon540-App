import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CovidSheetsScreen from '../screens/AdminToolsScreens/CovidSheetsScreen'
import ScoutingScreen from '../screens/AdminToolsScreens/ScoutingScreen'
import SubgroupSigninScreen from '../screens/AdminToolsScreens/SubgroupSigninScreen'
import CodeTestScreen from '../screens/AdminToolsScreens/CodeTestScreen'
import { AppSettings } from '../settings.json'

const Drawer = createDrawerNavigator(); 
export default function AdminTools() {
  return (
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: "left",
          drawerStyle: {
            backgroundColor: AppSettings.globalGray,
          },
          headerTransparent: true,
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: AppSettings.globalGray,
          },
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: AppSettings.globalRed,
          labelStyle:{
            marginLeft:5
          }
        }}
      >
        <Drawer.Screen name={"Covid Data & Sign in Times"} component={CovidSheetsScreen} />
        <Drawer.Screen name="Subgroup Signin Sheet" component={SubgroupSigninScreen} />
        <Drawer.Screen name="Scouting" component={ScoutingScreen} />
        <Drawer.Screen name="Code Test Screen (DELETE)" component={CodeTestScreen} />
      </Drawer.Navigator>
  )
}
