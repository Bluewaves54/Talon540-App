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
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Admin"
            component={AdminScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
    );
  }


export default ProfileStack