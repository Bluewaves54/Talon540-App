import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
} from 'react-native';
import { subgroups, statuses, notifmethods, developers, Admins, Leads } from '../SignUpScreens/LoginScreen'
import { AppSettings } from '../../settings.json'
import SelectDropdown from 'react-native-select-dropdown';

import { data } from '../LoadScreen';
//console.log(data)


var subgroup = data.subgroup
var status = data.status
var notifmethod = data.notifmethod

function ChangeInfoScreen({ navigation }) {
    const saveDataAndNavigate = async () => {
        if (developers.includes(data.name)) {
            status = "Developer"
        }
        if (Admins.includes(data.name)) {
            status = "Admin"
        }
        if (Leads.includes(data.name)) {
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
        const json = await response.json()
        
        navigation.navigate('Profile Screen')
        // RNRestart.Restart();
        // navigation.navigate('Settings')
    }
    return (
        <SafeAreaView style={{backgroundColor: AppSettings.globalGray, flex:1, alignItems: 'center'}}>
            <View style={{position: 'absolute', top: '20%'}}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}} > Edit your info here in case you missed something</Text>
            </View>
            
            <SelectDropdown
                data={subgroups}
                onSelect={(selectedSubgroup) => { subgroup = selectedSubgroup }}
                buttonTextAfterSelection={(selectedSubgroup) => { return selectedSubgroup }}
                rowTextForSelection={(item) => { return item }}
                defaultButtonText={data.subgroup}
                buttonStyle={styles.subgroupMenu}
                dropdownStyle={{ borderRadius: 20 }}
            />
            <SelectDropdown
                data={statuses}
                onSelect={(selectedStatus) => { status = selectedStatus }}
                buttonTextAfterSelection={(selectedStatus) => { return selectedStatus }}
                rowTextForSelection={(item) => { return item }}
                defaultButtonText={data.status}
                buttonStyle={styles.statusMenu}
                dropdownStyle={{ borderRadius: 20 }}
            />
            <SelectDropdown
                data={notifmethods}
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
                        Alert.alert("Your Data was Updated.")
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