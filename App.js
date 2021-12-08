import MainStack from './app/stacks/MainStack';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadScreen from './app/screens/LoadScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='MainStack'
          component={MainStack}
          options={{
            gestureEnabled: false,
            headerShown: false
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App