import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import MainScreen from '../screens/MainScreen';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const LoggedInStack = () => {
    return ( // Change independent if >NavigationContainers
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#1f2129'
                    },
                })}
            >
                <Tab.Screen
                    name="Main Page"
                    component={MainScreen}
                />
                <Tab.Screen
                    name="User Information"
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
    );
  }


export default LoggedInStack