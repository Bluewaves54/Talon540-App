import React from 'react';
import {
    Button,
    Alert,
    View
} from 'react-native';
import { data } from './LoadScreen';

var signedIn = false;

async function logEntryAndFetchTable() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'deviceid': data.deviceID,
            'room': "H's room"
        })
    };
    if (!signedIn) {
        const response = await fetch('https://talon540appbackend.herokuapp.com/writeToSheets/signInTable', requestOptions);
        signedIn = true;
    } else {
        const response = await fetch('https://talon540appbackend.herokuapp.com/writeToSheets/signOutTable', requestOptions);
        signedIn = false;
    }
    const json = await response.json();
    const spreadsheet_key = json['spreadsheet_key'];
    const worksheet_key = json['worksheet_key'];
    // do your thing with these keys - the spreadsheet is the whole thing and the worksheet is one tab in the spreadsheet
    //use url: https://docs.google.com/spreadsheets/d/spreadsheet_key/edit#gid=worksheet_key
}

function TablesScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <Button
                title='Sign in/out'
                onPress={() => { logEntryAndFetchTable(); Alert.alert('you have been logged')}}
            /> 
        </View>
        
    );
}


export default TablesScreen;