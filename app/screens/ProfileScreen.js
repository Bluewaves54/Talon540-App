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

} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { data } from './LoadScreen';
import RNRestart from 'react-native-restart';

var method = null
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

const ProfileScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{
                justifyContent: 'center',
                flex: 1,
                backgroundColor: '#1f2129',
            }}>
            <View style={styles.displayName}>
            <Text style={{ color: 'lightblue', fontWeight: 'bold', fontSize: 32 }}>{data.name} </Text>
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
                {/* <Button
                    title="Click for Admin & Subgroup Tools"
                    color="#f194ff"
                    onPress={() => {
                        if(data.status === 'Developer' || data.status==='Admin' || data.status==='Lead' ) {
                            navigation.navigate("Admin")
                        } else {
                            Alert.alert("You are not an Admin")
                        }
                    
                }}/> */}
            </SafeAreaView>
            <View style={styles.deleteButton}>
                <Button
                    color='red'
                    title={'Delete Account'}
                    onPress={() => { ConfirmDeletionAlert({navigation});
                    }}/>
            </View>
        </SafeAreaView>
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
        this.backgroundColor = 'lightblue';
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
    notifyDropdown: new DropdownStyle('350%'),
})
export default ProfileScreen;
