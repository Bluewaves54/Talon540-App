import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Button,
    ImageBackground,
    Vibration,
    Alerts,
    Platform,
}
from 'react-native';
import { method } from './ProfileScreen';

function NotifyUser(Location, Status) { //figure out notifications
    const d = new Date()
    var datetime = d.toLocaleString('en-GB')
    const locations = [
        'main room', //Room 31
        'photo room', //Room 32
        'library', //Library
        'woodshop', //Room 33
    ]
    if(!Location) {
        var place = 'null'
    } else {
        if(locations.includes(location)) {
            var place = string(location)
        } else {
            var place = 'null'
        }
    }
    //Notify User of Sucsessful Signin
    switch(string(method.toLowerCase())) {
        case 'vibrate': //simple buzz
            function notifyVibrate() {
                if (Platform.OS === "android") {
                    Vibration.vibrate(500)
                } else if(Platform.OS === "ios") {
                    state = true
                    Vibration.vibrate([150,150,150],state)
                    setTimeout(function(){ Vibration.cancel(); }, 3000);
                }
            }
            notifyVibrate()
        break;
        case 'notification': // You signed in at the _ at _
            function notifyPush(where, why) {
            }
            //if(status == 'in') {
            //console.log("You signed in on "+datetime+" at "+place)
            //} else if(status == 'out') {
            //    console.log("You signed out on "+datetime)
            //}
        break;
        default: 
            notifyVibrate()

    }
}

const MainScreen = ({ navigation, route }) => {
    const image = { uri: "https://cdn.discordapp.com/attachments/892936500747075624/919297354170003466/unknown.png" };
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            </ImageBackground>
        </View>
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
    image: {
        flex: 1,
        justifyContent: 'center',
    },

})

export default MainScreen;

