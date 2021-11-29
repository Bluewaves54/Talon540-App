import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {
    StyleSheet,
    ImageBackground,
    TextInput,
    SafeAreaView,
    Text,
    Button,
    View,
    Alert,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import LoggedInStack from '../stacks/LoggedInStack'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from '../stacks/MainStack';

var id = DeviceInfo.getUniqueId();
var subgroup = null
var status = null
var gradYear = null

const subgroups = [
    "Programming",
    "Mechanical",
    "Electrical",
    "CAD",
    "Financial",
    "Strategy",
    "Outreach",
    "Public Relations",
]

const statuses = [
    "Rookie",
    "Veteran",
]

const gradYears = [
    2022,
    2023,
    2024,
    2025,
]

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
        this.backgroundColor = 'lightgrey';
    }
}

const UnfinishedFieldsAlert = () =>
    Alert.alert(
      "Error",
      "Make sure all options are selected",
      [
        { text: "OK", onPress: () => { return null } }
      ]
    );

const LoginScreen = ({ navigation, route }) =>  {
    const [isLoading, setLoading] = useState(true);
    // const [subgroup, onChangeText] = React.useState(null);
    // const [status, onChangeText2] = React.useState(null);
    // const [gradYear, onChangeNumber] = React.useState(null);
    const fetchDataAndNavigate = async () => {
        const response = await fetch('http://127.0.0.1:5000/'
                                      + subgroup + '/' + status + '/'
                                      + gradYear + '/' + id
                                    ,
                                      {
                                        headers : { 
                                          'Content-Type': 'application/json',
                                          'Accept': 'application/json'
                                        }
                                      }
                                    );
    const json = await response.json()
    if (Object.values(json)[0]) {
        navigation.navigate('LoggedInStack')
    } else {
        UnfinishedFieldsAlert()
    }
    }
    return (
        <SafeAreaView style={{
            backgroundColor: '#1f2129',
            flex: 1}}>
            <ImageBackground
            style={styles.background}
            source={require('../assets/Talon540Logo.webp')}>
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
                    data={gradYears}
                    onSelect={(selectedGradYear) => { gradYear = selectedGradYear }}
                    buttonTextAfterSelection={(selectedGradYear) => { return selectedGradYear }}
                    rowTextForSelection={(item) => { return item }}
                    defaultButtonText={'Select Graduation Year'}
                    buttonStyle={styles.gradYearMenu}
                    dropdownStyle={{ borderRadius: 20 }}
                />
            </SafeAreaView>
            <View
            style={styles.nextButton}>
            <Button
            onPress={() => 
                    {
                    if (subgroup && status && gradYear && id) {
                        fetchDataAndNavigate()
                    } else {
                        UnfinishedFieldsAlert();
                        }
                    }
            }
                
            title="Finish"/>
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

    subgroupMenu: new DropdownStyle('350%'),
    statusMenu: new DropdownStyle('500%'),
    gradYearMenu: new DropdownStyle('650%'),
})
