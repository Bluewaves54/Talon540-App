import { createDrawerNavigator } from "@react-navigation/drawer";
import NFCScanScreen from '../screens/MainScreenScreens/NFCScanScreen';
import bugReportScreen from '../screens/MainScreenScreens/BugReportScreen';
import creditsScreen from '../screens/MainScreenScreens/CreditsScreen';
import subgroupChatsScreen from '../screens/MainScreenScreens/SubgroupChatsScreen'
import React from 'react';
import { data } from '../screens/LoadScreen'
import { AppSettings, RoboticsInfo } from '../settings.json'

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
            <Drawer.Screen name="Home Screen" component={NFCScanScreen}/>
            {/* <Drawer.Screen name= {data.subgroup + " Subgroup Chat"} component={subgroupChatsScreen}/> */}
            <Drawer.Screen name={"Credits & Links"} component={creditsScreen}/>
            <Drawer.Screen name="Report a Bug" component={bugReportScreen}/>
        </Drawer.Navigator>
    )
}

export default MainScreenStack