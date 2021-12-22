import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { subgroups, statuses, notifmethods, developers, Admins, Leads } from '../LoginScreen'
import { AppSettings } from '../../settings.json'
import SelectDropdown from 'react-native-select-dropdown';


function ChangeInfoScreen() { //change user info screen
    return (
        <SafeAreaView style={{backgroundColor: AppSettings.globalGray, flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <SelectDropdown
                    data={subgroups}
                    onSelect={(selectedSubgroup) => { subgroup = selectedSubgroup }}
                    buttonTextAfterSelection={(selectedSubgroup) => { return selectedSubgroup }}
                    rowTextForSelection={(item) => { return item }}
                    defaultButtonText={'Select Subgroup'}
                    buttonStyle={styles.subgroupMenu}
                    dropdownStyle={{ borderRadius: 20 }}
                />
                <SelectDropdown
                    data={statuses}
                    onSelect={(selectedStatus) => { status = selectedStatus }}
                    buttonTextAfterSelection={(selectedStatus) => { return selectedStatus }}
                    rowTextForSelection={(item) => { return item }}
                    defaultButtonText={'Select Status'}
                    buttonStyle={styles.statusMenu}
                    dropdownStyle={{ borderRadius: 20 }}
                />
                <SelectDropdown
                    data={notifmethods}
                    onSelect={(SelectedNotifMethod) => { notifmethod = SelectedNotifMethod }}
                    buttonTextAfterSelection={(selectedNotifMethod) => { return selectedNotifMethod }}
                    rowTextForSelection={(item) => { return item }}
                    defaultButtonText={'Select Notification Method'}
                    buttonStyle={styles.notifMethodMenu}
                    dropdownStyle={{ borderRadius: 20 }}
                />
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

    subgroupMenu: new DropdownStyle('30%'),
    statusMenu: new DropdownStyle('60%'),
    notifMethodMenu: new DropdownStyle('90%'),
})


export default ChangeInfoScreen;