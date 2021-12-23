import React from 'react';
import {
    Button,
    Alert,
    View,
    Vibration
} from 'react-native';
import { data, id } from './LoadScreen'

const locations = [
    'main room', //Room 31
    'photo room', //Room 32
    'library', //Library
    'woodshop', //Room 33
    ]

async function NotifyUser(Location) { //figure out notifications
    const d = new Date()
    var datetime = d.toLocaleString('en-GB')
    
    console.log(String(data.notifmethod).toLowerCase())
    //Notify User of Sucsessful Signin
    function notifyVibrate() {
        if (Platform.OS === "android") {
            Vibration.vibrate(500)
        } else if(Platform.OS === "ios") {
            state = true
            Vibration.vibrate([150,150,150],state)
            setTimeout(function(){ Vibration.cancel(); }, 1600);
        }
    }
    function notifyPush(Location) {
        if(!Location) {
            console.log("You signed out on "+datetime)
        } else {
            console.log("You signed in on "+datetime+", at "+String(Location))
        }
    }

    switch(String(data.notifmethod).toLowerCase()) {
        case 'vibration': //simple buzz
            notifyVibrate()
        break;
        case 'notification': // You signed in at the _ at _signIn
            notifyPush(Location)
        break;
        default: 
            notifyVibrate()
            notifyPush(Location)
    }
}
async function talonSignIn(NFCDATA) {
    if(!NFCDATA) {
        Alert.alert(
            'No NFC Data Found',
            'This is most likely a development error',
        )
        return
    }

    // Alert.alert( //Alert if multiple signins within one minute
    //     'Your Signin has been registered',
    //     'Please wait one minute before sending another',
    // )
    // Parse out location from NFC Data

    async function signIn(DATA) {
        const response = await fetch('https://talon540appbackend.herokuapp.com/writeToSheets/signInTable', DATA);
            const json = await response.json();
            const spreadsheet_key = json.spreadsheet_key;
            const worksheet_key = json.worksheet_key;
            console.log('https://docs.google.com/spreadsheets/d/'+spreadsheet_key+'/edit#gid='+worksheet_key)
    } 
    async function signOut(DATA) {
            const response = await fetch('https://talon540appbackend.herokuapp.com/writeToSheets/signOutTable', DATA);
            const json = await response.json();
            const spreadsheet_key = json.spreadsheet_key;
            const worksheet_key = json.worksheet_key;
            console.log('https://docs.google.com/spreadsheets/d/'+spreadsheet_key+'/edit#gid='+worksheet_key)
    }
    const nfcLocation = NFCDATA

    if (locations.includes(nfcLocation)) { //If suplied location is known, signIn
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'deviceid': data.deviceID, //Identify User
                'room': nfcLocation //Location of Signin
            })
        };
        signIn(requestOptions)
        NotifyUser(nfcLocation)
    } else { //else signOut
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'deviceid': data.deviceID, //Identify User
                'room': 'Signing Out' //Location of Signin
            })
        };
        signOut(requestOptions)
        NotifyUser() 
    }

}
function TablesScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button
                title='Sign in/out'
                onPress={() => { 
                    talonSignIn("main room"); //Instead of "main room" we would put NFC data to be parsed
                }}
            /> 
        </View>
    );
}
export default TablesScreen;        