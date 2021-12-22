import { createDrawerNavigator } from "@react-navigation/drawer";
import Hscreen from '../screens/MainScreenScreens/HScreen';
import bugReportScreen from '../screens/MainScreenScreens/BugReportScreen';
import creditsScreen from '../screens/MainScreenScreens/CreditsScreen';
import subgroupToolsScreen from '../screens/MainScreenScreens/subgroupToolsScreen';
import React from 'react';
import { data } from '../screens/LoadScreen'
import { AppSettings } from '../settings.json'

const Drawer = createDrawerNavigator(); 
const MainScreenStack = ({ navigation, route }) => {
    return (
        <Drawer.Navigator 
            initialRouteName="Home Screen" 
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: {
                    backgroundColor: AppSettings.globalGray,
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                headerStyle: {
                    height: 80,
                    backgroundColor: AppSettings.globalGray,
                },
            drawerInactiveTintColor: 'white',
            drawerActiveTintColor: AppSettings.globalRed,
            labelStyle:{
                marginLeft:5
            }
        
        }}>
            <Drawer.Screen name="Home Screen" component={Hscreen}/>
            <Drawer.Screen name= {data.subgroup+" Subgroup Chat"} component={subgroupToolsScreen}/>
            <Drawer.Screen name={"Credits & Links"} component={creditsScreen}/>
            <Drawer.Screen name="Report a Bug" component={bugReportScreen}/>
        </Drawer.Navigator>
    )
}

export default MainScreenStack