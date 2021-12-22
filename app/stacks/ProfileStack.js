import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';
import ChangeInfoScreen from '../screens/ProfileScreens/ChangeInfoScreen';
import AppSettings from '../settings.json'
globalColor = AppSettings.globalColor;


const Drawer = createDrawerNavigator(); 
const ProfileStack = () => {
    return (
        <Drawer.Navigator initialRouteName="Home Screen" 
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: {
                backgroundColor: '#1f2129',
                },
            headerTransparent: true,
            headerTitleStyle: {
                fontSize: 0.1 //hehehehehehhe
              },
            
            drawerInactiveTintColor: 'white',
            drawerActiveTintColor: globalColor,
            labelStyle:{
                marginLeft:5
            }
    
        }}>
            <Drawer.Screen name="Profile Screen" component={ProfileScreen}/>
            <Drawer.Screen name="Update User Info" component={ChangeInfoScreen}/>
        </Drawer.Navigator>
    )
}

export default ProfileStack