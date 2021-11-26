import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import MainScreen from './MainScreen';
import DeviceInfo from 'react-native-device-info';
import { NavigationContainer } from '@react-navigation/native';
import { tsSymbolKeyword } from '@babel/types';

let id = DeviceInfo.getUniqueId();

let goToMainScreen = false;

const Stack = createNativeStackNavigator();

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
const LoginScreen = ({ navigation, route }) =>  {
    const [data, setData] = useState([]);
    const [subgroup, onChangeText] = React.useState(null);
    const [status, onChangeText2] = React.useState(null);
    const [gradYear, onChangeNumber] = React.useState(null);
    const ErrorAlert = () =>
    Alert.alert(
      "Error",
      "Make sure all fields are filled out",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    while (!goToMainScreen) {
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
            onPress={() => {
                if (subgroup && status && gradYear && id) {
                    fetch('http://127.0.0.1:5000/'
                + subgroup + '/' + status + '/'
                + gradYear + '/' + id
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
                    return resp
                })
                .then(function(myJson){
                    setData(myJson)
                });
                console.log(data)
                if (Object.values(data)) {
                    return (
                        goToMainScreen = true
                    )
                } else {
                    console.log('failed')
                    ErrorAlert();
                }
                } else {
                    ErrorAlert();
                }}}
                
            title="Finish"/>
            </View>
        </ImageBackground>
        </SafeAreaView>
    );
}
    return (
        <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    )
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
