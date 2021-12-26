import React from 'react';
import { Text, View, Button } from 'react-native';
import { AppSettings, RoboticsInfo } from '../../settings.json'
import { data } from '../LoadScreen'

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Button
        title="Click here..."
        onPress={() => {
        }}
      />
    </View>
  )
}
export default HelloWorldApp;