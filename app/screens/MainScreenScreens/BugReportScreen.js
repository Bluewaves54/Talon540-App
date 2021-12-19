import React from 'react';
import { Text, View, } from 'react-native';
import developers from '../LoginScreen'
function bugReportScreen() {
    return (
        <View
          style={{
                flex: 1,
                justifyContent: "center",
            alignItems: "center"
          }}>
          <Text>Found any Bugs?</Text>
          <Text>Email them to: {'Ayush Pal and Sriman Achanta'}</Text>
          <Text></Text>
        </View>
      )
}
export default bugReportScreen