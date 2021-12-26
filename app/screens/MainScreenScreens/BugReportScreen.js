import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import email from 'react-native-email'

function generateBugReport() {
    email(['hcps-achantass@henricostudents.org', 'hcps-pala3@henricostudents.org'], {
        subject: 'New Bug Report',
        body: 'Hey, I found a bug in your app. (Please include things such as screenshots and ample description)'
    }).catch(console.error)
}

function bugReportScreen() {
    return (
        <View
          style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: 'white',
            alignItems: "center"
          }}>
          <Text>Found any Bugs?</Text>
          <Text>Email them to: {'Ayush Pal and Sriman Achanta'}</Text>
          <Button 
            title={"Click to generate a bug report"}
            onPress={() => {
                generateBugReport() //does not work on emulators but does work on real phones
            }}/>
        </View>
      )
}
export default bugReportScreen