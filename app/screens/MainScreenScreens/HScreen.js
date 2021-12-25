import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    StatusBar,
    Vibration,
    Button,
    SafeAreaView,
    TouchableOpacity,
    Alert
} from 'react-native';

import { data, id } from '../LoadScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppSettings } from '../../settings.json'
let sheetURL = ''
let spreadsheet_key = ''
let worksheet_key = ''

const locations = [
    'main room', //Room 31
    'photo room', //Room 32
    'woodshop', //Room 33
    'library', //Library
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
async function TalonTagDetected(NFCDATA) {
    if(!NFCDATA) {
        Alert.alert(
            'No NFC Data Found',
            'This is most likely a development error or you are trying to scan a non Talon NFC tag',
        )
        return
    }

    // Alert.alert( //Alert if multiple signins within one minute
    //     'Your Signin has been registered',
    //     'Please wait one minute before sending another',
    // )

    // Parse out location from NFC Data

    async function signInRequest(DATA) {
        const response = await fetch('https://talon540appbackend.herokuapp.com/writeToSheets/signInTable', DATA);
        const json = await response.json();
        let spreadsheet_key = json.spreadsheet_key;
        let worksheet_key = json.worksheet_key;
        sheetURL = 'https://docs.google.com/spreadsheets/d/'+spreadsheet_key+'/edit#gid='+worksheet_key
        console.log(sheetURL)
    } 
    async function signOutRequest(DATA) {
        const response = await fetch('https://talon540appbackend.herokuapp.com/writeToSheets/signOutTable', DATA);
        const json = await response.json();
        let spreadsheet_key = json.spreadsheet_key;
        let worksheet_key = json.worksheet_key;
        sheetURL = 'https://docs.google.com/spreadsheets/d/'+spreadsheet_key+'/edit#gid='+worksheet_key
        console.log(sheetURL)
    }
    const nfcLocation = NFCDATA

    if (locations.includes(nfcLocation)) { //If suplied location is known, signIn
        //Sign In POST
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
        signInRequest(requestOptions)
        NotifyUser(nfcLocation)

    } else {
        //Sign Out POST
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
        signOutRequest(requestOptions)
        NotifyUser() 
    }

}
function Hscreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/JesusH.png')} resizeMode="cover" style={styles.image}>
                <TouchableOpacity
                    style={{
                        width:105,
                        height:105,
                        left: 150,   
                        borderRadius:50,
                    }}
                    onPress={() => TalonTagDetected("main room") }>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        textAlign: 'center',
                    }}> 
                    Simulate Login </Text>
                    <FontAwesome name="sign-in" color={'black'} size={100} />
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({ //styles
    mainPage: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        color: '#fff'
    },
    container: {
        flex: 1,
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      },
    image: {
        flex: 1,
        justifyContent: 'center',
        opacity: 1,
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        paddingTop: 10,
        backgroundColor: '#1f2129',
    },
    cimage: {
        width: 75,
        height: 75,
        left: 20
    },
    ctext: {
        color: 'white', 
        fontWeight: 'bold',
        width: 260,
        fontSize: 15

    }

})

export default Hscreen