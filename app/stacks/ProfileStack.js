import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import AdminScreen from '../screens/AdminToolsScreen'


const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Profile" 
            component={ProfileScreen}
          />
          <Stack.Screen
            name="Admin"
            component={AdminScreen}
          />
        </Stack.Navigator>
    );
  }


export default ProfileStack