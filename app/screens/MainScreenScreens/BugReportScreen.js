import React, {Component} from 'react';
import { Text, View, Button, Alert } from 'react-native';
import developers from '../LoginScreen'
import email from 'react-native-email'

generateBugReport = () => {
    const to = ['hcps-achantass@henricostudents.org'] // string or array of email addresses
    email(to, {

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