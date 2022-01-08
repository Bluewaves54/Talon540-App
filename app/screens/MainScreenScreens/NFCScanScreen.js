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

import { data } from '../LoadScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppSettings, RoboticsInfo } from '../../settings.json';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
const cleanUp = () => {
  NfcManager.cancelTechnologyRequest().catch(() => 0);
}
const readData = async () => {
    try {let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
    let resp = await NfcManager.requestTechnology(tech, {alertMessage: 'Tap the NFC tag to sign in'});
    let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
    resp = await cmd([0x3A, 4, 4]);
    let payloadLength = parseInt(resp.toString().split(",")[1]);
    let payloadPages = Math.ceil(payloadLength / 4);
    let startPage = 5;
    let endPage = startPage + payloadPages - 1;
    resp = await cmd([0x3A, startPage, endPage]);
    bytes = resp.toString().split(",");
    let text = "";
    for(let i=0; i<bytes.length; i++){
        if (i < 5){ continue };
        if (parseInt(bytes[i]) === 254){ break };
        text = text + String.fromCharCode(parseInt(bytes[i])) };
    TalonTagDetected(text);
    Alert.alert('You have now signed into '+text)
    cleanUp();
} catch (ex) {
  console.log(ex);
    cleanUp();
};
}
let screenOPH = 1;
let sheetURL = '';
let spreadsheet_key = '';
let worksheet_key = '';

const locations = [
    'main room', //Room 31
    'photo room', //Room 32
    'woodshop', //Room 33
    'library', //Library
];
async function NotifyUser(Location) { //figure out notifications
    const d = new Date();
    var datetime = d.toLocaleString('en-GB');
    
    console.log(String(data.notifmethod).toLowerCase());
    //Notify User of Sucsessful Signin
    function notifyVibrate() {
        if (Platform.OS === "android") {
            Vibration.vibrate(500);
        } else if (Platform.OS === "ios") {
            state = true;
            Vibration.vibrate([10, 10],state);
            setTimeout(function(){ Vibration.cancel(); }, 1600);;
        };
    };
    function notifyPush(Location) {
        if(!Location) {
            console.log("You signed out on "+datetime);
        } else {
            console.log("You signed in on "+datetime+", at "+String(Location));
        };
    };

    switch(String(data.notifmethod).toLowerCase()) {
        case 'vibration': //simple buzz
            notifyVibrate();
        break;
        case 'notification': // You signed in at the _ at _signIn
            notifyPush(Location);
        break;
        default: 
            notifyVibrate();
            notifyPush(Location);
    };
};
async function TalonTagDetected(NFCDATA) {
    if(!NFCDATA) {
        Alert.alert(
            'No NFC Data Found',
            'This is most likely a development error or you are trying to scan a non Talon NFC tag',
        );
        return;
    };

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
        sheetURL = 'https://docs.google.com/spreadsheets/d/'+spreadsheet_key+'/edit#gid='+worksheet_key;
        console.log(sheetURL);
    }; 
    async function signOutRequest(DATA) {
        const response = await fetch('https://talon540appbackend.herokuapp.com/writeToSheets/signOutTable', DATA);
        const json = await response.json();
        let spreadsheet_key = json.spreadsheet_key;
        let worksheet_key = json.worksheet_key;
        sheetURL = 'https://docs.google.com/spreadsheets/d/'+spreadsheet_key+'/edit#gid='+worksheet_key;
        console.log(sheetURL);
    }
    const nfcLocation = NFCDATA; //This will eventually become the parsed location from NFCDATA

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
function NFCScanScreen() {
    return (
        <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={{
                        width:105,
                        height:105,
                        left: 150,   
                        borderRadius:50,
                    }}
                    onPress={() => readData()}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        textAlign: 'center',
                    }}> 
                    Login </Text>
                    <FontAwesome name="sign-in" color={'black'} size={100} />
                </TouchableOpacity>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({ //styles
    mainPage: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        color: 'white'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        opacity: screenOPH,
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: AppSettings.globalGray,
    },
    scrollView: {
        paddingTop: 10,
        backgroundColor: AppSettings.globalGray,
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

export default NFCScanScreen
