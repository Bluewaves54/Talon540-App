import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Text,
    Button,
    View,
    Alert,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNRestart from 'react-native-restart';
import { googlename, googleemail, googlepfpurl } from './GoogleSignInScreen';
import { AppSettings, RoboticsInfo } from '../../settings.json'

var id = DeviceInfo.getUniqueId();
var subgroup = null
var status = null
var notifmethod = null


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
        this.backgroundColor = AppSettings.globalRed;
    }
}

const UnfinishedFieldsAlert = () =>
    Alert.alert(
      "Blank Fields",
      "Make sure all options are selected",
      [
        { text: "OK", onPress: () => { return null } }
      ]
    );

const LoginScreen = ({ navigation, route }) =>  {
    async function fetchDataAndNavigate() {
        if (AppSettings.developers.includes(googlename)) {
            status = "Developer"
        }
        // if (RoboticsInfo.Admins.includes(googlename)) {
        //     status = "Admin"
        //     subgroup = "Administrators"
        // }
        const l = []
        RoboticsInfo.subgroups.forEach(subgroup => { 
            l.push(RoboticsInfo.Leads[subgroup]['name'])
        })
        if (l.includes(googlename)) {
            status = "Lead"
        }
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'deviceID': id,
                'name': googlename,
                'subgroup': subgroup,
                'status': status,
                'notifmethod': notifmethod,
                'pfp': googlepfpurl,
                'email': googleemail,

            })
        };
        const response = await fetch('https://talon540appbackend.herokuapp.com/createNewAccount', requestOptions);
        const json = await response.json()
            RNRestart.Restart();
    }
    return (
        <SafeAreaView style={{
            backgroundColor: '#1f2129',
            flex: 1}}>
            <ImageBackground
            style={styles.background}
            source={require('../../assets/Talon540Logo.webp')}>
            <Text
            style={styles.signInText}
            >
                Enter the Information Below
            </Text>
            <SafeAreaView style={{
                justifyContent: 'center',
                flex: 1,
            }}>
                <SelectDropdown
                    data={RoboticsInfo.subgroups}
                    onSelect={(selectedSubgroup) => { subgroup = selectedSubgroup }}
                    buttonTextAfterSelection={(selectedSubgroup) => { return selectedSubgroup }}
                    rowTextForSelection={(item) => { return item }}
                    defaultButtonText={'Select Subgroup'}
                    buttonStyle={styles.subgroupMenu}
                    dropdownStyle={{ borderRadius: 20 }}
                />
                <SelectDropdown
                    data={RoboticsInfo.statuses}
                    onSelect={(selectedStatus) => { status = selectedStatus }}
                    buttonTextAfterSelection={(selectedStatus) => { return selectedStatus }}
                    rowTextForSelection={(item) => { return item }}
                    defaultButtonText={'Select Status'}
                    buttonStyle={styles.statusMenu}
                    dropdownStyle={{ borderRadius: 20 }}
                />
                <SelectDropdown
                    data={RoboticsInfo.notifmethods}
                    onSelect={(SelectedNotifMethod) => { notifmethod = SelectedNotifMethod }}
                    buttonTextAfterSelection={(selectedNotifMethod) => { return selectedNotifMethod }}
                    rowTextForSelection={(item) => { return item }}
                    defaultButtonText={'Select Notification Method'}
                    buttonStyle={styles.notifMethodMenu}
                    dropdownStyle={{ borderRadius: 20 }}
                />
            </SafeAreaView>
            <View
            style={styles.nextButton}>
            <Button
            onPress={() => 
                    {
                    if (subgroup && status && notifmethod && id) {
                        Alert.alert(
                            'Double Check',
                            'Make Sure all information is correct',
                            [
                                {
                                    text: 'Go Back',
                                    onPress: () => { return null },
                                    style: 'cancel'
                                },
                                {
                                    text: 'Its Correct',
                                    onPress: () => fetchDataAndNavigate(),
                                },
                            ]
                        )
                    } else {
                        UnfinishedFieldsAlert();
                        }
                    }
            }
                
            title="Finish"/>
            </View>
            <View style={styles.backButton}>
                <Button
                onPress={() => navigation.navigate('GoogleSignInScreen')}
                title='Go Back to Login' />
            </View>
        </ImageBackground>
        </SafeAreaView>
    );
}
export default LoginScreen;

const styles = StyleSheet.create({
    errorMessage: {

    },
    background: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        left: '7%',
    },
    signInText: {
        flex: 1,
        width: 1000,
        left: '-10%',
        top: '130%',
        position: 'absolute',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        
    },
    nextButton: {
        flex: 1,
        position: 'absolute',
        top: '800%',
        left: '180%',
        width: 70,
        height: 40,
        color: '#fff',
    },
    backButton: {
        flex: 1,
        position: 'absolute',
        top: '850%',
        left: '120%',
        width: 160,
        height: 40,
        color: '#fff',      
    },

    subgroupMenu: new DropdownStyle('350%'),
    statusMenu: new DropdownStyle('500%'),
    notifMethodMenu: new DropdownStyle('650%'),
})