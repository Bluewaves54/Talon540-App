import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoggedInStack from './LoggedInStack';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    gestureEnabled: false,
                    headerShown: false,
                    topBar: {
                        backButton: {
                            visible: false
                        }
                    }
                }}
            />
            <Stack.Screen
                name="LoggedInStack"
                component={LoggedInStack}
                options={{
                    gestureEnabled: false,
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
  }


export default MainStack