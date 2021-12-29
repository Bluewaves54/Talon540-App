import React from 'react';
import { Text, View, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreenStack from '../stacks/MainScreenStack';
import ProfileStack from './ProfileStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AdminTools from '../stacks/AdminStack';
import { data } from '../screens/LoadScreen';
import { AppSettings, RoboticsInfo } from '../settings.json';

var globalRed = AppSettings.globalRed


let adminbadgecount = 10
const Tab = createBottomTabNavigator();
function AdminTabNavigator() {
  return (  
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1f2129'
        },
        tabBarActiveTintColor: globalRed,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen 
        name="Home" 
        component={MainScreenStack} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={size} />
          ),
          headerShown: false
        }}/>
      <Tab.Screen 
        name={"Profile & Settings"}
        component={ProfileStack}
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false
        }}/>
      <Tab.Screen 
        name="Admin" 
        component={AdminTools}
        options={{ 
          // tabBarBadge: adminbadgecount,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="empire" color={color} size={size} />
          ),
          headerShown: false
        }}/>
    </Tab.Navigator>
);
}
function NotAdminTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1f2129'
        },
        tabBarActiveTintColor: globalRed,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen 
        name="Home" 
        component={MainScreenStack} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={size} />
          ),
          headerShown: false
        }}/>
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false
        }}/>
    </Tab.Navigator>
);
}
export default function App() {
  if(data.status === 'Developer' || data.status === 'Admin' || data.status === 'Lead') {
    return (
      AdminTabNavigator()
    )
  } else {
    return (
      NotAdminTabNavigator()
    )
  }
}