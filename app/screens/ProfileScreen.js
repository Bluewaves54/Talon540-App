import React, { useState } from 'react';
import { 
    Text,
    Image,
    SafeAreaView,
    Button,
    Alert,
    StyleSheet,
    View,
    StatusBar,
    TouchableHighlight,

} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { data } from './LoadScreen';
import RNRestart from 'react-native-restart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import bugReportScreen from './MainScreenScreens/BugReportScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { developers, subgroups, notifmethods, statuses, Admins, Leads } from './LoginScreen'
import { globalColor } from '../../App'
var method = null
var status = null
var subgroup = null
var notifmethod = null

const ConfirmDeletionAlert = ({ navigation }) => {
    Alert.alert(
        'Confirm',
        'Are you sure you want to delete your account?',
        [
            {
                text: 'Cancel',
                onPress: () => { return null },
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: () => 
                {
                fetch('https://talon540appbackend.herokuapp.com/deleteAccount/' + data.deviceID
                ,
                    {
                        headers : { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )
                .then(function(response){
                    resp = response.json();
                    return resp;
                })
                .then(function(myJson){
                    setData(myJson);
                    //console.log(data);
                })
                navigation.navigate("GoogleSignInScreen")
                } 
            },
        ]
    );
}
function ProfileScreenContents({navigation}) { //main profile screen
    return (
        <SafeAreaView style={{
                justifyContent: 'center',
                flex: 1,
                backgroundColor: '#1f2129',
            }}>
            <View style={styles.displayName}>
            <Text style={{ color: globalColor, fontWeight: 'bold', fontSize: 32 }}>{data.name} </Text>
            </View>
            <View style={styles.displayPfp}>
            <Image
                    style={styles.pfp}
                    source={{ uri: 'https://lh3.googleusercontent.com/a-/' + data.pfp}}
                />
            </View>
            <View style={styles.displayInfo}>
                <Text style={{ color: 'lightgray', fontSize: 15, fontWeight: 'bold'}}>{data.status} in {data.subgroup}</Text>
            </View>
            <View style={{ alignItems: 'center', bottom: 180}}>
            <Text style={{ color: 'lightgray', fontSize: 12}}>Contact: {data.email}</Text>
            </View>
            <View style={{alignText: 'center',justifyContent: 'center', alignItems: 'center',bottom: 0,}}>
                <Text style={{fontWeight: 'bold', color: 'white'}}> How would you like to be notified when you sign in?</Text>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'static',
                bottom: -5,
            }}>
                <SelectDropdown
                    data={['Vibrate','Notification','Both',]}
                    onSelect={async (selectedMethod) => {
                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                'deviceid': data.deviceID,
                                'notifMethod': selectedMethod
                            })
                        }
                        const response = await fetch('https://talon540appbackend.herokuapp.com/changeNotifMethod', requestOptions)
                        const json = response.json()
                        // RNRestart.Restart();
                        // navigation.navigate('Settings')
                    }}
                    buttonTextAfterSelection={(selectedMethod) => { return selectedMethod }}
                    rowTextForSelection={(item) => { return item }}
                    defaultButtonText={data.notifmethod}
                    buttonStyle={styles.notifyDropdown}
                    dropdownStyle={{ borderRadius: 20 }}
                />
            </View>
            <SafeAreaView style={styles.fatty}>
            </SafeAreaView>
            <TouchableHighlight onPress={() => navigation.jumpTo('Home', {screen: 'Report a Bug' })}>
                <View style={{left: 300, top: 220}}>
                    <Ionicons name="bug" color={globalColor} size={40} />     
                </View>
            </TouchableHighlight>
            <View style={styles.deleteButton}>
                <Button
                    title={'Delete Account'}
                    onPress={() => { ConfirmDeletionAlert({navigation});
                    }}/>
            </View>
        </SafeAreaView>
    )
}
function updateUserInfo(newmethod, newsubgroup, newstatus) {
    if(developers.includes(data.name)) {
        status = "Developer"
    }
    if(Admins.includes(data.name)) {
        status = "Admin"
    }
    if(Leads.includes(data.name)) {
        status = "Lead"
    }
    if(!newmethod) {
        newmethod = data.notifmethod
    }
    if(!newsubgroup) {
        newsubgroup = data.subgroup
    }
    if(!newstatus) {
        newstatus = data.status
    }
    //update method, subgroup, and status with newmethod, newsubgroup, and newstatus
}
function ChangeUserInformation() { //change user info screen
    return (
        <SafeAreaView>
            <View style={{left: 30, top: 50}}>
                <Text style={{width: 300}}>Hey Talon member, made a mistake while making your account or changing to a new subgroup? Use this screen to change your informtion.</Text>
            </View>
        </SafeAreaView>
      )
}
const Drawer = createDrawerNavigator(); 
const ProfileScreen = ({ navigation }) => {
    return (
        <Drawer.Navigator initialRouteName="Home Screen" 
            screenOptions={{
                drawerPosition: "left",
                drawerStyle: {
                backgroundColor: '#1f2129',
                },
            headerTransparent: true,
            headerTitleStyle: {
                fontSize: 0.1 //hehehehehehhe
              },
            
            drawerInactiveTintColor: 'white',
            drawerActiveTintColor: globalColor,
            labelStyle:{
                marginLeft:5
            }
    
        }}>
            <Drawer.Screen name="Profile Screen" component={ProfileScreenContents}/>
            <Drawer.Screen name="Update User Info" component={ChangeUserInformation}/>
        </Drawer.Navigator>
    )
}
export { method };

class DropdownStyle {
    constructor(top) {
        this.top = top;
        // this.left = '35%';
        this.width = 250;
        this.height = 50;
        this.margin = 10;
        this.borderWidth = 3;
        this.borderRadius = 20;
        this.padding = 10;
        this.position = 'absolute';
        this.backgroundColor = globalColor;
    }
}

const styles = StyleSheet.create({
    pfp: {
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black"
    },
    deleteButton: {
        flex: 1,
        position: 'absolute',
        top: 700,
        left: 110,
        width: 160,
        height: 40,
    },
    displayName: {
        bottom: 245, //275 with no pfp,
        alignItems: 'center'
    },
    displayPfp: {
        top: -180,
        alignItems: 'center',
    },
    displayInfo: {
        bottom: 330,
        alignItems: 'center'
    },
    fatty: {
        justifyContent: 'center',
        marginHorizontal: 16,
        alignSelf: 'center',
    },
    changeuserinfodropdowns: {
        justifyContent: 'center',
    },
    notifyDropdown: new DropdownStyle('350%'),
})
export default ProfileScreen;
