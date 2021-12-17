import React, { useState } from 'react';
import { 
    Text,
    Image,
    SafeAreaView,
    Button,
    Alert,
    StyleSheet,
    View,

} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { data } from './LoadScreen';
//import RNRestart from 'react-native-restart';

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
            }}>
            <View style={styles.displayData}>
                <Image
                    style={styles.pfp}
                    source={{
                    uri: 'https://lh3.googleusercontent.com/a-/' + data.pfp,
                    }}
                />
                <Text>Name: {data.name} </Text>
                <Text>Email: {data.email} </Text>
                <Text>Subgroup: {data.subgroup} </Text>
                <Text>Status: {data.status} </Text>
                <Text>Unique Id: {data.deviceID}</Text>
                <Text>Notify Method: {data.notifmethod} </Text>
            </View>
            <View style={{alignText: 'center',justifyContent: 'center', alignItems: 'center',bottom: 200,}}>
                <Text style={{fontWeight: 'bold'}}> How would you like to be notified when you sign in?</Text>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'static',
                bottom: 190,
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
                        //RNRestart.Restart(); Refresh for text to update
                    }}
                    buttonTextAfterSelection={(selectedMethod) => { return selectedMethod }}
                    rowTextForSelection={(item) => { return item }}
                    defaultButtonText={data.notifmethod}
                    buttonStyle={styles.notifyDropdown}
                    dropdownStyle={{ borderRadius: 20 }}
                />
            </View>
            <SafeAreaView style={styles.fatty}>
                <Button
                    title="Click for Admin & Subgroup Tools"
                    color="#f194ff"
                    onPress={() => navigation.navigate("Admin")}/>
            </SafeAreaView>
            <View style={styles.deleteButton}>
                <Button
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
        this.borderWidth = 5;
        this.borderRadius = 20;
        this.padding = 10;
        this.position = 'absolute';
        this.backgroundColor = 'lightblue';
    }
}

const styles = StyleSheet.create({
    pfp: {
        width: 50, //change
        height: 50,
    },
    deleteButton: {
        flex: 1,
        position: 'absolute',
        top: 615,
        left: 115,
        width: 160,
        height: 40,
    },
    displayData: {
        alignItems: 'center',
        bottom: 225, //275 with no pfp
    },
    fatty: {
        justifyContent: 'center',
        marginHorizontal: 16,
        alignSelf: 'center',
      },
    notifyDropdown: new DropdownStyle('350%'),
})
export default ProfileScreen;
