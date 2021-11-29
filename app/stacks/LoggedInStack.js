import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const LoggedInStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Main Page"
                component={MainScreen}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
  }


export default LoggedInStack