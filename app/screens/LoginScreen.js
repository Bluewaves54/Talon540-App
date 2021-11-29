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

const Stack = createNativeStackNavigator();

let id = DeviceInfo.getUniqueId();

const subgroups = [
    "Programming",
    "Mechanical",
    "Electrical",
    "CAD",
    "Financial",
    "Strategy",
    "Outreach",
    "Public Relations"]


class DropdownMenu {
    constructor(top) {
        this.top = top;
        this.borderRadius = 8;

    }
}

class TextInputBox {
    constructor(top) {
        this.top = top;
        this.left = '35%';
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
      "Make sure all fields are filled out correctly",
      [
        {
          text: "Cancel",
          onPress: () => { return null },
          style: "cancel"
        },
        { text: "OK", onPress: () => { return null } }
      ]
    );

const LoginScreen = ({ navigation, route }) =>  {
    const [isLoading, setLoading] = useState(true);
    const [subgroup, onChangeText] = React.useState(null);
    const [status, onChangeText2] = React.useState(null);
    const [gradYear, onChangeNumber] = React.useState(null);
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

            <TextInput
                style={styles.subgroupInput}
                onChangeText={onChangeText}
                value={subgroup}
                placeholder="Programming, Mechanical, etc."
            />
            <TextInput
                style={styles.statusInput}
                onChangeText={onChangeText2}
                value={status}
                placeholder="Rookie/Veteran"
            />
            <TextInput
                style={styles.gradYearInput}
                onChangeText={onChangeNumber}
                value={gradYear}
                placeholder="Year"
            />
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
        left: 40,
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
        left: '150%',
        width: 70,
        height: 40,
        color: '#fff',
    },

    subgroupInput: new TextInputBox('350%'),
    statusInput: new TextInputBox('500%'),
    gradYearInput: new TextInputBox('650%'),
})
