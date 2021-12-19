import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Button,
    ImageBackground,
    Vibration,
    Alert,
    Platform,
}
from 'react-native';
import { data } from './LoadScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import bugReportScreen from './MainScreenScreens/BugReportScreen'

//Notify user of signin or sign out with timestamp
function NotifyUser(Location, Status) { //figure out notifications
    const d = new Date()
    var datetime = d.toLocaleString('en-GB')
    const locations = [
        'main room', //Room 31
        'photo room', //Room 32
        'library', //Library
        'woodshop', //Room 33
        'signout', //Signing out
        ]
    var location
    if(!Location) {
        var place = 'null'
    } else if(locations.includes(location)) {
        var place = String(location)
    } else {
        var place = 'null'
      }
    //Notify User of Sucsessful Signin
    switch(string(data.notifmethod.toLowerCase())) {
        case 'vibration': //simple buzz
            function notifyVibrate() {
                if (Platform.OS === "android") {
                    Vibration.vibrate(500)
                } else if(Platform.OS === "ios") {
                    state = true
                    Vibration.vibrate([150,150,150],state)
                    setTimeout(function(){ Vibration.cancel(); }, 1600);
                }
            }
            notifyVibrate()
        break;
        case 'notification': // You signed in at the _ at _
            function notifyPush(where, why) {
            }
            notifyPush()
            //if(status == 'in') {
            //console.log("You signed in on "+datetime+" at "+place)
            //} else if(status == 'out') {
            //    console.log("You signed out on "+datetime)
            //}
        break;
        default: 
            notifyVibrate()
            notifyPush()

    }
}
function talonSignIn(NFCDATA) {
    if(!sn) {
        const sn = new Map() //creates new map
    }
    if(!NFCDATA) {
        Alert.alert(
            'No NFC Data Found',
            'This is most likely a development error',
        )
        return
    }
    
    if(sn.has("entried")) { //if map run alert
        Alert.alert(
        'Your Signin has been registered',
        'Please wait one minute before sending another',)
    } else { //if no limit set limit 
        sn.set("entried") //setting limit
        setTimeout(() => { sn.delete("entried") }, 60000); //clear limit after 1 min
        //rest of code:
            //Send Location, Time, Name, and Status to backend
            //Notify User NotifyUser()

    }
    // Send to data table >> google spreadsheet
    // Take in NFC Data >> Parse out Location and status
}
function subgroupToolsScreen() {
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text>Hello, world!</Text>
        </View>
      )
}

function Hscreen() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/JesusH.png')} resizeMode="cover" style={styles.image}>
            </ImageBackground>
        </View>
    );
}
const Drawer = createDrawerNavigator(); 
const MainScreen = ({ navigation, route }) => {
    return (
        <Drawer.Navigator 
            initialRouteName="Home Screen" 
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: {
                    backgroundColor: '#1f2129',
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold'
                },
                headerStyle: {
                    height: 80,
                    backgroundColor: '#1f2129',
                },
            drawerInactiveTintColor: 'white',
            drawerActiveTintColor: 'lightblue',
            labelStyle:{
                marginLeft:5
            }
        
        }}>
            <Drawer.Screen name="Home Screen" component={Hscreen}/>
            <Drawer.Screen name="Subgroup Tools" component={subgroupToolsScreen}/>
            <Drawer.Screen name="Report a Bug" component={bugReportScreen}/>
        </Drawer.Navigator>
    )
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

