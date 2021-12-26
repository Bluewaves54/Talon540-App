import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
} from 'react-native';
import { AppSettings, RoboticsInfo } from '../../settings.json'
import SelectDropdown from 'react-native-select-dropdown';
import RNRestart from 'react-native-restart'

import { data } from '../LoadScreen';

var subgroup = data.subgroup
var status = data.status
var notifmethod = data.notifmethod

function ChangeInfoScreen({ navigation }) {
    const saveDataAndNavigate = async () => {
        if (AppSettings.developers.includes(googlename)) {
            status = "Developer"
        }
        if (RoboticsInfo.Admins.includes(googlename)) {
            status = "Admin"
            subgroup = "Administrators"
        }
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
                'deviceid': data.deviceID,
                'notifmethod': notifmethod,
                'subgroup': subgroup,
                'status': status
            })
        }
        const response = await fetch('https://talon540appbackend.herokuapp.com/updateInfo', requestOptions)
    }
    return (
        <SafeAreaView style={{backgroundColor: AppSettings.globalGray, flex:1, alignItems: 'center'}}>
            <View style={{position: 'absolute', top: '20%'}}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}} > Edit your info here in case you missed something</Text>
            </View>
            
            <SelectDropdown
                data={RoboticsInfo.subgroups}
                onSelect={(selectedSubgroup) => { subgroup = selectedSubgroup }}
                buttonTextAfterSelection={(selectedSubgroup) => { return selectedSubgroup }}
                rowTextForSelection={(item) => { return item }}
                defaultButtonText={data.subgroup}
                buttonStyle={styles.subgroupMenu}
                dropdownStyle={{ borderRadius: 20 }}
            />
            <SelectDropdown
                data={RoboticsInfo.statuses}
                onSelect={(selectedStatus) => { status = selectedStatus }}
                buttonTextAfterSelection={(selectedStatus) => { return selectedStatus }}
                rowTextForSelection={(item) => { return item }}
                defaultButtonText={data.status}
                buttonStyle={styles.statusMenu}
                dropdownStyle={{ borderRadius: 20 }}
            />
            <SelectDropdown
                data={RoboticsInfo.notifmethods}
                onSelect={(SelectedNotifMethod) => { notifmethod = SelectedNotifMethod }}
                buttonTextAfterSelection={(selectedNotifMethod) => { return selectedNotifMethod }}
                rowTextForSelection={(item) => { return item }}
                defaultButtonText={data.notifmethod}
                buttonStyle={styles.notifMethodMenu}
                dropdownStyle={{ borderRadius: 20 }}
            />
            <View style={styles.nextButton}>
               <Button
                    title='Save Changes'
                    onPress={() => {
                        saveDataAndNavigate({ navigation });
                        Alert.alert("Your Data was Updated.", 'Relaunch the app to see your changes');
                    }}
                /> 
            </View>
            
        </SafeAreaView>

      )
}

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

const styles = StyleSheet.create({
    nextButton: {
        flex: 1,
        position: 'absolute',
        top: '90%',
        color: '#fff',
    },

    subgroupMenu: new DropdownStyle('30%'),
    statusMenu: new DropdownStyle('45%'),
    notifMethodMenu: new DropdownStyle('60%'),
})


export default ChangeInfoScreen;